import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';

export default function Edit({ auth, question }) {
    const { data, setData, patch, processing, errors } = useForm({
        title: question.title || '',
        description: question.description || '',
        input_type: question.input_type || 'short_text',
        options: question.options || [],
        is_active: question.is_active,
        display_order: question.display_order || 0,
    });

    const [newOption, setNewOption] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        patch(route('admin.amalan-questions.update', question.id));
    };

    const addOption = () => {
        if (newOption.trim() !== '') {
            setData('options', [...data.options, newOption.trim()]);
            setNewOption('');
        }
    };

    const removeOption = (index) => {
        const updatedOptions = [...data.options];
        updatedOptions.splice(index, 1);
        setData('options', updatedOptions);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Amalan Question</h2>}
        >
            <Head title="Edit Question" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <InputLabel htmlFor="title" value="Question Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="description" value="Description (Optional)" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description || ''}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={3}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="mb-4">
                                    <InputLabel htmlFor="input_type" value="Input Type" />
                                    <select
                                        id="input_type"
                                        name="input_type"
                                        value={data.input_type}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('input_type', e.target.value)}
                                    >
                                        <option value="short_text">Short Text</option>
                                        <option value="long_text">Long Text</option>
                                        <option value="multiple_choice">Multiple Choice</option>
                                        <option value="checkbox">Checkbox</option>
                                    </select>
                                    <InputError message={errors.input_type} className="mt-2" />
                                </div>

                                {(data.input_type === 'multiple_choice' || data.input_type === 'checkbox') && (
                                    <div className="mb-4">
                                        <InputLabel htmlFor="options" value="Options" />
                                        <div className="flex items-center mt-1">
                                            <TextInput
                                                id="newOption"
                                                type="text"
                                                value={newOption}
                                                className="block w-full"
                                                onChange={(e) => setNewOption(e.target.value)}
                                                placeholder="Enter an option"
                                            />
                                            <SecondaryButton type="button" onClick={addOption} className="ml-2">
                                                Add
                                            </SecondaryButton>
                                        </div>
                                        <InputError message={errors.options} className="mt-2" />

                                        <div className="mt-2">
                                            {data.options && data.options.length > 0 ? (
                                                <ul className="bg-gray-50 rounded-md p-2">
                                                    {data.options.map((option, index) => (
                                                        <li key={index} className="flex justify-between items-center py-1">
                                                            <span>{option}</span>
                                                            <button
                                                                type="button"
                                                                onClick={() => removeOption(index)}
                                                                className="text-red-600 hover:text-red-800"
                                                            >
                                                                Remove
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-gray-500">No options added yet</p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <InputLabel htmlFor="display_order" value="Display Order" />
                                    <TextInput
                                        id="display_order"
                                        type="number"
                                        name="display_order"
                                        value={data.display_order}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                                    />
                                    <InputError message={errors.display_order} className="mt-2" />
                                </div>

                                <div className="mb-4 flex items-center">
                                    <Checkbox
                                        id="is_active"
                                        name="is_active"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                    />
                                    <InputLabel htmlFor="is_active" value="Active" className="ml-2" />
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <Link
                                        href={route('admin.amalan-questions.index')}
                                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton className="ml-4" disabled={processing}>
                                        Update Question
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
