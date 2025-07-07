import React from 'react';
import { Link } from '@inertiajs/react';
import classNames from 'classnames';

export default function Tab({ active = false, children, onClick }) {
    return (
        <button
            onClick={onClick}
            className={classNames(
                'py-4 px-6 inline-block font-medium text-sm border-b-2 focus:outline-none',
                {
                    'border-indigo-500 text-indigo-600': active,
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300': !active,
                }
            )}
        >
            {children}
        </button>
    );
}
