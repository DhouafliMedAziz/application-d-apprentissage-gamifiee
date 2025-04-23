<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use App\Models\Etudiant;
use App\Models\Cours;
use App\Models\Classe;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use ImageKit\ImageKit;

class UtilisateurController extends Controller
{
    /**
     * Display a listing of the users.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Apply filters if provided
        $query = Utilisateur::query();

        // Filter by role if specified
        if ($request->has('role')) {
            if ($request->role === 'etudiant') {
                $query = Etudiant::query();
            } elseif ($request->role === 'prof') {
                $query = Prof::query();
            }
        }

        // Apply search term if provided
        if ($request->has('search')) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('nom_d_utilisateur', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('email', 'LIKE', "%{$searchTerm}%");
            });
        }

        // Pagination and sorting
        $perPage = $request->input('per_page', 15);
        $sortBy = $request->input('sort_by', 'created_at');
        $sortOrder = $request->input('sort_order', 'desc');

        $utilisateurs = $query->orderBy($sortBy, $sortOrder)->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $utilisateurs
        ]);
    }

    /**
     * Store a newly created user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom_d_utilisateur' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'mot_passe' => 'required|string|min:8|confirmed',
            'role' => 'required|in:etudiant,prof',
            'profile_picture' => 'nullable|image|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Handle profile picture if provided
        $profilePictureUrl = null;
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageKit = new ImageKit(
                env('IMAGEKIT_PUBLIC_KEY'),
                env('IMAGEKIT_PRIVATE_KEY'),
                env('IMAGEKIT_URL_ENDPOINT')
            );

            $uploadFile = $imageKit->upload([
                'file' => base64_encode(file_get_contents($image->getRealPath())),
                'fileName' => uniqid('profile_') . '.' . $image->getClientOriginalExtension(),
                'folder' => '/user-profiles'
            ]);

            $profilePictureUrl = $uploadFile->success ? $uploadFile->result->url : null;
        }

        // Create base user
        if ($request->role === 'etudiant') {
            $user = new Etudiant();
            $user->description = $request->description ?? null;
            $user->grade = $request->grade ?? null;
        } else {
            $user = new Prof();
            $user->description = $request->description ?? null;
            $user->note_moyenne = $request->note_moyenne ?? 0;
        }

        // Set common attributes
        $user->nom_d_utilisateur = $request->nom_d_utilisateur;
        $user->email = $request->email;
        $user->mot_passe = Hash::make($request->mot_passe);
        $user->profile_picture_URL = $profilePictureUrl;
        $user->points_totales = $request->points_totales ?? 0;
        $user->coins = $request->coins ?? 0;

        $user->save();

        // Load related data for specific user types
        if ($user instanceof Etudiant) {
            // Handle avatar options if provided
            if ($request->has('eye_options')) {
                $user->eyeOptions()->sync($request->eye_options);
            }
            if ($request->has('hat_options')) {
                $user->hatOptions()->sync($request->hat_options);
            }
            if ($request->has('mouth_options')) {
                $user->mouthOptions()->sync($request->mouth_options);
            }
            if ($request->has('color_options')) {
                $user->colorOptions()->sync($request->color_options);
            }

            // Assign to niveau if provided
            if ($request->has('niveau_id')) {
                $user->niveau_id = $request->niveau_id;
                $user->save();
            }
        }

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified user.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function show(string $id)
    {
        $user = Utilisateur::findOrFail($id);

        // Load type-specific relations
        if ($user instanceof Etudiant) {
            $user->load([
                'cours',
                'classes',
                'devoirs',
                'niveau',
                'eyeOptions',
                'hatOptions',
                'mouthOptions',
                'colorOptions'
            ]);
        } elseif ($user instanceof Prof) {
            $user->load(['classes']);
        }

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    /**
     * Update the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {
        $user = Utilisateur::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nom_d_utilisateur' => 'sometimes|string|max:255',
            'email' => 'sometimes|string|email|max:255|unique:utilisateurs,email,' . $id . ',utilisateur_id',
            'mot_passe' => 'sometimes|string|min:8|confirmed',
            'profile_picture' => 'sometimes|image|max:2048',
            'points_totales' => 'sometimes|integer|min:0',
            'coins' => 'sometimes|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Update base fields if provided
        if ($request->filled('nom_d_utilisateur')) {
            $user->nom_d_utilisateur = $request->nom_d_utilisateur;
        }

        if ($request->filled('email')) {
            $user->email = $request->email;
            $user->email_verified_at = null; // Require email verification again
        }

        if ($request->filled('mot_passe')) {
            $user->mot_passe = Hash::make($request->mot_passe);
        }

        if ($request->filled('points_totales')) {
            $user->points_totales = $request->points_totales;
        }

        if ($request->filled('coins')) {
            $user->coins = $request->coins;
        }

        // Handle profile picture upload if provided
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageKit = new ImageKit(
                env('IMAGEKIT_PUBLIC_KEY'),
                env('IMAGEKIT_PRIVATE_KEY'),
                env('IMAGEKIT_URL_ENDPOINT')
            );

            $uploadFile = $imageKit->upload([
                'file' => base64_encode(file_get_contents($image->getRealPath())),
                'fileName' => uniqid('profile_') . '.' . $image->getClientOriginalExtension(),
                'folder' => '/user-profiles'
            ]);

            $user->profile_picture_URL = $uploadFile->success ? $uploadFile->result->url : $user->profile_picture_URL;
        }

        // Update type-specific fields
        if ($user instanceof Etudiant) {
            if ($request->filled('description')) {
                $user->description = $request->description;
            }

            if ($request->filled('grade')) {
                $user->grade = $request->grade;
            }

            if ($request->has('niveau_id')) {
                $user->niveau_id = $request->niveau_id;
            }

            // Handle avatar customization options if provided
            if ($request->has('eye_options')) {
                $user->eyeOptions()->sync($request->eye_options);
            }
            if ($request->has('hat_options')) {
                $user->hatOptions()->sync($request->hat_options);
            }
            if ($request->has('mouth_options')) {
                $user->mouthOptions()->sync($request->mouth_options);
            }
            if ($request->has('color_options')) {
                $user->colorOptions()->sync($request->color_options);
            }
        } elseif ($user instanceof Prof) {
            if ($request->filled('description')) {
                $user->description = $request->description;
            }

            if ($request->filled('note_moyenne')) {
                $user->note_moyenne = $request->note_moyenne;
            }
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Remove the specified user.
     *
     * @param  string  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id)
    {
        $user = Utilisateur::findOrFail($id);
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully'
        ]);
    }

    /**
     * Filter users by course.
     *
     * @param  \App\Models\Cours  $course
     * @return \Illuminate\Http\Response
     */
    public function filterByCourse(Cours $course)
    {
        // Get all students enrolled in this course
        $etudiants = $course->etudiants()->with([
            'niveau',
            'eyeOptions',
            'hatOptions',
            'mouthOptions',
            'colorOptions'
        ])->get();

        return response()->json([
            'status' => 'success',
            'data' => $etudiants
        ]);
    }

    /**
     * Filter users by class.
     *
     * @param  \App\Models\Classe  $class
     * @return \Illuminate\Http\Response
     */
    public function filterByClass(Classe $class)
    {
        // Get all students in this class
        $etudiants = $class->etudiants()->with([
            'niveau',
            'eyeOptions',

            'hatOptions',
            'mouthOptions',
            'colorOptions'
        ])->get();

        // Get the teacher of this class
        $prof = $class->prof;

        return response()->json([
            'status' => 'success',
            'data' => [
                'etudiants' => $etudiants,
                'prof' => $prof
            ]
        ]);
    }

    /**
     * Filter users by quiz participation.
     *
     * @param  \App\Models\Quiz  $quiz
     * @return \Illuminate\Http\Response
     */
    public function filterByQuiz(Quiz $quiz)
    {

        $etudiants = $quiz->etudiants()->with([
            'niveau',
            'eyeOptions',
            'hatOptions',
            'mouthOptions',
            'colorOptions'
        ])->get();

        return response()->json([
            'status' => 'success',
            'data' => $etudiants
        ]);
    }
}
