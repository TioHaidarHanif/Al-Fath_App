// create edit blog
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';
export default function Edit({ auth, blog, categories }) {
    const { data, setData, post, processing, errors } = useForm({
        title: blog.title,
        content: blog.content,
        category_id: blog.blog_category_id,
        image: null,
    });

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: { keepMarks: true, keepAttributes: false },
                orderedList: { keepMarks: true, keepAttributes: false },
            }),
            Image,
            Table,
            TableRow,
            TableCell,
            TableHeader,
        ],
        content: blog.content,
        editorProps: {
            attributes: {
                className: 'min-h-[200px] p-3 focus:outline-none',
            },
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        setData('content', editor.getHTML());
        post(route('blogs.update', blog.id), {
            preserveScroll: true,
            onSuccess: () => {
                editor.commands.clearContent();
            },
        });
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Blog</h2>}
        >
            <Head title="Edit Blog" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Blogs', href: route('blogs.index') },
                            { name: 'Edit' },
                        ]} 
                    />

                    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                        <InputLabel htmlFor="title" value="Title" />
                        <TextArea
                            id="title"
                            name="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                            rows={2}
                        />
                        <InputError message={errors.title} className="mt-2" />

                        <InputLabel htmlFor="category_id" value="Category" className="mt-4" />
                        <select
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <InputError message={errors.category_id} className="mt-2" />

                        <InputLabel htmlFor="image" value="Image (optional)" className="mt-4" />
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className="block w-full mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <InputError message={errors.image} className="mt-2" />

                        <div className="mt-6">
                            <EditorContent editor={editor} />
                            <InputError message={errors.content} className="mt-2" />    
                        </div>
                            
                        <div className="mt-6 flex justify-end">
                            <PrimaryButton type="submit" disabled={processing}>
                                Update Blog
                            </PrimaryButton>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
