import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <div className="flex justify-between mb-6">
                                <h3 className="text-xl font-bold">User List</h3>
                                <Link href={route('users.create')}><PrimaryButton>Add User</PrimaryButton></Link>
                            </div>
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
                                                <tr key={user.id} className="hover:bg-main-bg">
                                                    <td className="py-3 px-4">{user.name}</td>
                                                    <td className="py-3 px-4">{user.email}</td>
                                                    <td className="py-3 px-4">{user.role}</td>
                                                    <td className="py-3 px-4">
                                                        {user.profile ? (
                                                            <span>Has Profile</span>
                                                        ) : (
                                                            <span className="text-red-500">No Profile</span>
                                                        )}
                                                    </td>
                                                    <td className="py-3 px-4 flex flex-col md:flex-row gap-2">
                                                        <Link href={route('users.edit', user.id)}>
                                                            <span className="text-accent-2 hover:text-accent-4">Edit User</span>
                                                        </Link>
                                                        <button onClick={() => confirmUserDeletion(user)} className="text-text-secondary hover:text-red-700">Delete User</button>
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
