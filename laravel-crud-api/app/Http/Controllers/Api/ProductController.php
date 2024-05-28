<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Service\ProductService;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productService;
    public function __construct() {
        $this->productService = new ProductService();
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $products=$this->productService->fetchService($request->all());
            return ProductResource::collection($products);
            // return new ProductCollection($products);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        try {
            $product = $this->productService->addService($request->validated());
            // Return the created product as a JSON response
            return (new ProductResource($product))->additional(['message' => 'Product added successfully!']);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        try {
            return new ProductResource($product);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        try {
            $updatedProduct = $this->productService->updateService($request->except('_method'), $product);
            return (new ProductResource($updatedProduct))->additional(['message' => 'Product updated successfully!']);
        } catch (\Exception $e) {
            // Return an error response
            return response()->json([
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $this->productService->deleteService($product);
            $message='Product deleted successfully!';
        } catch (\Exception $e) {
            // Return an error response
            $message='Something went wrong. Please try again later.';
        }
        return response()->json([
            'message' => $message
        ]);
    }
}
