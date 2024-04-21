<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $page = Page::where('user_id', auth()->id())->with(['user', 'social'])->first();

        return Inertia::render('Dashboard/Page/Index', [
            'page' => $page,
        ]);
    }

    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'file' => ['required', 'image:jpeg,png,jpg', 'max:2048'],
        ], [
            'file.required' => 'Please select an image to upload.',
            'file.image' => 'The file must be an image.',
            'file.max' => 'The file may not be greater than 2MB.',
        ]);

        DB::beginTransaction();

        try {
            $user = User::find(auth()->id());

            if ($user->profile_photo_path) {
                Storage::delete($user->profile_photo_path);
            }
            $name = time() . '.' . $request->file('file')->extension();
            $path = $request->file('file')->storeAs('profile', $name);
            $user->profile_photo_path = $path;
            $user->save();

            DB::commit();
            return back()->with('success', ['title' => "Successfully updated!", 'meesage' => 'Profile Picture has been updated.']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', ['title' => "Failed to change profile picture", 'meesage' => 'An error occurred while updating your profile picture.']);
        }
    }

    public function updatePageBanner(Request $request)
    {
        $request->validate([
            'file' => ['required', 'image:jpeg,png,jpg', 'max:2048'],
        ], [
            'file.required' => 'Please select an image to upload.',
            'file.image' => 'The file must be an image.',
            'file.max' => 'The file may not be greater than 2MB.',
        ]);

        DB::beginTransaction();

        try {
            $page = Page::where('user_id', auth()->id())->first();

            if ($page->header_image_path) {
                Storage::delete($page->header_image_path);
            }
            $name = time() . '.' . $request->file('file')->extension();
            $path = $request->file('file')->storeAs('banners', $name);
            $page->header_image_path = $path;
            $page->save();

            DB::commit();
            return back()->with('success', ['title' => "Successfully updated!", 'meesage' => 'Page banner has been updated.']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', ['title' => "Failed to change Page banner", 'meesage' => 'An error occurred while updating your Page banner.']);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $page = Page::where('user_id', auth()->id())->first();
        $user = User::find(auth()->id());

        $request->validate([
            'username' => 'required|string|max:255|unique:pages,username,' . $page->id,
            'bio' => 'nullable|max:255',
            'name' => 'required|string|max:255',
            'category' => 'nullable|string'
        ]);

        DB::beginTransaction();
        try {
            $page->username = $request->username;
            $page->bio = $request->bio;
            $page->category = $request->category;
            $page->save();
            $user->name = $request->name;
            $user->save();

            DB::commit();
            return back()->with('success', ['title' => "Successfully updated!", 'meesage' => 'Profile has been updated.']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', ['title' => "Failed to update", 'meesage' => 'An error occurred while updating your profile.']);
        }
    }

    public function updateSettings(Request $request)
    {

        $request->validate([
            'is_accepting_questions' => 'required|boolean',
            'allow_anon_questions' => 'required|boolean',
            'allow_support_question'=> 'required|boolean'
        ]);
        DB::beginTransaction();
        try {
            $page = Page::where('user_id', auth()->id())->first();

            $page->is_accepting_questions = $request->is_accepting_questions;
            $page->allow_anon_questions = $request->allow_anon_questions;
            $page->allow_support_question = $request->allow_support_question;
            $page->save();
            DB::commit();
            return back()->with('success', ['title' => "Successfully updated!", 'meesage' => 'Settings has been updated.']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', ['title' => "Failed to update", 'meesage' => 'An error occurred while updating your settings.']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
