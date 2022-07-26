<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;


class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'id'             => 1,
                'name'           => 'TV',
            ],
            [
                'id'             => 2,
                'name'           => 'Tủ lạnh',
            ],
            [
                'id'             => 3,
                'name'           => 'Quạt',
            ],
            [
                'id'             => 4,
                'name'           => 'Ghế',
            ],
            [
                'id'             => 5,
                'name'           => 'Giường',
            ],
            [
                'id'             => 6,
                'name'           => 'Bàn',
            ],
            [
                'id'             => 7,
                'name'           => 'Tủ quần áo',
            ],
            [
                'id'             => 8,
                'name'           => 'Đèn',
            ],
        ];
        Category::insert($categories);
    }
}
