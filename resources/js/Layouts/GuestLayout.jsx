import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-main-bg">
            <div className="mb-6 hover-lift">
                <Link href="/">
                    <ApplicationLogo className="w-20 h-20 fill-current text-accent-2" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-8 py-6 bg-white shadow-lg overflow-hidden sm:rounded-xl border border-gray-100">
                {children}
            </div>
        </div>
    );
}
