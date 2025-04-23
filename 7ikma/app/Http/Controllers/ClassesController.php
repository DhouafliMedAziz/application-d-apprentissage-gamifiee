<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Classe;
use Illuminate\Http\Response;

class ClassesController extends Controller
{
    /**
     * Display a paginated listing of the classes.
     */
    public function index(Request $request)
    {
        $classes = Classe::with(['prof', 'etudiants'])
                         ->paginate($request->get('per_page', 15));

        return response()->json($classes, Response::HTTP_OK);
    }

    /**
     * Store a newly created class in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom_de_classe'    => 'required|string|max:255',
            'date_de_creation' => 'required|date',
            'section'          => 'required|string|max:100',
            'prof_id'          => 'required|exists:profs,id',
        ]);

        $classe = Classe::create($validated);
        return response()->json($classe->load(['prof', 'etudiants']), Response::HTTP_CREATED);
    }

    /**
     * Display the specified class.
     */
    public function show($id)
    {
        $classe = Classe::with(['prof', 'etudiants'])
                        ->findOrFail($id);

        return response()->json($classe, Response::HTTP_OK);
    }

    /**
     * Update the specified class in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nom_de_classe'    => 'sometimes|required|string|max:255',
            'date_de_creation' => 'sometimes|required|date',
            'section'          => 'sometimes|required|string|max:100',
        ]);

        $classe = Classe::findOrFail($id);
        $classe->update($validated);
        return response()->json($classe->load(['prof', 'etudiants']), Response::HTTP_OK);
    }

    /**
     * Remove the specified class from storage.
     */
    public function destroy($id)
    {
        $classe = Classe::findOrFail($id);
        $classe->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Enroll one or more students in a class (inscrire).
     *
     * Accepts either a single etudiant_id or an array of etudiant_ids.
     */
    public function inscrire(Request $request, $id)
    {


        $classe = Classe::findOrFail($id);
        $user = $request->user();
        $classe->etudiants()->attach($user->utilisateur_id);
        return response()->json([
            'message' => 'Student(s) enrolled successfully.',
            'classe'  => $classe->load(['prof', 'etudiants'])
        ], Response::HTTP_CREATED);
    }

    /**
     * Remove a student from a class (desinscrire).
     */
    public function desinscrire(Request $request, $id)
    {
        $user = $request->user();


        $classe = Classe::findOrFail($id);
        $classe->etudiants()->detach($user->utilisateur_id);

        return response()->json([
            'message' => 'Student removed successfully.',
            'classe'  => $classe->load(['prof', 'etudiants'])
        ], Response::HTTP_OK);
    }

    /**
     * Get all students enrolled in a class (join listing).
     */
    public function etudiants($id)
    {
        $classe = Classe::findOrFail($id);
        $students = $classe->etudiants;

        return response()->json($students, Response::HTTP_OK);
    }
}
