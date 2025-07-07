import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, profile }) {
    const { data, setData, post, processing, errors } = useForm({
        nim: profile.nim || '',
        fakultas: profile.fakultas || '',
        prodi: profile.prodi || '',
        angkatan: profile.angkatan || new Date().getFullYear(),
        amanah: profile.amanah || '',
        jenis_kelamin: profile.jenis_kelamin || '',
        divisi: profile.divisi || '',
        posisi: profile.posisi || '',
        photo: null,
    });
    
    const [photoPreview, setPhotoPreview] = useState(profile.photo ? `/storage/${profile.photo}` : null);
    
    const handleSubmit = (e) => {
    e.preventDefault();
    post(route('profile-management.update', profile.id), {
        ...data,
        _method: 'put',
    }, {
        forceFormData: true,
    });
};
    
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setData('photo', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-heading text-2xl text-text-primary">Edit Anggota</h2>}
        >
            <Head title="Edit Anggota" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-text-primary">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold">Edit Data {profile.user.name}</h3>
                            </div>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="nim" value="NIM" />
                                    <TextInput
                                        id="nim"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.nim}
                                        onChange={(e) => setData('nim', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.nim} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="fakultas" value="Fakultas" />
                                    <TextInput
                                        id="fakultas"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.fakultas}
                                        onChange={(e) => setData('fakultas', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.fakultas} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="prodi" value="Program Studi" />
                                    <TextInput
                                        id="prodi"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.prodi}
                                        onChange={(e) => setData('prodi', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.prodi} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="angkatan" value="Angkatan" />
                                    <TextInput
                                        id="angkatan"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.angkatan}
                                        onChange={(e) => setData('angkatan', e.target.value)}
                                        min="2000"
                                        max={new Date().getFullYear() + 1}
                                        required
                                    />
                                    <InputError message={errors.angkatan} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="amanah" value="Amanah" />
                                    <TextInput
                                        id="amanah"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.amanah}
                                        onChange={(e) => setData('amanah', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.amanah} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                                    <select
                                        id="jenis_kelamin"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-accent-2 focus:ring focus:ring-accent-2 focus:ring-opacity-50"
                                        value={data.jenis_kelamin}
                                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Ikhwan">Ikhwan</option>
                                        <option value="Akhwat">Akhwat</option>
                                    </select>
                                    <InputError message={errors.jenis_kelamin} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="divisi" value="Divisi" />
                                    <TextInput
                                        id="divisi"
                                        type="text"
                                        className="mt-1 block w-full"
                                        value={data.divisi}
                                        onChange={(e) => setData('divisi', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.divisi} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="posisi" value="Posisi" />
                                    <select
                                        id="posisi"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-accent-2 focus:ring focus:ring-accent-2 focus:ring-opacity-50"
                                        value={data.posisi}
                                        onChange={(e) => setData('posisi', e.target.value)}
                                        required
                                    >
                                        <option value="">Pilih Posisi</option>
                                        <option value="Fakultas">Fakultas</option>
                                        <option value="Pusat">Pusat</option>
                                    </select>
                                    <InputError message={errors.posisi} className="mt-2" />
                                </div>
                                
                                <div>
                                    <InputLabel htmlFor="photo" value="Foto" />
                                    <input
                                        id="photo"
                                        type="file"
                                        className="mt-1 block w-full"
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                    />
                                    <InputError message={errors.photo} className="mt-2" />
                                    
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
                                
                                <div className="flex items-center justify-end space-x-3">
                                    <Link
                                        href={route('profile-management.index')}
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
