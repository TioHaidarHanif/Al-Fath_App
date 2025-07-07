import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-accent-1 text-text-primary focus:border-accent-3 '
                    : 'border-transparent text-accent-4 hover:text-text-primary hover:border-accent-2 focus:text-text-primary focus:border-accent-2 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
