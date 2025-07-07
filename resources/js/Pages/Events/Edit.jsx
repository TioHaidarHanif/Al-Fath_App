import React, { useState, useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import Checkbox from '@/Components/Checkbox';

export default function Edit({ auth, event }) {
    const [imagePreview, setImagePreview] = useState(event.image_path ? `/storage/${event.image_path}` : null);

    const { data, setData, post, processing, errors } = useForm({
        name: event.name || '',
        description: event.description || '',
        location: event.location || '',
        start_time: event.start_time ? new Date(event.start_time).toISOString().slice(0, 16) : '',
        end_time: event.end_time ? new Date(event.end_time).toISOString().slice(0, 16) : '',
        image: null,
        max_participants: event.max_participants || '',
        is_active: event.is_active,
        auto_approve_registration: event.auto_approve_registration || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.update', event.id), {
            preserveScroll: true,
            auto_approve_registration: data.auto_approve_registration,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Event</h2>}
        >
            <Head title="Edit Event" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="name" value="Event Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="md:col-span-2">
                                    <InputLabel htmlFor="description" value="Event Description" />
                                    <TextArea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('description', e.target.value)}
                                        required
                                        rows={5}
                                    />
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        type="text"
                                        name="location"
                                        value={data.location}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('location', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.location} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="max_participants" value="Maximum Participants (optional)" />
                                    <TextInput
                                        id="max_participants"
                                        type="number"
                                        name="max_participants"
                                        value={data.max_participants}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('max_participants', e.target.value)}
                                        min="1"
                                    />
                                    <InputError message={errors.max_participants} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="start_time" value="Start Date & Time" />
                                    <TextInput
                                        id="start_time"
                                        type="datetime-local"
                                        name="start_time"
                                        value={data.start_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('start_time', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.start_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="end_time" value="End Date & Time" />
                                    <TextInput
                                        id="end_time"
                                        type="datetime-local"
                                        name="end_time"
                                        value={data.end_time}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('end_time', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.end_time} className="mt-2" />
                                </div>

                                <div>
                                    <InputLabel htmlFor="image" value="Event Image (optional)" />
                                    <TextInput
                                        id="image"
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                    <InputError message={errors.image} className="mt-2" />

                                    {imagePreview && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full max-w-md h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center mt-4">
                                        <Checkbox
                                            name="is_active"
                                            checked={data.is_active}
                                            onChange={(e) => setData('is_active', e.target.checked)}
                                        />
                                        <InputLabel htmlFor="is_active" value="Event is active" className="ml-2" />
                                    </div>
                                    <InputError message={errors.is_active} className="mt-2" />
                                </div>

                                <div>
                                    <div className="flex items-center mt-4">
                                        <Checkbox
                                            name="auto_approve_registration"
                                            checked={data.auto_approve_registration}
                                            onChange={(e) => setData('auto_approve_registration', e.target.checked)}
                                        />
                                        <InputLabel
                                            htmlFor="auto_approve_registration"
                                            value="Auto-approve registrations (no PIC approval needed)"
                                            className="ml-2"
                                        />
                                    </div>
                                    <InputError message={errors.auto_approve_registration} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Update Event
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
