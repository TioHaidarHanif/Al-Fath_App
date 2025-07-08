import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function Show({ auth, event, userRegistration, isPic, isCreator }) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this event?')) {
            router.delete(route('events.destroy', event.id));
        }
    };

    const handleCancelRegistration = () => {
        if (confirm('Are you sure you want to cancel your registration?')) {
            router.delete(route('events.register.cancel', event.id));
        }
    };

    const isEventFull = event.max_participants && event.registrations.filter(r => r.status === 'approved').length >= event.max_participants;
    const isUpcoming = new Date(event.start_time) > new Date();
    const hasStarted = new Date(event.start_time) <= new Date();
    const hasEnded = new Date(event.end_time) < new Date();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Details</h2>}
        >
            <Head title={event.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* Event Header */}
                        <div className="relative h-64 md:h-80 bg-gray-200">
                            {event.image_path ? (
                                <img
                                    src={`/storage/${event.image_path}`}
                                    alt={event.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <span className="text-gray-400 text-lg">No image available</span>
                                </div>
                            )}
                        </div>

                        {/* Event Content */}
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                                <h1 className="text-3xl font-bold mb-2 md:mb-0">{event.name}</h1>
                                <div className="flex space-x-2">
                                    {isPic && (
                                        <>
                                            <Link href={route('events.edit', event.id)}>
                                                <SecondaryButton>Edit Event</SecondaryButton>
                                            </Link>
                                            <Link href={route('events.registrations.index', event.id)}>
                                                <SecondaryButton>Manage Registrations</SecondaryButton>
                                            </Link>
                                            <Link href={route('events.presences', event.id)}>
                                                <SecondaryButton>Attendance</SecondaryButton>
                                            </Link>
                                            <Link href={route('events.scan', event.id)}>
                                                <SecondaryButton>Scan QR</SecondaryButton>
                                            </Link>
                                            {isCreator && (
                                                <Link href={route('events.pics', event.id)}>
                                                    <SecondaryButton>Manage PICs</SecondaryButton>
                                                </Link>
                                            )}
                                            <DangerButton onClick={handleDelete}>Delete</DangerButton>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                                        <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold mb-2">Event Details</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-500 text-sm">Start Time</p>
                                                <p className="text-gray-800">
                                                    {format(new Date(event.start_time), 'MMMM d, yyyy • h:mm a')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">End Time</p>
                                                <p className="text-gray-800">
                                                    {format(new Date(event.end_time), 'MMMM d, yyyy • h:mm a')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">Location</p>
                                                <p className="text-gray-800">{event.location}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">Organized by</p>
                                                <p className="text-gray-800">{event.creator.name}</p>
                                            </div>
                                            {event.max_participants && (
                                                <div>
                                                    <p className="text-gray-500 text-sm">Capacity</p>
                                                    <p className="text-gray-800">
                                                        {event.registrations.filter(r => r.status === 'approved').length} / {event.max_participants} participants
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isPic && (
                                        <div>
                                            <h2 className="text-xl font-semibold mb-2">Event PICs</h2>
                                            <div className="space-y-2">
                                                {event.pics.map((pic) => (
                                                    <div key={pic.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                                                        <span className="text-gray-800">{pic.name}</span>
                                                        {pic.pivot.is_creator && (
                                                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                                Creator
                                                            </span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h2 className="text-xl font-semibold mb-4">Registration</h2>

                                    {hasEnded ? (
                                        <div className="bg-gray-100 p-4 rounded-md mb-4">
                                            <p className="text-gray-600">This event has ended.</p>
                                        </div>
                                    ) : isEventFull && !userRegistration ? (
                                        <div className="bg-yellow-100 p-4 rounded-md mb-4">
                                            <p className="text-yellow-800">This event is at full capacity.</p>
                                        </div>
                                    ) : null}

                                    {auth.user ? (
                                        userRegistration ? (
                                            <div className="space-y-4">
                                                <div className="bg-green-100 p-4 rounded-md">
                                                    <p className="text-green-800 font-medium">
                                                        You are registered for this event!
                                                    </p>
                                                    <p className="text-green-700 text-sm mt-1">
                                                        Status: <span className="font-medium capitalize">{userRegistration.status}</span>
                                                    </p>
                                                </div>

                                                {!hasStarted && (
                                                    <DangerButton onClick={handleCancelRegistration}>
                                                        Cancel Registration
                                                    </DangerButton>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                {!hasEnded && !isEventFull && (
                                                    <Link href={route('events.register', event.id)}>
                                                        <PrimaryButton className="w-full justify-center">
                                                            Register for this Event
                                                        </PrimaryButton>
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    ) : (
                                        <div className="bg-blue-100 p-4 rounded-md">
                                            <p className="text-blue-800">
                                                Please <Link href={route('login')} className="underline">login</Link> to register for this event.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
