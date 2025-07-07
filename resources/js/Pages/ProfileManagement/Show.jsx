import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Show({ auth, profile }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Detail Anggota</h2>}
        >
            <Head title="Detail Anggota" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <div className="flex justify-between mb-6">
                                <h3 className="text-xl font-bold">{profile.user.name}</h3>
                                <Link href={route('profile-management.index')}>
                                    <PrimaryButton>Kembali</PrimaryButton>
                                </Link>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="md:col-span-1">
                                    <div className="flex justify-center">
                                        {profile.photo ? (
                                            <img 
                                                src={`/storage/${profile.photo}`} 
                                                alt={profile.user.name} 
                                                className="rounded-lg shadow-md w-full max-w-xs object-cover"
                                            />
                                        ) : (
                                            <div className="bg-accent-2/20 rounded-lg shadow-md w-full max-w-xs h-64 flex items-center justify-center">
                                                <span className="text-accent-4">Tidak ada foto</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="md:col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">NIM</h4>
                                            <p className="text-lg">{profile.nim}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Nama</h4>
                                            <p className="text-lg">{profile.user.name}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Email</h4>
                                            <p className="text-lg">{profile.user.email}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Jenis Kelamin</h4>
                                            <p className="text-lg">{profile.jenis_kelamin}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Fakultas</h4>
                                            <p className="text-lg">{profile.fakultas}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Program Studi</h4>
                                            <p className="text-lg">{profile.prodi}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Angkatan</h4>
                                            <p className="text-lg">{profile.angkatan}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Amanah</h4>
                                            <p className="text-lg">{profile.amanah}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Divisi</h4>
                                            <p className="text-lg">{profile.divisi}</p>
                                        </div>
                                        
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-500">Posisi</h4>
                                            <p className="text-lg">{profile.posisi}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6 flex justify-end space-x-3">
                                        <Link href={route('profile-management.edit', profile.id)}>
                                            <PrimaryButton>Edit</PrimaryButton>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
