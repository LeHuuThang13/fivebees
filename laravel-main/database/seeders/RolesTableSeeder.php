<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'id' => 1,
                'name' => 'Admin',
                'guard_name' => 'web'
            ],
            [
                'id' => 2,
                'name' => 'Owner',
                'guard_name' => 'web'
            ],
            [
                'id' => 3,
                'name' => 'Customer',
                'guard_name' => 'web'
            ]
        ];
        User::findOrFail(1)->roles()->sync([1, 2, 3]);
        Role::insert($roles);
    }
}
