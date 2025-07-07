import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import { format } from 'date-fns';

export default function Create({ auth, event }) {
    const { data, setData, post, processing, errors } = useForm({
        form_data: {
            fullName: auth.user.name,
            email: auth.user.email,
            phone: '',
            emergencyContact: '',
            specialRequirements: '',
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.register.store', event.id), {
            preserveScroll: true,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData('form_data', {
            ...data.form_data,
            [name]: value,
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Register for Event</h2>}
        >
            <Head title={`Register for ${event.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">{event.name}</h2>
                            <p className="text-gray-600 mt-1">
                                {format(new Date(event.start_time), 'MMMM d, yyyy • h:mm a')} at {event.location}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="fullName" value="Full Name" />
                                <TextInput
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    value={data.form_data.fullName}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors['form_data.fullName']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.form_data.email}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors['form_data.email']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="phone" value="Phone Number" />
                                <TextInput
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={data.form_data.phone}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                    required
                                />
                                <InputError message={errors['form_data.phone']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="emergencyContact" value="Emergency Contact (Name & Phone)" />
                                <TextInput
                                    id="emergencyContact"
                                    type="text"
                                    name="emergencyContact"
                                    value={data.form_data.emergencyContact}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                />
                                <InputError message={errors['form_data.emergencyContact']} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="specialRequirements" value="Special Requirements or Notes" />
                                <TextArea
                                    id="specialRequirements"
                                    name="specialRequirements"
                                    value={data.form_data.specialRequirements}
                                    className="mt-1 block w-full"
                                    onChange={handleInputChange}
                                    rows={3}
                                />
                                <InputError message={errors['form_data.specialRequirements']} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-6">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Complete Registration
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
