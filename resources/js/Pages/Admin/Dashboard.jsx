import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Admin Dashboard' },
                        ]} 
                    />
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
                        <p className="text-text-secondary">Manage all aspects of Al-Fath App from this central admin panel.</p>
                    </div>
                    
                    {/* User Management Section */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 bg-accent-2 text-white">
                            <h2 className="text-xl font-semibold">User Management</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AdminCard
                                    title="User List"
                                    description="View and manage all registered users"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    }
                                    link={route('users.index')}
                                />
                                <AdminCard
                                    title="Create User"
                                    description="Add a new user to the system"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                        </svg>
                                    }
                                    link={route('users.create')}
                                />
                                <AdminCard
                                    title="Activity Logs"
                                    description="View user activity and system logs"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    }
                                    link={route('admin.logging')}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Event Management Section */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                        <div className="px-6 py-4 bg-accent-1 text-white">
                            <h2 className="text-xl font-semibold">Event Management</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <AdminCard
                                    title="All Events"
                                    description="View and manage all events"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    link={route('events.index')}
                                />
                                <AdminCard
                                    title="Create Event"
                                    description="Create a new event"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                    link={route('events.create')}
                                />
                                <AdminCard
                                    title="Event Overview"
                                    description="Get a summary of all event activities"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    }
                                    link={route('admin.events')}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* System Settings */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-text-primary text-white">
                            <h2 className="text-xl font-semibold">System Settings</h2>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             
                                <AdminCard
                                    title="Style Guide"
                                    description="View application style guidelines"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                        </svg>
                                    }
                                    link={route('style.guide')}
                                />
                            </div>
                        </div>
                    </div>
                    
                    {/* Quick Stats */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <QuickStat 
                            title="Total Users"
                            value="--"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            }
                            color="bg-blue-500"
                        />
                        <QuickStat 
                            title="Active Events"
                            value="--"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                            color="bg-green-500"
                        />
                        <QuickStat 
                            title="Registrations"
                            value="--"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            color="bg-accent-2"
                        />
                        <QuickStat 
                            title="Activities Today"
                            value="--"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            color="bg-yellow-500"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Admin feature card component
function AdminCard({ title, description, icon, link }) {
    return (
        <Link href={link} className="block">
            <div className="border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200 h-full flex flex-col">
                <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                        <div className="text-accent-2 mr-4">
                            {icon}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    </div>
                    <p className="text-text-secondary text-sm">{description}</p>
                </div>
                <div className="bg-gray-50 px-6 py-3 text-accent-2 text-sm font-medium border-t border-gray-200">
                    Access →
                </div>
            </div>
        </Link>
    );
}

// Quick stat component
function QuickStat({ title, value, icon, color }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center">
            <div className={`p-3 rounded-full ${color} text-white mr-4`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-xl font-bold text-text-primary">{value}</p>
            </div>
        </div>
    );
}
