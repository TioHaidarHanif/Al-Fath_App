export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 py-2 bg-accent-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-accent-4 focus:bg-accent-4 active:bg-accent-4 focus:outline-none focus:ring-2 focus:ring-accent-1 focus:ring-offset-2 transition ease-in-out duration-150 shadow-md hover:shadow-lg ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
