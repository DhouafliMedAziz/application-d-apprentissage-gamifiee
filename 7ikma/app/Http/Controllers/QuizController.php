<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use Illuminate\Http\Response;

class QuizController extends Controller
{
    /**
     * Display a paginated listing of the quizzes, optionally filtered by devoir.
     */
    public function index(Request $request, $devoir_id = null)
    {
        $query = Quiz::with(['devoir', 'choix']);

        if ($devoir_id) {
            $query->where('devoir_id', $devoir_id);
        }

        $quizzes = $query->paginate($request->get('per_page', 15));

        return response()->json($quizzes, Response::HTTP_OK);
    }

    /**
     * Store a newly created quiz in storage, assigning to given devoir if nested.
     */
    public function store(Request $request, $devoir_id = null)
    {
        $rules = [
            'question' => 'required|string|max:1000',
        ];
        if ($devoir_id) {
            $rules['devoir_id'] = 'sometimes|exists:devoirs,devoir_id';
        } else {
            $rules['devoir_id'] = 'required|exists:devoirs,devoir_id';
        }

        $validated = $request->validate($rules);
        if ($devoir_id) {
            $validated['devoir_id'] = $devoir_id;
        }

        $quiz = Quiz::create($validated);

        return response()->json(
            $quiz->load(['devoir', 'choix']),
            Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified quiz.
     */
    public function show($id)
    {
        $quiz = Quiz::with(['devoir', 'choix'])
                    ->findOrFail($id);

        return response()->json($quiz, Response::HTTP_OK);
    }

    /**
     * Update the specified quiz in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'devoir_id' => 'sometimes|required|exists:devoirs,devoir_id',
            'question'  => 'sometimes|required|string|max:1000',
        ]);

        $quiz = Quiz::findOrFail($id);
        $quiz->update($validated);

        return response()->json(
            $quiz->load(['devoir', 'choix']),
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified quiz from storage.
     */
    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
