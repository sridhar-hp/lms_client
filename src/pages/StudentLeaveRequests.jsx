import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

function formatDate(d) {
    if (!d) return "-";

    const dt = new Date(d);
    if (isNaN(dt.getTime())) return "-";

    const DD = String(dt.getDate()).padStart(2, "0");
    const MM = String(dt.getMonth() + 1).padStart(2, "0");
    const YYYY = dt.getFullYear();

    return `${DD}-${MM}-${YYYY}`;
}

const teamMetrics = {
    teamSize: 15,
    onLeaveToday: 2,
    criticalCoverage: 80
};

const EmployeeContextPanel = ({ request, onAction, actionPending }) => {
    const isLowBalance = request.balance - request.days < 0;

    const handlerejection = async (id) => {
        console.log("Reject Button Clicked, ID:", id);
        const token = sessionStorage.getItem("token");
        try {
            const res = await axios.put(`http://localhost:5000/api/rejection/${id}`,{}, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.success) {
                alert("rejected ✅");
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleaccepting = async (id) => {

        try {
            const token = sessionStorage.getItem("token");
            const res = await axios.put(`http://localhost:5000/api/accept/${id}`,{}, { headers: { Authorization: `Bearer ${token}` } });
            if (res.data.success) {
                alert("accepted successfully ✅");
                window.location.reload();
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="p-5 space-y-5 bg-white shadow-lg rounded-xl h-full flex flex-col">
            <h3 className="text-2xl font-bold text-indigo-800 border-b pb-3">Review & Action: {request.name}</h3>
            <h3>Id:{request.userId}</h3>
            <h5>status:{request.status}</h5>
            <h6>mid:{request._id}</h6>

            <div>
                <h4 className="font-semibold text-gray-700 mb-2">Reason for Leave:</h4>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-md text-sm text-gray-800 italic">
                    {request.leaveReason}
                </div>
            </div>

            <div className="flex-grow space-y-4 pt-4 border-t border-gray-100 mt-auto">
                <div className="flex space-x-4">
                    <button
                        onClick={() => handleaccepting(request._id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow transition duration-200 disabled:opacity-50"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => handlerejection(request._id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow transition duration-200 disabled:opacity-50"
                    >
                        Reject
                    </button>
                </div>
                <p className="text-xs text-gray-500 italic pt-2">
                    Action requires logging a rejection reason for compliance audit.
                </p>
            </div>
        </div>
    );
};

function StudentLeaveRequests() {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [leaveRequest, setLeaveRequest] = useState([])// state na [] vanum
    const [actionPending, setActionPending] = useState(false);
    const [ids, setIds] = useState();

    useEffect(() => {
        const request = async () => {
            const token = sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/request", { headers: { Authorization: `Bearer ${token}`, } });
            setLeaveRequest(res.data.leaveRequest);
            setSelectedRequest(res.data.leaveRequest[0] || null);
        }
        request();
    }, []);

    console.log(leaveRequest)
    const handleAction = (id, action, reason = null) => {
        if (action === 'Rejected' && !reason) return;
        setActionPending(true);

        setTimeout(() => {
            console.log(`Executing ${action} for ID: ${id}. Reason: ${reason || 'N/A'}`);


            setLeaveRequest(prev => prev.filter(req => req.id !== id));

            const nextReq = leaveRequest.find(req => req.id !== id) || null;
            setSelectedRequest(nextReq);


            setActionPending(false);
        }, 500);
    };

    const pendingRequests = leaveRequest.filter(
        req => req.status === "Pending"
    );

    useEffect(() => {
        if (pendingRequests.length === 0) {
            setSelectedRequest(null);
        } else if (
            selectedRequest &&
            selectedRequest.status !== "Pending"
        ) {
            setSelectedRequest(null);
        }
    }, [pendingRequests, selectedRequest]);


    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <header className="sticky top-0 z-10 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200">
                <h1 className="text-2xl font-extrabold text-gray-800">Leave Approval Console</h1>
                <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Pending Requests</p>
                    </div>
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Team Coverage</p>
                        <span className="text-2xl font-bold text-green-600">{teamMetrics.criticalCoverage}%</span>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition">
                        Full Team Calendar
                    </button>
                </div>
            </header>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-700">Requests Awaiting Review</h2>

                    {pendingRequests.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl text-center text-gray-500 shadow-lg">
                            🎉 All clear! No requests pending approval.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 bg-white shadow-lg rounded-xl">
                            {pendingRequests.map((request) => {
                                const isSelected = selectedRequest && selectedRequest.id === request.id;
                                const priorityClass = request.conflictReason && request.conflictReason !== "N/A" ? 'border-l-4 border-yellow-500' : 'border-l-4 border-indigo-200';

                                return (
                                    <div
                                        key={request._id}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`p-4 hover:bg-indigo-50/50 cursor-pointer transition duration-150 ${isSelected ? 'bg-indigo-100/75 border-indigo-600' : ''} ${priorityClass}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900">({request.name}- ID : {request.userId})
                                                </span>
                                                <span className="text-sm text-gray-600">{request.leaveType}: {formatDate(request.startDate)}  to  {formatDate(request.endDate)}  ({request.duration}days)</span>
                                            </div>
                                            <div className="text-right">
                                                {request.conflictReason && request.conflictReason !== "N/A" && (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold">CONFLICT</span>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">Requested-On: {formatDate(request.appliedDate)}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24">
                        {selectedRequest ? (
                            <EmployeeContextPanel
                                request={selectedRequest}
                                onAction={handleAction}
                                actionPending={actionPending}
                            />
                        ) : (
                            <div className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-500">
                                No requests pending 🎉.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLeaveRequests;