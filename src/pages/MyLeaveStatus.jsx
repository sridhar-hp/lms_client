import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Assume all styles and icons come from a robust design system.

// --- Mock Data ---
const userData = {
    name: "Aisha Sharma",
    reportingManager: "David Lee",
    availableDays: 14.5, // Combined total for quick view
};

const leaveSummary = [
    { type: "Annual Leave", used: 5.5, total: 20, color: "#4F46E5" }, // Indigo
    { type: "Sick Leave", used: 1.0, total: 10, color: "#10B981" },  // Green
    { type: "Compensatory Off", used: 0, total: 5, color: "#F59E0B" }, // Amber
];

// const allLeaveRequests = [
//     { id: 101, type: "Annual Leave", dates: "2026-01-15 - 2026-01-17", days: 3, status: "Pending", requestedOn: "2025-11-20", reason: "Vacation" },
//     { id: 102, type: "Sick Leave", dates: "2025-12-01", days: 1, status: "Approved", requestedOn: "2025-11-15", reason: "Fever" },
//     { id: 103, type: "Annual Leave", dates: "2025-10-25 - 2025-10-27", days: 3, status: "Rejected", requestedOn: "2025-10-20", reason: "Conflicting deadline" },
//     { id: 104, type: "Sick Leave", dates: "2025-09-05", days: 1, status: "Approved", requestedOn: "2025-08-30", reason: "N/A" },
//     { id: 105, type: "Annual Leave", dates: "2025-08-01", days: 1, status: "Rejected", requestedOn: "2025-07-25", reason: "Too many team members out" }, // Second rejected item
// ];

// Calculate the rejected count based on mock data
// const rejectedCount = allLeaveRequests.filter(req => req.status === 'Rejected').length;
// --- End Mock Data ---


// Helper: Renders the visually distinct status pill
const StatusPill = ({ status }) => {
    let style = "";
    switch (status) {
        case "Approved":
            style = "bg-green-100 text-green-800 border-green-300";
            break;
        case "Rejected":
            style = "bg-red-100 text-red-800 border-red-300";
            break;
        case "Pending":
        default:
            style = "bg-yellow-100 text-yellow-800 border-yellow-300";
            break;
    }
    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${style} transition-colors duration-200`}>
            {status}
        </span>
    );
};

function MyLeaveStatus() {
    const [filter, setFilter] = useState("all");
    const { userId } = useParams();
    const [leaves, setLeaves] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);

    // Filter logic for the table
    // const filteredRequests = allLeaveRequests.filter(request =>
    //     filter === 'all' ? true : request.status.toLowerCase() === filter
    // );

    useEffect(() => {
        const Lstatus = async () => {
            const res = await axios.get(`http://localhost:5000/api/status/${userId}`);
            setLeaves(res.data.leaves);
            if (res.data.success) {
                // alert("your leave history");
            }
        }
        Lstatus();

    }, [userId]);

    const filteredLeaves = leaves.filter((leave) => {
        if (filter === "all") return true;
        return leave.status.toLowerCase() === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

            {/* --- 1. Header & Call-to-Action --- */}
            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">👋 Welcome back, {userData.name}</h1>
                    <p className="text-lg text-gray-500 mt-1">
                        Your manager: **{userData.reportingManager}** | Available Leave Balance: **{userData.availableDays} Days**
                    </p>
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                    🚀 Request New Leave
                </button>
            </header>

            {/* --- 2. Leave Balance Summary Cards & Rejected Count --- */}
            <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">

                {/* REJECTED COUNT CARD (New Focus Metric) */}
                <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-600 hover:shadow-xl transition duration-300 cursor-pointer"
                    onClick={() => setFilter('rejected')} // Clickable to filter table
                >
                    <p className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                        Rejected Requests
                    </p>
                    <div className="flex items-end justify-between mt-2">
                        {/* <span className="text-5xl font-extrabold text-red-700">{rejectedCount}</span> */}
                        <span className="text-lg font-medium text-gray-500">View History</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Click to view details below.</p>
                </div>

                {/* Individual Leave Type Cards */}
                {leaveSummary.map((item, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg border-t-4" style={{ borderColor: item.color }}>
                        <p className="text-lg font-semibold text-gray-800">{item.type}</p>
                        <div className="mt-2 text-2xl font-bold text-gray-900">
                            {item.total - item.used} <span className="text-base font-normal text-gray-500"> / {item.total} Days Left</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Used: {item.used} days</p>
                        Conceptual Progress Bar (Professional styling)
                        <div className="w-full h-2 bg-gray-200 rounded-full mt-4">
                            <div
                                className={`h-2 rounded-full`}
                                style={{ width: `${(item.used / item.total) * 100}%`, backgroundColor: item.color }}
                            ></div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- 3. Detailed Request Table with Filters --- */}
            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">📋 Request History</h2>
                    {/* Filter Tabs */}
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        {['all', 'pending', 'approved', 'rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`py-2 px-4 text-sm font-medium capitalize border border-gray-200 
                                            ${filter === status ? 'bg-indigo-600 text-white' : 'bg-white text-gray-900 hover:bg-gray-100'}`}
                                style={{
                                    borderTopLeftRadius: status === 'all' ? '0.375rem' : '0',
                                    borderBottomLeftRadius: status === 'all' ? '0.375rem' : '0',
                                    borderTopRightRadius: status === 'rejected' ? '0.375rem' : '0',
                                    borderBottomRightRadius: status === 'rejected' ? '0.375rem' : '0',
                                }}
                            >
                                {status === 'all' ? 'All Requests' : status}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table Structure */}
                <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates & Duration</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requested On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {filteredLeaves.map((request) => (
                                <tr key={request._id} className="hover:bg-indigo-50/50 transition duration-150">
                                    <td className="px-6 py-4 text-sm text-gray-600">#{request.userId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">#{request.leaveType}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{request.startDate} to {request.endDate}<br /> ({request.duration}days)</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(request.appliedDate).toLocaleDateString()}</td>
                                    {/* <td className="px-6 py-4 text-sm text-gray-500">{request.status}</td> */}
                                    <td className="px-6 py-4">
                                        <StatusPill status={request.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                        <button className="text-gray-500 hover:text-indigo-600" onClick={() => setSelectedLeave(request)}>Details</button>
                                        {/* {request.status === 'Pending' && ( */}
                                            {/* // <button className="text-red-500 hover:text-red-700">Cancel</button>
                                        // )} */}
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    {selectedLeave && (
                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                            <div className="bg-white rounded-xl p-6 w-[400px] shadow-xl">
                                <h2 className="text-xl font-bold mb-4">Leave Details</h2>

                                <p><b>Leave Type:</b> {selectedLeave.leaveType}</p>
                                <p><b>From:</b> {selectedLeave.startDate}</p>
                                <p><b>To:</b> {selectedLeave.endDate}</p>
                                <p><b>Duration:</b> {selectedLeave.duration} days</p>
                                <p><b>Status:</b> {selectedLeave.status}</p>
                                <p><b>Reason:</b> {selectedLeave.leaveReason}</p>

                                <button
                                    className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
                                    onClick={() => setSelectedLeave(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}

export default MyLeaveStatus;