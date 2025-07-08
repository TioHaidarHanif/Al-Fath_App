import React, { useRef } from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

const toolbarButtons = [
    { cmd: 'bold', icon: 'B', label: 'Bold' },
    { cmd: 'italic', icon: 'I', label: 'Italic' },
    { cmd: 'strike', icon: 'S', label: 'Strike' },
    { cmd: 'heading', icon: 'H1', label: 'Heading' },
    { cmd: 'bulletList', icon: '•', label: 'Bullet List' },
    { cmd: 'orderedList', icon: '1.', label: 'Numbered List' },
    { cmd: 'blockquote', icon: '❝', label: 'Blockquote' },
    { cmd: 'table', icon: 'T', label: 'Table' },
    { cmd: 'image', icon: '🖼️', label: 'Image' },
];

export default function Create({ auth, categories }) {
    const imageInputRef = useRef();
    const formRef = useRef();
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: '',
        content: '',
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
        content: '',
        editorProps: {
            attributes: {
                class: 'min-h-[200px] p-3 focus:outline-none',
            },
            handleDOMEvents: {
                // Prevent form submit on Enter in editor
                keydown: (view, event) => {
                    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                        formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                        return true;
                    }
                    return false;
                },
            },
        },
        onUpdate: ({ editor }) => {
            setData('content', editor.getHTML());
        },
    });

    const handleImageChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('blogs.store'));
    };

    const handleToolbar = (cmd) => {
        if (!editor) return;
        switch (cmd) {
            case 'bold':
                editor.chain().focus().toggleBold().run();
                break;
            case 'italic':
                editor.chain().focus().toggleItalic().run();
                break;
            case 'strike':
                editor.chain().focus().toggleStrike().run();
                break;
            case 'heading':
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case 'bulletList':
                editor.chain().focus().toggleBulletList().run();
                break;
            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run();
                break;
            case 'blockquote':
                editor.chain().focus().toggleBlockquote().run();
                break;
            case 'table':
                editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                break;
            case 'image':
                imageInputRef.current.click();
                break;
            default:
                break;
        }
    };

    const handleEditorImage = (e) => {
        const file = e.target.files[0];
        if (file && editor) {
            const reader = new FileReader();
            reader.onload = (event) => {
                editor.chain().focus().setImage({ src: event.target.result }).run();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Blog" />
            <div className="max-w-3xl mx-auto py-10">
                <div className="bg-white shadow rounded-lg p-8">
                    <h1 className="text-3xl font-bold mb-8 text-center text-primary">Create a New Blog</h1>
                    <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data" className="flex flex-col gap-6">
                        <div>
                            <label className="block font-semibold mb-2 text-lg">Title</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-primary/30 focus:border-primary"
                                value={data.title}
                                onChange={e => setData('title', e.target.value)}
                                placeholder="Enter blog title"
                            />
                            {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-lg">Category</label>
                            <select
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-primary/30 focus:border-primary"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                            >
                                <option value="">Select category</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <div className="text-red-500 text-sm mt-1">{errors.category_id}</div>}
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-lg">Content</label>
                            <div className="bg-gray-50 border border-gray-300 rounded-t px-2 py-1 flex flex-wrap gap-2 mb-1 sticky top-0 z-10">
                                {toolbarButtons.map(btn => (
                                    <button
                                        type="button"
                                        key={btn.cmd}
                                        title={btn.label}
                                        className="px-2 py-1 rounded hover:bg-primary/10 text-lg font-semibold"
                                        onClick={() => handleToolbar(btn.cmd)}
                                    >
                                        {btn.icon}
                                    </button>
                                ))}
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={imageInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleEditorImage}
                                />
                            </div>
                            <div className="border border-gray-300 rounded-b bg-white min-h-[200px] max-h-[400px] overflow-y-auto">
                                <EditorContent editor={editor} />
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Press <kbd>Ctrl+Enter</kbd> to submit.</div>
                            {errors.content && <div className="text-red-500 text-sm mt-1">{errors.content}</div>}
                        </div>
                        <div>
                            <label className="block font-semibold mb-2 text-lg">Cover Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                            />
                            {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image}</div>}
                        </div>
                        <div className="sticky bottom-0 bg-white pt-4 pb-2 z-20 flex justify-end">
                            <button
                                type="submit"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-bold text-lg transition w-full md:w-auto"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create Blog'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}