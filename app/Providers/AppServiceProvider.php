<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\Midtrans;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
        $this->app->singleton(Midtrans::class, function ($app) {
            return new Midtrans();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        $midtrans = $this->app->make(Midtrans::class);
        $midtrans->_configureMidtrans();
    }
}
