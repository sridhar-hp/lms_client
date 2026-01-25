// // import React, { useState, useMemo } from "react";
// // //leave apply.jsx this is have staff leave apply design


// // // --- Icons (SVG Components for portability) ---
// // const CalendarIcon = () => (
// //   <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
// // );
// // const UserIcon = () => (
// //   <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
// // );
// // const UploadIcon = () => (
// //   <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
// // );
// // const InfoIcon = () => (
// //   <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
// // );

// // // --- Mock Data & Configuration ---
// // const initialLeaveBalances = [
// //     { type: "Annual Leave", balance: 14.5, total: 20, color: "bg-blue-500" },
// //     { type: "Sick Leave", balance: 8.0, total: 10, color: "bg-emerald-500" },
// //     { type: "Compensatory Off", balance: 5.0, total: 5, color: "bg-purple-500" },
// //     { type: "Unpaid Leave", balance: Infinity, total: Infinity, color: "bg-gray-400" }
// // ];

// // // Helper: Duration Calculation
// // const calculateWorkingDays = (start, end) => {
// //     if (!start || !end) return 0;
// //     const startDT = new Date(start);
// //     const endDT = new Date(end);
// //     const diffTime = Math.abs(endDT - startDT);
// //     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
// //     return diffDays > 0 ? diffDays : 0;
// // };

// // function LeaveApply() {
// //     const [formData, setFormData] = useState({
// //         name: "", 
// //         leaveType: initialLeaveBalances[0].type,
// //         startDate: "",
// //         endDate: "",
// //         leaveReason: "",
// //         attachment: null,
// //     });
// //     const [submissionStatus, setSubmissionStatus] = useState(null);
// //     const [duration, setDuration] = useState(0);

    
// //     // Active Balance Logic
// //     const selectedBalance = useMemo(() => {
// //         return initialLeaveBalances.find(item => item.type === formData.leaveType);
// //     }, [formData.leaveType]);

// //     // Handler
// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prevData) => {
// //             let newData = { ...prevData, [name]: value };
// //             if (name === "startDate" || name === "endDate") {
// //                 const start = name === "startDate" ? value : prevData.startDate;
// //                 const end = name === "endDate" ? value : prevData.endDate;
// //                 setDuration(calculateWorkingDays(start, end));
// //             }
// //             // Reset duration if leave type changes, but keep dates (optional logic)
// //             if(name === 'leaveType') {
// //                 const start = prevData.startDate;
// //                 const end = prevData.endDate;
// //                 setDuration(calculateWorkingDays(start, end));
// //             }
// //             return newData;
// //         });
// //     };

// //     const handleFileChange = (e) => {
// //         setFormData((prevData) => ({ ...prevData, attachment: e.target.files[0] }));
// //     };

