import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';

export default function Index({ auth, profiles }) {
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [profileToDelete, setProfileToDelete] = useState(null);
    
    const confirmDeletion = (profile) => {
        setProfileToDelete(profile);
        setConfirmingDeletion(true);
    };
    
    const deleteProfile = () => {
        router.delete(route('profile-management.destroy', profileToDelete.id), {
            onSuccess: () => {
                setConfirmingDeletion(false);
                setProfileToDelete(null);
            },
        });
    };
    
    const closeModal = () => {
        setConfirmingDeletion(false);
        setProfileToDelete(null);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Management SDM</h2>}
        >
            <Head title="Management SDM" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <div className="flex justify-between mb-6">
                                <h3 className="text-xl font-bold">Daftar Anggota</h3>
                                <Link href={route('profile-management.create')}>
                                    <PrimaryButton>Tambah Anggota</PrimaryButton>
                                </Link>
                            </div>
                            
                            {profiles.data.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                                        <thead className="bg-accent-2 text-white">
                                            <tr>
                                                <th className="py-3 px-4 text-left">NIM</th>
                                                <th className="py-3 px-4 text-left">Nama</th>
                                                <th className="py-3 px-4 text-left">Fakultas</th>
                                                <th className="py-3 px-4 text-left">Amanah</th>
                                                <th className="py-3 px-4 text-left">Divisi</th>
                                                <th className="py-3 px-4 text-left">Posisi</th>
                                                <th className="py-3 px-4 text-left">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {profiles.data.map((profile) => (
                                                <tr key={profile.id} className="hover:bg-main-bg">
                                                    <td className="py-3 px-4">{profile.nim}</td>
                                                    <td className="py-3 px-4">{profile.user.name}</td>
                                                    <td className="py-3 px-4">{profile.fakultas}</td>
                                                    <td className="py-3 px-4">{profile.amanah}</td>
                                                    <td className="py-3 px-4">{profile.divisi}</td>
                                                    <td className="py-3 px-4">{profile.posisi}</td>
                                                    <td className="py-3 px-4 flex space-x-2">
                                                        <Link href={route('profile-management.show', profile.id)}>
                                                            <span className="text-accent-2 hover:text-accent-4">Lihat</span>
                                                        </Link>
                                                        <Link href={route('profile-management.edit', profile.id)}>
                                                            <span className="text-accent-5 hover:text-green-700">Edit</span>
                                                        </Link>
                                                        <button 
                                                            onClick={() => confirmDeletion(profile)}
                                                            className="text-text-secondary hover:text-red-700"
                                                        >
                                                            Hapus
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <p>Belum ada data anggota.</p>
                                </div>
                            )}
                            
                            {/* Pagination */}
                            <div className="mt-6">
                                {/* Add pagination links here */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Confirmation Modal */}
            <Modal show={confirmingDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-text-primary">Konfirmasi Hapus</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Apakah Anda yakin ingin menghapus data anggota ini?
                    </p>
                    
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase hover:bg-gray-50"
                            onClick={closeModal}
                        >
                            Batal
                        </button>
                        <DangerButton onClick={deleteProfile}>
                            Hapus
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
