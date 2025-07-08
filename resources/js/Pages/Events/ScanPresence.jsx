import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';
import QrScanner from '@/Components/QrScanner';
import axios from 'axios';

export default function ScanPresence({ auth, event }) {
    const [isScanning, setIsScanning] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [scanError, setScanError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleStartScan = () => {
        setScanResult(null);
        setScanError(null);
        setIsScanning(true);
    };

    const handleScanSuccess = (qrCode, location) => {
        setIsScanning(false);
        setShowModal(true);
        
        // Process the scan with the API
        axios.post(route('events.process-scan', event.id), {
            qr_code: qrCode,
            location: location || ''
        })
        .then(response => {
            setScanResult({
                success: true,
                user: response.data.user,
                presence: response.data.presence
            });
        })
        .catch(error => {
            if (error.response) {
                setScanError({
                    message: error.response.data.message,
                    status: error.response.status
                });
            } else {
                setScanError({
                    message: 'Failed to process QR code',
                    status: 500
                });
            }
        });
    };

    const handleScanFailure = (errorMessage) => {
        if (errorMessage.includes("NotFoundException")) {
            // This is a common error when no QR code is found, we can ignore it
            return;
        }
        
        setScanError({
            message: errorMessage,
            status: 400
        });
        setIsScanning(false);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setScanResult(null);
        setScanError(null);
    };

    const handleContinueScanning = () => {
        setShowModal(false);
        setScanResult(null);
        setScanError(null);
        setIsScanning(true);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">QR Scan</h2>}
        >
            <Head title={`${event.name} - QR Scan`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Events', href: route('events.index') },
                            { name: event.name, href: route('events.show', event.id) },
                            { name: 'QR Scan' },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">{event.name} - QR Scan</h1>
                        <div className="flex gap-2">
                            <ActionButton
                                as="link"
                                href={route('events.show', event.id)}
                                color="secondary"
                            >
                                Event Details
                            </ActionButton>
                            
                            <ActionButton
                                as="link"
                                href={route('events.presences', event.id)}
                                color="secondary"
                            >
                                View Attendance
                            </ActionButton>
                        </div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <p className="text-text-secondary">
                                        <span className="font-semibold">Location:</span> {event.location}
                                    </p>
                                    <p className="text-text-secondary">
                                        <span className="font-semibold">Time:</span> {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 text-center">
                            <p className="mb-4 text-lg">
                                Scan participant QR codes to record attendance for this event.
                            </p>
                            {!isScanning && !showModal && (
                                <ActionButton
                                    color="primary"
                                    onClick={handleStartScan}
                                >
                                    Start Scanning
                                </ActionButton>
                            )}
                        </div>

                        {isScanning && (
                            <div className="max-w-md mx-auto">
                                <QrScanner
                                    onScanSuccess={handleScanSuccess}
                                    onScanFailure={handleScanFailure}
                                    isScanning={isScanning}
                                />
                            </div>
                        )}

                        {/* Success/Error Modal */}
                        {showModal && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md w-full">
                                    <div className="p-6">
                                        {scanResult && (
                                            <>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-medium text-green-600">Success!</h3>
                                                    <button
                                                        onClick={handleCloseModal}
                                                        className="text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Close</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="mb-4">
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-bold">Name:</span> {scanResult.user.name}
                                                    </p>
                                                    <p className="text-gray-700 mb-2">
                                                        <span className="font-bold">Email:</span> {scanResult.user.email}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-bold">Recorded at:</span> {new Date().toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="bg-green-50 rounded p-4 mb-4">
                                                    <p className="text-green-800">
                                                        Attendance successfully recorded! A new QR code has been generated for this user.
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        {scanError && (
                                            <>
                                                <div className="flex items-center justify-between mb-4">
                                                    <h3 className="text-lg font-medium text-red-600">Error</h3>
                                                    <button
                                                        onClick={handleCloseModal}
                                                        className="text-gray-400 hover:text-gray-500"
                                                    >
                                                        <span className="sr-only">Close</span>
                                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="bg-red-50 rounded p-4 mb-4">
                                                    <p className="text-red-800">
                                                        {scanError.message}
                                                    </p>
                                                </div>
                                            </>
                                        )}

                                        <div className="mt-6 flex justify-end">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                                onClick={handleContinueScanning}
                                            >
                                                Continue Scanning
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
