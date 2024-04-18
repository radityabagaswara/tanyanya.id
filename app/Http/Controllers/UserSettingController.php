<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserSettingController extends Controller
{
    public function index()
    {
        $user = User::findOrFail(auth()->user()->id)->first();
        return Inertia::render('Dashboard/Settings/Index', [
            'user' => $user
        ]);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'password' => 'required',
            'new_password' => 'required|min:8',
            'new_password_confirmation' => 'required|same:new_password'
        ], [
            'password.required' => 'Please enter your current password',
            'new_password.required' => 'Please enter your new password',
            'new_password.min' => 'Password must be at least 8 characters',
            'new_password_confirmation.required' => 'Please confirm your password',
            'new_password_confirmation.same' => 'Passwords do not match'
        ]);

        $user = User::findOrFail(auth()->user()->id);

        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['title' => "Error while changing password!", 'message' => "Your old password is incorrect."]);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();
        return back()->with('success', ['title' => "Success!", 'message' => "Your password has been change successfully!"]);
    }

    public function changeEmail(Request $request)
    {
        $user = User::findOrFail(auth()->user()->id);

        $request->validate([
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,

        ], [
            'email.required' => "New email is required!",
            'email.email' => "Email is not a valid email",
            'email.unique' => "Email already used by other user. Please input another email!",
        ]);

        DB::beginTransaction();
        try {
            $user->update([
                'email' => $request->email,
            ]);

            DB::commit();

            return back()->with('success', ['title' => 'Success', 'message' => 'Your email has been upptaed!']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['title' => 'Error!', 'message' => 'There was an error while trying to change email. Please try again later!']);
        }
    }
    public function notificationSetting(Request $request)
    {
        $user = User::findOrFail(auth()->user()->id);

        $request->validate([
            'new_question_notification' => ['required', 'boolean'],
        ], [
            'new_question_notification.required' => "Notification required!",
        ]);

        DB::beginTransaction();
        try {
            $user->update([
                'new_question_notification' => $request->new_question_notification
            ]);

            DB::commit();

            return back()->with('success', ['title' => 'Success', 'message' => 'Notification setting has been updated!']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->withErrors(['title' => 'Error!', 'message' => 'There was an error while trying to change notification setting. Please try again later!']);
        }
    }
}
