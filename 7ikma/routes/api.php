<?php

use App\Http\Controllers\API\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    ClassesController,
    DevoirController,
    ChapitresController,
    QuizController,
    ChoixController,
    LessonsController,
    InscriptionController,
    NotationController,
    BattleController,
    MatiereController,
    CoursController
};
Route::prefix('v1')->group(function () {
    Route::middleware('auth:api')->group(function () {
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::put('/profile', [ProfileController::class, 'update']);
        Route::delete('/profile', [ProfileController::class, 'destroy']);

        Route::middleware('role:etudiant')->group(function () {
        Route::post('/classes/{id}/inscrire',    [ClassesController::class, 'inscrire']);
        Route::post('/classes/{id}/desinscrire', [ClassesController::class, 'desinscrire']);
        Route::post('/devoirs/{id}/passe',       [DevoirController::class, 'passe']);
        Route::post('/lessons/{id}/pass',              [LessonsController::class, 'pass']);
        Route::post('/quiz/{quiz}/devoir/{devoir}/answer',['DevoirController@answer']);
        Route::post('cours/{cours}/inscrire', [InscriptionController::class, 'inscrire']);
        Route::post('cours/{cours}/noter', [NotationController::class, 'noter']);
        Route::post('battles/{devoir}/create', [BattleController::class, 'create']);
        Route::post('battles/{battle}/join',           [BattleController::class, 'join']);
        Route::post('battles/{battle}/quiz/{quiz}/answer', [BattleController::class, 'answer']);
        Route::get('battles/{battle}/result',          [BattleController::class, 'result']);

    });

        Route::middleware('role:prof')->group(function () {
            Route::post('/classes',                  [ClassesController::class, 'store']);
            Route::post('/devoirs/{id}/garde',       [DevoirController::class, 'garde']);
            Route::get('/devoirs/{devoir_id}/quizzes',         [QuizController::class, 'index']);
            Route::post('/devoirs/{devoir_id}/quizzes',        [QuizController::class, 'store']);
            Route::get('/choix',                               [ChoixController::class, 'index']);
            Route::post('/choix',                              [ChoixController::class, 'store']);
            Route::get('/choix/{id}',                          [ChoixController::class, 'show']);
            Route::put('/choix/{id}',                          [ChoixController::class, 'update']);
            Route::delete('/choix/{id}',                       [ChoixController::class, 'destroy']);
            Route::get('/quizzes/{quiz_id}/choix',             [ChoixController::class, 'index']);
            Route::post('/quizzes/{quiz_id}/choix',            [ChoixController::class, 'store']);
            Route::delete('/classes/{id}',           [ClassesController::class, 'destroy']);
            Route::post('/lessons',                        [LessonsController::class, 'store']);
            Route::put('/lessons/{id}',                    [LessonsController::class, 'update']);
            Route::delete('/lessons/{id}',                 [LessonsController::class, 'destroy']);
            Route::post('/chapiters/{chapiter_id}/lessons',[LessonsController::class, 'store']);
            Route::post('/chapiters',                          [ChapitresController::class, 'store']);
            Route::put('/chapiters/{id}',                      [ChapitresController::class, 'update']);
            Route::delete('/chapiters/{id}',                   [ChapitresController::class, 'destroy']);
            Route::post('/cours/{cours_id}/chapiters',         [ChapitresController::class, 'store']);
            Route::post('/cours',           [CoursController::class, 'store']);
            Route::put('cours/{id}',       [CoursController::class, 'update']);
            Route::patch('cours/{id}',     [CoursController::class, 'update']);
            Route::delete('cours/{id}',    [CoursController::class, 'destroy']);
            Route::post('matieres',         [MatiereController::class, 'store']);
            Route::put('matieres/{matiere}',[MatiereController::class, 'update']);
            Route::delete('matieres/{matiere}',[MatiereController::class, 'destroy']);
            Route::post('cours/{cours}/matieres', [CoursController::class, 'attch']);
            Route::delete('cours/{cours}/matieres', [CoursController::class, 'detach']);
        });
        Route::get('/classes',                   [ClassesController::class, 'index']);
        Route::get('/classes/{id}',              [ClassesController::class, 'show']);
        Route::put('/classes/{id}',              [ClassesController::class, 'update']);
        Route::get('/classes/{id}/etudiants',    [ClassesController::class, 'etudiants']);
        Route::get('/devoirs',                   [DevoirController::class, 'index']);
        Route::post('/devoirs',                  [DevoirController::class, 'store']);
        Route::get('/devoirs/{id}',              [DevoirController::class, 'show']);
        Route::put('/devoirs/{id}',              [DevoirController::class, 'update']);
        Route::delete('/devoirs/{id}',           [DevoirController::class, 'destroy']);
        Route::get('/lessons',                         [LessonsController::class, 'index']);
        Route::get('/lessons/{id}',                    [LessonsController::class, 'show']);
        Route::get('cours',            [CoursController::class, 'index']);
        Route::get('cours/{id}',       [CoursController::class, 'show']);




        Route::get('/chapiters/{chapiter_id}/lessons', [LessonsController::class, 'index']);
        Route::get('/chapiters',                           [ChapitresController::class, 'index']);
        Route::get('/chapiters/{id}',                      [ChapitresController::class, 'show']);

        Route::get('/cours/{cours_id}/chapiters',          [ChapitresController::class, 'index']);


    });
    Route::get('matieres',          [MatiereController::class, 'index']);
Route::get('newCours',         [CoursController::class, 'newCourses']);
Route::get('popularCours',     [CoursController::class, 'mostPopularCourses']);
Route::get('recommendedCours', [CoursController::class, 'recommendedCourses']);
Route::get('subjects/count',[MatiereController::class,'countSubject']);
Route::get('coursCount', [CoursController::class,'coursCount']);
});
