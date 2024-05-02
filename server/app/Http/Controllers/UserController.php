<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index(){
        return User::all();
    }
    public function store(Request $request){
        return User::create($request->all());
    }
    public function show(User $user){
        return $user;
    }
    public function update(Request $request, User $user){
     Log::info('Received request to update user with ID: ' . $user->id);
     Log::info('Request payload: ' . json_encode($request->all()));

     // Update the user
     $user->update($request->all());
     
     
    return response()->json(['message' => 'User updated successfully', 'user' => $user],200);
     
}
    public function destroy(User $user){
        $user->delete();
        return response()->json(null,204);
    }
}
