<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Cours;
use Illuminate\Http\Response;

class CoursController extends Controller
{
    /**
     * Display a paginated listing of the courses.
     */
    public function index(Request $request)
    {
        $cours = Cours::with(['prof', 'chapiters', 'etudiant', 'Matiere'])
                       ->paginate($request->get('per_page', 15));

        return response()->json($cours, Response::HTTP_OK);
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'titre'                     => 'required|string|max:255',
            'desciption'                => 'nullable|string',
            'prix'                      => 'required|integer',
            'duree'                     => 'required|integer',
            'status'                    => 'required|in:free,paied',
            'max_points'                => 'nullable|integer',
            'niveau_cours'              => 'nullable|string',
            'note_moyenne_du_cours'     => 'nullable|numeric',
            'prof_id'                   => 'required|exists:profs,id',
            'matiere_ids'               => 'nullable|array',
            'matiere_ids.*'             => 'exists:matieres,id',
        ]);

        $cours = Cours::create($validated);

        if (!empty($validated['matiere_ids'])) {
            $cours->Matiere()->attach($validated['matiere_ids']);
        }

        return response()->json($cours->load(['prof', 'chapiters', 'etudiant', 'Matiere']), Response::HTTP_CREATED);
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        $cours = Cours::with(['prof', 'chapiters', 'etudiant', 'Matiere'])
                       ->findOrFail($id);

        return response()->json($cours, Response::HTTP_OK);
    }

    /**
     * Update the specified course in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'titre'                     => 'sometimes|required|string|max:255',
            'desciption'                => 'sometimes|nullable|string',
            'prix'                      => 'sometimes|required|integer',
            'duree'                     => 'sometimes|required|integer',
            'status'                    => 'sometimes|required|in:free,paied',
            'max_points'                => 'sometimes|nullable|integer',
            'niveau_cours'              => 'sometimes|nullable|string',
            'note_moyenne_du_cours'     => 'sometimes|nullable|numeric',
            'prof_id'                   => 'sometimes|required|exists:profs,id',
            'matiere_ids'               => 'sometimes|array',
            'matiere_ids.*'             => 'exists:matieres,id',
        ]);

        $cours = Cours::findOrFail($id);
        $cours->update($validated);

        if (array_key_exists('matiere_ids', $validated)) {
            $cours->Matiere()->sync($validated['matiere_ids']);
        }

        return response()->json($cours->load(['prof', 'chapiters', 'etudiant', 'Matiere']), Response::HTTP_OK);
    }

    /**
     * Remove the specified course from storage.
     */
    public function destroy($id)
    {
        $cours = Cours::findOrFail($id);
        $cours->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
