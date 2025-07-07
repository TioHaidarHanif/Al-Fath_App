import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import PrimaryButton from '@/Components/PrimaryButton';
import Tab from '@/Components/Tab';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function MyEvents({ auth, createdEvents, managedEvents, registeredEvents }) {
    const [activeTab, setActiveTab] = useState('created');
    const isMember = auth.user?.role === 'member' || auth.user?.role === 'admin';

    const renderEventCard = (event, role) => (
        <div key={event.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="h-40 bg-gray-200 overflow-hidden">
                {event.image_path ? (
                    <img
                        src={`/storage/${event.image_path}`}
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">{event.name}</h3>
                <p className="text-sm text-gray-500 mb-2">
                    <span className="font-medium">Date:</span>{' '}
                    {format(new Date(event.start_time), 'MMM d, yyyy • h:mm a')}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Location:</span> {event.location}
                </p>
                <Link
                    href={route('events.show', event.id)}
                    className="block w-full text-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition-colors duration-300"
                >
                    View Details
                </Link>
            </div>
        </div>
    );

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Events</h2>}
        >
            <Head title="My Events" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Events', href: route('events.index') },
                            { name: 'My Events' },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">My Events</h1>
                        <div className="flex gap-2">
                            {isMember && (
                                <ActionButton
                                    as="link"
                                    href={route('events.create')}
                                    color="primary"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                    Create Event
                                </ActionButton>
                            )}
                            
                            <ActionButton
                                as="link"
                                href={route('events.index')}
                                color="secondary"
                            >
                                All Events
                            </ActionButton>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex space-x-1 border-b">
                                <Tab
                                    active={activeTab === 'created'}
                                    onClick={() => setActiveTab('created')}
                                >
                                    Created by Me ({createdEvents.length})
                                </Tab>
                                <Tab
                                    active={activeTab === 'managed'}
                                    onClick={() => setActiveTab('managed')}
                                >
                                    I'm a PIC ({managedEvents.length})
                                </Tab>
                                <Tab
                                    active={activeTab === 'registered'}
                                    onClick={() => setActiveTab('registered')}
                                >
                                    Registered ({registeredEvents.length})
                                </Tab>
                            </div>
                            <Link href={route('events.create')}>
                                <PrimaryButton>Create New Event</PrimaryButton>
                            </Link>
                        </div>

                        {activeTab === 'created' && (
                            <div>
                                {createdEvents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {createdEvents.map(event => renderEventCard(event))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-lg font-medium text-gray-500">You haven't created any events yet</h3>
                                        <p className="text-gray-400 mt-2">Create your first event to see it here</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'managed' && (
                            <div>
                                {managedEvents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {managedEvents.map(event => renderEventCard(event))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-lg font-medium text-gray-500">You're not a PIC for any events</h3>
                                        <p className="text-gray-400 mt-2">Events where you're assigned as a PIC will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'registered' && (
                            <div>
                                {registeredEvents.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {registeredEvents.map(event => renderEventCard(event))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <h3 className="text-lg font-medium text-gray-500">You haven't registered for any events</h3>
                                        <p className="text-gray-400 mt-2">Events you register for will appear here</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
