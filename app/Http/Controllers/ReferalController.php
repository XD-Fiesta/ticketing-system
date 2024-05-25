<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Referal\StoreRequest;
use App\Models\Referal;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ReferalController extends Controller
{
    public function __invoke()
    {
        $referals = Referal::orderBy('created_at', 'desc')->get();
        $referals->map(function ($referal, $key) {
            $referal->keyId = $key + 1;
            $referal->status = ucwords($referal->status);
            $referal->nim = $referal->nim ?? '-';
            $referal->code_referal = $referal->code_referal ?? '-';
            return $referal;
        });


        return Inertia::render('Referal/ReferalV2', compact('referals'));
    }

    public function store(StoreRequest $request)
    {
        try {
            $formData = $request->validated();

            $status = Referal::create([
                "nim" => $formData['nim'],
                "phone" => $formData['phone'],
                "code_referal" => $formData['code_referal'],
                "status" => strtolower($formData['status']),
            ]);

            if ($status) {
                return Redirect::route('dashboard.referal.index')->with('success', 'Referal Succefully Created');
            } else {
                return Redirect::route('dashboard.referal.index')->with('error', 'Referal Failed Created');
            }
        } catch (Exception $e) {
            dd($e);
            Log::error('Error Store Referal with error : ' . $e);
        }
    }
}
