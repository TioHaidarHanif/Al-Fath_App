

//   public function index()
//     {
//         // Fetch all blogs with pagination
//         $blogs = \App\Models\Blog::with('user', 'category')
//             ->where('is_published', true)
//             ->orderBy('created_at', 'desc')
//             ->paginate(10);

//         return inertia('Blogs/Index', [
//             'blogs' => $blogs,
//         ]);
//     }
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BlogCard from '@/Components/BlogCard';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function BlogsIndex({ auth, blogs }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blogs</h2>}
        >
            <Head title="Blogs" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Home', href: route('dashboard') },
                            { name: 'Blogs' },
                        ]} 
                    />

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Latest Blogs</h1>
                        <p className="text-text-secondary">Explore our latest articles and insights.</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <ActionButton
                            as="link"
                            href={route('blogs.create')}
                            color="primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Blog
                        </ActionButton>
                    </div>

                    {/* Blog Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.data.map(blog => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    Pagination
                    {blogs.links && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {blogs.links.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1 rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}