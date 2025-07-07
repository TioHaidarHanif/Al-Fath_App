import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, questions, entries, selectedDate, today }) {
    // Prepare initial answers state
    const initialAnswers = questions.map((q) => ({
        question_id: q.id,
        value: entries[q.id] ? entries[q.id].value : '',
    }));
    const { data, setData, post, processing, errors } = useForm({
        entry_date: selectedDate,
        answers: initialAnswers,
    });

    const handleInputChange = (idx, value) => {
        const updated = [...data.answers];
        updated[idx].value = value;
        setData('answers', updated);
    };

    const handleCheckboxChange = (idx, option, checked) => {
        let current = data.answers[idx].value ? data.answers[idx].value.split(',') : [];
        if (checked) {
            current.push(option);
        } else {
            current = current.filter((item) => item !== option);
        }
        handleInputChange(idx, current.join(','));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('amalan-yaumiyah.storeBulkDay'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Amalan Yaumiyah</h2>}
        >
            <Head title="Amalan Yaumiyah" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-gray-900">
                                Daily Amalan for {new Date(selectedDate).toLocaleDateString()}
                            </h3>
                            <input
                                type="date"
                                max={today}
                                value={selectedDate}
                                onChange={(e) => window.location.href = route('amalan-yaumiyah.index', { date: e.target.value })}
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                        </div>
                        <form onSubmit={handleSubmit}>
                            {questions.map((question, idx) => (
                                <div key={question.id} className="mb-6">
                                    <InputLabel value={question.title} />
                                    {question.description && (
                                        <div className="text-sm text-gray-500 mb-1">{question.description}</div>
                                    )}
                                    {(() => {
                                        switch (question.input_type) {
                                            case 'short_text':
                                                return (
                                                    <TextInput
                                                        type="text"
                                                        value={data.answers[idx].value}
                                                        className="mt-1 block w-full"
                                                        onChange={e => handleInputChange(idx, e.target.value)}
                                                    />
                                                );
                                            case 'long_text':
                                                return (
                                                    <textarea
                                                        value={data.answers[idx].value}
                                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                                        onChange={e => handleInputChange(idx, e.target.value)}
                                                        rows={4}
                                                    />
                                                );
                                            case 'multiple_choice':
                                                return (
                                                    <div className="mt-2 space-y-2">
                                                        {question.options && question.options.map((option, oidx) => (
                                                            <div key={oidx} className="flex items-center">
                                                                <input
                                                                    type="radio"
                                                                    id={`q${question.id}-opt${oidx}`}
                                                                    name={`q${question.id}`}
                                                                    value={option}
                                                                    checked={data.answers[idx].value === option}
                                                                    onChange={() => handleInputChange(idx, option)}
                                                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                                />
                                                                <label htmlFor={`q${question.id}-opt${oidx}`} className="ml-2 block text-sm text-gray-700">
                                                                    {option}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </div>
                                                );
                                            case 'checkbox':
                                                return (
                                                    <div className="mt-2 space-y-2">
                                                        {question.options && question.options.map((option, oidx) => {
                                                            const checked = data.answers[idx].value && data.answers[idx].value.split(',').includes(option);
                                                            return (
                                                                <div key={oidx} className="flex items-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`q${question.id}-opt${oidx}`}
                                                                        checked={checked}
                                                                        onChange={e => handleCheckboxChange(idx, option, e.target.checked)}
                                                                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                                                    />
                                                                    <label htmlFor={`q${question.id}-opt${oidx}`} className="ml-2 block text-sm text-gray-700">
                                                                        {option}
                                                                    </label>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    })()}
                                    <InputError message={errors[`answers.${idx}.value`]} className="mt-2" />
                                </div>
                            ))}
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton disabled={processing}>
                                    Save All
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
