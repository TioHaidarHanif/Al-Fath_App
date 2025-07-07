import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function LoggingDashboard({ auth, logs, users, filters, stats }) {
    const [filter, setFilter] = useState({
        user_id: filters.user_id || '',
        start_date: filters.start_date || '',
        end_date: filters.end_date || '',
        search: filters.search || '',
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route('admin.logging'), filter, { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-heading text-2xl text-text-primary">User Activity Logs</h2>}>
            <Head title="User Activity Logs" />
            <div className="py-8 max-w-7xl mx-auto">
                <form onSubmit={handleFilter} className="flex flex-wrap gap-4 mb-6 items-end">
                    <div>
                        <label>User</label>
                        <select className="block w-full" value={filter.user_id} onChange={e => setFilter(f => ({ ...f, user_id: e.target.value }))}>
                            <option value="">All</option>
                            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label>Start Date</label>
                        <input type="date" className="block w-full" value={filter.start_date} onChange={e => setFilter(f => ({ ...f, start_date: e.target.value }))} />
                    </div>
                    <div>
                        <label>End Date</label>
                        <input type="date" className="block w-full" value={filter.end_date} onChange={e => setFilter(f => ({ ...f, end_date: e.target.value }))} />
                    </div>
                    <div>
                        <label>Search</label>
                        <input type="text" className="block w-full" placeholder="Action or Resource" value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))} />
                    </div>
                    <button type="submit" className="btn btn-primary">Filter</button>
                </form>

                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card p-4">
                        <div className="text-lg font-bold">Total Actions</div>
                        <div className="text-2xl">{stats.totalActions}</div>
                    </div>
                    <div className="card p-4">
                        <div className="text-lg font-bold">Actions per User</div>
                        <ul className="text-sm mt-2">
                            {stats.actionsPerUser.map(row => (
                                <li key={row.user_id}>{row.user?.name || 'Unknown'}: {row.count}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="card p-4">
                        <div className="text-lg font-bold">Actions per Day</div>
                        <ul className="text-sm mt-2">
                            {stats.actionsPerDay.map(row => (
                                <li key={row.date}>{row.date}: {row.count}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr>
                                <th className="px-2 py-1 border">Time</th>
                                <th className="px-2 py-1 border">User</th>
                                <th className="px-2 py-1 border">Action</th>
                                <th className="px-2 py-1 border">Resource</th>
                                <th className="px-2 py-1 border">Resource ID</th>
                                <th className="px-2 py-1 border">IP</th>
                                <th className="px-2 py-1 border">User Agent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.data.map(log => (
                                <tr key={log.id}>
                                    <td className="px-2 py-1 border">{log.created_at}</td>
                                    <td className="px-2 py-1 border">{log.user?.name || 'Unknown'}</td>
                                    <td className="px-2 py-1 border">{log.action}</td>
                                    <td className="px-2 py-1 border">{log.resource_type}</td>
                                    <td className="px-2 py-1 border">{log.resource_id}</td>
                                    <td className="px-2 py-1 border">{log.ip_address}</td>
                                    <td className="px-2 py-1 border truncate max-w-xs">{log.user_agent}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4">
                    {/* Pagination */}
                    {logs.links && logs.links.length > 1 && (
                        <div className="flex gap-2 flex-wrap">
                            {logs.links.map((link, i) => (
                                <button key={i} disabled={!link.url} onClick={() => router.get(link.url)} className={link.active ? 'font-bold underline' : ''} dangerouslySetInnerHTML={{ __html: link.label }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
