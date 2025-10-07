<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = $request->user()->categories;

        return response()->json($categories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:100',
            'type' => 'required|in:income,expense',
            'icon' => 'nullable|string|max:50',
        ]);

        $category = $request->user()->categories()->create($request->all());

        return response()->json([
            'message' => 'Tạo danh mục thành công',
            'category' => $category,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $category = $request->user()->categories()->findOrFail($id);

        $request->validate([
            'name' => 'string|max:100',
            'type' => 'in:income,expense',
            'icon' => 'nullable|string|max:50',
        ]);

        $category->update($request->all());

        return response()->json([
            'message' => 'Cập nhật danh mục thành công',
            'category' => $category,
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $category = $request->user()->categories()->findOrFail($id);
        $category->delete();

        return response()->json([
            'message' => 'Xóa danh mục thành công',
        ]);
    }
}
