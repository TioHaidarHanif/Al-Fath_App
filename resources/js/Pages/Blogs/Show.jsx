// create show page
import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import BlogCard from '@/Components/BlogCard';
import ActionButton from '@/Components/ActionButton';
import { format } from 'date-fns';
import { Link } from '@inertiajs/react';

export default function Show({ auth, blog }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Blog Details</h2>}
        >
            <Head title={blog.title} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Blogs', href: route('blogs.index') },
                            { name: blog.title },
                        ]} 
                    />

                    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                        <img src={blog.image_url} alt={blog.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-text-primary mb-2">{blog.title}</h1>
                            <p className="text-text-secondary mb-4">{blog.excerpt}</p>
                            <p className="text-sm text-text-secondary mb-4">
                                By {blog.user.name} on {format(new Date(blog.created_at), 'MMM d, yyyy')}
                            </p>
                            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </div>


                    <ActionButton as={Link} href={route('blogs.index')} color="primary">
                        Back to Blogs
                    </ActionButton>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}