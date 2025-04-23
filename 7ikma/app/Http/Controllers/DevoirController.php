<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Devoir;
use Illuminate\Http\Response;

class DevoirController extends Controller
{
    /**
     * Display a paginated listing of the devoirs.
     */
    public function index(Request $request)
    {
        $devoirs = Devoir::with('etudiants')
                         ->paginate($request->get('per_page', 15));

        return response()->json($devoirs, Response::HTTP_OK);
    }

    /**
     * Store a newly created devoir in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre'             => 'required|string|max:255',
            'points'            => 'required|integer',
            'max_score'         => 'required|integer',
            'date_final'        => 'required|date',
            'etudiant_ids'      => 'nullable|array',
            'etudiant_ids.*'    => 'exists:etudiants,etudiant_id',
        ]);

        $devoir = Devoir::create($validated);

        if (!empty($validated['etudiant_ids'])) {
            $devoir->etudiants()->attach($validated['etudiant_ids']);
        }

        return response()->json($devoir->load('etudiants'), Response::HTTP_CREATED);
    }

    /**
     * Display the specified devoir.
     */
    public function show($id)
    {
        $devoir = Devoir::with('etudiants')
                         ->findOrFail($id);

        return response()->json($devoir, Response::HTTP_OK);
    }

    /**
     * Update the specified devoir in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'titre'             => 'sometimes|required|string|max:255',
            'points'            => 'sometimes|required|integer',
            'max_score'         => 'sometimes|required|integer',
            'date_final'        => 'sometimes|required|date',
            'etudiant_ids'      => 'sometimes|array',
            'etudiant_ids.*'    => 'exists:etudiants,etudiant_id',
        ]);

        $devoir = Devoir::findOrFail($id);
        $devoir->update($validated);

        if (array_key_exists('etudiant_ids', $validated)) {
            $devoir->etudiants()->sync($validated['etudiant_ids']);
        }

        return response()->json($devoir->load('etudiants'), Response::HTTP_OK);
    }

    /**
     * Remove the specified devoir from storage.
     */
    public function destroy($id)
    {
        $devoir = Devoir::findOrFail($id);
        $devoir->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
    public function passe(Request $request, $id)
    {
        $validated = $request->validate([
            'etudiant_id'       => 'required|exists:etudiants,etudiant_id',
            'date_submission'   => 'sometimes|date',
        ]);
        $devoir = Devoir::findOrFail($id);
        $devoir->etudiants()->attach($validated['etudiant_id'], [
            'date_submission' => $validated['date_submission'] ?? now(),
            'score'           => null
        ]);

        return response()->json([
            'message'  => 'Submission recorded successfully.',
            'devoir'   => $devoir->load('etudiants')
        ], Response::HTTP_CREATED);
    }

    /**
     * Set or update a student's score for a devoir (garde).
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     */
    public function garde(Request $request, $id)
    {
        $validated = $request->validate([
            'etudiant_id' => 'required|exists:etudiants,etudiant_id',
            'score'        => 'required|integer',
        ]);

        $devoir = Devoir::findOrFail($id);

        if (! $devoir->etudiants()->wherePivot('etudiant_id', $validated['etudiant_id'])->exists()) {
            return response()->json([
                'message' => 'Student has not submitted this devoir.'
            ], Response::HTTP_BAD_REQUEST);
        }

        $devoir->etudiants()->updateExistingPivot($validated['etudiant_id'], [
            'score' => $validated['score'],
        ]);

        return response()->json([
            'message'  => 'Score recorded successfully.',
            'devoir'   => $devoir->load('etudiants')
        ], Response::HTTP_OK);
    }


}
