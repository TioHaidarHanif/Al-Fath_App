<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileDetailsUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Only authorize if the user is updating their own profile
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nim' => 'required|string|unique:profiles,nim,' . $this->user()->profile->id,
            'fakultas' => 'required|string',
            'prodi' => 'required|string',
            'angkatan' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'amanah' => 'required|string',
            'jenis_kelamin' => 'required|in:Ikhwan,Akhwat',
            'divisi' => 'required|string',
            'posisi' => 'required|in:Fakultas,Pusat',
            'photo' => 'nullable|image|max:2048',
        ];
    }
}
