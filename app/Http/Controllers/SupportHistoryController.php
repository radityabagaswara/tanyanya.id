<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupportHistoryController extends Controller
{
    //
    public function index()
    {
        $balance = Payment::where('status', 'settlement')->whereHas('question', function ($query) {
            $query->where('page_id', auth()->user()->page->id);
        })->sum('amount');
        return Inertia::render('Dashboard/Support/Index', ['balance' => $balance]);
    }

    public function getSupport(Request $request)
    {
        $data = Payment::with(['question', 'question.sender' => function ($query) {
            $query->select(['id', 'name']);
        }])->whereHas('question', function ($query) {
            $query->where('page_id', auth()->user()->page->id);
        });


        $data->where('status', 'capture')->orWhere('status', 'settlement');

        if ($request->has('q')) {
            $search = $request->get('q');
            $data->whereHas('question', function ($question_qry) use ($search) {
                $question_qry->where('is_anonymous', false);
                $question_qry->whereHas('sender', function ($query) use ($search) {
                    $query->where('name', 'ilike', '%' . $search . '%');
                });
            });
        }

        $data = $data->paginate(1);

        foreach ($data as $d) {
            if ($d->question->is_anonymous && $d->question->sender) {
                $d->question->sender->name = "Anonymous";
                $d->question->sender->id = null;
                $d->question->sender_id = null;
                $d->question->sender->profile_photo_url = "https://ui-avatars.com/api/?name=?&color=7F9CF5&background=EBF4FF";
            }
        }

        return response()->json(['data' => $data]);
    }
}
