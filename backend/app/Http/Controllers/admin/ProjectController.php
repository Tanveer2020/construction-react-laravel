<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ProjectController extends Controller
{
    // This method will return all projects
    public function index() {

        $projects = Project::orderBy('created_at','DESC')->get();

        return response()->json([
            'status' => true,
            'data'   => $projects
        ]);

    }

        // This method will insert a project in db
        public function store(Request $request) {

            
            // Str::slug('Dummy title') = 'dummy-title

            $request->merge(['slug' => Str::slug($request->slug)]);
        
            $validator = Validator::make($request->all(),[
                'title' => 'required',
                'slug'  => 'required|unique:projects,slug'
            ]);

            if($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
            $project = new Project();
            $project->title = $request->title;
            $project->slug = Str::slug($request->slug);
            $project->short_desc = $request->short_desc;
            $project->content = $request->content;
            $project->construction_type = $request->construction_type;
            $project->sector = $request->sector;
            $project->status = $request->status;
            $project->location = $request->location;
            $project->save();

              // Save Temp Image here
          if($request->imageId > 0) {
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {

                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$project->id.'.'.$ext;

                    // Create small thumbnail here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image   = $manager->read($sourcePath);
                $image->coverDown(500,600);
                $image->save($destPath);

                // Create large thumbnail here
                $destPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image   = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();

                // if($oldImage != '') {
                //     File::delete(public_path('uploads/services/large/'.$oldImage));
                //     File::delete(public_path('uploads/services/small/'.$oldImage));
    
                // }

            
            }
        }

            
            return response()->json([
                'status' => true,
                'message' => 'Project added successfully.'
            ]);
            

        }

        public function update($id, Request $request) {


            $project = Project::find($id);        

            if($project == null) {

                return response()->json([
                    'status' => false,
                    'message' => 'project not found'
                ]);

            }
              
            // Str::slug('Dummy title') = 'dummy-title

            $request->merge(['slug' => Str::slug($request->slug)]);
        
            $validator = Validator::make($request->all(),[
                'title' => 'required',
                'slug'  => 'required|unique:projects,slug,'.$id.',id'
            ]);

            if($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'errors' => $validator->errors()
                ]);
            }
            $project->title = $request->title;
            $project->slug = Str::slug($request->slug);
            $project->short_desc = $request->short_desc;
            $project->content = $request->content;
            $project->construction_type = $request->construction_type;
            $project->sector = $request->sector;
            $project->status = $request->status;
            $project->location = $request->location;
            $project->save();

              // Save Temp Image here
          if($request->imageId > 0) {
            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage != null) {

                $extArray = explode('.', $tempImage->name);
                $ext = last($extArray);

                $fileName = strtotime('now').$project->id.'.'.$ext;

                    // Create small thumbnail here
                $sourcePath = public_path('uploads/temp/'.$tempImage->name);
                $destPath = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image   = $manager->read($sourcePath);
                $image->coverDown(500,600);
                $image->save($destPath);

                // Create large thumbnail here
                $destPath = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $image   = $manager->read($sourcePath);
                $image->scaleDown(1200);
                $image->save($destPath);

                $project->image = $fileName;
                $project->save();

                
            }

                if($oldImage != '') {
                    File::delete(public_path('uploads/projects/large/'.$oldImage));
                    File::delete(public_path('uploads/projects/small/'.$oldImage));
    

            
            }
        }

            
            return response()->json([
                'status' => true,
                'message' => 'Project updated successfully.'
            ]);

        }

        public function show($id) {

            $project = Project::find($id);

            if($project == null) {

                return response()->json([
                    'status' => false,
                    'message'   => 'project not found'
                ]);

            }

            return response()->json([
                'status' => true,
                'data'   => $project
            ]);
        }


        public function destroy($id) {

            $project = Project::find($id);

            if($project == null) {

                return response()->json([
                    'status' => false,
                    'message'   => 'project not found'
                ]);

            }

            
            
            File::delete(public_path('uploads/projects/large/'.$project->image));
            File::delete(public_path('uploads/projects/small/'.$project->image));


            $project->delete();

            return response()->json([
                'status' => true,
                'message'   => 'Project deleted successfully.'
            ]);
        }
}