import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome to Al-Fath" />
            <div className="relative min-h-screen bg-main-bg selection:bg-accent-2 selection:text-white">
                {/* Header/Navigation */}
                <header className="w-full bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <img src="/Al-Fath.png" alt="Al-Fath Logo" className="h-8 w-auto" />
                                <span className="ml-2 text-xl font-heading font-bold text-accent-1">Al-Fath</span>
                            </div>
                            <nav className="hidden md:flex space-x-8">
                                <a href="#features" className="text-text-primary hover:text-accent-2 px-3 py-2 text-sm font-medium">Features</a>
                                <a href="#about" className="text-text-primary hover:text-accent-2 px-3 py-2 text-sm font-medium">About</a>
                                <a href="#events" className="text-text-primary hover:text-accent-2 px-3 py-2 text-sm font-medium">Events</a>
                                <a href="#blog" className="text-text-primary hover:text-accent-2 px-3 py-2 text-sm font-medium">Blog</a>
                            </nav>
                            <div className="flex items-center">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent-1 hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-accent-4 hover:text-accent-2 px-3 py-2 text-sm font-medium"
                                        >
                                            Log in
                                        </Link>

                                        <Link
                                            href={route('register')}
                                            className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-accent-1 hover:bg-accent-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-1"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-accent-1/10 to-accent-3/10 pt-16 pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                <div className="mt-1">
                                    <img src="/bismillah.png" alt="Bismillah" className="h-8 mb-4 inline-block" />
                                    <h1 className="text-4xl tracking-tight font-heading font-bold text-text-primary sm:text-5xl md:text-6xl">
                                        <span className="block">Connecting the</span>
                                        <span className="block text-accent-1">Muslim Community</span>
                                    </h1>
                                    <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Al-Fath is a single platform for Muslim communities to collaborate, 
                                        organize events, share knowledge, and build stronger connections.
                                    </p>
                                    <div className="mt-8 sm:mt-12">
                                        <div className="rounded-md shadow">
                                            <Link
                                                href={route('register')}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-1 hover:bg-accent-2 md:py-4 md:text-lg md:px-10"
                                            >
                                                Join Our Community
                                            </Link>
                                        </div>
                                        <div className="mt-3">
                                            <Link
                                                href="#features"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-accent-1 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
                                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                    <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                                        <img
                                            src="/logo.png"
                                            alt="Al-Fath Logo"
                                            className="w-full h-64 object-contain"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-accent-1 bg-opacity-75 rounded-full p-4 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Featured Organizations Section */}
                <div className="bg-white py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <p className="text-center text-sm font-semibold uppercase tracking-wide text-text-secondary">
                            Trusted by Islamic organizations around the world
                        </p>
                        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img className="h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://placehold.co/120x40?text=Organization" alt="Organization" />
                            </div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img className="h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://placehold.co/120x40?text=Organization" alt="Organization" />
                            </div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img className="h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://placehold.co/120x40?text=Organization" alt="Organization" />
                            </div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img className="h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://placehold.co/120x40?text=Organization" alt="Organization" />
                            </div>
                            <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                                <img className="h-12 opacity-70 hover:opacity-100 transition-opacity" src="https://placehold.co/120x40?text=Organization" alt="Organization" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div id="features" className="py-16 bg-gray-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-accent-1 font-semibold tracking-wide uppercase">Features</h2>
                            <p className="mt-2 text-3xl leading-8 font-heading font-bold tracking-tight text-text-primary sm:text-4xl">
                                Everything your community needs
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-text-secondary lg:mx-auto">
                                Al-Fath provides all the tools needed to build, manage, and grow your Muslim community.
                            </p>
                        </div>

                        <div className="mt-16">
                            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                                {/* Feature 1 */}
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-1 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-heading font-medium text-text-primary">Event Management</h3>
                                        <p className="mt-2 text-base text-text-secondary">
                                            Create, manage, and promote Islamic events. Track attendance with QR code scanning and get real-time insights.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-2 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-heading font-medium text-text-primary">Islamic Blog</h3>
                                        <p className="mt-2 text-base text-text-secondary">
                                            Share knowledge, announcements, and articles with your community through our easy-to-use blogging platform.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-3 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-heading font-medium text-text-primary">Community Profiles</h3>
                                        <p className="mt-2 text-base text-text-secondary">
                                            Build meaningful connections with personalized profiles, activity tracking, and networking features.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 4 */}
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent-4 text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg leading-6 font-heading font-medium text-text-primary">Analytics & Insights</h3>
                                        <p className="mt-2 text-base text-text-secondary">
                                            Make data-driven decisions with comprehensive analytics on community engagement, event attendance, and more.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-accent-1 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
                            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                                <div className="lg:self-center">
                                    <h2 className="text-3xl font-heading font-bold text-white sm:text-4xl">
                                        <span className="block">Hear from our members</span>
                                    </h2>
                                    <p className="mt-4 text-lg leading-6 text-white">
                                        Al-Fath has helped hundreds of Islamic organizations and communities connect, grow, and thrive together.
                                    </p>
                                    <a
                                        href="#"
                                        className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-accent-1 hover:bg-gray-50"
                                    >
                                        Read Success Stories
                                    </a>
                                </div>
                            </div>
                            <div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
                                <div className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20">
                                    <div className="bg-white p-8 rounded-lg shadow-lg">
                                        <div className="flex items-center">
                                            <img
                                                className="h-12 w-12 rounded-full"
                                                src="https://placehold.co/100x100?text=User"
                                                alt="Testimonial"
                                            />
                                            <div className="ml-4">
                                                <h4 className="text-lg font-heading font-bold text-text-primary">Ahmad Ibrahim</h4>
                                                <p className="text-accent-3">Masjid Al-Falah</p>
                                            </div>
                                        </div>
                                        <p className="mt-4 text-lg text-text-secondary">
                                            "Al-Fath has transformed how we manage our community events. The QR code attendance system alone has saved us countless hours and helped us better engage with our members."
                                        </p>
                                        <div className="mt-4 flex">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <svg
                                                    key={star}
                                                    className="h-5 w-5 text-yellow-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-gray-50 pt-12 sm:pt-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-heading font-bold text-text-primary sm:text-4xl">
                                Trusted by growing Islamic communities
                            </h2>
                            <p className="mt-3 text-xl text-text-secondary sm:mt-4">
                                Join hundreds of organizations already using Al-Fath to connect their communities.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10 pb-12 bg-white sm:pb-16">
                        <div className="relative">
                            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
                            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-4xl mx-auto">
                                    <div className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                                        <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                                            <p className="order-2 mt-2 text-lg leading-6 font-medium text-text-secondary">Events Organized</p>
                                            <p className="order-1 text-5xl font-heading font-bold text-accent-1">1,000+</p>
                                        </div>
                                        <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                                            <p className="order-2 mt-2 text-lg leading-6 font-medium text-text-secondary">Active Communities</p>
                                            <p className="order-1 text-5xl font-heading font-bold text-accent-2">500+</p>
                                        </div>
                                        <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                                            <p className="order-2 mt-2 text-lg leading-6 font-medium text-text-secondary">Members Connected</p>
                                            <p className="order-1 text-5xl font-heading font-bold text-accent-3">50,000+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-accent-1">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                        <h2 className="text-3xl font-heading font-bold tracking-tight text-white sm:text-4xl">
                            <span className="block">Ready to strengthen your community?</span>
                            <span className="block text-white">Join Al-Fath today.</span>
                        </h2>
                        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                            <div className="inline-flex rounded-md shadow">
                                <Link
                                    href={route('register')}
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-accent-1 bg-white hover:bg-gray-50"
                                >
                                    Get started
                                </Link>
                            </div>
                            <div className="ml-3 inline-flex rounded-md shadow">
                                <a
                                    href="#"
                                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-2 hover:bg-accent-3"
                                >
                                    Learn more
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white">
                    <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
                        <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
                            <div className="px-5 py-2">
                                <a href="#" className="text-base text-text-secondary hover:text-accent-2">About</a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="#" className="text-base text-text-secondary hover:text-accent-2">Features</a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="#" className="text-base text-text-secondary hover:text-accent-2">Events</a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="#" className="text-base text-text-secondary hover:text-accent-2">Blog</a>
                            </div>
                            <div className="px-5 py-2">
                                <a href="#" className="text-base text-text-secondary hover:text-accent-2">Contact</a>
                            </div>
                            {auth.user && (
                                <div className="px-5 py-2">
                                    <Link
                                        href={route('style.guide')}
                                        className="text-base text-text-secondary hover:text-accent-2"
                                    >
                                        Style Guide
                                    </Link>
                                </div>
                            )}
                        </nav>
                        <div className="mt-8 flex justify-center space-x-6">
                            <a href="#" className="text-text-secondary hover:text-accent-2">
                                <span className="sr-only">Facebook</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-text-secondary hover:text-accent-2">
                                <span className="sr-only">Instagram</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="#" className="text-text-secondary hover:text-accent-2">
                                <span className="sr-only">Twitter</span>
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                        </div>
                        <p className="mt-8 text-center text-base text-text-secondary">
                            &copy; {new Date().getFullYear()} Al-Fath, Inc. All rights reserved.
                        </p>
                        <p className="mt-2 text-center text-sm text-text-secondary">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-accent-1/10 to-accent-3/10 pt-16 pb-24">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                                <div className="mt-1">
                                    <img src="/bismillah.png" alt="Bismillah" className="h-8 mb-4 inline-block" />
                                    <h1 className="text-4xl tracking-tight font-heading font-bold text-text-primary sm:text-5xl md:text-6xl">
                                        <span className="block">Connecting the</span>
                                        <span className="block text-accent-1">Muslim Community</span>
                                    </h1>
                                    <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Al-Fath is a single platform for Muslim communities to collaborate, 
                                        organize events, share knowledge, and build stronger connections.
                                    </p>
                                    <div className="mt-8 sm:mt-12">
                                        <div className="rounded-md shadow">
                                            <Link
                                                href={route('register')}
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent-1 hover:bg-accent-2 md:py-4 md:text-lg md:px-10"
                                            >
                                                Join Our Community
                                            </Link>
                                        </div>
                                        <div className="mt-3">
                                            <Link
                                                href="#features"
                                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-accent-1 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-6">
                                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                                    <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                                        <img
                                            src="/logo.png"
                                            alt="Al-Fath Logo"
                                            className="w-full h-64 object-contain"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-accent-1 bg-opacity-75 rounded-full p-4 cursor-pointer">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
