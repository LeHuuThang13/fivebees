<!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
        * {
            font-family: DejaVu Sans !important;
            font-size: 10px;
        }

        table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        table,
        td,
        th {
            border: 1px solid black;
            text-align: left;
            padding: 8px;
        }

        p {
            margin: 0;
        }
    </style>
    <title>Kiểm kê thiết bị phòng</title>
</head>

<body>
    <h5 style="margin: 0">{{$room->buildings->name}}</h5>

    <div style="margin-bottom: 10px">
        <div style="text-align: center;">
            <h1 style="font-size: 18px;">Biên bản kiểm kê thiết bị phòng</h1>
        </div>
        <b>Thông tin phòng:</b>
        <p>Phòng: {{$room->room_number}}</p>
        <p>Tình trạng phòng: {{$room->status}}</p>
        <p>Ngày kiểm kê: ....giờ....ngày {{ date('d/m/20y', strtotime(Carbon\Carbon::now())) }}</p>
    </div>

    <div>
        <b>Thông tin bên thuê:</b>
        <p>Tên người thuê:</p>
        <p>Ngày nhận phòng:</p>
        <p>CCCD/CMND:</p>
        <p>SĐT:</p>

        <div style="margin-top: 10px">
            <b>Danh sách thiết bị kiểm kê:</b>
        </div>
        <table cellspacing="0" cellpadding="0">
            <thead>
                <tr>
                    <th>stt</th>
                    <th>mã thiết bị</th>
                    <th>tên thiết bị</th>
                    <th>tình trạng</th>
                    <th>ngày gán</th>
                    <th>hư hại</th>
                </tr>
            </thead>
            <tbody>
                @if ($room->facilities->count() == 0)
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                @else
                @php
                $count = 0;
                @endphp
                @foreach($room->facilities as $facility)
                <tr>
                    <td class="align-middle">{{++$count}}</td>
                    <td class="align-middle">{{$facility->code}}</td>
                    <td class="align-middle">{{$facility->name}}</td>
                    <td class="align-middle">{{$facility->status->name}}</td>
                    <td class="align-middle">{{$facility->updated_at}}</td>
                    <td class="align-middle"></td>
                </tr>

                @endforeach
                @endif
            </tbody>
        </table>

        <div style="text-align: right; margin: 1rem">
            <p>Ngày.......tháng.......năm.......</p>
        </div>
    </div>

    <div>
        <div style="text-align: center; float: left">
            <p>Chủ nhà</p>
            <i>(Ký, ghi rõ họ tên)</i>
        </div>
        <div style="text-align: center; float: left; margin-left: 30%">
            <p>Kiểm kê</p>
            <i>(Ký, ghi rõ họ tên)</i>
        </div>
        <div style="text-align: center; float: left; margin-left: 25%">
            <p>Đại diện bên thuê</p>
            <i>(Ký, ghi rõ họ tên)</i>
        </div>
    </div>


    <script src="https://unpkg.com/@popperjs/core@2"></script>
    <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js"></script>
</body>

</html>