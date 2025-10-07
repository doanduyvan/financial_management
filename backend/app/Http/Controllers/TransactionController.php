<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $transactions = $request->user()
            ->transactions()
            ->with(['wallet', 'category'])
            ->orderBy('transaction_date', 'desc')
            ->paginate(20);
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'transaction_date' => 'required|date',
        ]);

        $transaction = $request->user()->transactions()->create($request->all());
        $transaction->load(['wallet', 'category']);

        return response()->json([
            'message' => 'Tạo giao dịch thành công',
            'transaction' => $transaction,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $transaction = $request->user()
            ->transactions()
            ->with(['wallet', 'category'])
            ->findOrFail($id);

        return response()->json($transaction);
    }

    public function destroy(Request $request, $id)
    {
        $transaction = $request->user()->transactions()->findOrFail($id);
        $transaction->delete();

        return response()->json([
            'message' => 'Xóa giao dịch thành công',
        ]);
    }

    // Thống kê
    public function statistics(Request $request)
    {
        $userId = $request->user()->id;

        $today = DB::table('transactions')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->whereDate('transaction_date', today())
            ->select(
                DB::raw('SUM(CASE WHEN categories.type = "expense" THEN amount ELSE 0 END) as expense'),
                DB::raw('SUM(CASE WHEN categories.type = "income" THEN amount ELSE 0 END) as income')
            )
            ->first();

        $thisWeek = DB::table('transactions')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->whereBetween('transaction_date', [now()->startOfWeek(), now()->endOfWeek()])
            ->select(
                DB::raw('SUM(CASE WHEN categories.type = "expense" THEN amount ELSE 0 END) as expense'),
                DB::raw('SUM(CASE WHEN categories.type = "income" THEN amount ELSE 0 END) as income')
            )
            ->first();

        $thisMonth = DB::table('transactions')
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->where('transactions.user_id', $userId)
            ->whereMonth('transaction_date', now()->month)
            ->whereYear('transaction_date', now()->year)
            ->select(
                DB::raw('SUM(CASE WHEN categories.type = "expense" THEN amount ELSE 0 END) as expense'),
                DB::raw('SUM(CASE WHEN categories.type = "income" THEN amount ELSE 0 END) as income')
            )
            ->first();

        $wallets = $request->user()->wallets;

        return response()->json([
            'today' => $today,
            'this_week' => $thisWeek,
            'this_month' => $thisMonth,
            'total_balance' => $wallets->sum('balance'),
            'wallets' => $wallets,
        ]);
    }
}
