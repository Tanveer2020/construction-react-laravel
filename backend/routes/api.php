<?php
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\admin\ProjectController;
use App\Http\Controllers\admin\ServiceController;
use App\Http\Controllers\admin\ArticleController;
use App\Http\Controllers\admin\TempImageController;
use App\Http\Controllers\front\ServiceController as FrontServiceController;
use App\Http\Controllers\front\ProjectController as FrontProjectController;
use App\Http\Controllers\front\ArticleController as FrontArticleController;




use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('authenticate',[AuthenticationController::class,'authenticate']);
Route::get('get-services',[FrontServiceController::class,'index']);
Route::get('get-latest-services',[FrontServiceController::class,'latestServices']);

Route::get('get-projects',[FrontProjectController::class,'index']);
Route::get('get-latest-projects',[FrontProjectController::class,'latestProjects']);


Route::get('get-articles',[FrontArticleController::class,'index']);
Route::get('get-latest-articles',[FrontArticleController::class,'latestArticles']);





// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['middleware' => ['auth:sanctum']],function(){
    // Protected Routes
    Route::get('dashboard',[DashboardController::class,'index']);
    Route::get('logout',[AuthenticationController::class,'logout']);

    // Service Routes
    Route::post('services',[ServiceController::class,'store']);
    Route::get('services',[ServiceController::class,'index']);
    Route::put('services/{id}',[ServiceController::class,'update']);
    Route::get('services/{id}',[ServiceController::class,'show']);
    Route::delete('services/{id}',[ServiceController::class,'destroy']);


    // Project Routes

    Route::post('projects',[ProjectController::class,'store']);
    Route::get('projects',[ProjectController::class,'index']);
    Route::put('projects/{id}',[ProjectController::class,'update']);
    Route::get('projects/{id}',[ProjectController::class,'show']);
    Route::delete('projects/{id}',[ProjectController::class,'destroy']);


    // Article Routes

    Route::post('articles',[ArticleController::class,'store']);
    Route::get('articles',[ArticleController::class,'index']);
    Route::get('articles/{id}',[ArticleController::class,'show']);
    Route::put('articles/{id}',[ArticleController::class,'update']);
    Route::delete('articles/{id}',[ArticleController::class,'destroy']);






    // Temp Image Routes
    Route::post('temp-images', [TempImageController::class,'store']);



});
