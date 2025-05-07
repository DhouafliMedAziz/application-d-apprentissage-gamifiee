<?php

namespace App\Http\Controllers;

use App\Models\Matiere;
use App\Models\Cours;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    public function index()
    {
        return Matiere::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $matiere = Matiere::create($validated);

        return response()->json($matiere, 201);
    }

    public function update(Request $request, Matiere $matiere)
    {
        $validated = $request->validate([
            'nom' => 'sometimes|string|max:255',
            'description' => 'sometimes|nullable|string',
        ]);

        $matiere->update($validated);

        return response()->json($matiere);
    }

    public function destroy(Matiere $matiere)
    {
        $matiere->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }

    public function countSubject(){
        return  response()->json(['subjects'=>Matiere::count()]);
    }



}
