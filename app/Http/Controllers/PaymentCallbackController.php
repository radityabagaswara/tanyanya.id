<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Midtrans\Notification;

class PaymentCallbackController extends Controller
{
    protected $midtrans;
    public function __construct()
    {
        $this->midtrans = app()->make(\App\Services\Midtrans::class);
        $this->midtrans->_configureMidtrans();
    }

    public function handleNotification()
    {
        $notification = new Notification();
        $transaction = $notification->transaction_status;
        $order_id = $notification->order_id;
        $payment = Payment::where('order_id', $order_id)->firstOrFail();

        $payment->update([
            'status' => $transaction,
            'transaction_time' => now(),
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Payment status updated',
        ]);
    }
}
