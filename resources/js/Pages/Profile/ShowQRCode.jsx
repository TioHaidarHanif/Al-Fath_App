import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { QRCode } from 'react-qrcode-logo';

export default function ShowQRCode({ auth }) {
    // You can encode just the user ID, or a more secure token if needed
    const qrValue = auth.user.qr_code;

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-heading text-2xl text-text-primary">My QR Code</h2>}>
            <Head title="My QR Code" />
            <div className="flex flex-col items-center justify-center py-12">
                <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
                    <QRCode
                        value={qrValue}
                        size={256}
                        ecLevel="H"
                        // logoImage="/bismillah.png"
                        logoWidth={100}
                        logoHeight={100}
                        qrStyle="squares"
                        eyeRadius={8}
                        includeMargin={true}
                    />
                    <div className="mt-6 text-center">
                        <div className="font-bold text-lg mb-2">{auth.user.name}</div>
                        {/* <div className="text-gray-500 text-sm">ID: {auth.user.email}</div> */}
                    </div>
                    <div className="mt-4 text-gray-600 text-sm">Scan this QR code for presence/attendance.</div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