// //     // Validation
// //     const isBalanceExceeded = duration > selectedBalance?.balance && selectedBalance.balance !== Infinity;
// //     const isFormInvalid = !formData.name || duration === 0 || !formData.leaveReason || isBalanceExceeded;

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         if (isFormInvalid) {
// //             setSubmissionStatus({ type: 'error', message: 'Please check your inputs and leave balance.' });
// //             return;
// //         }
// //         setSubmissionStatus({ type: 'success', message: 'Request submitted successfully to HR.' });
// //         // console.log("Submitting:", { ...formData, duration });
// //     };

// //     // Projected Balance Calculation
// //     const projectedBalance = selectedBalance.balance === Infinity 
// //         ? "∞" 
// //         : (selectedBalance.balance - duration).toFixed(1);

// //     return (
// //         <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-12">
            
// //             {/* --- Header Section --- */}
// //             <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                         <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">L</div>
// //                         <h1 className="text-xl font-bold text-slate-900">Leave Portal</h1>
// //                     </div>
// //                     <div className="text-sm text-slate-500">Staff Edition</div>
// //                 </div>
// //             </div>

// //             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                
// //                 {/* --- Top: Balances Overview --- */}
// //                 <div className="mb-8">
// //                     <h2 className="text-lg font-semibold text-slate-800 mb-4">Your Entitlements</h2>
// //                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
// //                         {initialLeaveBalances.map((item, index) => {
// //                             const percentage = item.balance === Infinity ? 100 : (item.balance / item.total) * 100;
// //                             return (
// //                                 <div key={index} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
// //                                     <div className="flex justify-between items-start mb-2">
// //                                         <span className="text-sm font-medium text-slate-500">{item.type}</span>
// //                                         {item.balance !== Infinity && (
// //                                             <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
// //                                                 {item.total} Total
// //                                             </span>
// //                                         )}
// //                                     </div>
// //                                     <div className="flex items-end gap-1 mb-3">
// //                                         <span className="text-3xl font-bold text-slate-900">{item.balance === Infinity ? "∞" : item.balance.toFixed(1)}</span>
// //                                         <span className="text-sm text-slate-400 mb-1">days left</span>
// //                                     </div>
// //                                     {/* Progress Bar */}
// //                                     <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
// //                                         <div 
// //                                             className={`h-full rounded-full ${item.color}`} 
// //                                             style={{ width: `${percentage}%` }}
// //                                         ></div>
// //                                     </div>
// //                                 </div>
// //                             );
// //                         })}
// //                     </div>
// //                 </div>

// //                 {/* --- Main Content Grid --- */}
// //                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
// //                     {/* LEFT COLUMN: The Form */}
// //                     <div className="lg:col-span-2 space-y-6">
// //                         {submissionStatus && (
// //                             <div className={`p-4 rounded-lg flex items-center gap-3 ${submissionStatus.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
// //                                 <InfoIcon />
// //                                 <span className="font-medium">{submissionStatus.message}</span>
// //                             </div>
// //                         )}

// //                         <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
// //                             <div className="p-6 border-b border-slate-100">
// //                                 <h3 className="text-lg font-bold text-slate-900">New Leave Request</h3>
// //                                 <p className="text-sm text-slate-500 mt-1">Fill in the details below. Fields marked with * are mandatory.</p>
// //                             </div>
                            
// //                             <div className="p-6 space-y-6">
// //                                 {/* Row 1: Name & Type */}
// //                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-slate-700 mb-2">Applicant Name *</label>
// //                                         <div className="relative">
// //                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                                 <UserIcon />
// //                                             </div>
// //                                             <input
// //                                                 type="text"
// //                                                 name="name"
// //                                                 value={formData.name}
// //                                                 onChange={handleChange}
// //                                                 required
// //                                                 placeholder="e.g. Sarah Smith"
// //                                                 className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                     <div>
// //                                         <label className="block text-sm font-semibold text-slate-700 mb-2">Leave Category *</label>
// //                                         <select
// //                                             name="leaveType"
// //                                             value={formData.leaveType}
// //                                             onChange={handleChange}
// //                                             className="block w-full pl-3 pr-10 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
// //                                         >
// //                                             {initialLeaveBalances.map((t) => (
// //                                                 <option key={t.type} value={t.type}>{t.type}</option>
// //                                             ))}
// //                                         </select>
// //                                     </div>
// //                                 </div>

// //                                 {/* Row 2: Dates */}
// //                                 <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
// //                                     <label className="block text-sm font-semibold text-slate-700 mb-3">Duration of Absence *</label>
// //                                     <div className="flex flex-col sm:flex-row items-center gap-4">
// //                                         <div className="relative w-full">
// //                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                                 <CalendarIcon />
// //                                             </div>
// //                                             <input
// //                                                 type="date"
// //                                                 name="startDate"
// //                                                 value={formData.startDate}
// //                                                 onChange={handleChange}
// //                                                 min={new Date().toISOString().split('T')[0]}
// //                                                 required
// //                                                 className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                                             />
// //                                         </div>
// //                                         <span className="text-slate-400 font-medium">to</span>
// //                                         <div className="relative w-full">
// //                                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                                                 <CalendarIcon />
// //                                             </div>
// //                                             <input
// //                                                 type="date"
// //                                                 name="endDate"
// //                                                 value={formData.endDate}
// //                                                 onChange={handleChange}
// //                                                 min={formData.startDate}
// //                                                 required
// //                                                 className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>

// //                                 {/* Row 3: Reason */}
// //                                 <div>
// //                                     <label className="block text-sm font-semibold text-slate-700 mb-2">Reason for Leave *</label>
// //                                     <textarea
// //                                         name="leaveReason"
// //                                         rows="4"
// //                                         value={formData.leaveReason}
// //                                         onChange={handleChange}
// //                                         required
// //                                         placeholder="Please provide details regarding your leave request..."
// //                                         className="block w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-none"
// //                                     ></textarea>
// //                                 </div>

// //                                 {/* Row 4: Attachment */}
// //                                 <div>
// //                                     <label className="block text-sm font-semibold text-slate-700 mb-2">Supporting Documents <span className="font-normal text-slate-400">(Optional)</span></label>
// //                                     <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
// //                                         <div className="space-y-1 text-center">
// //                                             <div className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition-colors flex justify-center items-center">
// //                                                 <UploadIcon />
// //                                             </div>
// //                                             <div className="flex text-sm text-slate-600 justify-center">
// //                                                 <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
// //                                                     <span>Upload a file</span>
// //                                                     <input id="file-upload" name="attachment" onChange={handleFileChange} type="file" className="sr-only" />
// //                                                 </label>
// //                                                 <p className="pl-1">or drag and drop</p>
// //                                             </div>
// //                                             <p className="text-xs text-slate-500">
// //                                                 {formData.attachment ? formData.attachment.name : "PDF, PNG, JPG up to 5MB"}
// //                                             </p>
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </form>
// //                     </div>

// //                     {/* RIGHT COLUMN: Sticky Summary Panel */}
// //                     <div className="lg:col-span-1">
// //                         <div className="sticky top-24 space-y-6">
                            
// //                             {/* Summary Card */}
// //                             <div className="bg-indigo-900 text-white rounded-xl shadow-lg overflow-hidden p-6 relative">
// //                                 <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-indigo-700 rounded-full opacity-50 blur-xl"></div>
                                
// //                                 <h4 className="text-indigo-100 font-medium text-sm mb-4 uppercase tracking-wider">Request Summary</h4>
                                
// //                                 <div className="flex items-baseline gap-1 mb-1">
// //                                     <span className="text-5xl font-bold">{duration}</span>
// //                                     <span className="text-xl text-indigo-200">Days</span>
// //                                 </div>
                                
// //                                 <div className="my-6 border-t border-indigo-700/50"></div>

// //                                 {/* Balance Projection */}
// //                                 <div className="space-y-3">
// //                                     <div className="flex justify-between text-sm">
// //                                         <span className="text-indigo-200">Leave Type:</span>
// //                                         <span className="font-semibold">{selectedBalance.type}</span>
// //                                     </div>
// //                                     <div className="flex justify-between text-sm">
// //                                         <span className="text-indigo-200">Current Balance:</span>
// //                                         <span>{selectedBalance.balance === Infinity ? "∞" : selectedBalance.balance.toFixed(1)}</span>
// //                                     </div>
// //                                     <div className="flex justify-between text-sm bg-indigo-800/50 p-2 rounded">
// //                                         <span className="text-indigo-200">Balance After:</span>
// //                                         <span className={`font-bold ${parseFloat(projectedBalance) < 0 ? 'text-red-300' : 'text-emerald-300'}`}>
// //                                             {projectedBalance}
// //                                         </span>
// //                                     </div>
// //                                 </div>

// //                                 {isBalanceExceeded && (
// //                                     <div className="mt-4 text-xs bg-red-500/20 text-red-200 p-2 rounded border border-red-500/30">
// //                                         ⚠️ Insufficient balance. Request may be rejected.
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Submit Action */}
// //                             <button
// //                                 onClick={handleSubmit}
// //                                 disabled={isFormInvalid}
// //                                 className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-95"
// //                             >
// //                                 Submit Request
// //                             </button>
                            
