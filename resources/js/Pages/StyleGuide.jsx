import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function StyleGuide({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Style Guide</h2>}
        >
            <Head title="Style Guide" />

            <div className="py-12">
                <div className="space-y-12">
                    {/* Typography Section */}
                    <section className="card p-6">
                        <h2 className="text-2xl font-heading mb-6">Typography</h2>
                        <div className="space-y-4">
                            <div>
                                <h1>Heading 1 - Dela Gothic One</h1>
                                <h2>Heading 2 - Dela Gothic One</h2>
                                <h3>Heading 3 - Dela Gothic One</h3>
                                <h4 className="text-xl font-heading mb-3">Heading 4</h4>
                                <h5 className="text-lg font-heading mb-2">Heading 5</h5>
                                <h6 className="text-base font-heading mb-2">Heading 6</h6>
                            </div>
                            <div>
                                <p className="mb-4">Body text uses the <span className="font-bold">Poppins</span> font family. It provides excellent readability and a modern look.</p>
                                <p className="mb-4">Here's an example of <span className="text-contrast">contrasting text</span> and an <span className="emphasis">emphasized phrase</span> with a highlight effect.</p>
                                <p className="mb-4">You can also use <a href="#">links</a> that stand out with the accent colors.</p>
                            </div>
                        </div>
                    </section>

                    {/* Color Palette Section */}
                    <section className="card p-6">
                        <h2 className="text-2xl font-heading mb-6">Color Palette</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <div>
                                <div className="h-24 bg-main-bg rounded-lg shadow-inner"></div>
                                <p className="mt-2 text-sm font-medium">Main Background</p>
                                <p className="text-xs text-gray-500">#FFF7E7</p>
                            </div>
                            <div>
                                <div className="h-24 bg-accent-1 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Accent 1</p>
                                <p className="text-xs text-gray-500">#F5DF57</p>
                            </div>
                            <div>
                                <div className="h-24 bg-accent-2 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Accent 2</p>
                                <p className="text-xs text-gray-500">#39A0ED</p>
                            </div>
                            <div>
                                <div className="h-24 bg-accent-3 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Accent 3</p>
                                <p className="text-xs text-gray-500">#E0971C</p>
                            </div>
                            <div>
                                <div className="h-24 bg-accent-4 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Accent 4</p>
                                <p className="text-xs text-gray-500">#2E86BC</p>
                            </div>
                            <div>
                                <div className="h-24 bg-accent-5 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Accent 5</p>
                                <p className="text-xs text-gray-500">#06BA63</p>
                            </div>
                            <div>
                                <div className="h-24 bg-text-primary rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Text Primary</p>
                                <p className="text-xs text-gray-500">#1C1C1C</p>
                            </div>
                            <div>
                                <div className="h-24 bg-text-secondary rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Text Secondary</p>
                                <p className="text-xs text-gray-500">#D44848</p>
                            </div>
                            <div>
                                <div className="h-24 bg-text-highlight rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Text Highlight</p>
                                <p className="text-xs text-gray-500">#FF5555</p>
                            </div>
                            <div>
                                <div className="h-24 bg-text-white rounded-lg border border-gray-200"></div>
                                <p className="mt-2 text-sm font-medium">Text White</p>
                                <p className="text-xs text-gray-500">#FFFFFF</p>
                            </div>
                            <div>
                                <div className="h-24 bg-soft-1 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Soft 1</p>
                                <p className="text-xs text-gray-500">#E2AFDE</p>
                            </div>
                            <div>
                                <div className="h-24 bg-soft-2 rounded-lg"></div>
                                <p className="mt-2 text-sm font-medium">Soft 2</p>
                                <p className="text-xs text-gray-500">#8963BA</p>
                            </div>
                        </div>
                    </section>

                    {/* Buttons Section */}
                    <section className="card p-6">
                        <h2 className="text-2xl font-heading mb-6">Buttons</h2>
                        <div className="flex flex-wrap gap-4">
                            <PrimaryButton>Primary Button</PrimaryButton>
                            <button className="btn-secondary">Secondary Button</button>
                            <button className="btn-accent">Accent Button</button>
                            <button className="btn-outline">Outline Button</button>
                        </div>
                    </section>

                    {/* Cards Section */}
                    <section className="card p-6">
                        <h2 className="text-2xl font-heading mb-6">Cards & UI Elements</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="card p-5">
                                <h3 className="text-lg font-bold mb-3">Basic Card</h3>
                                <p>This is a standard card with default styling.</p>
                            </div>
                            <div className="card card-accent p-5">
                                <h3 className="text-lg font-bold mb-3">Accent Card</h3>
                                <p>This card has an accent border on the left side.</p>
                            </div>
                            <div className="card bg-gradient-soft p-5">
                                <h3 className="text-lg font-bold mb-3">Gradient Card</h3>
                                <p>This card has a subtle gradient background.</p>
                            </div>
                        </div>
                    </section>

                    {/* Design Principles Section */}
                    <section className="card p-6">
                        <h2 className="text-2xl font-heading mb-6">Design Principles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-bold mb-3">Emphasis</h3>
                                <p>Using <span className="emphasis">visual emphasis</span> to highlight important elements.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3">White Space</h3>
                                <p>Generous spacing between elements creates breathing room and improves readability.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3">Repetition</h3>
                                <p>Consistent use of colors, typography, and UI elements throughout the app.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3">Contrast</h3>
                                <p>Using <span className="text-contrast">contrasting colors</span> to draw attention to important elements.</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3">Movement</h3>
                                <p className="mb-3">Subtle animations and transitions guide the user's attention.</p>
                                <button className="hover-lift btn-primary">Hover me</button>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-3">Balance & Proportion</h3>
                                <p>Elements are sized and positioned in relation to their importance and each other.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
