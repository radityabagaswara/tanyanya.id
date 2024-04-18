<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TanyaController extends Controller
{
    public function index(String $username)
    {
        $page = Page::where('username', $username)->with(['user' => function ($user) {
            $user->select('id', 'name', 'profile_photo_path');
        }])->firstOrFail();

        DB::beginTransaction();
        try {
            $page->update([
                'total_page_visit' => $page->total_page_visit + 1,
            ]);
            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
        }

        return Inertia::render('Tanya', [
            'page' => $page,
        ]);
    }

    public function newQuestion(Page $page, Request $request)
    {

        if (!auth()->user()) {
            return redirect()->route('login');
        }

        $request->validate([
            'question' => 'required|string|max:180',
            'is_anonymous' => 'required|boolean',
        ], [
            'question.required' => 'Please enter your question.',
            'question.max' => 'Question may not be greater than 180 characters.',
        ]);

        if ($page->is_accepting_questions === false) {
            return back()->with('error', ['title' => 'Failed to submit question', 'message' => 'This page is not accepting questions at the moment.']);
        }

        if ($page->allow_anon_questions === false && $request->is_anonymous === true) {
            return back()->with('error', ['title' => 'Failed to submit question', 'message' => 'This page does not allow anonymous questions.']);
        }

        DB::beginTransaction();

        try {
            $page->questions()->create([
                'question' => $request->question,
                'is_anonymous' => $request->is_anonymous,
                'sender_id' => auth()->id(),
            ]);

            DB::commit();

            return back()->with('success', ['title' => 'Question submitted!', 'message' => 'Your question has been submitted.']);
        } catch (Exception $e) {
            dd($e->getMessage());
            DB::rollBack();
            return back()->with('error', ['title' => 'Failed to submit question', 'message' => 'An error occurred while submitting your question.']);
        }
    }

    public function overlay(String $key)
    {
        $page = Page::where('overlay_key', $key)->select([
            'id',
            'username',
            'header_color',
            'header_text_color',
            'border_color',
            'body_color',
            'body_text_color',
        ])->firstOrFail();

        $colors = [
            'header_color' => $page->header_color,
            'header_text_color' => $page->header_text_color,
            'border_color' => $page->border_color,
            'body_color' => $page->body_color,
            'body_text_color' => $page->body_text_color,

        ];

        return Inertia::render('Overlay', [
            'page' => $page,
            'stream_key' => $key,
            'colors' => $colors,
        ]);
    }
}
