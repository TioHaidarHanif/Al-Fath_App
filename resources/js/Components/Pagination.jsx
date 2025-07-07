import React from 'react';
import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    // If there's only 1 page, don't show pagination
    if (links.length <= 3) {
        return null;
    }

    const prevLink = links.find(link => link.label.includes('Previous'));
    const nextLink = links.find(link => link.label.includes('Next'));

    return (
        <div className="flex flex-wrap justify-center mt-6">
            <div className="flex flex-wrap items-center -mb-1">
                {/* Previous button */}
                {prevLink && (
                    <Link
                        className={`mr-1 mb-1 px-4 py-3 text-sm border rounded focus:outline-none ${
                            prevLink.url
                                ? 'border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-white'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        href={prevLink.url || '#'}
                        disabled={!prevLink.url}
                    >
                        &laquo; Previous
                    </Link>
                )}

                {/* Page numbers */}
                {links.map((link, key) => {
                    // Skip Previous and Next links as we handle them separately
                    if (link.label.includes('Previous') || link.label.includes('Next')) {
                        return null;
                    }

                    // For ellipsis or disabled links
                    if (!link.url) {
                        return (
                            <span
                                key={key}
                                className="mr-1 mb-1 px-4 py-3 text-sm border rounded text-gray-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <Link
                            key={key}
                            className={`mr-1 mb-1 px-4 py-3 text-sm border rounded hover:bg-white focus:outline-none ${
                                link.active
                                    ? 'border-indigo-500 bg-indigo-500 text-white'
                                    : 'border-gray-300 text-gray-700 hover:border-gray-500'
                            }`}
                            href={link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}

                {/* Next button */}
                {nextLink && (
                    <Link
                        className={`mr-1 mb-1 px-4 py-3 text-sm border rounded focus:outline-none ${
                            nextLink.url
                                ? 'border-gray-300 text-gray-700 hover:border-gray-500 hover:bg-white'
                                : 'border-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        href={nextLink.url || '#'}
                        disabled={!nextLink.url}
                    >
                        Next &raquo;
                    </Link>
                )}
            </div>
        </div>
    );
}
