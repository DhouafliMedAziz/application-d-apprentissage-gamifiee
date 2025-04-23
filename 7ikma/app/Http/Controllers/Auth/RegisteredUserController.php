<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Utilisateur;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $validatedData = $request->validate([
            'nom_d_utilisateur' => 'required|string|max:255|unique:utilisateurs',
            'email' => 'required|string|lowercase|email|max:255|unique:utilisateurs',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);


         Utilisateur::create([
                'nom_d_utilisateur' => $validatedData['nom_d_utilisateur'],
                'email' => $validatedData['email'],
                'mot_passe' => Hash::make($validatedData['password']),
                'points_totales' => 0,
                'coins' => 100,

            ]);
        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
