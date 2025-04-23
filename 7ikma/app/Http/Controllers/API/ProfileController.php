<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use ImageKit\ImageKit;

class ProfileController extends Controller
{
    /**
     * Display the user's profile.
     */
    public function show(Request $request)
    {
        $user = $request->user();
        $userData = $user;

        if ($user instanceof \App\Models\Etudiant) {
            $userData = $user->load([
                'cours',
                'classes',
                'devoirs',
                'niveau',
                'eyeOptions',
                'hatOptions',
                'mouthOptions',
                'colorOptions'
            ]);
        } elseif ($user instanceof \App\Models\Prof) {
            $userData = $user->load(['classes']);
        }

        return response()->json([
            'status' => 'success',
            'data' => $userData
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $user = $request->user();

        $user->fill($request->safe()->only([
            'nom_d_utilisateur', 'email', 'points_totales', 'coins'
        ]));

        if ($request->filled('mot_passe')) {
            $user->mot_passe = Hash::make($request->mot_passe);
        }

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

        if ($user instanceof \App\Models\Etudiant) {
            $user->description = $request->description ?? $user->description;
            $user->grade = $request->grade ?? $user->grade;
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

        } elseif ($user instanceof \App\Models\Prof) {
            $user->description = $request->description ?? $user->description;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully',
            'data' => $user
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'mot_passe' => 'required',
        ]);

        $user = $request->user();

        if (!Hash::check($request->mot_passe, $user->mot_passe)) {
            return response()->json([
                'status' => 'error',
                'message' => 'Password is incorrect'
            ], 403);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Account deleted successfully'
        ]);
    }
}
