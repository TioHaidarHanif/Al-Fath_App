import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import Breadcrumbs from '@/Components/Breadcrumbs';
import ActionButton from '@/Components/ActionButton';

export default function Index({ auth, users }) {
    const [confirmingDeletion, setConfirmingDeletion] = React.useState(false);
    const [userToDelete, setUserToDelete] = React.useState(null);
    const [profileToDelete, setProfileToDelete] = React.useState(null);

    const confirmUserDeletion = (user) => {
        setUserToDelete(user);
        setConfirmingDeletion('user');
    };
    const confirmProfileDeletion = (profile) => {
        setProfileToDelete(profile);
        setConfirmingDeletion('profile');
    };
    const deleteUser = () => {
        router.delete(route('users.destroy', userToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setUserToDelete(null);
            },
        });
    };
    const deleteProfile = () => {
        router.delete(route('users.profile.destroy', profileToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setProfileToDelete(null);
            },
        });
    };
    const closeModal = () => {
        setConfirmingDeletion(false);
        setUserToDelete(null);
        setProfileToDelete(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">User Management</h2>}
        >
            <Head title="User Management" />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Breadcrumbs 
                        items={[
                            { name: 'Admin Dashboard', href: route('admin.dashboard') },
                            { name: 'User Management' },
                        ]} 
                    />
                    
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-text-primary">User Management</h1>
                        <div className="flex gap-2">
                            <ActionButton
                                as="link"
                                href={route('users.create')}
                                color="primary"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                                </svg>
                                Add User
                            </ActionButton>
                            
                            <ActionButton
                                as="link"
                                href={route('admin.dashboard')}
                                color="secondary"
                            >
                                Back to Dashboard
                            </ActionButton>
                        </div>
                    </div>
                    
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            {users.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                        <thead className="bg-accent-2 text-white">
                                            <tr>
                                                <th className="py-3 px-4 text-left">Name</th>
                                                <th className="py-3 px-4 text-left">Email</th>
                                                <th className="py-3 px-4 text-left">Role</th>
                                                <th className="py-3 px-4 text-left">Profile</th>
                                                <th className="py-3 px-4 text-left">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {users.data.map((user) => (
                                                <tr key={user.id} className="hover:bg-gray-50">
                                                    <td className="py-3 px-4">
                                                        <div className="flex items-center">
                                                            <div className="w-8 h-8 mr-3 bg-accent-1 text-white rounded-full flex items-center justify-center font-semibold">
                                                                {user.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <span className="font-medium">{user.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-4">{user.email}</td>
                                                    <td className="py-3 px-4">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                                                            user.role === 'member' ? 'bg-blue-100 text-blue-800' : 
                                                            'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {user.role || 'user'}
                                                        </span>
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        {user.profile ? (
                                                            <span className="text-green-600 flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                                </svg>
                                                                Yes
                                                            </span>
                                                        ) : (
                                                            <span className="text-red-600 flex items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                                </svg>
                                                                No
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4">
                                                        <div className="flex space-x-2">
                                                            <Link href={route('users.edit', user.id)} className="bg-accent-2 text-white py-1 px-3 rounded-md text-sm flex items-center hover:bg-accent-2/80 transition-colors">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
                                                                Edit
                                                            </Link>
                                                            
                                                            <button 
                                                                onClick={() => confirmUserDeletion(user)} 
                                                                className="bg-red-500 text-white py-1 px-3 rounded-md text-sm flex items-center hover:bg-red-600 transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                            
                                                            {user.profile && (
                                                                <button 
                                                                    onClick={() => confirmProfileDeletion(user.profile)} 
                                                                    className="bg-orange-500 text-white py-1 px-3 rounded-md text-sm flex items-center hover:bg-orange-600 transition-colors"
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                                                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                                                    </svg>
                                                                    Reset Profile
                                                                </button>
                                                            )}
                                                        </div>
                                                        {user.profile && (
                                                            <>
                                                                <Link href={route('users.edit', user.id)}>
                                                                    <span className="text-accent-5 hover:text-green-700">Edit Profile</span>
                                                                </Link>
                                                                <button onClick={() => confirmProfileDeletion(user.profile)} className="text-text-secondary hover:text-red-700">Delete Profile</button>
                                                            </>
                                                        )}
                                                        {!user.profile && (
                                                            <Link href={route('users.edit', user.id)}>
                                                                <span className="text-blue-500 hover:text-blue-700">Add Profile</span>
                                                            </Link>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p>No users found.</p>
                                </div>
                            )}
                            {/* Pagination */}
                            <div className="mt-6">
                                {/* Add pagination links here if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Confirmation Modal */}
            <Modal show={!!confirmingDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-text-primary">Confirm Deletion</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        {confirmingDeletion === 'user'
                            ? 'Are you sure you want to delete this user? This will also delete their profile if it exists.'
                            : 'Are you sure you want to delete this profile?'}
                    </p>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase hover:bg-gray-50"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        {confirmingDeletion === 'user' ? (
                            <DangerButton onClick={deleteUser}>Delete User</DangerButton>
                        ) : (
                            <DangerButton onClick={deleteProfile}>Delete Profile</DangerButton>
                        )}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
