import React, { useState, useMemo } from "react";

// --- Mock Data & Configuration (Enhanced) ---
const initialPendingRequests = [
    { 
        id: 201, applicant: "John Doe", dept: "Marketing", type: "Annual Leave", 
        dates: "2026-03-10 - 2026-03-14", days: 5, requestedOn: "2026-02-28", 
        reason: "Pre-booked family trip.", balance: 15.5, priority: 'Medium',
        conflictReason: "N/A"
    },
    { 
        id: 202, applicant: "Emily Clark", dept: "Engineering", type: "Sick Leave", 
        dates: "2026-03-01", days: 1, requestedOn: "2026-03-01", 
        reason: "Severe flu.", balance: 8.0, priority: 'High', 
        conflictReason: "Team Lead is also out that day." // Specific conflict
    },
    { 
        id: 203, applicant: "Marcus Chen", dept: "Sales", type: "Annual Leave", 
        dates: "2026-03-25", days: 1, requestedOn: "2026-02-15", 
        reason: "Long weekend getaway.", balance: 0.5, priority: 'Low', 
        conflictReason: "Below minimum staffing."
    },
];

const teamMetrics = {
    teamSize: 15,
    onLeaveToday: 2,
    criticalCoverage: 80 // Percentage of critical roles currently covered
};

const employeeHistory = {
    // ... (Employee history data remains the same)
};
// --- End Mock Data ---

// --- Sub-Component: Employee Context Panel (Enhanced) ---
const EmployeeContextPanel = ({ request, onAction, actionPending }) => {
    // Get employee history based on request.applicant
    const history = employeeHistory[request.applicant] || {};
    const isLowBalance = request.balance - request.days < 0;

    const [rejectionReason, setRejectionReason] = useState("");

    return (
        <div className="p-5 space-y-5 bg-white shadow-lg rounded-xl h-full flex flex-col">
            <h3 className="text-2xl font-bold text-indigo-800 border-b pb-3">Review & Action: {request.applicant}</h3>

            {/* A. Critical Metrics */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border-l-4 border-gray-400 bg-gray-50 rounded-md">
                    <p className="text-xs font-semibold text-gray-600">Current Balance</p>
                    <span className="text-xl font-bold text-gray-900">{request.balance.toFixed(1)} Days</span>
                </div>
                <div className={`p-3 border-l-4 rounded-md ${isLowBalance ? 'border-red-600 bg-red-50' : 'border-green-600 bg-green-50'}`}>
                    <p className="text-xs font-semibold text-gray-600">Requested Duration</p>
                    <span className="text-xl font-bold">{request.days} Days</span>
                </div>
            </div>

            {/* B. Conflicts & Compliance Warnings */}
            {request.conflictReason && (
                <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
                    <p className="font-bold text-yellow-800">⚠️ Conflict Alert:</p>
                    <p className="text-sm text-yellow-800">{request.conflictReason}</p>
                </div>
            )}
            
            {/* C. History Snippet */}
            <h4 className="font-semibold text-gray-700">Past Behavior:</h4>
            <div className="text-sm text-gray-600">
                Last Request Status: **{history.lastRequestStatus || 'N/A'}** | Rejections YTD: **{history.rejectedCountYTD || 0}**
            </div>

            {/* D. Action Area */}
            <div className="flex-grow space-y-4 pt-4 border-t border-gray-100">
                <label className="block text-sm font-medium text-gray-700">Rejection Note (Mandatory for Reject)</label>
                <textarea
                    rows="3"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection (mandatory for audit trail)..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />

                <div className="flex space-x-4">
                    <button 
                        onClick={() => onAction(request.id, 'Approved')}
                        disabled={actionPending}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow transition duration-200 disabled:opacity-50"
                    >
                        Approve Request
                    </button>
                    <button 
                        onClick={() => onAction(request.id, 'Rejected', rejectionReason)}
                        disabled={actionPending || !rejectionReason}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg shadow transition duration-200 disabled:opacity-50"
                    >
                        Reject Request
                    </button>
                </div>
                <p className="text-xs text-gray-500 italic pt-2">
                    Action requires logging a rejection reason for compliance audit.
                </p>
            </div>
        </div>
    );
};
// --- End Sub-Component ---


function StudentLeaveRequests() {
    const [requests, setRequests] = useState(initialPendingRequests);
    const [selectedRequest, setSelectedRequest] = useState(initialPendingRequests[0]);
    const [actionPending, setActionPending] = useState(false);
    
    // --- Core Action Handler ---
    const handleAction = (id, action, reason = null) => {
        if (action === 'Rejected' && !reason) return; // Enforce audit compliance
        
        setActionPending(true);
        
        // Simulating API delay
        setTimeout(() => {
            console.log(`Executing ${action} for ID: ${id}. Reason: ${reason || 'N/A'}`);
            
            // Remove the processed item
            setRequests(prev => prev.filter(req => req.id !== id));
            
            // Select the next item or null
            const nextRequest = requests.find(req => req.id !== id) || null;
            setSelectedRequest(nextRequest);
            
            setActionPending(false);
        }, 500);
    };

    return(
        <div className="min-h-screen bg-gray-50 font-sans">
            
            {/* --- 1. Sticky Header with Metrics & Navigation --- */}
            <header className="sticky top-0 z-10 bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-200">
                <h1 className="text-2xl font-extrabold text-gray-800">Leave Approval Console</h1>
                <div className="flex items-center space-x-6 text-sm">
                    <div className="text-center">
                        <p className="font-semibold text-gray-600">Pending Requests</p>
                        <span className="text-2xl font-bold text-red-600">{requests.length}</span>
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

            {/* --- 2. Master-Detail View --- */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* A. Master List (Left/2/3rds Column) */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-bold text-gray-700">Requests Awaiting Review</h2>
                    
                    {requests.length === 0 ? (
                        <div className="bg-white p-12 rounded-xl text-center text-gray-500 shadow-lg">
                            🎉 All clear! No requests pending approval.
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-200 bg-white shadow-lg rounded-xl">
                            {requests.map((request) => {
                                const isSelected = selectedRequest && selectedRequest.id === request.id;
                                const priorityClass = request.conflictReason ? 'border-l-4 border-yellow-500' : 'border-l-4 border-indigo-200';
                                
                                return (
                                    <div 
                                        key={request.id}
                                        onClick={() => setSelectedRequest(request)}
                                        className={`p-4 hover:bg-indigo-50/50 cursor-pointer transition duration-150 ${isSelected ? 'bg-indigo-100/75 border-indigo-600' : ''} ${priorityClass}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex flex-col">
                                                <span className="text-lg font-bold text-gray-900">{request.applicant} 
                                                    <span className="text-sm font-normal text-gray-500 ml-2">({request.dept})</span>
                                                </span>
                                                <span className="text-sm text-gray-600">{request.type}: {request.dates} ({request.days} Days)</span>
                                            </div>
                                            <div className="text-right">
                                                {request.conflictReason && (
                                                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-bold">CONFLICT</span>
                                                )}
                                                <p className="text-xs text-gray-500 mt-1">Requested: {request.requestedOn}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* B. Detail & Action Panel (Right/1/3rd Column) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24"> {/* Makes the panel scroll independently */}
                        {selectedRequest ? (
                            <EmployeeContextPanel 
                                request={selectedRequest} 
                                onAction={handleAction} 
                                actionPending={actionPending}
                            />
                        ) : (
                            <div className="bg-white p-10 rounded-xl shadow-lg text-center text-gray-500">
                                Click a request on the left to review details and approve/reject.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentLeaveRequests;