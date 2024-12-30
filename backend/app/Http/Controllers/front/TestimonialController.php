<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // THis method will return all testimonial

    public function index() {
        $testimonials = Testimonial::orderBy('created_at','DESC')
                        ->where('status',1)
                        ->get();
             return response()->json([
                'status' => true,
                'data'   => $testimonials
             ]);           


    }
}