// //                             <p className="text-xs text-center text-slate-400">
// //                                 By submitting, you agree to company leave policies.
// //                             </p>
// //                         </div>
// //                     </div>

// //                 </div>
// //             </main>
// //         </div>
// //     );
// // }
// // export default LeaveApply;

// import axios from "axios";
// import React, { useState, useMemo,useEffect } from "react";
// import { useLocation } from "react-router-dom";

// // --- Mock Data & Configuration ---
// const initialLeaveBalances = [
//     { type: "Annual Leave", balance: 14.5, total: 20 },
//     { type: "Sick Leave", balance: 8.0, total: 10 },
//     { type: "Compensatory Off", balance: 5.0, total: 5 },
//     { type: "Unpaid Leave", balance: Infinity, total: Infinity }
// ];
// // --- End Mock Data ---


// // Helper function: Calculates duration excluding weekends/holidays (Simplified)
// const calculateWorkingDays = (start, end) => {//=
//     if (!start || !end) return 0;
//     const startDT = new Date(start);
//     const endDT = new Date(end);
//     const diffTime = Math.abs(endDT - startDT);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
//     return diffDays > 0 ? diffDays : 0;
// };


// function LeaveApply() {
//     const [formData, setFormData] = useState({
//         name: "", // Added Name field to state
//         leaveType: initialLeaveBalances[0].type,
//         startDate: "",
//         endDate: "",
//         leaveReason: "",
//         attachment: null,
//     });
//     const [submissionStatus, setSubmissionStatus] = useState(null);
//     const [duration, setDuration] = useState(0);
//     const location = useLocation();
//     const userId = location.state?.userId;

