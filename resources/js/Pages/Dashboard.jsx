import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const isAdmin = auth.user?.role === 'admin';
    const isMember = auth.user?.role === 'member' || isAdmin;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-text-primary mb-4">Welcome, {auth.user.name}!</h2>
                        <p className="text-text-secondary">Use the feature cards below to quickly navigate to the main sections of Al-Fath App.</p>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Event Management</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <FeatureCard 
                            title="Browse Events" 
                            description="Explore all available events"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            }
                            link={route('events.index')}
                        />
                        <FeatureCard 
                            title="My Events" 
                            description="View events you're involved with"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            }
                            link={route('events.my')}
                        />
                        {isMember && (
                            <FeatureCard 
                                title="Create Event" 
                                description="Start a new event as organizer"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                }
                                link={route('events.create')}
                            />
                        )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-text-primary mb-4">Profile & Account</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <FeatureCard 
                            title="My Profile" 
                            description="View and edit your personal profile"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                            link={route('profile.edit')}
                        />
                        <FeatureCard 
                            title="QR Code" 
                            description="View your personal QR code"
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            }
                            link={route('profile.qrcode')}
                        />
                    
                    </div>
                    
                    {isAdmin && (
                        <>
                            <h3 className="text-xl font-semibold text-text-primary mb-4">Admin Panel</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <FeatureCard 
                                    title="Admin Dashboard" 
                                    description="Access the central admin control panel"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    }
                                    link={route('admin.dashboard')}
                                />
                                <FeatureCard 
                                    title="User Management" 
                                    description="Manage users and roles"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    }
                                    link={route('users.index')}
                                />
                                <FeatureCard 
                                    title="Event Management" 
                                    description="Comprehensive event overview and management"
                                    icon={
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    }
                                    link={route('admin.events')}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

// Feature card component for dashboard navigation
function FeatureCard({ title, description, icon, link }) {
    return (
        <Link href={link} className="block">
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden h-full">
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="text-accent-2 mr-4">
                            {icon}
                        </div>
                        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    </div>
                    <p className="text-text-secondary">{description}</p>
                </div>
                <div className="bg-accent-2/10 px-6 py-3 text-accent-2 text-sm font-medium">
                    Access Now →
                </div>
            </div>
        </Link>
    );
}
