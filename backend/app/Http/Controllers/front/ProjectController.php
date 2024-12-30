<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function latestProjects(Request $request) {

     $projects = Project::orderBy('created_at', 'DESC')
    ->where('status',1)
    ->limit($request->limit)
    ->get();

     return response()->json([
        'status' => true,
        'data'   => $projects
     ]);            


    }

    public function index(){
 
    $projects = Project::orderBy('created_at', 'DESC')
    ->where('status',1)
    ->get();

    return response()->json([
    'status' => true,
    'data'   => $projects
    ]);


    }

    // this method will return single article
     public function project($id) {
        $project = Project::find($id);

            if($project == null) {
                return response()->json([
                    'status' => true,
                    'message'   => 'Project not found'
                ]);

     }

                   return response()->json([
                    'status' => true,
                    'data'   => $project
                ]);  
     }
}
