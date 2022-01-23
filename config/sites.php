<?php

$sites = [
    'img_profile_url' => env('IMG_PROFILE_URL', 'https://cms9.bisnis.com/images-data/profile/'),
    'img_url' => env('IMG_URL', 'https://images.bisnis-cdn.com/'),
    'img_url_plus' => env('IMG_URL_PLUS', 'https://images.bisnis-cdn.com/plus/'),
    'img_url_story' => env('IMG_URL_STORY', 'https://images.bisnis-cdn.com/story/'),
    'img_url_post' => env('IMG_URL_POST', 'https://images.bisnis-cdn.com/posts/'),
    'img_url_library' => env('IMG_URL_LIBRARY', 'https://images.bisnis-cdn.com/library/1/'),
    'img_path' => env('IMG_PATH', '/mainData/data/images/'),
    'xml_path' => env('XML_PATH', '/mainData/data/xml/'),
    'xml_solo_path' => env('XML_SOLO_PATH', '/mainData/data-solo/xml-solo/'),
    'xml_harjo_path' => env('XML_HARJO_PATH', '/mainData/data-solo/xml-harjo/'),
    'json_path' => env('JSON_PATH', '/mainData/data/json/')
];

if (env('APP_ENV') != 'production') {
    $sites['img_url_lock'] = env('IMG_URL_LOCK', 'http://cmsnewbisnis.bisnis.com/images-lock/');
} else {
    $sites['img_url_lock'] = env('IMG_URL_LOCK', 'https://images.bisnis-cdn.com/lock/');
}

return $sites;
