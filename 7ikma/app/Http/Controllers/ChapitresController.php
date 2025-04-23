<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Chapitres;
use Illuminate\Http\Response;

class ChapitresController extends Controller
{
    /**
     * Display a paginated listing of chapters, optionally filtered by course.
     */
    public function index(Request $request, $cours_id = null)
    {
        $query = Chapitres::with(['cours', 'lessons']);

        if ($cours_id) {
            $query->where('cours_id', $cours_id);
        }

        $chapitres = $query->paginate($request->get('per_page', 15));

        return response()->json($chapitres, Response::HTTP_OK);
    }

    /**
     * Store a newly created chapter in storage, assigning to given course if nested.
     */
    public function store(Request $request, $cours_id = null)
    {
        $rules = [
            'titre'          => 'required|string|max:255',
            'chapiter_order' => 'required|integer',
        ];

        if ($cours_id) {
            $rules['cours_id'] = 'sometimes|exists:cours,cours_id';
        } else {
            $rules['cours_id'] = 'required|exists:cours,cours_id';
        }

        $validated = $request->validate($rules);

        // If nested, enforce given course_id
        if ($cours_id) {
            $validated['cours_id'] = $cours_id;
        }

        $chapitre = Chapitres::create($validated);

        return response()->json(
            $chapitre->load(['cours', 'lessons']),
            Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified chapter.
     */
    public function show($id)
    {
        $chapitre = Chapitres::with(['cours', 'lessons'])
                              ->findOrFail($id);

        return response()->json($chapitre, Response::HTTP_OK);
    }

    /**
     * Update the specified chapter in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'cours_id'       => 'sometimes|required|exists:cours,cours_id',
            'titre'          => 'sometimes|required|string|max:255',
            'chapiter_order' => 'sometimes|required|integer',
        ]);

        $chapitre = Chapitres::findOrFail($id);
        $chapitre->update($validated);

        return response()->json(
            $chapitre->load(['cours', 'lessons']),
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified chapter from storage.
     */
    public function destroy($id)
    {
        $chapitre = Chapitres::findOrFail($id);
        $chapitre->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
