import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Statistics({ auth, statistics }) {
    // Prepare data for the overall completion chart
    const overallData = {
        labels: ['Overall', 'Weekly', 'Monthly'],
        datasets: [
            {
                label: 'Completion Rate (%)',
                data: [
                    statistics.overall.completion_rate.toFixed(1),
                    statistics.weekly.completion_rate.toFixed(1),
                    statistics.monthly.completion_rate.toFixed(1),
                ],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Prepare data for per-question completion rates
    const questionLabels = Object.values(statistics.questions).map(q => q.question);
    const questionRates = Object.values(statistics.questions).map(q => q.completion_rate.toFixed(1));

    const questionData = {
        labels: questionLabels,
        datasets: [
            {
                label: 'Completion Rate (%)',
                data: questionRates,
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Amalan Yaumiyah Statistics</h2>}
        >
            <Head title="Amalan Yaumiyah Statistics" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Overall Stats */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Overall Statistics</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="bg-blue-50 p-4 rounded-lg text-center">
                                    <h4 className="text-blue-700 font-medium">Overall Completion</h4>
                                    <p className="text-2xl font-bold">{statistics.overall.completion_rate.toFixed(1)}%</p>
                                    <p className="text-sm text-gray-600">{statistics.overall.total_entries} entries</p>
                                </div>
                                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                                    <h4 className="text-yellow-700 font-medium">Weekly Completion</h4>
                                    <p className="text-2xl font-bold">{statistics.weekly.completion_rate.toFixed(1)}%</p>
                                    <p className="text-sm text-gray-600">
                                        {statistics.weekly.total_entries} entries this week
                                        <br />
                                        <span className="text-xs">
                                            {new Date(statistics.weekly.start_date).toLocaleDateString()} to {new Date(statistics.weekly.end_date).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg text-center">
                                    <h4 className="text-green-700 font-medium">Monthly Completion</h4>
                                    <p className="text-2xl font-bold">{statistics.monthly.completion_rate.toFixed(1)}%</p>
                                    <p className="text-sm text-gray-600">
                                        {statistics.monthly.total_entries} entries this month
                                        <br />
                                        <span className="text-xs">
                                            {new Date(statistics.monthly.start_date).toLocaleDateString()} to {new Date(statistics.monthly.end_date).toLocaleDateString()}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="h-72">
                                <Bar 
                                    data={overallData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 100,
                                                title: {
                                                    display: true,
                                                    text: 'Completion Rate (%)'
                                                }
                                            }
                                        }
                                    }} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Streak Stats */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Streak Statistics</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-purple-50 p-4 rounded-lg text-center">
                                    <h4 className="text-purple-700 font-medium">Current Streak</h4>
                                    <p className="text-4xl font-bold">{statistics.streaks.current} days</p>
                                </div>
                                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                                    <h4 className="text-indigo-700 font-medium">Longest Streak</h4>
                                    <p className="text-4xl font-bold">{statistics.streaks.max} days</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Per-Question Stats */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Per Question Completion Rate</h3>
                            
                            <div className="h-96">
                                <Bar 
                                    data={questionData} 
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            y: {
                                                beginAtZero: true,
                                                max: 100,
                                                title: {
                                                    display: true,
                                                    text: 'Completion Rate (%)'
                                                }
                                            },
                                            x: {
                                                ticks: {
                                                    autoSkip: false,
                                                    maxRotation: 45,
                                                    minRotation: 45
                                                }
                                            }
                                        }
                                    }} 
                                />
                            </div>

                            <div className="mt-8">
                                <h4 className="font-medium text-gray-700 mb-2">Detailed Statistics</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Question
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Completion Rate
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Total Entries
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {Object.values(statistics.questions).map((question, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        {question.question}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                        {question.completion_rate.toFixed(1)}%
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                        {question.total_entries}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
