<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\Uid\Ulid;

class TanyaController extends Controller
{
    protected $midtrans;
    public function __construct()
    {
        $this->midtrans = app()->make(\App\Services\Midtrans::class);
        $this->midtrans->_configureMidtrans();
    }
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

    public function newQuestionWithSupport(Request $request, Page $page)
    {
        $request->validate([
            'question' => 'required|string|max:180',
            'is_anonymous' => 'required|boolean',
            'amount' => 'required|numeric|min:5000|max:10000000'
        ], [
            'question.required' => 'Please enter your question.',
            'question.max' => 'Question may not be greater than 180 characters.',
            'amount.required' => 'Please enter an amount.',
            'amount.min' => 'Amount must be at least 5000.',
            'amount.max' => 'Amount must not exceed 10,000,000.',
        ]);

        if ($page->is_accepting_questions === false) {
            return response()->json(['message' => 'This page is not accepting questions at the moment.'], 400);
        }

        if ($page->allow_anon_questions === false && $request->is_anonymous === true) {
            return response()->json(['message' => 'This page does not allow anonymous questions.'], 400);
        }

        $user = User::find($page->user_id);

        $midtrans_id = Ulid::generate();
        $payload = [
            'transaction_details' => [
                'order_id' => $midtrans_id,
                'gross_amount' => $request->amount,
            ],
            [
                'customer_details' => [
                    'first_name' => $user->name,
                    'email' => $user->email,
                ],
            ],
            'item_details' => [
                [
                    'id' => $page->id,
                    'price' => $request->amount,
                    'quantity' => 1,
                    'name' => 'Support to ' . $page->username,
                ],
            ],
        ];

        $snap_token = \Midtrans\Snap::getSnapToken($payload);

        DB::beginTransaction();
        try {
            $question = $page->questions()->create([
                'question' => $request->question,
                'is_anonymous' => $request->is_anonymous,
                'sender_id' => auth()->id(),
            ]);

            $payment = $question->payment()->create([
                'amount' => $request->amount,
                'order_id' => $midtrans_id,
            ]);

            DB::commit();
            return response()->json(['data' => ['snap_token' => $snap_token]]);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['data' => $e->getMessage()]);
            return response()->json(['message' => 'An error occurred while submitting your question.'], 500);
        }
    }
}
