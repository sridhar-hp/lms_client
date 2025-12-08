import axios from "axios";
import React, { useState, useMemo,useEffect } from "react";
import { useLocation } from "react-router-dom";

// --- Mock Data & Configuration ---
const initialLeaveBalances = [
    { type: "Annual Leave", balance: 14.5, total: 20 },
    { type: "Sick Leave", balance: 8.0, total: 10 },
    { type: "Compensatory Off", balance: 5.0, total: 5 },
    { type: "Unpaid Leave", balance: Infinity, total: Infinity }
];
// --- End Mock Data ---


// Helper function: Calculates duration excluding weekends/holidays (Simplified)
const calculateWorkingDays = (start, end) => {//=
    if (!start || !end) return 0;
    const startDT = new Date(start);
    const endDT = new Date(end);
    const diffTime = Math.abs(endDT - startDT);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
};


function ApplyLeave() {
    const [formData, setFormData] = useState({
        name: "", // Added Name field to state
        leaveType: initialLeaveBalances[0].type,
        startDate: "",
        endDate: "",
        leaveReason: "",
        attachment: null,
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [duration, setDuration] = useState(0);
    const location = useLocation();
    const userId = location.state?.userId;

    useEffect(() => {
        console.log("User ID:", userId);  // logs once
    }, []);
    // console.log("User ID:", userId);
    // Calculate the active balance for the selected leave type
    const selectedBalance = useMemo(() => {
        return initialLeaveBalances.find(item => item.type === formData.leaveType);
    }, [formData.leaveType]);

    // --- Dynamic Form Logic ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            let newData = { ...prevData, [name]: value };

            if (name === "startDate" || name === "endDate" || name === "leaveType") {//=
                const start = name === "startDate" ? value : prevData.startDate;
                const end = name === "endDate" ? value : prevData.endDate;
                setDuration(calculateWorkingDays(start, end));
            }
            return newData;
        });
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, attachment: e.target.files[0] }));
    };

    // --- Validation and Submission ---
    const isBalanceExceeded = duration > selectedBalance?.balance && selectedBalance.balance !== Infinity;

    // Added !formData.name to validation check
    const isFormInvalid = !formData.name || duration === 0 || !formData.leaveReason || isBalanceExceeded;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isFormInvalid) {
            setSubmissionStatus({ type: 'error', message: 'Please ensure all required fields are filled and balance is not exceeded.' });
            return;
        }

        // --- API Submission Simulation ---
        setSubmissionStatus({ type: 'success', message: 'Your request has been successfully submitted for approval.' });
        console.log("Submitting Leave:", { ...formData, duration });
    };


    //handle leave apply
    const handleapply = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/sapply", {
                userId: userId,
                name: formData.name,
                leaveType: formData.leaveType,
                startDate: formData.startDate,
                endDate: formData.endDate,
                leaveReason: formData.leaveReason,
                duration: duration,

            });
            // const ans = res.data.message;
            if (res.data.success) {
                alert("applyed successfully");
            }

        }

        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

            {/* --- 1. Header & Context --- */}
            <header className="mb-8 pb-4 border-b border-indigo-200">
                <h1 className="text-3xl font-extrabold text-indigo-700">🚀 Apply for Leave</h1>
                <p className="text-gray-500 mt-1">
                    Select your leave type and dates. Review your balance before submission.
                </p>
            </header>

            {/* --- 2. Submission Feedback --- */}
            {submissionStatus && (
                <div
                    className={`p-4 mb-6 rounded-lg font-medium ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'} border`}
                >
                    {submissionStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* --- Step 1: Balances Overview (Contextual Cards) --- */}
                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Current Leave Balances</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {initialLeaveBalances
                            .filter(b => b.balance !== Infinity)
                            .map((item, index) => (
                                <div key={index} className="p-4 bg-gray-50 rounded-md border-l-4 border-indigo-400">
                                    <p className="text-sm font-medium text-gray-600">{item.type}</p>
                                    <span className="text-2xl font-bold text-gray-900">{item.balance.toFixed(1)}</span>
                                    <span className="text-sm text-gray-500 ml-1">Days Left</span>
                                </div>
                            ))}
                    </div>
                </section>

                {/* --- Step 2: Request Details and Logic --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* A. Input Fields (Left/Center Columns) */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
                        <h2 className="text-xl font-bold text-gray-800">Request Details</h2>

                        {/* --- NEW NAME INPUT FIELD --- */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">1. Full Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your full name"
                                className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Leave Type */}
                        <div>
                            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">2. Leave Type <span className="text-red-500">*</span></label>
                            <select
                                id="leaveType"
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full py-3 pl-3 pr-10 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            >
                                {initialLeaveBalances.map((type) => (//
                                    <option key={type.type} value={type.type}>
                                        {type.type} ({type.balance === Infinity ? 'Unlimited' : `${type.balance.toFixed(1)} Days Left`})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dates Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">3. Start Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                    className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">4. End Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    min={formData.startDate || new Date().toISOString().split('T')[0]}
                                    required
                                    className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        {/* Reason and Attachment */}
                        <div>
                            <label htmlFor="leaveReason" className="block text-sm font-medium text-gray-700">5. Reason for Leave <span className="text-red-500">*</span></label>
                            <textarea
                                id="leaveReason"
                                name="leaveReason"
                                rows="4"
                                value={formData.leaveReason}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Annual family vacation to the beach, scheduled dental surgery, etc."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">6. Supporting Document (Optional, e.g., Doctor's Note)</label>
                            <input
                                type="file"
                                id="attachment"
                                name="attachment"
                                onChange={handleFileChange}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            />
                        </div>

                    </div>

                    {/* B. Summary & Action Panel (Right Column) */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Duration & Manager Details */}
                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
                            <p className="text-sm font-medium text-gray-600">Calculated Duration:</p>
                            <span className="text-4xl font-extrabold text-gray-900">{duration}</span>
                            <span className="text-xl text-gray-500 ml-1">Days</span>
                            <p className="text-xs text-gray-500 mt-3">Approval Manager: **David Lee**</p>
                        </div>

                        {/* Financial/Balance Warning */}
                        {isBalanceExceeded && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md font-medium">
                                ⚠️ **Balance Overdrawn!**
                                <p className="text-sm mt-1">
                                    This request exceeds your **{selectedBalance.type}** balance. It may automatically be converted to Unpaid Leave (LOP) or be rejected.
                                </p>
                            </div>
                        )}

                        {/* Submission */}
                        <div className="pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={isFormInvalid}
                                onClick={handleapply}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Request for {duration} Days
                            </button>
                            <p className="text-xs text-gray-500 mt-2 text-center">
                                You must submit your request at least 7 days in advance.
                            </p>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}

export default ApplyLeave;