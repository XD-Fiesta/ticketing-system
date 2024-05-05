<?php

namespace App\Http\Controllers;

use App\Models\Referal;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Validation\Rules;


class JoinMemberController extends Controller
{
    public function index()
    {
        return Inertia::render('JoinMember/JoinMember');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'no_whatsapp' => ['required']
        ]);

        try {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'member'
            ]);

            $referal = Referal::create([
                'active' => false,
                'code_referal' => null,
                'phone' => $request->no_whatsapp,
                'user_id' => $user->id
            ]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            dd($e);
        }

        // event(new Registered($user));

        // Auth::login($user);

        // return redirect(route('dashboard', absolute: false));
    }
}
