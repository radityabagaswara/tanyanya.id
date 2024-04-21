<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        DB::beginTransaction();
        try {
            $payment = Payment::where('order_id', $order_id)->firstOrFail();

            if ($transaction === 'capture' || $transaction === 'settlement') {
                $payment->update([
                    'status' => $transaction,
                    'transaction_time' => now(),
                ]);
            } else {
                $payment->update([
                    'status' => $transaction,
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'message' => 'Payment status updated',
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}
