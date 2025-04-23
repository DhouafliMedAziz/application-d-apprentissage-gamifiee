<?php

namespace App\Http\Requests\API;

use App\Models\Utilisateur;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'nom_d_utilisateur' => ['sometimes', 'string', 'max:255'],
            'email' => ['sometimes', 'email', 'max:255', Rule::unique(Utilisateur::class)->ignore($this->user()->utilisateur_id, 'utilisateur_id')],
            'mot_passe' => ['sometimes', 'string', 'min:8', 'confirmed'],
            'profile_picture' => ['sometimes', 'image', 'max:1024'],
            'points_totales' => ['sometimes', 'integer', 'min:0'],
            'coins' => ['sometimes', 'integer', 'min:0'],
        ];

        if ($this->user() instanceof \App\Models\Etudiant) {
            $rules['description'] = ['sometimes', 'string', 'max:500'];
            $rules['grade'] = ['sometimes', 'string', 'max:50'];
            $rules['eye_options'] = ['sometimes', 'array'];
            $rules['hat_options'] = ['sometimes', 'array'];
            $rules['mouth_options'] = ['sometimes', 'array'];
            $rules['color_options'] = ['sometimes', 'array'];
            $rules['niveau_id'] = ['sometimes', 'exists:niveaux,id'];
        } elseif ($this->user() instanceof \App\Models\Prof) {
            $rules['description'] = ['sometimes', 'string', 'max:500'];
        }

        return $rules;
    }
}
