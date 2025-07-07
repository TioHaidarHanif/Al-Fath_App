import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import Dropdown from '@/Components/Dropdown';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, event, registrations }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedRegistrations, setSelectedRegistrations] = useState([]);
    const [bulkAction, setBulkAction] = useState('');

    const filteredRegistrations = registrations.filter(registration => {
        const matchesSearch = 
            registration.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            registration.user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'all' || registration.status === statusFilter;
        
        return matchesSearch && matchesStatus;
    });

    const handleStatusChange = (registration, status) => {
        router.post(route('events.registrations.update', [event.id, registration.id]), {
            status,
        });
    };

    const handleDelete = (registration) => {
        if (confirm('Are you sure you want to delete this registration?')) {
            router.delete(route('events.registrations.destroy', [event.id, registration.id]));
        }
    };

    const toggleSelectRegistration = (registrationId) => {
        if (selectedRegistrations.includes(registrationId)) {
            setSelectedRegistrations(selectedRegistrations.filter(id => id !== registrationId));
        } else {
            setSelectedRegistrations([...selectedRegistrations, registrationId]);
        }
    };

    const selectAll = () => {
        if (selectedRegistrations.length === filteredRegistrations.length) {
            setSelectedRegistrations([]);
        } else {
            setSelectedRegistrations(filteredRegistrations.map(r => r.id));
        }
    };

    const applyBulkAction = () => {
        if (!bulkAction || selectedRegistrations.length === 0) return;

        if (bulkAction === 'delete') {
            if (confirm(`Are you sure you want to delete ${selectedRegistrations.length} registrations?`)) {
                // Loop through and delete each one individually since we don't have a bulk delete endpoint
                selectedRegistrations.forEach(id => {
                    router.delete(route('events.registrations.destroy', [event.id, id]));
                });
                setSelectedRegistrations([]);
            }
        } else {
            // Update status in bulk
            router.post(route('events.registrations.batch', event.id), {
                registrations: selectedRegistrations.map(id => ({
                    id,
                    status: bulkAction,
                })),
            });
            setSelectedRegistrations([]);
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
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manage Registrations</h2>}
        >
            <Head title={`Registrations - ${event.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{event.name} - Registrations</h2>
                            <Link href={route('events.show', event.id)}>
                                <SecondaryButton>Back to Event</SecondaryButton>
                            </Link>
                        </div>

                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                                <div className="w-full md:w-64">
                                    <InputLabel htmlFor="search" value="Search" className="sr-only" />
                                    <TextInput
                                        id="search"
                                        type="text"
                                        placeholder="Search by name or email"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="block w-full"
                                    />
                                </div>
                                <div>
                                    <select
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="attended">Attended</option>
                                    </select>
                                </div>
                            </div>
                            
                            {selectedRegistrations.length > 0 && (
                                <div className="flex items-center space-x-2">
                                    <select
                                        value={bulkAction}
                                        onChange={(e) => setBulkAction(e.target.value)}
                                        className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                    >
                                        <option value="">Bulk Actions</option>
                                        <option value="approved">Approve</option>
                                        <option value="rejected">Reject</option>
                                        <option value="attended">Mark as Attended</option>
                                        <option value="delete">Delete</option>
                                    </select>
                                    <PrimaryButton
                                        onClick={applyBulkAction}
                                        disabled={!bulkAction || selectedRegistrations.length === 0}
                                    >
                                        Apply
                                    </PrimaryButton>
                                </div>
                            )}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                    checked={selectedRegistrations.length === filteredRegistrations.length && filteredRegistrations.length > 0}
                                                    onChange={selectAll}
                                                />
                                            </div>
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Participant
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Registered On
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredRegistrations.length > 0 ? (
                                        filteredRegistrations.map((registration) => (
                                            <tr key={registration.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                                        checked={selectedRegistrations.includes(registration.id)}
                                                        onChange={() => toggleSelectRegistration(registration.id)}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {registration.user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {registration.user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <select
                                                        value={registration.status}
                                                        onChange={e => handleStatusChange(registration, e.target.value)}
                                                        className={`px-2 py-1 rounded-md border focus:outline-none ${getStatusBadgeClass(registration.status)}`}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="approved">Approved</option>
                                                        <option value="rejected">Rejected</option>
                                                        <option value="attended">Attended</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {format(new Date(registration.created_at), 'MMM d, yyyy • h:mm a')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex items-center space-x-2">
                                                        <Link 
                                                            href={route('events.registrations.show', [event.id, registration.id])}
                                                            className="text-indigo-600 hover:text-indigo-900"
                                                        >
                                                            View
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(registration)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                                No registrations found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
