<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
            // 'id'=>$this->id,
            'name'=>$this->name,
            'slug'=>$this->slug,
            // 'image' => $this->image,
            'image_url'=>$this->image_url,
            'price'=>$this->price,
            'cross_price'=>$this->cross_price,
            'color'=>$this->color,
            'description'=>$this->description
        ];
    }
}
