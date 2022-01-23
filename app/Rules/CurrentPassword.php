<?php
namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class CurrentPassword implements Rule
{
    public function passes($attribute, $value)
    {
		$user = User::find(request()->id);
        return md5($value) === $user->password;
    }
	
    public function message()
    {
        return 'Old password is incorrect';
    }
}