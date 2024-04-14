<?php

namespace App\Http\Controllers;

use App\Events\OverlayBroadcastEvent;
use App\Models\Question;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {

        return Inertia::render('Dashboard/Dashboard');
    }

    public function streamQuestions(Question $question)
    {
        //check if question is on the user page
        if ($question->page_id != auth()->user()->page->id) {
            return response()->json(['message' => 'Question not found'], 404);
        }

        $overlay_key = $question->page()->first()->overlay_key;

        $question->load(['sender' => function ($query) {
            $query->select('id', 'name');
        }]);

        if ($question->is_anonymous && $question->sender) {
            $question->sender->name = 'Anonymous';
            $question->sender->id = null;
            $question->sender_id = null;
        }

        broadcast(new OverlayBroadcastEvent(overlay_key: $overlay_key, question: $question));

        return (response()->json(['message' => 'success']));
    }

    public function getQuestions(Request $request)
    {
        $page = auth()->user()->page->id;

        // Retrieve questions with eager loading of sender
        $questions = Question::where('page_id', $page)
            ->with(['sender' => function ($query) {
                $query->select('id', 'name');
            }]);
        if ($request->has('sort')) {
            $questions = $questions->orderBy('created_at', $request->sort);
        }

        $questions = $questions->paginate();

        // Modify the sender's name to "Anonymous" for anonymous questions
        foreach ($questions as $question) {
            if ($question->is_anonymous && $question->sender) {
                $question->sender->name = 'Anonymous';
                $question->sender->id = null;
                $question->sender_id = null;
                $question->sender->profile_photo_url = "https://ui-avatars.com/api/?name=?&color=7F9CF5&background=EBF4FF";
            }
        }

        return ['message' => 'success', 'data' => $questions];
    }

    public function deleteQuestion(Question $question)
    {
        if ($question->page_id != auth()->user()->page->id) {
            return response()->json(['message' => 'Question not found'], 404);
        }
        DB::beginTransaction();
        try {
            $question->delete();
            DB::commit();
            return response()->json(['title' => 'Success', 'message' => 'Question has been deleted.']);
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['title' => 'Error', 'message' => 'Failed to delete question.'], 500);
        }
    }

}
