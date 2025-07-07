import React from 'react';
import { Link } from '@inertiajs/react';

export default function ActionButton({ href, onClick, children, color = 'primary', size = 'md', className = '', disabled = false, type = 'button', as = 'button' }) {
    const baseClasses = 'flex items-center justify-center font-medium rounded-md transition-all duration-200 focus:outline-none';
    
    let colorClasses = '';
    switch (color) {
        case 'primary':
            colorClasses = 'bg-accent-2 hover:bg-accent-2/90 text-white';
            break;
        case 'secondary':
            colorClasses = 'bg-accent-1 hover:bg-accent-1/90 text-white';
            break;
        case 'danger':
            colorClasses = 'bg-red-600 hover:bg-red-700 text-white';
            break;
        case 'warning':
            colorClasses = 'bg-yellow-500 hover:bg-yellow-600 text-white';
            break;
        case 'success':
            colorClasses = 'bg-green-600 hover:bg-green-700 text-white';
            break;
        case 'outline':
            colorClasses = 'bg-transparent hover:bg-accent-2/10 text-accent-2 border border-accent-2';
            break;
        default:
            colorClasses = 'bg-accent-2 hover:bg-accent-2/90 text-white';
    }
    
    let sizeClasses = '';
    switch (size) {
        case 'xs':
            sizeClasses = 'text-xs px-2 py-1';
            break;
        case 'sm':
            sizeClasses = 'text-sm px-3 py-1.5';
            break;
        case 'md':
            sizeClasses = 'text-sm px-4 py-2';
            break;
        case 'lg':
            sizeClasses = 'text-base px-5 py-2.5';
            break;
        case 'xl':
            sizeClasses = 'text-base px-6 py-3';
            break;
        default:
            sizeClasses = 'text-sm px-4 py-2';
    }
    
    const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
    
    const buttonClasses = `${baseClasses} ${colorClasses} ${sizeClasses} ${disabledClasses} ${className}`;
    
    if (as === 'link' && href) {
        return (
            <Link href={href} className={buttonClasses}>
                {children}
            </Link>
        );
    }
    
    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClasses}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
