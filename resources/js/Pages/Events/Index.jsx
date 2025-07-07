import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { format } from 'date-fns';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import Pagination from '@/Components/Pagination';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function Index({ auth, events, filters }) {
    const [searchParams, setSearchParams] = useState({
        search: filters.search || '',
        location: filters.location || '',
        date_from: filters.date_from || '',
        date_to: filters.date_to || '',
    });
    
    const isLoggedIn = auth.user !== null;
    const isMember = isLoggedIn && (auth.user.role === 'member' || auth.user.role === 'admin');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('events.index'), searchParams);
    
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const clearFilters = () => {
        setSearchParams({
            search: '',
            location: '',
            date_from: '',
            date_to: '',
        });
        router.get(route('events.index'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Events</h2>}
        >
            <Head title="Events" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Events', href: route('events.index') },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">Browse Events</h1>
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
                                href={route('events.my')}
                                color="secondary"
                            >
                                My Events
                            </ActionButton>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 mb-6">
                        {/* Filters */}
                        <h3 className="text-lg font-semibold mb-4 text-text-primary">Find Events</h3>
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <InputLabel htmlFor="search" value="Search" />
                                    <TextInput
                                        id="search"
                                        name="search"
                                        value={searchParams.search}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full"
                                        placeholder="Event name..."
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="location" value="Location" />
                                    <TextInput
                                        id="location"
                                        name="location"
                                        value={searchParams.location}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full"
                                        placeholder="Location..."
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="date_from" value="From Date" />
                                    <TextInput
                                        id="date_from"
                                        type="date"
                                        name="date_from"
                                        value={searchParams.date_from}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="date_to" value="To Date" />
                                    <TextInput
                                        id="date_to"
                                        type="date"
                                        name="date_to"
                                        value={searchParams.date_to}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                <div className="flex space-x-2 md:col-span-4">
                                    <PrimaryButton type="submit">Search</PrimaryButton>
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Clear Filters
                                    </button>
                                    {auth.user && (
                                        <Link href={route('events.create')}>
                                            <PrimaryButton type="button">Create Event</PrimaryButton>
                                        </Link>
                                    )}
                                </div>
                            </form>
                        </div>

                        {/* Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {events.data.length > 0 ? (
                                events.data.map((event) => (
                                    <div key={event.id} className="bg-white border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                        <div className="h-48 bg-gray-200 overflow-hidden">
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
                                            <h3 className="text-xl font-semibold mb-2 truncate">{event.name}</h3>
                                            <p className="text-sm text-gray-500 mb-2">
                                                <span className="font-medium">Date:</span>{' '}
                                                {format(new Date(event.start_time), 'MMM d, yyyy • h:mm a')}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-2">
                                                <span className="font-medium">Location:</span> {event.location}
                                            </p>
                                            <p className="text-sm text-gray-500 mb-4">
                                                <span className="font-medium">Registrations:</span> {event.registrations_count || 0}
                                                {event.max_participants && ` / ${event.max_participants}`}
                                            </p>                            <Link
                                href={route('events.show', event.id)}
                                className="block w-full text-center py-2 px-4 bg-accent-2 hover:bg-accent-2/90 text-white font-medium rounded-md transition-colors duration-300"
                            >
                                View Details
                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-3 text-center py-8">
                                    <h3 className="text-lg font-medium text-gray-500">No events found</h3>
                                    <p className="text-gray-400 mt-2">Try adjusting your search filters</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6">
                            <Pagination links={events.links} />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
    );
}
