import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import Checkbox from '@/Components/Checkbox';

export default function ManagePics({ auth, event, availableUsers }) {
    const { data, setData, post, processing, errors } = useForm({
        pic_ids: event.pics.filter(pic => !pic.pivot.is_creator).map(pic => pic.id),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.pics.update', event.id), {
            preserveScroll: true,
        });
    };

    const handleTogglePIC = (userId) => {
        const currentPics = [...data.pic_ids];
        const index = currentPics.indexOf(userId);

        if (index > -1) {
            // Remove from the list
            currentPics.splice(index, 1);
        } else {
            // Add to the list
            currentPics.push(userId);
        }

        setData('pic_ids', currentPics);
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
                            Assign additional Person in Charge (PIC) to help manage this event. PICs can edit event details, 
                            manage registrations, and oversee the event.
                        </p>

                        <form onSubmit={handleSubmit}>
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

                                    {/* Current PICs that can be managed */}
                                    {event.pics
                                        .filter(pic => !pic.pivot.is_creator)
                                        .map(pic => (
                                            <div key={pic.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <span className="font-medium">{pic.name}</span>
                                                </div>
                                                <Checkbox
                                                    name={`pic_${pic.id}`}
                                                    checked={data.pic_ids.includes(pic.id)}
                                                    onChange={() => handleTogglePIC(pic.id)}
                                                />
                                            </div>
                                        ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-medium mb-2">Available Users</h3>
                                {availableUsers.length > 0 ? (
                                    <div className="space-y-2">
                                        {availableUsers.map(user => (
                                            <div key={user.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                                                <div className="flex-1">
                                                    <span className="font-medium">{user.name}</span>
                                                </div>
                                                <Checkbox
                                                    name={`pic_${user.id}`}
                                                    checked={data.pic_ids.includes(user.id)}
                                                    onChange={() => handleTogglePIC(user.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">No additional users available to assign as PICs.</p>
                                )}
                            </div>

                            <InputError message={errors.pic_ids} className="mt-2" />

                            <div className="flex justify-end">
                                <PrimaryButton type="submit" disabled={processing}>
                                    Save Changes
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
