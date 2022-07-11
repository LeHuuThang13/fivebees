@can($viewGate)
<a class="view-button text-body px-2" href="{{ route('admin.' . $crudRoutePart . '.show', $row->id) }}" style="text-decoration: none;">
    <span class="material-symbols-outlined">
        visibility
    </span>
</a>
@endcan
@can($editGate)
<a class="edit-button text-body px-2" href="{{ route('admin.' . $crudRoutePart . '.edit', $row->id) }}" style="text-decoration: none;">
    <span class="material-symbols-outlined">
        edit
    </span>
</a>
@endcan
@can($deleteGate)
<form action="{{ route('admin.' . $crudRoutePart . '.destroy', $row->id) }}" method="POST" style="display: inline-block; margin-bottom: 0">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <button class="single-delete-button" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <span class="material-symbols-outlined">
            delete
        </span>
    </button>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Thông báo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Bạn có chắc muốn xóa {{$crudRouteName . " #" . $row->id}} không?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                    <button type="submit" class="btn btn-danger">Xóa</button>
                </div>
            </div>
        </div>
    </div>
</form>
@endcan