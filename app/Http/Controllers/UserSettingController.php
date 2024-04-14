<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Settings/Index');
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:8',
            'confirm_password' => 'required|same:new_password'
        ], [
            'current_password.required' => 'Please enter your current password',
            'new_password.required' => 'Please enter your new password',
            'new_password.min' => 'Password must be at least 8 characters',
            'confirm_password.required' => 'Please confirm your password',
            'confirm_password.same' => 'Passwords do not match'

        ]);

        $user = User::find(auth()->id());

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Current password is incorrect'], 422);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();
        return response()->json(['message' => 'Password changed successfully']);
    }
}
