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
            $user->select('id', 'name');
        }])->firstOrFail();
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
}
