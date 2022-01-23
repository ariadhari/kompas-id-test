<?php

namespace App\Helpers;


class Helper
{
	public static function getSelectOptionUsers($authors)
	{
        $count = (int)count($authors);
        for ($i = 0; $i < $count; $i++) {
            $options[$i]['nama'] = (string)$authors[$i]->nama;
            $options[$i]['id'] = (string)$authors[$i]->id;
        }

		return $options;
	}

}
