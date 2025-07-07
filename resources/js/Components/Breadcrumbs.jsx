import React from 'react';
import { Link } from '@inertiajs/react';

export default function Breadcrumbs({ items }) {
    return (
        <nav className="flex py-3 mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link
                        href={route('dashboard')}
                        className="inline-flex items-center text-sm font-medium text-text-secondary hover:text-accent-2"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                            ></path>
                        </svg>
                        Home
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 text-text-secondary mx-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            {item.href ? (
                                <Link
                                    href={item.href}
                                    className="ml-1 text-sm font-medium text-text-secondary hover:text-accent-2 md:ml-2"
                                >
                                    {item.name}
                                </Link>
                            ) : (
                                <span className="ml-1 text-sm font-medium text-accent-2 md:ml-2">
                                    {item.name}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
