<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
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

            'niveau_cours'              => 'nullable|string',
            'prof_id'                   => 'required|exists:profs,id',
        ]);
        switch($validated['niveau_cours']){
            case "easy":
                $validated['max_points']=100;
            case "medium":
                $validated['max_points']=200;
            case "hard":
                $validated['max_points']=300;
        }

        $cours = Cours::create($validated);



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
        Gate::authorize('manage-cours', $cours);
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
        Gate::authorize('manage-cours', $cours);
        $cours->delete();

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }



    public function newCourses()
    {
        $oneWeekAgo = now()->subWeek();

        $courses = Cours::where('created_at', '>=', $oneWeekAgo)->where('status','=','free')
                        ->orderBy('created_at', 'desc')
                        ->take(12)
                        ->get();

        return response()->json($courses);
    }

    /**
     * Get the most popular courses by enrollment in the last week
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function mostPopularCourses()
    {
        $oneWeekAgo = now()->subWeek();

        $courses = Cours::whereHas('etudiant', function ($query) use ($oneWeekAgo) {
                            $query->where('inscreption.created_at', '>=', $oneWeekAgo);
                        })
                        ->withCount(['etudiant as recent_enrollments' => function ($query) use ($oneWeekAgo) {
                            $query->where('inscreption.created_at', '>=', $oneWeekAgo);
                        }])->where('status','=','free')
                        ->orderBy('recent_enrollments', 'desc')
                        ->take(12)
                        ->get();

        return response()->json($courses);
    }
    /**
     * Get recommended courses for the authenticated student based on
     * total interactions (inscriptions + devoir submissions) in the last week.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function recommendedCourses()
    {
        $oneWeekAgo = now()->subWeek();
        $courses = Cours::withCount(['etudiant as recent_enrollments' => function ($q) use ($oneWeekAgo) {
                            $q->where('inscreption.created_at', '>=', $oneWeekAgo);
                        }])
                        ->get();

        $courses = $courses->map(function ($course) use ($oneWeekAgo) {
            $devoirSubmissions = DB::table('devoir_etudiant')
                ->join('devoirs', 'devoir_etudiant.devoir_id', '=', 'devoirs.devoir_id')
                ->join('lessons', 'devoirs.lesson_id', '=', 'lessons.lesson_id')
                ->join('chapiters', 'lessons.chapiter_id', '=', 'chapiters.chapiter_id')
                ->where('chapiters.cours_id', $course->cours_id)
                ->where('devoir_etudiant.date_submission', '>=', $oneWeekAgo)
                ->count();

            $course->interactions = $course->recent_enrollments + $devoirSubmissions;
            return $course;
        });
        $top = $courses->sortByDesc('interactions')->take(12)->values();

        return response()->json($top);
    }

/**
     * Attach one or multiple matières to a cours.
     *
     * @param  Request  $request
     * @param  Cours    $cours
     * @return \Illuminate\Http\JsonResponse
     */
    public function attach(Request $request, Cours $cours)
    {
        $validated = $request->validate([
            'matiere_ids'   => 'required|array',
            'matiere_ids.*' => 'exists:matieres,matiere_id',
        ]);

        Gate::authorize('manage-cours', $cours);
        $cours->matiere()->syncWithoutDetaching($validated['matiere_ids']);

        return response()->json([
            'message'     => 'Matières attachées avec succès',
            'matiere_ids' => $validated['matiere_ids'],
        ], Response::HTTP_OK);
    }

    /**
     * Detach one or multiple matières from a cours.
     *
     * @param  Request  $request
     * @param  Cours    $cours
     * @return \Illuminate\Http\JsonResponse
     */
    public function detach(Request $request, Cours $cours)
    {
        $validated = $request->validate([
            'matiere_ids'   => 'required|array',
            'matiere_ids.*' => 'exists:matieres,matiere_id',
        ]);
        Gate::authorize('manage-cours', $cours);

        $cours->matiere()->detach($validated['matiere_ids']);

        return response()->json([
            'message'     => 'Matières détachées avec succès',
            'matiere_ids' => $validated['matiere_ids'],
        ], Response::HTTP_OK);
    }

public function coursCount() {
return response()->json(["count"=>Cours::count()]);
}

}
