<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CsrfController extends Controller
{
    public function getToken(Request $request)
    {
        // Retrieve the CSRF token from Laravel's CSRF protection middleware
        $csrfToken = $request->session()->token();

        // Return the token as JSON response
        return response()->json(['csrfToken' => $csrfToken]);
    }
}
