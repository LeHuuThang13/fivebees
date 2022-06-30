<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $status = [
            [
                'id'             => 1,
                'name'           => 'Đang sử dụng',
            ],
            [
                'id'             => 2,
                'name'           => 'Chưa sử dụng',
            ],
            [
                'id'             => 3,
                'name'           => 'Chờ sửa chữa',
            ],
            [
                'id'             => 4,
                'name'           => 'Thanh lý',
            ],
        ];
        Status::insert($status);
    }
}
