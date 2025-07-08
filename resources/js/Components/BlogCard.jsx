
import React from 'react';
import { Link } from '@inertiajs/react';
export default function BlogCard({ blog }) {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Link href={route('blogs.show', blog.id)} className="block">
                <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-text-primary">{blog.title}</h3>
                    <p className="text-sm text-text-secondary mt-2">{blog.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-text-secondary">{blog.user.name}</span>
                        <span className="text-xs text-text-secondary">{new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}