import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import InputLabel from '@/Components/InputLabel';

export default function ManagePics({ auth, event, availableUsers }) {
    const [emailInput, setEmailInput] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        emails: '',
        remove_pic_ids: [],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setData('emails', emailInput);
        post(route('events.pics.update', event.id), {
            preserveScroll: true,
        });
    };

    const handleRemovePic = (userId) => {
        setData('remove_pic_ids', [...data.remove_pic_ids, userId]);
        post(route('events.pics.update', event.id), {
            preserveScroll: true,
        });
    };

    // Find the creator for special highlighting
    const creator = event.pics.find(pic => pic.pivot.is_creator);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Event PICs</h2>}
        >
            <Head title={`Manage PICs - ${event.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4">{event.name}</h2>
                        <p className="text-gray-600 mb-6">
                            Assign additional Person in Charge (PIC) by entering their email(s). PICs can edit event details, manage registrations, and oversee the event.
                        </p>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <InputLabel htmlFor="emails" value="Add PICs by Email (comma or newline separated)" />
                                <TextArea
                                    id="emails"
                                    name="emails"
                                    value={emailInput}
                                    onChange={e => setEmailInput(e.target.value)}
                                    className="mt-1 block w-full"
                                    rows={3}
                                    placeholder="user1@email.com, user2@email.com or one per line"
                                />
                                <InputError message={errors.emails} className="mt-2" />
                            </div>
                            <div className="flex justify-end mb-8">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Add PICs
                                </PrimaryButton>
                            </div>
                        </form>

                        <div className="mb-6">
                            <h3 className="text-lg font-medium mb-2">Current PICs</h3>
                            <div className="space-y-2">
                                {/* Creator (always listed and cannot be removed) */}
                                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                                    <div className="flex-1">
                                        <span className="font-medium">{creator.name}</span>
                                        <span className="ml-2 inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                            Creator
                                        </span>
                                    </div>
                                </div>
                                {/* Other PICs with remove button */}
                                {event.pics
                                    .filter(pic => !pic.pivot.is_creator)
                                    .map(pic => (
                                        <div key={pic.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1">
                                                <span className="font-medium">{pic.name} ({pic.email})</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemovePic(pic.id)}
                                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                                                disabled={processing}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <InputError message={errors.remove_pic_ids} className="mt-2" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
