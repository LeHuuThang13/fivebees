<a class="text-body px-2" href="{{ route('admin.' . $crudRoutePart . '.edit', $row->id) }}" style="text-decoration: none;">
    <span class="material-symbols-outlined">
        edit
    </span>
</a>

<form action="{{ route('admin.' . $crudRoutePart . '.destroy', $row->id) }}" method="POST" onsubmit="return confirm('Bạn có chắc muốn xóa ?');" style="display: inline-block; margin-bottom: 0">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
    <button class="single-delete-button" type="submit">
        <span class="material-symbols-outlined">
            delete
        </span>
    </button>

</form>