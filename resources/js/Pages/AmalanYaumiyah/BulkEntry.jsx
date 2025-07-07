import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function BulkEntry({ auth, questions, dates, entries }) {
    const { data, setData, post, processing, errors } = useForm({
        entries: [],
    });

    const [savedEntries, setSavedEntries] = useState([]);

    const updateEntry = (date, questionId, value) => {
        // Create a new array with updated values
        const updatedEntries = [...data.entries];
        
        // Find if an entry for this date and question already exists
        const existingIndex = updatedEntries.findIndex(
            entry => entry.date === date && entry.question_id === questionId
        );
        
        if (existingIndex >= 0) {
            // Update existing entry
            updatedEntries[existingIndex].value = value;
        } else {
            // Add new entry
            updatedEntries.push({
                date,
                question_id: questionId,
                value,
            });
        }
        
        setData('entries', updatedEntries);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('amalan-yaumiyah.storeBulk'), {
            onSuccess: () => {
                // Update saved entries to show confirmation
                setSavedEntries(data.entries.map(e => `${e.date}-${e.question_id}`));
            }
        });
    };

    const renderInputField = (question, date) => {
        const currentValue = entries[date] && entries[date][question.id] 
            ? entries[date][question.id]
            : '';
            
        const entryKey = `${date}-${question.id}`;
        const isSaved = savedEntries.includes(entryKey);
        
        switch (question.input_type) {
            case 'short_text':
                return (
                    <div className={`relative ${isSaved ? 'opacity-75' : ''}`}>
                        <TextInput
                            type="text"
                            value={currentValue}
                            className="block w-full"
                            onChange={(e) => updateEntry(date, question.id, e.target.value)}
                        />
                        {isSaved && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
                                Saved
                            </span>
                        )}
                    </div>
                );
            case 'long_text':
                return (
                    <div className={`relative ${isSaved ? 'opacity-75' : ''}`}>
                        <textarea
                            value={currentValue}
                            className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            onChange={(e) => updateEntry(date, question.id, e.target.value)}
                            rows={2}
                        />
                        {isSaved && (
                            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500">
                                Saved
                            </span>
                        )}
                    </div>
                );
            case 'multiple_choice':
                return (
                    <div className={`${isSaved ? 'opacity-75' : ''}`}>
                        <select
                            value={currentValue}
                            onChange={(e) => updateEntry(date, question.id, e.target.value)}
                            className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="">Select an option</option>
                            {question.options && question.options.map((option, idx) => (
                                <option key={idx} value={option}>{option}</option>
                            ))}
                        </select>
                        {isSaved && (
                            <span className="text-sm text-green-500 mt-1 inline-block">
                                Saved
                            </span>
                        )}
                    </div>
                );
            case 'checkbox':
                return (
                    <div className={`space-y-2 ${isSaved ? 'opacity-75' : ''}`}>
                        {question.options && question.options.map((option, idx) => {
                            const isChecked = currentValue && currentValue.includes(option);
                            return (
                                <div key={idx} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`${date}-${question.id}-${idx}`}
                                        checked={isChecked}
                                        onChange={(e) => {
                                            let newValue = currentValue ? currentValue.split(',') : [];
                                            if (e.target.checked) {
                                                newValue.push(option);
                                            } else {
                                                newValue = newValue.filter(item => item !== option);
                                            }
                                            updateEntry(date, question.id, newValue.join(','));
                                        }}
                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                    />
                                    <label 
                                        htmlFor={`${date}-${question.id}-${idx}`} 
                                        className="ml-2 block text-sm text-gray-700"
                                    >
                                        {option}
                                    </label>
                                </div>
                            );
                        })}
                        {isSaved && (
                            <div className="text-sm text-green-500 mt-1">
                                Saved
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Bulk Entry - Amalan Yaumiyah</h2>}
        >
            <Head title="Bulk Entry - Amalan Yaumiyah" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <form onSubmit={handleSubmit}>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Question
                                            </th>
                                            {dates.map((date) => (
                                                <th key={date} scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    {new Date(date).toLocaleDateString()}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {questions.map((question) => (
                                            <tr key={question.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{question.title}</div>
                                                    {question.description && (
                                                        <div className="text-xs text-gray-500">{question.description}</div>
                                                    )}
                                                </td>
                                                {dates.map((date) => (
                                                    <td key={`${question.id}-${date}`} className="px-4 py-4">
                                                        {renderInputField(question, date)}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-6">
                                <InputError message={errors.entries} className="mb-4" />
                                <div className="flex justify-end">
                                    <PrimaryButton disabled={processing}>
                                        Save All Entries
                                    </PrimaryButton>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
