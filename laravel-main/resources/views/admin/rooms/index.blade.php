@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Phòng | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container px-0 py-2 bg-white" style="margin-right: 20px; margin-bottom: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-3">Danh sách phòng</h3>

        <table id="rooms-table" class="table align-middle">
            <thead style="background-color: #F5F9FC;">
                <tr>
                    <th><input id="checkAll" class="badege check-all form-check-input" type="checkbox"></th>
                    <th>id</th>
                    <th>số phòng</th>
                    <th>trạng thái</th>
                    <th>tòa nhà</th>
                    <th>
                        &nbsp;
                    </th>
                </tr>
            </thead>
        </table>

        <button class="btn btn-danger btn-remove-all mb-2" style="margin-left: 18px;">Xóa tất cả</button>
        <a class="btn btn-primary mb-2" href="{{route('admin.rooms.create')}}">
            Thêm phòng
        </a>
    </div>
</div>

@if(session()->has('success'))
<div class="alert-message">
    <span>{{session()->get('success')}}</span>
</div>
@endif

@endsection

@push('scripts')
<script>
    $(function() {
        setTimeout(function() {
            $(".alert-message").remove()
        }, 3000);

        $("#checkAll").click(function() {
            $('input:checkbox').not(this).prop('checked', this.checked);
        });

        $(document).on('click', '.checks', function() {
            if ($('.checks:checked').length < $('.checks').length) {
                $('#checkAll').prop('checked', false);
                // also check the #checkAll button if all the checkboxes are checked
            } else if ($('.checks:checked').length == $('.checks').length) {
                $('#checkAll').prop('checked', true);
            }
        });

        // Remove all selected products
        $('.btn-remove-all').click(function() {
            if ($('.checks:checked').length == 0) {
                alert("Vui lòng chọn loại thiết bị muốn xóa!");
                return false;
            } else {
                let rooms_id = [];

                $(".checks:checked").each(function() {
                    rooms_id.push($(this).val());
                });

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    method: "POST",
                    url: "{{ route('admin.rooms.massDestroy') }}",
                    data: {
                        'id': rooms_id,
                        _method: 'DELETE'
                    },
                }).done(function() {
                    location.reload()
                })
            }
        });

        let table = $('#rooms-table').DataTable({
            processing: true,
            serverSide: true,
            retrieve: true,
            aaSorting: [],
            ajax: "{{route('admin.rooms.index')}}",
            columns: [{
                    data: 'checkbox',
                    name: 'checkbox'
                },
                {
                    data: 'id',
                    name: 'id'
                },
                {
                    data: 'room_number',
                    name: 'room_number'
                },
                {
                    data: 'status',
                    name: 'status'
                },
                {
                    data: 'building',
                    name: 'building.name'
                },
                {
                    data: 'actions',
                    name: 'actions',
                    className: 'dt-body-center',
                    sortable: false,
                    searchable: false,
                }
            ],
            "columnDefs": [{
                "targets": [0],
                "orderable": false,
            }, ],
        });
    })
</script>
@endpush