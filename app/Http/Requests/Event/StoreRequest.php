<?php

namespace App\Http\Requests\Event;

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
            "name_event" => "required|string|max:255",
            "location_event" => "required|string|max:255",
            "type_event" => "required|string|max:255",
            "price" => "required|numeric",
            "date_start" => "required|date",
            "date_end" => "required|date",
            "description" => "required|string",
        ];
    }
}
