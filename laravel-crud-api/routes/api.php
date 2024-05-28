<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix'=>'v1'],function(){
    // Route::apiResource('products',ProductController::class);
    Route::apiResource('products', ProductController::class)->except([
        'create', 'edit'
    ]);
});
