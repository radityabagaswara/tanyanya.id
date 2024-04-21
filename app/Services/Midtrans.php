<?php

namespace App\Services;


class Midtrans
{
    protected $serverKey;
    protected $clientKey;
    protected $isProduction;
    protected $isSanitized;
    protected $is3ds;

    public function __construct()
    {
        $this->serverKey = config('services.midtrans.serverKey');
        $this->clientKey = config('services.midtrans.clientKey');
        $this->isProduction = config('services.midtrans.isProduction');
        $this->isSanitized = config('services.midtrans.isSanitized');
        $this->is3ds = config('services.midtrans.is3ds');
    }

    public function _configureMidtrans()
    {
        \Midtrans\Config::$serverKey = config('services.midtrans.serverKey');
        \Midtrans\Config::$isProduction = config('services.midtrans.isProduction');
        \Midtrans\Config::$isSanitized = config('services.midtrans.isSanitized');
        \Midtrans\Config::$is3ds = config('services.midtrans.is3ds');
    }
}
