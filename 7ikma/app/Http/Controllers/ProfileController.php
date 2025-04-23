<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use ImageKit\ImageKit;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
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

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $user instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => $userData,
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        $user->fill($request->validated());

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

        if ($user instanceof \App\Models\Etudiant && $request->has('description')) {
            $user->description = $request->description;
            $user->grade = $request->grade;
        } elseif ($user instanceof \App\Models\Prof && $request->has('description')) {
            $user->description = $request->description;
        }

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'mot_passe' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
