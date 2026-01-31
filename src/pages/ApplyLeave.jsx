import axios from "axios";
import React, { useState, useMemo, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import applyLeaveSchema from "../validations/ApplyLeaveSchema";

const calculateDays = (start, end) => {
    if (!start || !end) return 0;

    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
};

const calculateWorkingDays = (start, end) => {
    if (!start || !end) return 0;
    const startDT = new Date(start);
    const endDT = new Date(end);
    const diffTime = Math.abs(endDT - startDT);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
};

function ApplyLeave() {
   
    const {
        register,
        handleSubmit,
        formState: { errors }
    }=useForm({
        resolver:yupResolver(applyLeaveSchema),
    });

    const onsubmit = async(data) =>{
        console.log(data);
    }

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [loadingBalance, setLoadingBalance] = useState(true);
    const [duration, setDuration] = useState(0);
    const [leaveBalance, setLeaveBalance] = useState({});
    const location = useLocation();
    const userId = location.state?.userId;
    const requestedDays = calculateDays(formData.startDate, formData.endDate);
    const availableDays = loadingBalance
        ? null
        : formData.leaveType
            ? leaveBalance[formData.leaveType]
            : null;

    const remainingDays =
        typeof availableDays === "number"
            ? availableDays - requestedDays
            : null;

    const isFormInvalid =
        !formData.name ||
        !formData.leaveType ||
        !formData.leaveReason ||
        duration === 0 ||
        remainingDays < 0;

    useEffect(() => {
        console.log("User ID:", userId);
    }, []);

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

    useEffect(() => {
        if (!userId) return;

        const fetchBalance = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/leave-balance/${userId}`
                );

                if (res.data.success) {
                    setLeaveBalance(res.data.leaveBalance);
                }
            } catch (err) {
                console.log(err);
            } finally {
                setLoadingBalance(false);
            }
        };

        fetchBalance();
    }, [userId]);

    const handleFileChange = (e) => {
        setFormData((prevData) => ({ ...prevData, attachment: e.target.files[0] }));
    };

    const handleapply = async (e) => {
            // e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/sapply", {
                // userId: userId,
                // name: formData.name,
                // leaveType: formData.leaveType,
                // startDate: formData.startDate,
                // endDate: formData.endDate,
                // leaveReason: formData.leaveReason,
                // duration: duration,
                userId,
                ...data,
                duration
            });

            if (res.data.success) {
                alert("Applied successfully");

                const balanceRes = await axios.get(
                    `http://localhost:5000/api/leave-balance/${userId}`
                );

                setLeaveBalance(balanceRes.data.leaveBalance);
            }

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">

            <header className="mb-8 pb-4 border-b border-indigo-200">
                <h1 className="text-3xl font-extrabold text-indigo-700">🚀 Apply for Leave</h1>
                <p className="text-gray-500 mt-1">
                    Select your leave type and dates. Review your balance before submission.
                </p>
            </header>

            {submissionStatus && (
                <div
                    className={`p-4 mb-6 rounded-lg font-medium ${submissionStatus.type === 'success' ? 'bg-green-100 text-green-800 border-green-400' : 'bg-red-100 text-red-800 border-red-400'} border`}
                >
                    {submissionStatus.message}
                </div>
            )}

            <form onSubmit={handleSubmit(handleapply)} className="space-y-8" >

                <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Current Leave Balances
                    </h2>

                    {loadingBalance ? (
                        <p className="text-gray-500">Loading leave balances...</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {Object.entries(leaveBalance).map(([type, days]) => (
                                <div
                                    key={type}
                                    className="p-5 bg-gray-50 border rounded-xl text-center shadow-sm hover:shadow-md transition"
                                >
                                    <p className="text-sm font-semibold text-gray-600">{type}</p>
                                    <p className="text-3xl font-extrabold text-indigo-600 my-2">
                                        {days}
                                    </p>
                                    <p className="text-xs text-gray-500">Days Available</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
                        <h2 className="text-xl font-bold text-gray-800">Request Details</h2>

                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">1. Full Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                {...register("name")}
                                placeholder="Enter your full name"
                                className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}

                        </div>

                        <div>
                            <label htmlFor="leaveType" className="block text-sm font-medium text-gray-700">2. Leave Type <span className="text-red-500">*</span></label>
                            <select
                                id="leaveType"
                                name="leaveType"
                                value={formData.leaveType}
                                onChange={handleChange}
                                required
                                {...request("leaveType")}
                                className="mt-1 block w-full py-3 pl-3 pr-10 border border-gray-300 rounded-md"
                            >
                                <option value="">-- Select Leave Type --</option>

                                {Object.keys(leaveBalance).map((type) => (
                                    <option key={type} value={type}>
                                        {type} ({leaveBalance[type]} days)
                                    </option>
                                ))}
                            </select>
                            {errors.leaveType && <p className="text-red-500 text-sm mt-1" >{errors.leaveType.message}</p>} 


                        </div>

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
                                    {...register("startDate")}
                                    className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                    {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}

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
                                    {...register("endDate")}
                                    className="mt-1 block w-full py-3 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.endDate && <p className="text-red-500 text-sm mt-1" >{errors.endDate.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label htmlFor="leaveReason" className="block text-sm font-medium text-gray-700">5. Reason for Leave <span className="text-red-500">*</span></label>
                            <textarea
                                id="leaveReason"
                                name="leaveReason"
                                rows="4"
                                value={formData.leaveReason}
                                onChange={handleChange}
                                required
                                {...register("leaveReason")}
                                placeholder="e.g., Annual family vacation to the beach, scheduled dental surgery, etc."
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-3"
                            ></textarea>
                            {errors.leaveReason && <p className="text-red-500 text-sm mt-1">{errors.leaveReason.message}</p>}
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

                    <div className="lg:col-span-1 space-y-6">

                        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-indigo-600">
                            <p className="text-sm font-medium text-gray-600">Calculated Duration:</p>
                            <span className="text-4xl font-extrabold text-gray-900">{duration}</span>
                            <span className="text-xl text-gray-500 ml-1">Days</span>
                            <p className="text-xs text-gray-500 mt-3">Approval Manager: **Admin**</p>
                        </div>

                        <div className="pt-4 border-t border-gray-200">
                            <button
                                type="submit"
                                // disabled={isFormInvalid}
                                // onClick={handleapply}
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