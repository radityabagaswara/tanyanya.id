<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render(
            'Explore',
        );
    }

    public function getData(Request $request)
    {
        $data = Page::with(['user' => function ($query) {
            $query->select(['id', 'name']);
        }]);
        $data->where('is_accepting_questions', true);

        if ($request->get('q')) {
            $search = $request->get('q');
            $data->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'ilike', '%' . $search . '%');
            });
            $data->orWhere('username', 'ilike', '%' . $search . '%');
        }

        if ($request->get('category') && $request->get('category') !== "All") {
            $data->where('category', $request->get('category'));
        }

        if ($request->get('sort')) {
            $sort = $request->get('sort');
            if ($sort == "popular") {
                $data->orderBy('total_page_visit', 'DESC');
            } else if ($sort == "trending") {
                $data->withCount(['questions' => function ($query) {
                    $query->whereBetween('created_at', [now()->subWeek(), now()]);
                }]);
                $data->orderBy('questions_count', 'DESC');
            } else if ($sort == "new") {
                $data->orderBy('created_at', "DESC");
            }
        }


        $data = $data->paginate(5);

        return json_encode(['status' => 'OK', 'data' => $data]);
    }
}
