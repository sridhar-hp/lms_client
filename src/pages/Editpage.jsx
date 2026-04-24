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
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500">
          Manage your profile and security settings
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">

        {/* PROFILE SUMMARY */}
        <div>
          <div className="bg-white border rounded-xl p-6 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
              {profile.fullName.charAt(0)}
            </div>
            <h2 className="mt-4 font-semibold">{profile.fullName}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
            <p className="text-xs text-gray-400 mt-2">
              Reg No: {profile.registerNumber}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-span-2 space-y-6">

          {/* ALERT */}
          {(error || success) && (
            <div className={`p-3 rounded-lg text-sm ${
              error ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
            }`}>
              {error || success}
            </div>
          )}

          {/* PROFILE SECTION */}
          <form
            onSubmit={handleProfileSubmit}
            className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
          >
            <h3 className="font-medium text-gray-800">
              Profile Information
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="input"
                placeholder="Full Name"
              />
              <input
                name="registerNumber"
                value={profile.registerNumber}
                onChange={handleProfileChange}
                className="input"
                placeholder="Register Number"
              />
            </div>

            <input
              name="email"
              value={profile.email}
              onChange={handleProfileChange}
              className="input"
              placeholder="Email Address"
            />

            <button className="btn-primary">
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </form>

          {/* PASSWORD SECTION */}
          <form
            onSubmit={handlePasswordSubmit}
            className="bg-white border rounded-xl p-6 shadow-sm space-y-4"
          >
            <h3 className="font-medium text-gray-800">
              Change Password
            </h3>

            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              className="input"
              placeholder="Current Password"
            />

            <input
              type="password"
              name="newPass"
              value={password.newPass}
              onChange={handlePasswordChange}
              className="input"
              placeholder="New Password"
            />

            <input
              type="password"
              name="confirm"
              value={password.confirm}
              onChange={handlePasswordChange}
              className="input"
              placeholder="Confirm New Password"
            />

            <button className="btn-primary bg-green-600 hover:bg-green-500">
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>

        </div>
      </div>

      
      <style>{`
        .input {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          outline: none;
        }
        .input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 2px rgba(99,102,241,0.1);
        }
        .btn-primary {
          padding: 10px 16px;
          background: #6366f1;
          color: white;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}
