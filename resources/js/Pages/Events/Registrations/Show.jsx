import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import TextArea from '@/Components/TextArea';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function Show({ auth, event, registration }) {
    const { data, setData, post, patch, processing, errors, reset } = useForm({
        status: registration.status,
        notes: registration.notes || '',
    });

    const statusOptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'attended', label: 'Attended' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('events.registrations.update', [event.id, registration.id]), {
            preserveScroll: true,
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this registration?')) {
            router.delete(route('events.registrations.destroy', [event.id, registration.id]));
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'attended':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Registration Details</h2>}
        >
            <Head title={`Registration - ${registration.user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold">{event.name}</h2>
                                <p className="text-gray-600">Registration for {registration.user.name}</p>
                            </div>
                            <div className="flex space-x-2">
                                <Link href={route('events.registrations.index', event.id)}>
                                    <SecondaryButton>Back to All Registrations</SecondaryButton>
                                </Link>
                                <DangerButton onClick={handleDelete}>Delete Registration</DangerButton>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                                    <h3 className="text-lg font-medium mb-4">Registration Information</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Full Name</p>
                                            <p className="font-medium">{registration.form_data.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{registration.form_data.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-medium">{registration.form_data.phone || 'Not provided'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Emergency Contact</p>
                                            <p className="font-medium">{registration.form_data.emergencyContact || 'Not provided'}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <p className="text-sm text-gray-500">Special Requirements</p>
                                            <p className="font-medium">
                                                {registration.form_data.specialRequirements || 'None'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">User Details</h3>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-500">User ID</p>
                                            <p className="font-medium">{registration.user.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Name</p>
                                            <p className="font-medium">{registration.user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-medium">{registration.user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Role</p>
                                            <p className="font-medium capitalize">{registration.user.role}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Registered On</p>
                                            <p className="font-medium">
                                                {format(new Date(registration.created_at), 'MMMM d, yyyy • h:mm a')}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Last Updated</p>
                                            <p className="font-medium">
                                                {format(new Date(registration.updated_at), 'MMMM d, yyyy • h:mm a')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Update Status</h3>
                                    
                                    <div className="mb-4">
                                        <InputLabel htmlFor="status" value="Registration Status" />
                                        <div className="mt-1">
                                            <select
                                                id="status"
                                                name="status"
                                                value={data.status}
                                                onChange={(e) => setData('status', e.target.value)}
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                            >
                                                {statusOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <InputError message={errors.status} className="mt-2" />
                                    </div>

                                    <div className="mb-4">
                                        <InputLabel htmlFor="notes" value="Admin Notes" />
                                        <TextArea
                                            id="notes"
                                            name="notes"
                                            value={data.notes}
                                            onChange={(e) => setData('notes', e.target.value)}
                                            className="mt-1 block w-full"
                                            rows={4}
                                            placeholder="Add any notes about this registration..."
                                        />
                                        <InputError message={errors.notes} className="mt-2" />
                                    </div>

                                    <div className="mt-6">
                                        <PrimaryButton type="submit" disabled={processing} className="w-full justify-center">
                                            Update Registration
                                        </PrimaryButton>
                                    </div>
                                </form>

                                <div className="mt-6 bg-gray-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-medium mb-4">Current Status</h3>
                                    <div className="flex items-center">
                                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${getStatusBadgeClass(registration.status)}`}>
                                            {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
