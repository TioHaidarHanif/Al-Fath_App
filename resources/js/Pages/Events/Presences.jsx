import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function Presences({ auth, event, presences }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Attendance</h2>}
        >
            <Head title={`${event.name} - Attendance`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Events', href: route('events.index') },
                            { name: event.name, href: route('events.show', event.id) },
                            { name: 'Attendance Records' },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">{event.name} - Attendance Records</h1>
                        <div className="flex gap-2">
                            <ActionButton
                                as="link"
                                href={route('events.show', event.id)}
                                color="secondary"
                            >
                                Event Details
                            </ActionButton>
                            
                            <ActionButton
                                as="link"
                                href={route('events.scan', event.id)}
                                color="primary"
                            >
                                Scan QR Codes
                            </ActionButton>
                        </div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <p className="text-text-secondary">
                                        <span className="font-semibold">Location:</span> {event.location}
                                    </p>
                                    <p className="text-text-secondary">
                                        <span className="font-semibold">Time:</span> {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
                                    </p>
                                </div>
                                <div className="text-text-secondary text-right">
                                    <p><span className="font-semibold">Total Attendance:</span> {presences.length}</p>
                                </div>
                            </div>
                        </div>

                        {presences.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Participant
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Scanned By
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                IP Address
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {presences.map((presence) => (
                                            <tr key={presence.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {presence.user.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {presence.user.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{presence.admin.name}</div>
                                                    <div className="text-sm text-gray-500">{presence.admin.email}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {new Date(presence.scanned_at).toLocaleString()}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {presence.location || 'N/A'}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {presence.ip_address || 'N/A'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <p className="text-lg text-gray-500">No attendance records yet.</p>
                                <p className="text-sm text-gray-400 mt-2">Start scanning QR codes to record attendance.</p>
                                <div className="mt-4">
                                    <ActionButton
                                        as="link"
                                        href={route('events.scan', event.id)}
                                        color="primary"
                                    >
                                        Scan QR Codes
                                    </ActionButton>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
