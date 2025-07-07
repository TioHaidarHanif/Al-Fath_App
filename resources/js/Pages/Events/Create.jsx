import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import Checkbox from '@/Components/Checkbox';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function Create({ auth }) {
    const [imagePreview, setImagePreview] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        location: '',
        start_time: '',
        end_time: '',
        image: null,
        max_participants: '',
        auto_approve_registration: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
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
        } else {
            setImagePreview(null);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Event</h2>}
        >
            <Head title="Create Event" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Events', href: route('events.index') },
                            { name: 'Create Event' },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">Create New Event</h1>
                        <div className="flex gap-2">
                            <ActionButton
                                as="link"
                                href={route('events.index')}
                                color="secondary"
                            >
                                Back to Events
                            </ActionButton>
                            
                            <ActionButton
                                as="link"
                                href={route('events.my')}
                                color="secondary"
                            >
                                My Events
                            </ActionButton>
                        </div>
                    </div>
                    
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

                                <div className="md:col-span-2">
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
                                            <p className="text-sm text-gray-500 mb-2">Image Preview:</p>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-full max-w-md h-auto rounded-lg shadow-md"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <div className="flex items-center mt-4">
                                        <Checkbox
                                            name="auto_approve_registration"
                                            checked={data.auto_approve_registration}
                                            onChange={(e) => setData('auto_approve_registration', e.target.checked)}
                                        />
                                        <InputLabel htmlFor="auto_approve_registration" value="Auto-approve registrations (no PIC approval needed)" className="ml-2" />
                                    </div>
                                    <InputError message={errors.auto_approve_registration} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Create Event
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
