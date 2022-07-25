<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $permissions = [
            [
                'id'    => 1,
                'name' => 'user_access',
                'guard_name' => 'web'
            ],
            [
                'id'    => 2,
                'name' => 'user_create',
                'guard_name' => 'web'
            ],
            [
                'id'    => 3,
                'name' => 'user_edit',
                'guard_name' => 'web'
            ],
            [
                'id'    => 4,
                'name' => 'user_delete',
                'guard_name' => 'web'
            ],
            [
                'id'    => 5,
                'name' => 'role_access',
                'guard_name' => 'web'
            ],
            [
                'id'    => 6,
                'name' => 'role_create',
                'guard_name' => 'web'
            ],
            [
                'id'    => 7,
                'name' => 'role_edit',
                'guard_name' => 'web'
            ],
            [
                'id'    => 8,
                'name' => 'role_delete',
                'guard_name' => 'web'
            ],
            [
                'id'    => 9,
                'name' => 'permission_access',
                'guard_name' => 'web'
            ],
            [
                'id'    => 10,
                'name' => 'permission_create',
                'guard_name' => 'web'
            ],
            [
                'id'    => 11,
                'name' => 'permission_edit',
                'guard_name' => 'web'
            ],
            [
                'id'    => 12,
                'name' => 'permission_delete',
                'guard_name' => 'web'
            ],
        ];

        Permission::insert($permissions);

        Role::findOrFail(1)->permissions()->sync(Permission::all());
    }
}
