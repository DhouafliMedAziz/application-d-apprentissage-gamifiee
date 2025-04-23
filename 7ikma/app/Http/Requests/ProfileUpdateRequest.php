<?php

namespace App\Http\Requests;

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
            'nom_d_utilisateur' => ['string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(Utilisateur::class)->ignore($this->user()->utilisateur_id, 'utilisateur_id')],
            'profile_picture' => ['nullable', 'image', 'max:1024'],
        ];

        // Add role-specific validation rules
        if ($this->user() instanceof \App\Models\Etudiant) {
            $rules['description'] = ['nullable', 'string', 'max:500'];
            $rules['grade'] = ['nullable', 'string', 'max:50'];
            $rules['eye_options'] = ['nullable', 'array'];
            $rules['hat_options'] = ['nullable', 'array'];
            $rules['mouth_options'] = ['nullable', 'array'];
            $rules['color_options'] = ['nullable', 'array'];
        } elseif ($this->user() instanceof \App\Models\Prof) {
            $rules['description'] = ['nullable', 'string', 'max:500'];
        }

        return $rules;
    }
}
