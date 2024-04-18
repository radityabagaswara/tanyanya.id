<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExploreController extends Controller
{
    public function index(Request $request)
    {
        $data = Page::with(['user' => function ($query) {
            $query->select(['id', 'name']);
        }]);


        $data = $data->paginate(15);
        return Inertia::render('Explore', [
            'data' => $data
        ]);
    }
}
