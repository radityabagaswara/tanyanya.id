<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function index()
    {
        $creators = Page::with(['user' => function ($query) {
            $query->select(['id', 'name']);
        }])->inRandomOrder()->limit(5)->get();

        return inertia('Welcome', ['creators' => $creators]);
    }
}
