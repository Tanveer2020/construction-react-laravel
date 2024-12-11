<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // This method will return all testimonials

    public function index() {

    }

     // This method will return single testimonial

     public function show() {
        
     }

      // This method will store a testimonial

    public function store(Request $request) {

        $validator = Validator::make($request->all(),[
               'testimonial' => 'required',
               'citation'    => 'required', 
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);

        }
        
    }
}
