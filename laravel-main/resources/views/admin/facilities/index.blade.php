@extends('components.layout')
@extends('components.sidebar')
@extends('components.navbar')

@section('title', 'Thiết bị | FiveBees')

@section('content')

<div class="info-container d-flex flex-row">
    <div class="container table-container px-0 py-2 bg-white" style="margin-right: 20px; margin-bottom: 20px; border-radius: 10px">
        <h3 class="mt-2 mx-3">Danh sách thiết bị</h3>

        <table id="facilities-table" class="table align-middle">
            <thead style="background-color: #F5F9FC;">
                <tr>
                    <th><input id="checkAll" class="badege check-all form-check-input" type="checkbox"></th>
                    <th>id</th>
                    <th>mã thiết bị</th>
                    <th>tên</th>
                    <th>trạng thái</th>
                    <th>loại thiết bị</th>
                    <th>
                        &nbsp;
                    </th>
                </tr>
            </thead>
        </table>

        <button class="btn btn-danger btn-remove-all mb-2" style="margin-left: 18px;">Xóa tất cả</button>
        <a class="btn btn-primary mb-2" href="{{route('admin.facilities.create')}}">
            Thêm thiết bị
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
            } else if (confirm("Bạn có muốn xóa các thiết bị này không?")) {
                let facilities_id = [];

                $(".checks:checked").each(function() {
                    facilities_id.push($(this).val());
                });

                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                $.ajax({
                    method: "POST",
                    url: "{{ route('admin.facilities.massDestroy') }}",
                    data: {
                        'id': facilities_id,
                        _method: 'DELETE'
                    },
                }).done(function() {
                    location.reload()
                })
            }
        });

        let table = $('#facilities-table').DataTable({
            processing: true,
            serverSide: true,
            retrieve: true,
            aaSorting: [],
            ajax: "{{route('admin.facilities.index')}}",
            columns: [{
                    data: 'checkbox',
                    name: 'checkbox'
                },
                {
                    data: 'id',
                    name: 'id'
                },
                {
                    data: 'code',
                    name: 'code',
                    className: 'text-truncate'
                },
                {
                    data: 'name',
                    name: 'name'
                },
                {
                    data: 'status',
                    name: 'status'
                },
                {
                    data: 'category',
                    name: 'category.name'
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