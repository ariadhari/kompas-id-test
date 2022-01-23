<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Article extends Model
{
    use HasFactory;

    protected $table = 'article';

    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'judul',
        'body',
        'tanggal_terbit',
        'author_id',
        'status'
    ];

    public function authors()
    {
        return $this->belongsTo(Author::class, 'author_id');
    }

    public static function datatables()
    {
        $query = DB::table('article');
        $query->select(
            'article.id',
            'article.judul',
            'article.body',
            'article.tanggal_terbit',
            'author.id as author_id',
            'author.nama',
            'article.status as status_id',
            'status.status',
        );
        $query->leftJoin('author', 'author.id', '=', 'article.author_id');
        $query->leftJoin('status', 'status.id', '=', 'article.status');
        return $query;
    }

}
