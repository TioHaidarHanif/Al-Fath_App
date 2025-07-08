import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

export default function QrScanner({ onScanSuccess, onScanFailure, isScanning }) {
    const scannerRef = useRef(null);
    const [html5QrCode, setHtml5QrCode] = useState(null);
    const [error, setError] = useState(null);
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraId, setCameraId] = useState(null);
    const [cameras, setCameras] = useState([]);
    const [location, setLocation] = useState(null);

    // Initialize the scanner on component mount
    useEffect(() => {
        if (!scannerRef.current) return;

        const scanner = new Html5Qrcode(scannerRef.current.id);
        setHtml5QrCode(scanner);

        // Get list of cameras
        Html5Qrcode.getCameras()
            .then(devices => {
                if (devices && devices.length) {
                    setCameras(devices);
                    setCameraId(devices[0].id);
                } else {
                    setError('No camera found');
                }
            })
            .catch(err => {
                console.error("Error getting cameras:", err);
                setError('Error accessing camera');
            });

        // Get location if available
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`${position.coords.latitude},${position.coords.longitude}`);
                },
                (err) => {
                    console.warn("Error getting location:", err);
                    setLocation(null);
                }
            );
        }

        // Clean up on unmount
        return () => {
            if (scanner && scanner.isScanning) {
                scanner.stop().catch(err => console.error("Error stopping scanner:", err));
            }
        };
    }, []);

    // Start/stop scanning based on isScanning prop
    useEffect(() => {
        if (!html5QrCode || !cameraId) return;

        const config = { 
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0,
            disableFlip: false,
            verbose: false
        };

        if (isScanning) {
            // Start scanning
            html5QrCode.start(
                cameraId, 
                config,
                (decodedText) => {
                    // Pass the location along with the scan result
                    onScanSuccess(decodedText, location);
                },
                (errorMessage) => {
                    // Don't call the error callback for every non-QR frame
                    if (onScanFailure && errorMessage && 
                        errorMessage !== 'No QR code found' && 
                        !errorMessage.includes('No MultiFormat Readers')) {
                        onScanFailure(errorMessage);
                    }
                }
            )
            .catch(err => {
                if (err.toString().includes('permission')) {
                    setCameraPermission(false);
                    setError('Camera permission denied');
                } else {
                    setError(`Error starting scanner: ${err}`);
                }
            });
        } else {
            // Stop scanning
            if (html5QrCode.isScanning) {
                html5QrCode.stop()
                    .catch(err => console.error("Error stopping scanner:", err));
            }
        }
    }, [isScanning, html5QrCode, cameraId]);

    const handleCameraChange = (e) => {
        const newCameraId = e.target.value;
        setCameraId(newCameraId);
        
        // If already scanning, restart with new camera
        if (html5QrCode && html5QrCode.isScanning) {
            html5QrCode.stop()
                .then(() => {
                    const config = { 
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                        aspectRatio: 1.0
                    };
                    html5QrCode.start(
                        newCameraId, 
                        config,
                        (decodedText) => onScanSuccess(decodedText, location),
                        (errorMessage) => {
                            if (onScanFailure && errorMessage && 
                                errorMessage !== 'No QR code found' && 
                                !errorMessage.includes('No MultiFormat Readers')) {
                                onScanFailure(errorMessage);
                            }
                        }
                    )
                    .catch(err => setError(`Error restarting scanner: ${err}`));
                })
                .catch(err => console.error("Error stopping scanner:", err));
        }
    };

    return (
        <div className="w-full">
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {cameraPermission === false && (
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                    Please allow camera access to scan QR codes
                </div>
            )}
            
            {cameras.length > 1 && (
                <div className="mb-4">
                    <label htmlFor="camera-select" className="block text-sm font-medium text-gray-700 mb-1">
                        Select Camera
                    </label>
                    <select
                        id="camera-select"
                        value={cameraId || ''}
                        onChange={handleCameraChange}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        {cameras.map((camera) => (
                            <option key={camera.id} value={camera.id}>
                                {camera.label || `Camera ${cameras.indexOf(camera) + 1}`}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            
            <div 
                id="qr-reader" 
                ref={scannerRef} 
                className="w-full max-w-md mx-auto overflow-hidden rounded-lg"
                style={{ minHeight: '300px' }}
            ></div>
            
            <p className="text-sm text-gray-500 mt-2 text-center">
                Position the QR code within the box to scan
            </p>
        </div>
    );
}
