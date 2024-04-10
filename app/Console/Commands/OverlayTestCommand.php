<?php

namespace App\Console\Commands;

use App\Events\OverlayBroadcastEvent;
use Illuminate\Console\Command;
use Laravel\Reverb\Loggers\Log;

class OverlayTestCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:overlay-test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Log::info('OverlayTestCommand executed');
        OverlayBroadcastEvent::dispatch("test");
    }
}
