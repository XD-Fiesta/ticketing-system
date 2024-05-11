<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\Event\StoreRequest;
use App\Models\Event;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EventController extends Controller
{
    public function __invoke()
    {
        $events = Event::orderBy('created_at', 'desc')->get();
        $events->map(function ($event, $key) {
            $event->keyId = $key + 1;
            return $event;
        });

        return Inertia::render('Event/Event', compact('events'));
    }

    public function store(StoreRequest $request)
    {
        try {
            $formData = $request->validated();

            $event = Event::create([
                "name_event" => $formData['name_event'],
                "location_event" => $formData['location_event'],
                "type" => $formData['type_event'],
                "price" => $formData['price'],
                "date_start" => $formData['date_start'],
                "date_end" => $formData['date_end'],
                "description" => $formData['description'],
            ]);

            if ($event) {
                return Redirect::route('dashboard.event.index')->with('success', 'Event Succefully Created');
            } else {
                return Redirect::route('dashboard.event.index')->with('error', 'Event Failed Created');
            }

        } catch (Exception $e) {
            Log::error('Error Store Event with error : ' . $e);
        }
    }

    public function update(StoreRequest $request, $id)
    {

        try {
            $formData = $request->validated();
            $event = Event::find($id);
            $event->name_event = $formData['name_event'];
            $event->type = $formData['type_event'];
            $event->price = $formData['price'];
            $event->location_event = $formData['location_event'];
            $event->description = $formData['description'];
            $event->date_start = $formData['date_start'];
            $event->date_end = $formData['date_end'];
            $status = $event->save();

            if ($status) {
                return Redirect::route('dashboard.event.index')->with(['success' => 'Event Succefully Updated', 'events' => $event]);
            } else {
                return Redirect::route('dashboard.event.index')->with('error', 'Event Failed Updated');
            }

        } catch (Exception $e) {
            Log::error('Error Update Event with error : ' . $e);
        }

    }

    public function delete($id)
    {
        try {
            $event = Event::find($id);
            $status = $event->delete();
            if ($status) {
                return Redirect::route('dashboard.event.index')->with(['success' => 'Event Succefully Deleted', 'events' => $event]);
            } else {
                return Redirect::route('dashboard.event.index')->with('error', 'Event Failed Deleted');
            }

        } catch (Exception $e) {
            Log::error('Error Delete Event with error : ' . $e);
        }
    }

}
// a
