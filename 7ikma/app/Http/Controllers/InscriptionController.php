<?php

namespace App\Http\Controllers;

use App\Models\Cours;
use App\Models\Etudiant;
use Illuminate\Http\Request;

class InscriptionController extends Controller
{
    public function inscrire(Request $request, Cours $cours)
    {
        $etudiant = auth()->user();
        $validated = $request->validate([
            'prix' => 'required|integer',
        ]);

        if ($etudiant->coins < $validated['prix']) {
            return response()->json([
                'message' => 'Fonds insuffisants pour s\'inscrire à ce cours.'
            ], 403);
        }

        $etudiant->coins -= $validated['prix'];
        $etudiant->save();

        $etudiant->cours()->attach($cours->cours_id, [
            'date' => now(),
            'taux_de_progression' => 0,
            'prix' => $validated['prix'],
        ]);

        return response()->json([
            'message' => 'Inscription réussie !'
        ]);
    }
}


