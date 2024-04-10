<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Symfony\Component\Uid\Ulid;

class OverlaySettingsController extends Controller
{
    public function index()
    {
        $page = auth()->user()->page;
        return Inertia::render('Dashboard/OverlaySetting', [
            'page' => $page,
        ]);
    }

    public function resetColor()
    {
        $page = auth()->user()->page;
        $page->update([
            'header_color' => '#FB4983',
            'header_text_color' => '#fff',
            'border_color' => '#FB4983',
            'body_color' => '#fafafa',
            'body_text_color' => '#000',
        ]);
        return redirect()->back()->with('success', ['title' => 'Settings reset!', 'message' => 'Your settings have been reset.']);
    }

    public function resetKey()
    {
        $page = auth()->user()->page;
        $page->update([
            'overlay_key' => Ulid::generate(),
        ]);
        return redirect()->route('dashboard.overlay')->with('success', ['title' => 'Key reset!', 'message' => 'Your overlay key has been reset.']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'header_color' => 'required|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'header_text_color' => 'required|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'border_color' => 'required|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'body_color' => 'required|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
            'body_text_color' => 'required|string|regex:/^#(?:[0-9a-fA-F]{3}){1,2}$/',
        ], [
            'header_color.required' => 'Header color is required.',
            'header_color.regex' => 'Header color must be a valid hexadecimal color code.',
            'header_text_color.required' => 'Header text color is required.',
            'header_text_color.regex' => 'Header text color must be a valid hexadecimal color code.',
            'border_color.required' => 'Border color is required.',
            'border_color.regex' => 'Border color must be a valid hexadecimal color code.',
            'body_color.required' => 'Body color is required.',
            'body_color.regex' => 'Body color must be a valid hexadecimal color code.',
            'body_text_color.required' => 'Body text color is required.',
            'body_text_color.regex' => 'Body text color must be a valid hexadecimal color code.',
        ]);

        DB::beginTransaction();

        try {
            $page = auth()->user()->page;
            $page->update([
                'header_color' => $request->header_color,
                'header_text_color' => $request->header_text_color,
                'border_color' => $request->border_color,
                'body_color' => $request->body_color,
                'body_text_color' => $request->body_text_color,
            ]);
            DB::commit();
            return redirect()->route('dashboard.overlay')->with('success', ['title' => 'Settings saved!', 'message' => 'Your settings have been saved.']);
        } catch (Exception $e) {
            DB::rollBack();
            return back()->with('error', ['title' => 'Failed to save settings', 'message' => 'An error occurred while saving your settings.']);
        }
    }
}
