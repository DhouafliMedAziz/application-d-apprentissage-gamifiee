<?php

use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    ClassesController,
    DevoirController,
    ChapitresController
};
Route::prefix('v1')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);
        Route::delete('/profile', [ProfileController::class, 'destroy']);

        Route::middleware('role:etudiant')->group(function () {
        Route::post('/classes/{id}/inscrire',    [ClassesController::class, 'inscrire']);
        Route::post('/classes/{id}/desinscrire', [ClassesController::class, 'desinscrire']);
        });
        Route::middleware('role:prof')->group(function () {
            Route::post('/classes',                  [ClassesController::class, 'store']);
        });


        Route::get('/classes',                   [ClassesController::class, 'index']);
        Route::get('/classes/{id}',              [ClassesController::class, 'show']);
        Route::put('/classes/{id}',              [ClassesController::class, 'update']);
        Route::delete('/classes/{id}',           [ClassesController::class, 'destroy']);

        Route::get('/classes/{id}/etudiants',    [ClassesController::class, 'etudiants']);
        Route::get('/devoirs',                   [DevoirController::class, 'index']);
        Route::post('/devoirs',                  [DevoirController::class, 'store']);
        Route::get('/devoirs/{id}',              [DevoirController::class, 'show']);
        Route::put('/devoirs/{id}',              [DevoirController::class, 'update']);
        Route::delete('/devoirs/{id}',           [DevoirController::class, 'destroy']);
        Route::post('/devoirs/{id}/passe',       [DevoirController::class, 'passe']);
        Route::post('/devoirs/{id}/garde',       [DevoirController::class, 'garde']);
        Route::get('/chapiters',                           [ChapitresController::class, 'index']);
        Route::post('/chapiters',                          [ChapitresController::class, 'store']);
        Route::get('/chapiters/{id}',                      [ChapitresController::class, 'show']);
        Route::put('/chapiters/{id}',                      [ChapitresController::class, 'update']);
        Route::delete('/chapiters/{id}',                   [ChapitresController::class, 'destroy']);
        Route::get('/cours/{cours_id}/chapiters',          [ChapitresController::class, 'index']);
        Route::post('/cours/{cours_id}/chapiters',         [ChapitresController::class, 'store']);


    });
});
