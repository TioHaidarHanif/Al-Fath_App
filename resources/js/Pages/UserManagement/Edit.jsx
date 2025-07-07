import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, user }) {
    // User fields
    const [showProfileForm, setShowProfileForm] = useState(!!user.profile);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || '',
        // Profile fields (nested)
        profile: {
            nim: user.profile?.nim || '',
            fakultas: user.profile?.fakultas || '',
            prodi: user.profile?.prodi || '',
            angkatan: user.profile?.angkatan || new Date().getFullYear(),
            amanah: user.profile?.amanah || '',
            jenis_kelamin: user.profile?.jenis_kelamin || '',
            divisi: user.profile?.divisi || '',
            posisi: user.profile?.posisi || '',
            photo: null,
        },
    });

    const [photoPreview, setPhotoPreview] = useState(user.profile?.photo ? `/storage/${user.profile.photo}` : null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.update', user.id), {
            _method: 'put',
            ...data,
        }, {
            forceFormData: true,
        });
    };

    const handleProfileChange = (e) => {
        setData('profile', {
            ...data.profile,
            [e.target.name]: e.target.value,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('profile', {
            ...data.profile,
            photo: file,
        });
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setPhotoPreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Edit User</h2>}
        >
            <Head title="Edit User" />
            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <select
                                        id="role"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        required
                                    >
                                        <option value="">Select Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>
                                <hr className="my-6" />
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-bold flex-1">Profile Data</h3>
                                    <button
                                        type="button"
                                        className="text-blue-500 underline"
                                        onClick={() => setShowProfileForm(!showProfileForm)}
                                    >
                                        {showProfileForm ? 'Hide' : 'Add/Edit Profile'}
                                    </button>
                                </div>
                                {showProfileForm && (
                                    <>
                                        <div>
                                            <InputLabel htmlFor="nim" value="NIM" />
                                            <TextInput
                                                id="nim"
                                                name="nim"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.profile.nim}
                                                onChange={handleProfileChange}
                                            />
                                            <InputError message={errors['profile.nim']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="fakultas" value="Fakultas" />
                                            <TextInput
                                                id="fakultas"
                                                name="fakultas"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.profile.fakultas}
                                                onChange={handleProfileChange}
                                            />
                                            <InputError message={errors['profile.fakultas']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="prodi" value="Program Studi" />
                                            <TextInput
                                                id="prodi"
                                                name="prodi"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.profile.prodi}
                                                onChange={handleProfileChange}
                                            />
                                            <InputError message={errors['profile.prodi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="angkatan" value="Angkatan" />
                                            <TextInput
                                                id="angkatan"
                                                name="angkatan"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data.profile.angkatan}
                                                onChange={handleProfileChange}
                                                min="2000"
                                                max={new Date().getFullYear() + 1}
                                            />
                                            <InputError message={errors['profile.angkatan']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="amanah" value="Amanah" />
                                            <TextInput
                                                id="amanah"
                                                name="amanah"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.profile.amanah}
                                                onChange={handleProfileChange}
                                            />
                                            <InputError message={errors['profile.amanah']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                                            <select
                                                id="jenis_kelamin"
                                                name="jenis_kelamin"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                value={data.profile.jenis_kelamin}
                                                onChange={handleProfileChange}
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Ikhwan">Ikhwan</option>
                                                <option value="Akhwat">Akhwat</option>
                                            </select>
                                            <InputError message={errors['profile.jenis_kelamin']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="divisi" value="Divisi" />
                                            <TextInput
                                                id="divisi"
                                                name="divisi"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data.profile.divisi}
                                                onChange={handleProfileChange}
                                            />
                                            <InputError message={errors['profile.divisi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="posisi" value="Posisi" />
                                            <select
                                                id="posisi"
                                                name="posisi"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                                value={data.profile.posisi}
                                                onChange={handleProfileChange}
                                            >
                                                <option value="">Pilih Posisi</option>
                                                <option value="Fakultas">Fakultas</option>
                                                <option value="Pusat">Pusat</option>
                                            </select>
                                            <InputError message={errors['profile.posisi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="photo" value="Foto" />
                                            <input
                                                id="photo"
                                                name="photo"
                                                type="file"
                                                className="mt-1 block w-full"
                                                onChange={handlePhotoChange}
                                                accept="image/*"
                                            />
                                            <InputError message={errors['profile.photo']} className="mt-2" />
                                            {photoPreview && (
                                                <div className="mt-3">
                                                    <img
                                                        src={photoPreview}
                                                        alt="Preview"
                                                        className="rounded-md max-h-64 object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route('users.index')}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase hover:bg-gray-50"
                                    >
                                        Cancel
                                    </Link>
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}