//     useEffect(() => {
//         console.log("User ID:", userId);  // logs once
//     }, []);
//     // console.log("User ID:", userId);
//     // Calculate the active balance for the selected leave type
//     const selectedBalance = useMemo(() => {
//         return initialLeaveBalances.find(item => item.type === formData.leaveType);
//     }, [formData.leaveType]);

//     // --- Dynamic Form Logic ---
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => {
//             let newData = { ...prevData, [name]: value };

//             if (name === "startDate" || name === "endDate" || name === "leaveType") {//=
//                 const start = name === "startDate" ? value : prevData.startDate;
//                 const end = name === "endDate" ? value : prevData.endDate;
//                 setDuration(calculateWorkingDays(start, end));
//             }
//             return newData;
//         });
//     };

//     const handleFileChange = (e) => {
//         setFormData((prevData) => ({ ...prevData, attachment: e.target.files[0] }));
//     };

//     // --- Validation and Submission ---
//     const isBalanceExceeded = duration > selectedBalance?.balance && selectedBalance.balance !== Infinity;

//     // Added !formData.name to validation check
//     const isFormInvalid = !formData.name || duration === 0 || !formData.leaveReason || isBalanceExceeded;

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (isFormInvalid) {
//             setSubmissionStatus({ type: 'error', message: 'Please ensure all required fields are filled and balance is not exceeded.' });
//             return;
//         }

//         // --- API Submission Simulation ---
//         setSubmissionStatus({ type: 'success', message: 'Your request has been successfully submitted for approval.' });
//         console.log("Submitting Leave:", { ...formData, duration });
//     };


//     //handle leave apply
//     const handleapply = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post("http://localhost:5000/api/sapply", {
//                 userId: userId,
//                 name: formData.name,
//                 leaveType: formData.leaveType,
//                 startDate: formData.startDate,
//                 endDate: formData.endDate,
//                 leaveReason: formData.leaveReason,
//                 duration: duration,

//             });
//             // const ans = res.data.message;
//             if (res.data.success) {
//                 alert("applyed successfully");
//             }

//         }

//         catch (err) {
//             console.log(err);
//         }
//     }
//     return (
//         <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

//             {/* --- 1. Header & Context --- */}
//             <header className="mb-8 pb-4 border-b border-indigo-200">
//                 <h1 className="text-3xl font-extrabold text-indigo-700">🚀 Apply for Leave</h1>
//                 <p className="text-gray-500 mt-1">
//                     Select your leave type and dates. Review your balance before submission.
//                 </p>
//             </header>

//             {/* --- 2. Submission Feedback --- */}
//             {submissionStatus && (
//                 <div
//                     className={`p-4 mb-6 rounded-lg font-medium ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'} border`}
//                 >
//                     {submissionStatus.message}
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-8">

//                 {/* --- Step 1: Balances Overview (Contextual Cards) --- */}
//                 <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">Current Leave Balances</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                         {initialLeaveBalances
//                             .filter(b => b.balance !== Infinity)
//                             .map((item, index) => (
//                                 <div key={index} className="p-4 bg-gray-50 rounded-md border-l-4 border-indigo-400">
//                                     <p className="text-sm font-medium text-gray-600">{item.type}</p>
//                                     <span className="text-2xl font-bold text-gray-900">{item.balance.toFixed(1)}</span>
//                                     <span className="text-sm text-gray-500 ml-1">Days Left</span>
//                                 </div>
//                             ))}
//                     </div>
//                 </section>

//                 {/* --- Step 2: Request Details and Logic --- */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//                     {/* A. Input Fields (Left/Center Columns) */}
//                     <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
//                         <h2 className="text-xl font-bold text-gray-800">Request Details</h2>

//                         {/* --- NEW NAME INPUT FIELD --- */}
//                         <div>
//                             <label htmlFor="name" className="block text-sm font-medium text-gray-700">1. Full Name <span className="text-red-500">*</span></label>
//                             <input
//                                 type="text"
//                                 id="name"
//                                 name="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="Enter your full name"
//                                 className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                             />
//                         </div>

//                         {/* Leave Type */}
//                         <div>
//                             <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">2. Leave Type <span className="text-red-500">*</span></label>
//                             <select
//                                 id="leaveType"
//                                 name="leaveType"
//                                 value={formData.leaveType}
//                                 onChange={handleChange}
//                                 required
//                                 className="mt-1 block w-full py-3 pl-3 pr-10 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
//                             >
//                                 {initialLeaveBalances.map((type) => (//
//                                     <option key={type.type} value={type.type}>
//                                         {type.type} ({type.balance === Infinity ? 'Unlimited' : `${type.balance.toFixed(1)} Days Left`})
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>

//                         {/* Dates Grid */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">3. Start Date <span className="text-red-500">*</span></label>
//                                 <input
//                                     type="date"
//                                     id="startDate"
//                                     name="startDate"
//                                     value={formData.startDate}
//                                     onChange={handleChange}
//                                     min={new Date().toISOString().split('T')[0]}
//                                     required
//                                     className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">4. End Date <span className="text-red-500">*</span></label>
//                                 <input
//                                     type="date"
//                                     id="endDate"
//                                     name="endDate"
//                                     value={formData.endDate}
//                                     onChange={handleChange}
//                                     min={formData.startDate || new Date().toISOString().split('T')[0]}
//                                     required
//                                     className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//                                 />
//                             </div>
//                         </div>

//                         {/* Reason and Attachment */}
//                         <div>
//                             <label htmlFor="leaveReason" className="block text-sm font-medium text-gray-700">5. Reason for Leave <span className="text-red-500">*</span></label>
//                             <textarea
//                                 id="leaveReason"
//                                 name="leaveReason"
//                                 rows="4"
//                                 value={formData.leaveReason}
//                                 onChange={handleChange}
//                                 required
//                                 placeholder="e.g., Annual family vacation to the beach, scheduled dental surgery, etc."
//                                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
//                             ></textarea>
//                         </div>

//                         <div>
//                             <label htmlFor="attachment" className="block text-sm font-medium text-gray-700">6. Supporting Document (Optional, e.g., Doctor's Note)</label>
//                             <input
//                                 type="file"
//                                 id="attachment"
//                                 name="attachment"
//                                 onChange={handleFileChange}
//                                 className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                             />
//                         </div>

//                     </div>

//                     {/* B. Summary & Action Panel (Right Column) */}
//                     <div className="lg:col-span-1 space-y-6">

//                         {/* Duration & Manager Details */}
//                         <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
//                             <p className="text-sm font-medium text-gray-600">Calculated Duration:</p>
//                             <span className="text-4xl font-extrabold text-gray-900">{duration}</span>
//                             <span className="text-xl text-gray-500 ml-1">Days</span>
//                             <p className="text-xs text-gray-500 mt-3">Approval Manager: **David Lee**</p>
//                         </div>

//                         {/* Financial/Balance Warning */}
//                         {isBalanceExceeded && (
//                             <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md font-medium">
//                                 ⚠️ **Balance Overdrawn!**
//                                 <p className="text-sm mt-1">
//                                     This request exceeds your **{selectedBalance.type}** balance. It may automatically be converted to Unpaid Leave (LOP) or be rejected.
//                                 </p>
//                             </div>
//                         )}

//                         {/* Submission */}
//                         <div className="pt-4 border-t border-gray-200">
//                             <button
//                                 type="submit"
//                                 disabled={isFormInvalid}
//                                 onClick={handleapply}
//                                 className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-xl transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Submit Request for {duration} Days
//                             </button>
//                             <p className="text-xs text-gray-500 mt-2 text-center">
//                                 You must submit your request at least 7 days in advance.
//                             </p>
//                         </div>

//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }

// export default LeaveApply;
