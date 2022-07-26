<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Dompdf\Dompdf;

class UtilityController extends Controller
{
    public function index()
    {
        $rooms = Room::all();
        return view('admin.utilities.index', compact('rooms'));
    }

    public function show($id)
    {
        $room = Room::where('id', $id)->firstOrFail();
        return view('admin.utilities.show', compact('room'));
    }

    public function print($id)
    {
        $room = Room::where('id', $id)->firstOrFail();

        $dompdf = new Dompdf();
        $dompdf->loadHtml(view('admin.utilities.show', compact('room')));

        // (Optional) Setup the paper size and orientation
        $dompdf->setPaper('A4', 'portrait');

        // Render the HTML as PDF
        $dompdf->render();

        // Output the generated PDF to Browser
        $dompdf->stream('Biên bản kiểm kê ' . $room->room_number . '.pdf');
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
