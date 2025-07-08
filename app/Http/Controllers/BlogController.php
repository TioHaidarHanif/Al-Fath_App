<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all blogs with pagination
        $blogs = \App\Models\Blog::with('user', 'category')
            ->where('is_published', true)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return inertia('Blogs/Index', [
            'blogs' => $blogs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Check if user has permission to create blogs
        $this->authorize('create', \App\Models\Blog::class);

        // Fetch categories for the select input
        $categories = \App\Models\BlogCategory::all();

        return inertia('Blogs/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'image' => 'nullable|image|max:2048', // Optional image upload
        ]);
        $validated['blog_category_id'] = $validated['category_id'] ?? null; // Handle nullable category


        // Handle image upload if present
        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('blogs', 'public');
        }

        // Create the blog post
        $blog = \App\Models\Blog::create([
            'user_id' => auth()->id(),
            ...$validated,
            'is_published' => false, // Default to unpublished
        ]);

        return redirect()->route('blogs.index')->with('success', 'Blog created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Fetch the blog post with its author and category
        $blog = \App\Models\Blog::with('user', 'category')
            ->findOrFail($id);

        // Check if the blog is published or if the user has permission to view unpublished blogs
        $this->authorize('view', $blog);

        return inertia('Blogs/Show', [
            'blog' => $blog,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        
        // Fetch the blog post with its author and category
        $blog = \App\Models\Blog::with('user', 'category')
            ->findOrFail($id);

        // Check if the user has permission to edit this blog
        $this->authorize('update', $blog);

        // Fetch categories for the select input
        $categories = \App\Models\BlogCategory::all();

        return inertia('Blogs/Edit', [
            'blog' => $blog,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Fetch the blog post
        $blog = \App\Models\Blog::findOrFail($id);

        // Check if the user has permission to update this blog
        $this->authorize('update', $blog);

        // Validate the request
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'nullable|exists:blog_categories,id',
            'image' => 'nullable|image|max:2048', // Optional image upload
        ]);
        $validated['blog_category_id'] = $validated['category_id'] ?? null; // Handle nullable category

        // Handle image upload if present
        if ($request->hasFile('image')) {
            $validated['image_path'] = $request->file('image')->store('blogs', 'public');
        }

        // Update the blog post
        $blog->update($validated);

        return redirect()->route('blogs.show', $blog)->with('success', 'Blog updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Fetch the blog post
        $blog = \App\Models\Blog::findOrFail($id);

        // Check if the user has permission to delete this blog
        $this->authorize('delete', $blog);

        // Delete the blog post
        $blog->delete();

        return redirect()->route('blogs.index')->with('success', 'Blog deleted successfully.');
    }
}
