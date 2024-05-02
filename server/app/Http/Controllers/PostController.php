<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        return $user->posts;
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);


        $user = auth()->user();
        $post = $user->posts()->create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json(['message' => 'Post created successfully', 'post' => $post], 201);
    }

    public function show(Post $post)
    {
        if ($post->user_id === auth()->id()) {
            return $post;
        } else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }

    public function update(Request $request, Post $post)
    {
        if ($post->user_id === auth()->id()) {
            $post->update($request->all());
            return response()->json(['message' => 'Post updated successfully', 'post' => $post]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }

    public function destroy(Post $post)
    {
        if ($post->user_id === auth()->id()) {
            $post->delete();
            return response()->json(null, 204);
        } else {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    }
}
