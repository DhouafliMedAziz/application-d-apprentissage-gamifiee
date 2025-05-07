<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Choix;
use Illuminate\Http\Response;

class ChoixController extends Controller
{
    /**
     * Display a paginated listing of choices, optionally filtered by quiz.
     */
    public function index(Request $request, $quiz_id = null)
    {
        $query = Choix::query();

        if ($quiz_id) {
            $query->where('quiz_id', $quiz_id);
        }

        $choices = $query->paginate($request->get('per_page', 15));

        return response()->json($choices, Response::HTTP_OK);
    }

    /**
     * Store a newly created choice, enforcing exactly 4 per quiz and one correct.
     */
    public function store(Request $request, $quiz_id = null)
    {
        $rules = [
            'contenu' => 'required|string|max:1000',
            'status'  => 'required|boolean',
        ];

        if ($quiz_id) {
            $rules['quiz_id'] = 'sometimes|exists:quizzes,quiz_id';
        } else {
            $rules['quiz_id'] = 'required|exists:quizzes,quiz_id';
        }

        $validated = $request->validate($rules);

        if ($quiz_id) {
            $validated['quiz_id'] = $quiz_id;
        }

        $existingCount = Choix::where('quiz_id', $validated['quiz_id'])->count();
        if ($existingCount >= 4) {
            return response()->json([
                'message' => 'A quiz can have at most 4 choices.'
            ], Response::HTTP_BAD_REQUEST);
        }
        if ($validated['status']) {
            $hasCorrect = Choix::where('quiz_id', $validated['quiz_id'])
                               ->where('status', true)
                               ->exists();
            if ($hasCorrect) {
                return response()->json([
                    'message' => 'There is already a correct choice for this quiz.'
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $choice = Choix::create($validated);

        return response()->json($choice, Response::HTTP_CREATED);
    }

    /**
     * Display the specified choice.
     */
    public function show($id)
    {
        $choice = Choix::findOrFail($id);
        return response()->json($choice, Response::HTTP_OK);
    }

    /**
     * Update the specified choice, enforcing business rules.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'contenu' => 'sometimes|required|string|max:1000',
            'status'  => 'sometimes|required|boolean',
            'quiz_id' => 'sometimes|required|exists:quizzes,quiz_id',
        ]);

        $choice = Choix::findOrFail($id);

        if (isset($validated['quiz_id']) && $validated['quiz_id'] != $choice->quiz_id) {
            $count = Choix::where('quiz_id', $validated['quiz_id'])->count();
            if ($count >= 4) {
                return response()->json([
                    'message' => 'Target quiz already has 4 choices.'
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        if (array_key_exists('status', $validated) && $validated['status']) {
            $hasCorrect = Choix::where('quiz_id', $validated['quiz_id'] ?? $choice->quiz_id)
                               ->where('status', true)
                               ->where('choix_id', '!=', $choice->choix_id)
                               ->exists();
            if ($hasCorrect) {
                return response()->json([
                    'message' => 'Another correct choice already exists.'
                ], Response::HTTP_BAD_REQUEST);
            }
        }

        $choice->update($validated);

        return response()->json($choice, Response::HTTP_OK);
    }

    /**
     * Remove the specified choice from storage.
     */
    public function destroy($id)
    {
        $choice = Choix::findOrFail($id);
        $choice->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
