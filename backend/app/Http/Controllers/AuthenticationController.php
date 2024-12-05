<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use app\Models\User;

class AuthenticationController extends Controller
{
    public function authenticate(Request $request) {

        //apply validation

        $validator = Validator::make($request->all(),[
            'email'    => 'required|email',
            'password' =>  'required',
        ]);

        if($validator->fails()) {
           return response()->json([
               'status' => false,
               'errors' => $validator->errors()
            ]);
        } else{
            $credentails = [
                'email' => $request->email,
                'password' => $request->password
            ];
             if(Auth::attempt($credentails)) {
                
                $user = User::find(Auth::user()->id);
                $token = $user->createToken('token')->plainTextToken;    
              
                return response()->json([
                    'status' => true,
                    'token'  => $token,
                    'id'     => Auth::user()->id
                 ]);

             } else {
                return response()->json([
                    'status' => false,
                    'message' => "Either email/password is incorrect."
                 ]);

             }
        }
        
    }

    public function logout(){
       
        $user = User::find(Auth::user()->id); 
        $user->tokens()->delete();
       
        return response()->json([
            'status' => true,
            'message' => "Logout successfully."
         ]);
    }
}
