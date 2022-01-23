<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'judul' => [
                'required',
                'unique:article,judul,' . $this->id . ',id',
                'max:255'
            ],
            'tanggal_terbit' => [
                'required',
                'date'
            ],
            'body' => [
                'required'
            ],
            'author_id' => [
                'required',
                'exists:author,id'
            ],
        ];

        return $rules;
    }

    public function messages()
	{
        return [];
    }
}
