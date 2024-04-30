<?php

namespace App\Http\Controllers;

use Inertia\Controller;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard/Dashboard');
    }

    public function ticket()
    {
        return Inertia::render('Ticket/Ticket');
    }
}
