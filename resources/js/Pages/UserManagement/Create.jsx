import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
        'profile[nim]': '',
        'profile[fakultas]': '',
        'profile[prodi]': '',
        'profile[angkatan]': new Date().getFullYear(),
        'profile[amanah]': '',
        'profile[jenis_kelamin]': '',
        'profile[divisi]': '',
        'profile[posisi]': '',
        'profile[photo]': null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [withProfile, setWithProfile] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            forceFormData: true,
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('profile[photo]', file);
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Tambah User</h2>}
        >
            <Head title="Tambah User" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* User fields */}
                                <div>
                                    <InputLabel htmlFor="name" value="Nama" />
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
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>
                                <div>
                                    <InputLabel htmlFor="role" value="Role" />
                                    <select
                                        id="role"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-accent-2 focus:ring focus:ring-accent-2 focus:ring-opacity-50"
                                        value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Role</option>
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>
                                {/* Toggle profile section */}
                                <div>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={withProfile}
                                            onChange={e => setWithProfile(e.target.checked)}
                                            className="form-checkbox"
                                        />
                                        <span className="ml-2">Tambah Profile Sekarang</span>
                                    </label>
                                </div>
                                {/* Profile fields (conditionally rendered) */}
                                {withProfile && (
                                    <div className="border-t pt-6 space-y-6">
                                        <div>
                                            <InputLabel htmlFor="profile[nim]" value="NIM" />
                                            <TextInput
                                                id="profile[nim]"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data['profile[nim]']}
                                                onChange={e => setData('profile[nim]', e.target.value)}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.nim']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[fakultas]" value="Fakultas" />
                                            <TextInput
                                                id="profile[fakultas]"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data['profile[fakultas]']}
                                                onChange={e => setData('profile[fakultas]', e.target.value)}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.fakultas']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[prodi]" value="Program Studi" />
                                            <TextInput
                                                id="profile[prodi]"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data['profile[prodi]']}
                                                onChange={e => setData('profile[prodi]', e.target.value)}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.prodi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[angkatan]" value="Angkatan" />
                                            <TextInput
                                                id="profile[angkatan]"
                                                type="number"
                                                className="mt-1 block w-full"
                                                value={data['profile[angkatan]']}
                                                onChange={e => setData('profile[angkatan]', e.target.value)}
                                                min="2000"
                                                max={new Date().getFullYear() + 1}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.angkatan']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[amanah]" value="Amanah" />
                                            <TextInput
                                                id="profile[amanah]"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data['profile[amanah]']}
                                                onChange={e => setData('profile[amanah]', e.target.value)}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.amanah']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[jenis_kelamin]" value="Jenis Kelamin" />
                                            <select
                                                id="profile[jenis_kelamin]"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-accent-2 focus:ring focus:ring-accent-2 focus:ring-opacity-50"
                                                value={data['profile[jenis_kelamin]']}
                                                onChange={e => setData('profile[jenis_kelamin]', e.target.value)}
                                                required={withProfile}
                                            >
                                                <option value="">Pilih Jenis Kelamin</option>
                                                <option value="Ikhwan">Ikhwan</option>
                                                <option value="Akhwat">Akhwat</option>
                                            </select>
                                            <InputError message={errors['profile.jenis_kelamin']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[divisi]" value="Divisi" />
                                            <TextInput
                                                id="profile[divisi]"
                                                type="text"
                                                className="mt-1 block w-full"
                                                value={data['profile[divisi]']}
                                                onChange={e => setData('profile[divisi]', e.target.value)}
                                                required={withProfile}
                                            />
                                            <InputError message={errors['profile.divisi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[posisi]" value="Posisi" />
                                            <select
                                                id="profile[posisi]"
                                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-accent-2 focus:ring focus:ring-accent-2 focus:ring-opacity-50"
                                                value={data['profile[posisi]']}
                                                onChange={e => setData('profile[posisi]', e.target.value)}
                                                required={withProfile}
                                            >
                                                <option value="">Pilih Posisi</option>
                                                <option value="Fakultas">Fakultas</option>
                                                <option value="Pusat">Pusat</option>
                                            </select>
                                            <InputError message={errors['profile.posisi']} className="mt-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="profile[photo]" value="Foto" />
                                            <input
                                                id="profile[photo]"
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
                                    </div>
                                )}
                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route('users.index')}
                                        className="px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase hover:bg-gray-50"
                                    >
                                        Batal
                                    </Link>
                                    <PrimaryButton type="submit" disabled={processing}>
                                        Simpan
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
