<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'slug' => ['required', 'max:255', 'min:3', Rule::unique('products')->ignore($this->product)],
            'name' => ['required', 'max:255'],
            'image' => $this->isMethod('POST') ? ['required', 'mimes:png,jpg,jpeg,webp'] :
                ['nullable', 'sometimes', 'mimes:png,jpg,jpeg,webp'],
            /*'images' => $this->isMethod('POST')? ['required', 'array']
                : ['nullable', 'sometimes', 'array'],
            'images.*' => ['mimes:png,jpg,jpeg,webp'], */
            'price'=>['required'],
            'cross_price'=>['required'],
            'description'=>['required'],
            'color'=>['required']
        ];
    }
}
