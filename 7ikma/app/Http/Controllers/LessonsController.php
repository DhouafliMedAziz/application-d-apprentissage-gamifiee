<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lessons;
use Illuminate\Http\Response;

class LessonsController extends Controller
{
    /**
     * Display a paginated listing of lessons, optionally filtered by chapter.
     */
    public function index(Request $request, $chapiter_id = null)
    {
        $query = Lessons::with('chapiter');

        if ($chapiter_id) {
            $query->where('chapiter_id', $chapiter_id);
        }

        $lessons = $query->paginate($request->get('per_page', 15));

        return response()->json($lessons, Response::HTTP_OK);
    }

    /**
     * Store a newly created lesson in storage, assigning to given chapter if nested.
     */
    public function store(Request $request, $chapiter_id = null)
    {
        $rules = [
            'titre'         => 'required|string|max:255',
            'content_type'  => 'required|string',
            'url'           => 'required|url',
        ];
        if ($chapiter_id) {
            $rules['chapiter_id'] = 'sometimes|exists:chapiters,chapiter_id';
        } else {
            $rules['chapiter_id'] = 'required|exists:chapiters,chapiter_id';
        }
        $validated = $request->validate($rules);

        if ($chapiter_id) {
            $validated['chapiter_id'] = $chapiter_id;
        }
        $lesson = Lessons::create($validated);

        return response()->json(
            $lesson->load('chapiter'),
            Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified lesson.
     */
    public function show($id)
    {
        $lesson = Lessons::with('chapiter')
                         ->findOrFail($id);

        return response()->json($lesson, Response::HTTP_OK);
    }

    /**
     * Update the specified lesson in storage.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'chapiter_id'  => 'sometimes|required|exists:chapiters,chapiter_id',
            'titre'        => 'sometimes|required|string|max:255',
            'content_type' => 'sometimes|required|string',
            'url'          => 'sometimes|required|url',
        ]);

        $lesson = Lessons::findOrFail($id);
        Gate::authorize('manage-lessons', $lesson);

        $lesson->update($validated);

        return response()->json(
            $lesson->load('chapiter'),
            Response::HTTP_OK
        );
    }

    /**
     * Remove the specified lesson from storage.
     */
    public function destroy($id)
    {
        $lesson = Lessons::findOrFail($id);
        Gate::authorize('manage-lessons', $lesson);

        $lesson->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Mark a lesson as passed by a student, only if they passed the associated devoir.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int                         $id
     */
    public function pass(Request $request, $id)
    {
        $validated = $request->validate([
            'etudiant_id' => 'required|exists:etudiants,etudiant_id',
            'devoir_id'   => 'required|exists:devoirs,devoir_id',
        ]);

        $lesson = Lesson::with(['chapiter.cours.devoirs'])->findOrFail($id);

        $devoirs = $lesson->chapiter?->cours?->devoirs ?? collect();

        $passed = $devoirs
            ->filter(function ($devoir) use ($validated) {
                return $devoir->devoir_id == $validated['devoir_id'] &&
                       optional($devoir->etudiants->where('etudiant_id', $validated['etudiant_id'])->first())->pivot?->score >= 80;
            })
            ->isNotEmpty();

        if (! $passed) {
            return response()->json([
                'message' => 'Student must pass the related devoir before accessing this lesson.'
            ], Response::HTTP_FORBIDDEN);
        }

        $lesson->etudiants()->syncWithoutDetaching([
            $validated['etudiant_id'] => ['date_passed' => now()]
        ]);

        return response()->json([
            'message' => 'Lesson marked as passed.',
            'lesson'  => $lesson->load('chapiter')
        ], Response::HTTP_OK);
    }
}
