import React from 'react';

const BACKGROUND_COLOR = 'bg-gray-50';
const CARD_BG = 'bg-white';
const PRIMARY_ACCENT = 'teal-600';

const REAL_TIME_STATUS_KPIS = [
    { title: "Students Present Today", value: "8,125", trend: "96% of Active Roster", color: `text-${PRIMARY_ACCENT}`, icon: "✔️" },
    { title: "Students Absent Today", value: "325", trend: "15 Unverified Absences", color: "text-red-600", icon: "❌" },
    { title: "Faculty/Staff Present", value: "98%", trend: "4 Unscheduled Absences", color: `text-${PRIMARY_ACCENT}`, icon: "👥" },
    { title: "New Applications (Week)", value: "180", trend: "45 Pending Review", color: "text-amber-600", icon: "📝" },
];

const UNVERIFIED_ABSENCE_LOG = [
    { id: '10034', student: 'J. Davis', course: 'MKTG 301', time: '9:00 AM', status: 'Unverified', action: 'Notify Advisor' },
    { id: '10055', student: 'A. Chen', course: 'ENGL 101', time: '10:30 AM', status: 'Unverified', action: 'Contact Student' },
    { id: '10112', student: 'R. Bell', course: 'CSCI 205', time: '11:00 AM', status: 'Unverified', action: 'Notify Advisor' },
    { id: '10298', student: 'L. Khan', course: 'MATH 101', time: '1:00 PM', status: 'Unverified', action: 'Notify Faculty' },
    { id: '10301', student: 'M. Lee', course: 'HIST 105', time: '2:30 PM', status: 'Unverified', action: 'Contact Student' },
    { id: '10405', student: 'C. Patel', course: 'MKTG 301', time: '9:00 AM', status: 'Unverified', action: 'Notify Advisor' },
    { id: '10411', student: 'B. Smith', course: 'ENGL 101', time: '10:30 AM', status: 'Unverified', action: 'Contact Student' },
    { id: '10520', student: 'T. Jones', course: 'CSCI 205', time: '11:00 AM', status: 'Unverified', action: 'Notify Advisor' },
];

const KPICard = ({ title, value, trend, color, icon }) => (
    <div className={`${CARD_BG} p-6 rounded-lg shadow-sm border-t-4 border-gray-200 transition duration-300 hover:border-t-4 hover:border-${PRIMARY_ACCENT}`}>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</p>
                <h3 className={`text-3xl font-extrabold ${color} mt-1`}>{value}</h3>
            </div>
            <span className={`text-2xl p-2 rounded-full bg-gray-100 ${color}`}>{icon}</span>
        </div>

        <p className={`text-xs font-semibold text-gray-600 mt-3 pt-2 border-t border-gray-100`}>
            {trend}
        </p>
    </div>
);

const ExpandedAbsenceLog = ({ data }) => {
    const criticalCount = 15;

    return (
        <div className={`${CARD_BG} p-8 rounded-lg shadow-xl border-t-8 border-red-500`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-extrabold text-red-700">
                    🔴 Critical Action Required: {criticalCount} Unverified Absences Today
                </h3>
                <button className={`bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-md shadow-lg transition duration-300`}>
                    <span className="mr-2">✉️</span> Send Bulk Notifications
                </button>
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-red-50">
                        <tr>
                            {['ID', 'Student Name', 'Course', 'Absence Time', 'Status', 'Action Priority'].map((header) => (
                                <th key={header} className="px-6 py-3 text-left text-xs font-extrabold text-red-700 uppercase tracking-wider">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((item, index) => (
                            <tr key={item.id} className="hover:bg-red-100/50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{item.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900 font-semibold">{item.student}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.course}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2 py-1 text-xs font-semibold rounded bg-red-200 text-red-800 border border-red-300">
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className={`text-${PRIMARY_ACCENT} hover:text-teal-700 font-bold`}>{item.action}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <a href="#" className={`text-sm font-semibold text-${PRIMARY_ACCENT} mt-6 block text-center pt-3 border-t border-gray-100`}>
                Access Full Attendance Management System →
            </a>
        </div>
    );
};

export default function OperationalResourceConsole() {
    return (
        <main className={`p-8 md:p-12 flex-grow ${BACKGROUND_COLOR} min-h-screen`}>

            <header className="flex justify-between items-center mb-10 pb-4 border-b-4 border-gray-300">
                <h1 className={`text-4xl font-extrabold text-${PRIMARY_ACCENT}`}>Operational Resource Console</h1>
                <button className={`bg-${PRIMARY_ACCENT} hover:bg-teal-700 text-white font-semibold py-2.5 px-6 rounded-md shadow-lg transition duration-300`}>
                    <span className="mr-2">🔧</span> Run Operational Audit
                </button>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {REAL_TIME_STATUS_KPIS.map((kpi, index) => (
                    <KPICard key={index} {...kpi} />
                ))}
            </section>

            <hr className="border-gray-300" />

            <section className="mt-8">
                <ExpandedAbsenceLog data={UNVERIFIED_ABSENCE_LOG} />
            </section>
        </main>
    );
}