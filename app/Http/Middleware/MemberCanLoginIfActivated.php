<?php

namespace App\Http\Middleware;

use App\Models\Referal;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class MemberCanLoginIfActivated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        // $haha = User::where('email', $request->email)->first;
        // dd($haha);

        return $next($request);
    }
}
