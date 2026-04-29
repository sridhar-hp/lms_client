import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { leaveStatus } from "../services/leaveService.js";

const userData = {
    name: "Aisha Sharma",
    reportingManager: "David Lee",
    availableDays: 14.5,
};

const leaveSummary = [
    { type: "Annual Leave", used: 5.5, total: 20, color: "#4F46E5" },
    { type: "Sick Leave", used: 1.0, total: 10, color: "#10B981" },
    { type: "Compensatory Off", used: 0, total: 5, color: "#F59E0B" },
];

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
    // const { userId } = useParams();
    const [leaves, setLeaves] = useState([]);
    const [selectedLeave, setSelectedLeave] = useState(null);
    const user = useSelector(state => state.auth.user);
    const userId = user?.Id;
    const token = useSelector(state => state.auth.token);

    useEffect(() => {
        const Lstatus = async () => {
            const res = await leaveStatus({userId}, token);
            // const token = sessionStorage.getItem("token");
            // const res = await axios.get(`http://localhost:5000/api/status/${userId}`, 
                // { headers: { Authorization: `Bearer ${token}` } });
            setLeaves(res.data.leaves);

        }
        Lstatus();

    }, [userId]);

    const filteredLeaves = leaves.filter((leave) => {
        if (filter === "all") return true;
        return leave.status.toLowerCase() === filter;
    });

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

            <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">👋 Welcome back</h1>

                </div>

            </header>

            <section>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">📋 Request History</h2>
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
                                    <td className="px-6 py-4">
                                        <StatusPill status={request.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                                        <button className="text-gray-500 hover:text-indigo-600" onClick={() => setSelectedLeave(request)}>Details</button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                    {selectedLeave && (//doubt is heare
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