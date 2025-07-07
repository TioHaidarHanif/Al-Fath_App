import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function Events({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Event Management</h2>}
        >
            <Head title="Admin Events" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Admin Dashboard', href: route('admin.dashboard') },
                            { name: 'Event Management' },
                        ]} 
                    />
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Event Management</h1>
                        <p className="text-text-secondary">Comprehensive overview of all events and related activities.</p>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        <ActionButton
                            as="link"
                            href={route('events.index')}
                            color="primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            All Events
                        </ActionButton>
                        
                        <ActionButton
                            as="link"
                            href={route('events.create')}
                            color="primary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Create Event
                        </ActionButton>
                        
                        <ActionButton
                            as="link"
                            href={route('admin.dashboard')}
                            color="secondary"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                            Back to Dashboard
                        </ActionButton>
                    </div>
                    
                    {/* Event Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <StatCard 
                            title="Total Events"
                            value="--"
                            color="bg-blue-500"
                        />
                        <StatCard 
                            title="Active Events"
                            value="--"
                            color="bg-green-500"
                        />
                        <StatCard 
                            title="Total Registrations"
                            value="--"
                            color="bg-accent-2"
                        />
                        <StatCard 
                            title="Events Today"
                            value="--"
                            color="bg-yellow-500"
                        />
                    </div>
                    
                    {/* Management Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recent Events */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-accent-2 text-white flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Recent Events</h2>
                                <Link href={route('events.index')} className="text-sm text-white hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-center py-4">Connect to event data to display recent events</p>
                            </div>
                        </div>
                        
                        {/* Recent Registrations */}
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-accent-1 text-white flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Recent Registrations</h2>
                                <Link href="#" className="text-sm text-white hover:underline">
                                    View All
                                </Link>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-500 text-center py-4">Connect to registration data to display recent registrations</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Event Management Features */}
                    <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-text-primary text-white">
                            <h2 className="text-xl font-semibold">Event Management Tools</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <FeatureCard
                                    title="Manage Event PICs"
                                    description="Add or remove event point of contacts"
                                    link="#"
                                />
                                <FeatureCard
                                    title="Approve Registrations"
                                    description="Batch approve/reject registrations"
                                    link="#"
                                />
                                <FeatureCard
                                    title="Event Categories"
                                    description="Organize events by categories"
                                    link="#"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Stat card component
function StatCard({ title, value, color }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className={`w-full h-2 ${color} rounded-full mb-4`}></div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-3xl font-bold text-text-primary">{value}</p>
        </div>
    );
}

// Feature card component
function FeatureCard({ title, description, link }) {
    return (
        <Link href={link} className="block">
            <div className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 h-full">
                <div className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">{title}</h3>
                    <p className="text-text-secondary text-sm">{description}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-accent-2 text-sm font-medium border-t border-gray-200">
                    Access →
                </div>
            </div>
        </Link>
    );
}
