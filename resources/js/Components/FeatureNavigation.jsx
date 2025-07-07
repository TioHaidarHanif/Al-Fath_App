import React from 'react';
import { Link } from '@inertiajs/react';
import ActionButton from '@/Components/ActionButton';

export default function FeatureNavigation({ title, description, items }) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => (
                    <Link 
                        key={index}
                        href={item.href}
                        className="flex flex-col items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-center"
                    >
                        <div className="text-accent-2 mb-2">
                            {item.icon}
                        </div>
                        <span className="font-medium text-text-primary">{item.name}</span>
                        {item.description && (
                            <span className="text-xs text-gray-500 mt-1">{item.description}</span>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
