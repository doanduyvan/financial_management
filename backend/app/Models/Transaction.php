<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'wallet_id',
        'category_id',
        'amount',
        'description',
        'transaction_date',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Tự động cập nhật số dư ví
    protected static function booted()
    {
        static::created(function ($transaction) {
            $wallet = $transaction->wallet;
            $category = $transaction->category;

            if ($category->type === 'expense') {
                $wallet->decrement('balance', $transaction->amount);
            } else {
                $wallet->increment('balance', $transaction->amount);
            }
        });

        static::deleted(function ($transaction) {
            $wallet = $transaction->wallet;
            $category = $transaction->category;

            if ($category->type === 'expense') {
                $wallet->increment('balance', $transaction->amount);
            } else {
                $wallet->decrement('balance', $transaction->amount);
            }
        });
    }
}
