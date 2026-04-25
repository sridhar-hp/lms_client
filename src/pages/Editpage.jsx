import React, { useState } from "react";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    registerNumber: "25UCA202",
    email: "alex@gmail.com",
  });

  const [password, setPassword] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfileChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handlePasswordChange = (e) =>
    setPassword({ ...password, [e.target.name]: e.target.value });

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Profile updated successfully");
    }, 1000);
  };

  const handlePasswordSubmit = (e) => {
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
    <div className="min-h-screen bg-gray-100 p-8">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Account Settings
        </h1>
        <p className="text-gray-500">
          Manage your profile and password
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">

        {/* LEFT PROFILE CARD */}
        <div className="col-span-4">
          <div className="bg-white rounded-2xl shadow-md p-6 text-center">

            <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-indigo-500 text-white text-2xl font-semibold">
              {profile.fullName.charAt(0)}
            </div>

            <h2 className="mt-4 text-lg font-semibold">
              {profile.fullName}
            </h2>

            <p className="text-gray-500 text-sm">{profile.email}</p>

            <p className="text-xs text-gray-400 mt-2">
              Reg No: {profile.registerNumber}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-8 space-y-6">

          {/* ALERT */}
          {(error || success) && (
            <div className={`p-3 rounded-lg text-sm font-medium ${
              error
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}>
              {error || success}
            </div>
          )}

          {/* PROFILE FORM */}
          <form
            onSubmit={handleProfileSubmit}
            className="bg-white rounded-2xl shadow-md p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Profile Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <input
                name="registerNumber"
                value={profile.registerNumber}
                onChange={handleProfileChange}
                placeholder="Register Number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <button className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {/* PASSWORD FORM */}
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white rounded-2xl shadow-md p-6 space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>

            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              placeholder="Current Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="password"
                name="newPass"
                value={password.newPass}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />

              <input
                type="password"
                name="confirm"
                value={password.confirm}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>

            <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}