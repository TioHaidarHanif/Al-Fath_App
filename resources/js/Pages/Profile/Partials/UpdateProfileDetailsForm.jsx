import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function UpdateProfileDetailsForm({ profile, auth, className = '' }) {
    const isNew = !profile;
    const [photoPreview, setPhotoPreview] = useState(profile?.photo ? `/storage/${profile.photo}` : null);
    
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        user_id: auth?.user?.id || '',
        nim: profile?.nim || '',
        fakultas: profile?.fakultas || '',
        prodi: profile?.prodi || '',
        angkatan: profile?.angkatan || new Date().getFullYear(),
        amanah: profile?.amanah || '',
        jenis_kelamin: profile?.jenis_kelamin || 'Ikhwan',
        divisi: profile?.divisi || '',
        posisi: profile?.posisi || 'Fakultas',
        photo: null,
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('photo', file);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        
        if (isNew) {
            post(route('profile.store.details'), {
                forceFormData: true,
            });
        } else {
            post(route('profile.update.details'), {
                forceFormData: true,
            });
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">{isNew ? 'Create Profile' : 'Update Profile Details'}</h2>
                <p className="mt-1 text-sm text-gray-600">
                    {isNew 
                        ? 'Create your profile information and upload a photo.' 
                        : 'Update your profile information and photo.'}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="nim" value="NIM" />
                    <TextInput
                        id="nim"
                        className="mt-1 block w-full"
                        value={data.nim}
                        onChange={(e) => setData('nim', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.nim} />
                </div>

                <div>
                    <InputLabel htmlFor="fakultas" value="Fakultas" />
                    <TextInput
                        id="fakultas"
                        className="mt-1 block w-full"
                        value={data.fakultas}
                        onChange={(e) => setData('fakultas', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.fakultas} />
                </div>

                <div>
                    <InputLabel htmlFor="prodi" value="Program Studi" />
                    <TextInput
                        id="prodi"
                        className="mt-1 block w-full"
                        value={data.prodi}
                        onChange={(e) => setData('prodi', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.prodi} />
                </div>

                <div>
                    <InputLabel htmlFor="angkatan" value="Angkatan" />
                    <TextInput
                        id="angkatan"
                        type="number"
                        className="mt-1 block w-full"
                        value={data.angkatan}
                        onChange={(e) => setData('angkatan', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.angkatan} />
                </div>

                <div>
                    <InputLabel htmlFor="amanah" value="Amanah" />
                    <TextInput
                        id="amanah"
                        className="mt-1 block w-full"
                        value={data.amanah}
                        onChange={(e) => setData('amanah', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.amanah} />
                </div>

                <div>
                    <InputLabel htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                    <select
                        id="jenis_kelamin"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.jenis_kelamin}
                        onChange={(e) => setData('jenis_kelamin', e.target.value)}
                        required
                    >
                        <option value="Ikhwan">Ikhwan</option>
                        <option value="Akhwat">Akhwat</option>
                    </select>
                    <InputError className="mt-2" message={errors.jenis_kelamin} />
                </div>

                <div>
                    <InputLabel htmlFor="divisi" value="Divisi" />
                    <TextInput
                        id="divisi"
                        className="mt-1 block w-full"
                        value={data.divisi}
                        onChange={(e) => setData('divisi', e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.divisi} />
                </div>

                <div>
                    <InputLabel htmlFor="posisi" value="Posisi" />
                    <select
                        id="posisi"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.posisi}
                        onChange={(e) => setData('posisi', e.target.value)}
                        required
                    >
                        <option value="Fakultas">Fakultas</option>
                        <option value="Pusat">Pusat</option>
                    </select>
                    <InputError className="mt-2" message={errors.posisi} />
                </div>

                <div>
                    <InputLabel htmlFor="photo" value="Photo" />
                    <div className="mt-2">
                        {photoPreview && (
                            <div className="mb-2">
                                <img 
                                    src={photoPreview} 
                                    alt="Profile Preview" 
                                    className="rounded-full h-20 w-20 object-cover"
                                />
                            </div>
                        )}
                        <input
                            type="file"
                            id="photo"
                            onChange={handlePhotoChange}
                            className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.photo} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>{isNew ? 'Create' : 'Save'}</PrimaryButton>

                    {recentlySuccessful && (
                        <p className="text-sm text-gray-600">{isNew ? 'Created.' : 'Saved.'}</p>
                    )}
                </div>
            </form>
        </section>
    );
}
