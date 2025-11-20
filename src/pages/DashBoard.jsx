// src/pages/DashboardPage.jsx
import React from 'react';

// --- Dashboard-Specific Constants ---
const CARD_BG = 'bg-white';

const KPIS = [
    { title: "Available PTO Days", value: "15.5", trend: "+8.5 days this year", color: `text-teal-500`, icon: "☀️" },
    { title: "Pending Requests", value: "7", trend: "3 Urgent / 4 Routine", color: "text-red-500", icon: "⏰" },
    { title: "Upcoming Absences", value: "12", trend: "Next 30 days", color: "text-yellow-500", icon: "🗓️" },
    { title: "Team Utilization", value: "85%", trend: "Target 90%", color: "text-green-500", icon: "📊" },
];

const RECENT_ACTIVITY = [
    { name: "Annual Leave", type: "Requested by J. Doe", time: "5 min ago", status: "Pending" },
    { name: "Sick Leave", type: "Approved by Admin", time: "1 hr ago", status: "Approved" },
    { name: "Paternity Leave", type: "Coverage Confirmed", time: "4 hrs ago", status: "Confirmed" },
    { name: "H. Johnson Request", type: "Rejected - Conflict", time: "1 day ago", status: "Rejected" },
];

// --- Dashboard Helper Components ---

const KPICard = ({ title, value, trend, color, icon }) => (
    <div className={`${CARD_BG} p-6 rounded-xl shadow-lg border border-gray-200 hover:border-teal-400 relative overflow-hidden transition duration-300`}>
        <div className={`absolute top-0 left-0 h-1 w-1/4 bg-teal-500 rounded-br-lg`}></div>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-4xl font-black text-gray-800 mb-3">{value}</h3>
            </div>
            <span className="text-4xl">{icon}</span>
        </div>
        <p className={`text-sm font-semibold ${color} flex items-center mt-2`}>
            <span className="mr-1 text-base">
                {color.includes('green') ? '▲' : color.includes('red') ? '▼' : '●'}
            </span>
            {trend}
        </p>
    </div>
);

const StatusBadge = ({ status }) => {
    let badgeClasses = '';
    let icon = '';
    if (status === 'Approved') {
        badgeClasses = 'bg-green-100 text-green-700 border border-green-300';
        icon = '✅';
    } else if (status === 'Rejected') {
        badgeClasses = 'bg-red-100 text-red-700 border border-red-300';
        icon = '❌';
    } else if (status === 'Pending') {
        badgeClasses = 'bg-yellow-100 text-yellow-700 border border-yellow-300';
        icon = '⏳';
    } else {
        badgeClasses = `bg-teal-100 text-teal-700 border border-teal-300`;
        icon = 'ℹ️';
    }
    return (
        <span className={`px-3 py-1 text-xs font-bold rounded-full flex items-center space-x-1 ${badgeClasses}`}>
            <span>{icon}</span>
            <span className='hidden sm:inline'>{status}</span>
        </span>
    );
};


const ActivityItem = ({ name, type, time, status }) => (
    <div className={`flex justify-between items-center py-3 px-1 border-b border-gray-200 last:border-b-0 
        transition duration-150 hover:bg-gray-50 rounded-md`}>
        <div className="flex items-center space-x-3">
            <div className="flex flex-col">
                <span className="font-semibold text-gray-800">{name}</span>
                <span className="text-sm text-gray-500">{type}</span>
            </div>
        </div>
        <div className="text-right flex items-center space-x-3">
            <StatusBadge status={status} />
            <span className="text-xs text-gray-400 hidden sm:block">{time}</span>
        </div>
    </div>
);

const TeamLeaveUtilizationChart = () => {
    const chartData = [
        { height: 40, label: 'Q1', value: '15%' },
        { height: 70, label: 'Q2', value: '25%' },
        { height: 55, label: 'Q3', value: '20%' },
        { height: 85, label: 'Q4', value: '30%' },
    ];

    return (
        <div className={`${CARD_BG} p-6 rounded-xl border border-gray-200 shadow-lg`}>
            <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">Team Leave Utilization (Quarterly)</h3>
            <div className="flex h-64 items-end space-x-6 justify-around px-2 relative">
                <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-gray-300"></div>

                {chartData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-grow max-w-[60px] group">
                        <div className="text-sm font-bold text-transparent group-hover:text-teal-500 transition-colors mb-2">{item.value}</div>
                        <div
                            style={{ height: `${item.height}%` }}
                            className={`w-10 rounded-t-lg bg-gradient-to-t from-teal-500 to-cyan-400 
                                transition-all duration-500 shadow-lg shadow-teal-100/50 group-hover:scale-y-105 group-hover:ring-2 group-hover:ring-teal-500`}
                        ></div>
                        <span className="text-sm font-medium text-gray-500 mt-2">{item.label}</span>
                    </div>
                ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
                Total **95 days** utilized this year. Utilization spiked in **Q4** (Holiday Season).
            </p>
        </div>
    );
};


// --- Dashboard Page Component ---
export default function DashboardPage() {
    return (
        <main className="p-6 md:p-8 lg:p-10 flex-grow">
            {/* KPI Grid */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-10">
                {KPIS.map((kpi, index) => (
                    <KPICard key={index} {...kpi} />
                ))}
            </section>

            {/* Main Content Sections */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Chart (2/3 width on large screens) */}
                <div className="lg:col-span-2">
                    <TeamLeaveUtilizationChart />
                </div>

                {/* Recent Activity (1/3 width on large screens) */}
                <div className="lg:col-span-1">
                    <div className={`${CARD_BG} p-6 rounded-xl border border-gray-200 shadow-lg min-h-[400px]`}>
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-3">Recent Leave Activity</h3>
                        <div className="space-y-1">
                            {RECENT_ACTIVITY.map((activity, index) => (
                                <ActivityItem key={index} {...activity} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
// export default DashboardPage;