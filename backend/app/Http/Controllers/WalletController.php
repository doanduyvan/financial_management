<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wallet;
use Illuminate\Support\Str;

class WalletController extends Controller
{
    public function index(Request $request)
    {
        $wallets = $request->user()->wallets;

        return response()->json([
            'wallets' => $wallets,
            'total_balance' => $wallets->sum('balance'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet',
            'balance' => 'required|numeric|min:0',
        ]);
        $validated['balance'] = round((float) $validated['balance'], 2);
        $validated['code'] = Str::slug($validated['name'], '-');

        $checkUnique = Wallet::where('user_id', $request->user()->id)
            ->where('code', $validated['code'])
            ->exists();

        if ($checkUnique) return response()->json([
            'message' => 'Ví đã tồn tại'
        ], 400);

        $wallet = $request->user()->wallets()->create($validated);

        return response()->json([
            'message' => 'Tạo ví thành công',
            'wallet' => $wallet,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $wallet = $request->user()->wallets()->findOrFail($id);

        return response()->json($wallet);
    }

    public function update(Request $request, $id)
    {
        $wallet = $request->user()->wallets()->findOrFail($id);

        $request->validate([
            'name' => 'string|max:100',
            'type' => 'in:cash,bank,ewallet',
            'balance' => 'numeric|min:0',
        ]);

        $wallet->update($request->all());

        return response()->json([
            'message' => 'Cập nhật ví thành công',
            'wallet' => $wallet,
        ]);
    }


    public function destroy(Request $request, $id)
    {
        $wallet = $request->user()->wallets()->findOrFail($id);
        $wallet->delete();

        return response()->json([
            'message' => 'Xóa ví thành công',
        ]);
    }
}
