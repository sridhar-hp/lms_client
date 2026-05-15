import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pdetails, Pbioupdate } from "../services/editProfilePage.js";

interface Profile {
    name: string;
    registerNumber: string;
    email: string;
    phoneNumber: string;
}

interface Image {
    image: string;
}

interface Password {
    current: string;
    newPass: string;
    confirm: string;
}

export default function EditProfile() {
    const [loading, setLoading] = useState<boolean>(false);
    const user: any = useSelector((state: any) => state.auth.user);
    const userId: any = user?.Id;
    const token: any = useSelector((state: any) => state.auth.token);

    const [profile, setProfile] = useState<Profile>({
        name: "",
        registerNumber: "",
        email: "",
        phoneNumber: "",
    });

    const [password, setPassword] = useState<Password>({
        current: "",
        newPass: "",
        confirm: "",
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    useEffect(() => {
        if (!userId) {
            console.error("User ID or token is missing");
            return;
        }
        const fetchDetails = async () => {
            try {
                console.log("Fetching profile details for userId:", userId);
                const res = await pdetails(userId, token);
                // console.log(res.data);
                setProfile({
                    name: res.data.profiledetails.name || "",
                    registerNumber: res.data.profiledetails.Id || "",
                    email: res.data.profiledetails.email || "",
                    phoneNumber: res.data.profiledetails.phoneNumber || "",
                });

                console.log("Profile details set:", {
                    name: res.data.profiledetails.name,
                    registerNumber: res.data.profiledetails.Id,
                    email: res.data.profiledetails.email,
                    phoneNumber: res.data.profiledetails.phoneNumber,
                });
            }

            catch (err) {
                console.error("Error fetching profile details:", err);
            }
        }
        fetchDetails();
    }, [userId, token]);

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        console.log(profile);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword({ ...password, [e.target.name]: e.target.value });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    // setProfile({ ...profile, image: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(profile);
        e.preventDefault();

        try {
            const res = await Pbioupdate(userId, profile, token);
            console.log("Profile update response:", res.data.updatedProfile);

            if(res.data.success) {
                        setLoading(true);
            }
        }
        catch (err) {
            console.error("Error updating profile:", err);
        }
        finally {
            setLoading(false);
        }

        setTimeout(() => {
            setLoading(false);
            setSuccess("Profile updated successfully");
        }, 1000);
    };

    const handlePasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password.newPass !== password.confirm)
            return setError("Passwords do not match");

        if (password.newPass.length < 6)
            return setError("Password must be at least 6 characters");

        setError("");
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess("Password updated successfully");
            setPassword({ current: "", newPass: "", confirm: "" });
        }, 1000);
    };


    return (
        <div className="min-h-screen bg-slate-100 px-6 py-10">

            {/*HEADER*/}
            <div className="max-w-6xl mx-auto mb-8">
                <h1 className="text-3xl font-semibold text-slate-800">
                    Account Settings
                </h1>
                <p className="text-slate-500">
                    Manage your profile and security settings
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">

                {/*PROFILE CARD*/}
                <div className="col-span-4">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">

                        {/*IMAGE*/}
                        <div className="relative w-24 h-24 mx-auto">
                            {/* <img
                                src={profile.image || "https://via.placeholder.com/100"}
                                alt="profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
                            /> */}

                            <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-indigo-500">
                                📷
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>

                        <h2 className="mt-4 text-lg font-semibold text-slate-800">
                            {profile.name}
                        </h2>

                        <p className="text-sm text-slate-500">
                            {profile.email}
                        </p>

                        <p className="text-xs text-slate-400 mt-2">
                            Reg No: {profile.registerNumber}
                        </p>

                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="col-span-8 space-y-6">

                    {/* ALERT */}
                    {(error || success) && (
                        <div className={`p-4 rounded-lg text-sm font-medium border ${error
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-green-50 text-green-600 border-green-200"
                            }`}>
                            {error || success}
                        </div>
                    )}

                    {/* PROFILE FORM */}
                    <form
                        onSubmit={handleProfileSubmit}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-lg font-semibold text-slate-800 mb-6">
                            Profile Information
                        </h3>

                        <div className="grid grid-cols-2 gap-5">

                            <div>
                                <label className="text-sm font-medium text-slate-600">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={profile.name}
                                    onChange={handleProfileChange}
                                    className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                  focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600">
                                    Register Number
                                </label>
                                <input
                                    name="registerNumber"
                                    value={profile.registerNumber}
                                    onChange={handleProfileChange}
                                    className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                  focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-slate-600">
                                    Phone Number
                                </label>
                                <input
                                    name="phoneNumber"
                                    value={profile.phoneNumber}
                                    onChange={handleProfileChange}
                                    className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                  focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                />
                            </div>

                        </div>

                        <div className="mt-5">
                            <label className="text-sm font-medium text-slate-600">
                                Email Address
                            </label>
                            <input
                                name="email"
                                value={profile.email}
                                onChange={handleProfileChange}
                                className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                            />
                            <p className="text-xs text-slate-400 mt-1">
                                Changing your email requires verification
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button type="submit" className="px-6 py-2.5 rounded-lg text-white font-medium 
                bg-linear-to-r from-indigo-600 to-indigo-500 
                hover:from-indigo-500 hover:to-indigo-400 
                shadow-sm hover:shadow-md transition">
                                {loading ? "Saving..." : "Save Profile"}
                            </button>
                        </div>
                    </form>

                    {/* PASSWORD FORM */}
                    <form
                        onSubmit={handlePasswordSubmit}
                        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                    >
                        <h3 className="text-lg font-semibold text-slate-800 mb-6">
                            Change Password
                        </h3>

                        <div className="space-y-5">

                            <div>
                                <label className="text-sm font-medium text-slate-600">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    name="current"
                                    value={password.current}
                                    onChange={handlePasswordChange}
                                    className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                  focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">

                                <div>
                                    <label className="text-sm font-medium text-slate-600">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="newPass"
                                        value={password.newPass}
                                        onChange={handlePasswordChange}
                                        className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                    focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-600">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm"
                                        value={password.confirm}
                                        onChange={handlePasswordChange}
                                        className="w-full mt-1 px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800
                    focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition"
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-6 py-2.5 rounded-lg text-white font-medium 
                bg-linear-to-r from-emerald-600 to-emerald-500 
                hover:from-emerald-500 hover:to-emerald-400 
                shadow-sm hover:shadow-md transition">
                                {loading ? "Updating..." : "Update Password"}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
}