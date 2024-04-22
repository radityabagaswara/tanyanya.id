<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    //
    public function index()
    {


        return inertia('Dashboard/History/Index');
    }

    public function getHistory(Request $request)
    {
        $data = Payment::with(['question', 'question.page'])->whereHas('question', function ($query) {
            $query->where('sender_id', auth()->user()->id);
        });

        if ($request->has('filter')) {
            $filter = $request->filter;
            if ($filter === "success") {
                $data->where('status', 'capture')->orWhere('status', 'settlement');
            } else if ($filter === "pending") {
                $data->where('status', "pending");
            }
        }

        if ($request->has('q')) {
            $search = $request->get('q');
            $data->whereHas('question', function ($question_qry) use ($search) {
                $question_qry->whereHas('page', function ($query) use ($search) {
                    $query->where('username', 'ilike', '%' . $search . '%');
                });
            });
        }

        $data = $data->paginate(15);

        return response()->json(['data' => $data]);
    }
}
