import axios from "axios";
import React, { useEffect, useState } from "react";

const BACKGROUND_COLOR = 'bg-gray-50';
const CARD_BG = 'bg-white';
const PRIMARY_ACCENT = 'teal-600';
const DANGER_COLOR = 'red-600';

const INITIAL_STUDENT_DATA = [
    { id: 'S1001', name: 'Alice Chen', phone: '555-1234', email: 'a.chen@std.edu', major: 'Comp Sci' },
    { id: 'S1002', name: 'Bob Davis', phone: '555-4567', email: 'b.davis@std.edu', major: 'History' },
];
const INITIAL_STAFF_DATA = [
    { id: 'T2001', name: 'Dr. Emily Johnson', phone: '555-9012', email: 'e.johnson@staff.edu', department: 'Biology' },
    { id: 'T2002', name: 'Mr. Frank White', phone: '555-3456', email: 'f.white@staff.edu', department: 'Admin' },
];

const SettingsNav = ({ activeSection, setActiveSection }) => {
    const sections = [
        { key: 'registry', name: 'Data Registry Console', icon: '🗃️' },
        { key: 'profile', name: 'Profile & Access', icon: '👤' },
        { key: 'notifications', name: 'Notifications', icon: '🔔' },
        { key: 'security', name: 'Security & Password', icon: '🔒' },
    ];

    return (
        <div className="flex border-b border-gray-300 mb-8 overflow-x-auto">
            {sections.map((section) => (
                <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`
                        p-3 px-6 text-center text-sm font-semibold transition duration-150 whitespace-nowrap
                        ${activeSection === section.key
                            ? `border-b-4 border-${PRIMARY_ACCENT} text-${PRIMARY_ACCENT} font-bold bg-white`
                            : 'text-gray-600 hover:bg-gray-100 border-b-4 border-transparent'
                        }`
                    }
                >
                    <span className="mr-2 text-lg">{section.icon}</span>
                    {section.name}
                </button>
            ))}
        </div>
    );
};

const ProfileSettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">👤 Profile & Access</h2><p className="mt-4 text-gray-600">Profile management interface...</p></div>
);
const NotificationSettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">🔔 Notification Preferences</h2><p className="mt-4 text-gray-600">Notification settings interface...</p></div>
);
const SecuritySettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">🔒 Security & Password</h2><p className="mt-4 text-gray-600">Security settings interface...</p></div>
);

const RegistryRow = ({
    item,
    isEditing,
    setEditId,
    handleSave,
    handleDelete
}) => {

    const [formData, setFormData] = useState(item);

    useEffect(() => {
        setFormData(item);
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <tr className={isEditing ? 'bg-teal-50' : 'hover:bg-gray-50 transition'}>
            <td className="px-6 py-4">{item.Id}</td>
            <td className="px-6 py-4">
                {isEditing ? (
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-1 rounded w-full"
                    />

                ) : (
                    item.name
                )}
            </td>
            <td className="px-6 py-4">{item.email}</td>
            <td className="px-6 py-4">{item.role}</td>

            <td className="px-6 py-4 space-x-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={() => handleSave(formData)}
                            className="text-green-600 font-semibold"
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setEditId(null)}
                            className="text-gray-500"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setEditId(item._id)}
                            className="text-teal-600 font-semibold"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="text-red-600"
                        >
                            Delete
                        </button>
                    </>
                )}
            </td>
        </tr>

    );
};

const DataRegistryConsole = () => {
    const [dataType, setDataType] = useState('student');
    const [data, setData] = useState(INITIAL_STUDENT_DATA);
    const [searchQuery, setSearchQuery] = useState('');
    const [editId, setEditId] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const setting = async () => {
            const token = sessionStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/setting",{ headers: { Authorization: `Bearer ${token}` }     });
            if (Array.isArray(res.data.users)) {
                setUsers(res.data.users.filter(u => u && u._id));
            } else {
                setUsers([]);
            }

            console.log(res.data.users);
        }
        setting();
    }, []);

    React.useEffect(() => {
        setData(dataType === 'student' ? INITIAL_STUDENT_DATA : INITIAL_STAFF_DATA);
        setSearchQuery('');
    }, [dataType]);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/dusers/${id}`);

            if (res.data.success) {
                alert("user deleted successfully");
            }
        }
        catch (err) {
            console.log(err);
        }
    };

    const handleSave = async (updatedItem) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/users/${updatedItem._id}`, updatedItem);

            if (res.data.success) {
                setUsers(prev => prev.map(user => user._id === updatedItem._id ? res.data.user : user));
                setEditId(null);
                alert("user updated successfully");
            }
        }
        catch (err) {
            console.log(err);
            alert("update failed");
        }
    }

    return (
        <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}>
            <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 mb-6 flex justify-between items-center">
                <span>🗃️ Data Registry Console</span>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setDataType('student')}
                        className={`py-1 px-3 text-sm font-semibold rounded ${dataType === 'student' ? `bg-${PRIMARY_ACCENT} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Manage Students
                    </button>
                    <button
                        onClick={() => setDataType('staff')}
                        className={`py-1 px-3 text-sm font-semibold rounded ${dataType === 'staff' ? `bg-${PRIMARY_ACCENT} text-white` : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        Manage Staff/Faculty
                    </button>
                </div>
            </h2>

            <div className="mb-6">
                <input
                    type="text"
                    placeholder={`Search by Name or ID in ${dataType} records...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Email</th>
                            <th className="px-6 py-3 text-left font-semibold">Role</th>
                            <th className="px-6 py-3 text-left font-semibold w-32">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100 px-6 py-3">
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-6 text-gray-500">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.filter(item => item && item._id).map((item) => (
                                <RegistryRow
                                    key={item._id}
                                    item={item}
                                    isEditing={editId === item._id}
                                    setEditId={setEditId}
                                    handleSave={handleSave}
                                    handleDelete={handleDelete}
                                />

                            ))

                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

function Settings() {
    const [activeSection, setActiveSection] = useState('registry');
    const [globalSearchTerm, setGlobalSearchTerm] = useState('');

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSettings />;
            case 'notifications':
                return <NotificationSettings />;
            case 'security':
                return <SecuritySettings />;
            case 'registry':
                return <DataRegistryConsole />;
            default:
                return <ProfileSettings />;
        }
    };

    const handleGlobalSearch = (e) => {
        e.preventDefault();
        console.log(`Performing global search for: ${globalSearchTerm}`);
        alert(`Simulating system-wide search for: "${globalSearchTerm}".`);
    };

    return (
        <main className={`p-8 md:p-12 flex-grow ${BACKGROUND_COLOR} min-h-screen`}>

            <header className="mb-4 pb-4 border-b-2 border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <h1 className={`text-4xl font-extrabold text-${PRIMARY_ACCENT}`}>User & System Settings</h1>

                    <form onSubmit={handleGlobalSearch} className="flex items-center space-x-2">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search system-wide (e.g., Student ID, Course)"
                                value={globalSearchTerm}
                                onChange={(e) => setGlobalSearchTerm(e.target.value)}
                                className="w-80 p-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 transition duration-150"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            type="submit"
                            className={`bg-${PRIMARY_ACCENT} hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-lg shadow-md transition duration-300`}
                        >
                            Search
                        </button>
                    </form>
                </div>

                <p className="text-gray-600 mt-1">Manage your access, security, and administrative preferences.</p>
            </header>

            <section>
                <SettingsNav activeSection={activeSection} setActiveSection={setActiveSection} />

                <div className="mt-8">
                    {renderContent()}
                </div>
            </section>
        </main>
    );
}

export default Settings;