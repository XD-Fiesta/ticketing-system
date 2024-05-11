<?php

namespace App\Http\Requests\Referal;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "nim" => "required|string|max:255",
            "phone" => "required|string|max:15",
            "code_referal" => "required",
            "status" => "required|string",
        ];
    }
}
