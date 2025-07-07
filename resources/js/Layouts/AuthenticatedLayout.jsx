import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isAdmin = user?.role === 'admin';
    const isMember = user?.role === 'member' || isAdmin;

    return (
        <div className="min-h-screen bg-main-bg flex flex-col">
            <nav className="bg-text-secondary text-white shadow-md">
                <div className="container-fluid">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src="/logo.png" alt="Al-Fath Logo" className="block h-12 w-auto" />
                                </Link>
                            </div>

                            <div className="hidden space-x-6 sm:-my-px sm:ms-10 sm:flex items-center">
                                <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-white hover:text-accent-1">
                                    Dashboard
                                </NavLink>
                                
                                {/* Events Dropdown */}
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-accent-1 focus:outline-none transition ease-in-out duration-150 ${route().current('events.*') ? 'text-accent-1' : ''}`}
                                            >
                                                Events
                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content width="48">
                                        <Dropdown.Link href={route('events.index')}>All Events</Dropdown.Link>
                                        <Dropdown.Link href={route('events.my')}>My Events</Dropdown.Link>
                                        {isMember && (
                                            <Dropdown.Link href={route('events.create')}>Create Event</Dropdown.Link>
                                        )}
                                    </Dropdown.Content>
                                </Dropdown>

                                {/* Admin Panel (Only visible to admins) */}
                                {isAdmin && (
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-accent-1 focus:outline-none transition ease-in-out duration-150 ${route().current('admin.*') || route().current('users.*') ? 'text-accent-1' : ''}`}
                                                >
                                                    Admin Panel
                                                    <svg
                                                        className="ms-2 -me-0.5 h-4 w-4"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content width="48">
                                            <Dropdown.Link href={route('admin.dashboard')}>Admin Dashboard</Dropdown.Link>
                                            <Dropdown.Link href={route('users.index')}>User Management</Dropdown.Link>
                                            <Dropdown.Link href={route('admin.events')}>Event Management</Dropdown.Link>
                                            <Dropdown.Link href={route('admin.logging')}>Activity Logs</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                )}
                                
                          
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ms-6">
                            <div className="ms-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white hover:text-accent-1 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>My Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('profile.qrcode')}>
                                            Show QR Code
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-accent-1 hover:bg-text-secondary/80 focus:outline-none focus:bg-text-secondary/80 focus:text-accent-1 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden bg-text-secondary text-white'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} className="text-white hover:text-accent-1">
                            Dashboard
                        </ResponsiveNavLink>
                        
                        {/* Mobile Events Navigation */}
                        <div className="border-l-4 border-transparent pl-4 py-1 mb-1 text-white font-semibold">
                            Events
                        </div>
                        <ResponsiveNavLink href={route('events.index')} active={route().current('events.index')} className="text-white hover:text-accent-1 pl-8">
                            All Events
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('events.my')} active={route().current('events.my')} className="text-white hover:text-accent-1 pl-8">
                            My Events
                        </ResponsiveNavLink>
                        {isMember && (
                            <ResponsiveNavLink href={route('events.create')} active={route().current('events.create')} className="text-white hover:text-accent-1 pl-8">
                                Create Event
                            </ResponsiveNavLink>
                        )}
                        
                        {/* Mobile Admin Panel */}
                        {isAdmin && (
                            <>
                                <div className="border-l-4 border-transparent pl-4 py-1 mb-1 mt-2 text-white font-semibold">
                                    Admin Panel
                                </div>
                                <ResponsiveNavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')} className="text-white hover:text-accent-1 pl-8">
                                    Admin Dashboard
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('users.index')} active={route().current('users.index')} className="text-white hover:text-accent-1 pl-8">
                                    User Management
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('admin.events')} active={route().current('admin.events')} className="text-white hover:text-accent-1 pl-8">
                                    Event Management
                                </ResponsiveNavLink>
                                <ResponsiveNavLink href={route('admin.logging')} active={route().current('admin.logging')} className="text-white hover:text-accent-1 pl-8">
                                    Activity Logs
                                </ResponsiveNavLink>
                            </>
                        )}
                        
                        {/* Mobile Profile Management */}
                        <ResponsiveNavLink href={route('users.index')} active={route().current('users.*')} className="text-white hover:text-accent-1 mt-2">
                            Profile Management Kocak
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-text-secondary/30">
                        <div className="px-4">
                            <div className="font-medium text-base text-white">{user.name}</div>
                            <div className="font-medium text-sm text-accent-1">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-white hover:text-accent-1">My Profile</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('profile.qrcode')} className="text-white hover:text-accent-1">
                                Show QR Code
                            </ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-white hover:text-accent-1">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow-sm">
                    <div className="container-fluid py-6">{header}</div>
                </header>
            )}

            <main className="py-8 flex-1">
                <div className="container-fluid">
                    {children}
                </div>
            </main>

            <footer className="bg-text-primary text-white py-4 mt-8">
                <div className="container-fluid flex flex-col md:flex-row justify-between items-center">
                    <span className="font-heading text-lg">Al-Fath App</span>
                    <span className="text-sm mt-2 md:mt-0">&copy; {new Date().getFullYear()} All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}

