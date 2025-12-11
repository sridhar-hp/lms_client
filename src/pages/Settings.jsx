// src/pages/Settings.jsx (HORIZONTAL TABS & FULL-WIDTH TABLE)
import React, { useState } from "react";

// --- Configuration Constants ---
const BACKGROUND_COLOR = 'bg-gray-50';
const CARD_BG = 'bg-white';
const PRIMARY_ACCENT = 'teal-600'; // Deep Teal for focus
const DANGER_COLOR = 'red-600';

// --- Dummy Data (Unchanged) ---
const INITIAL_STUDENT_DATA = [
    { id: 'S1001', name: 'Alice Chen', phone: '555-1234', email: 'a.chen@std.edu', major: 'Comp Sci' },
    { id: 'S1002', name: 'Bob Davis', phone: '555-4567', email: 'b.davis@std.edu', major: 'History' },
];
const INITIAL_STAFF_DATA = [
    { id: 'T2001', name: 'Dr. Emily Johnson', phone: '555-9012', email: 'e.johnson@staff.edu', department: 'Biology' },
    { id: 'T2002', name: 'Mr. Frank White', phone: '555-3456', email: 'f.white@staff.edu', department: 'Admin' },
];

// --- Helper Components (Simplified for the new layout) ---

/**
 * 1. Horizontal Settings Tab Navigation (MODIFIED)
 */
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


// [All other Helper Components remain functionally the same, only the container styling will change due to layout removal]

// Mock components for the sake of a complete, runnable file
const ProfileSettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">👤 Profile & Access</h2><p className="mt-4 text-gray-600">Profile management interface...</p></div>
);
const NotificationSettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">🔔 Notification Preferences</h2><p className="mt-4 text-gray-600">Notification settings interface...</p></div>
);
const SecuritySettings = () => (
    <div className={`${CARD_BG} p-8 rounded-lg shadow-md`}><h2 className="text-2xl font-bold text-gray-900">🔒 Security & Password</h2><p className="mt-4 text-gray-600">Security settings interface...</p></div>
);

// --- Data Registry Console and Registry Row (Unchanged functionality) ---

const RegistryRow = ({ item, columns, dataType, isEditing, setEditId, handleSave, handleDelete, PRIMARY_ACCENT, DANGER_COLOR }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const specificField = dataType === 'student' ? 'major' : 'department';

    const fields = ['id', 'name', 'email', 'phone', specificField];

    return (
        <tr className={isEditing ? 'bg-teal-50' : 'hover:bg-gray-50 transition duration-150'}>
            {fields.map((field, index) => (
                <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isEditing ? (
                        <input
                            type={field === 'id' ? 'text' : 'text'}
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            disabled={field === 'id'}
                            className={`w-full p-2 border rounded-md ${field === 'id' ? 'bg-gray-100' : 'border-teal-300 focus:border-teal-500'}`}
                        />
                    ) : (
                        item[field]
                    )}
                </td>
            ))}

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={(e) => handleSave(e, formData)}
                            className={`text-${PRIMARY_ACCENT} hover:text-teal-700 font-bold`}
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditId(null)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setEditId(item.id)}
                            className={`text-${PRIMARY_ACCENT} hover:text-teal-700 font-bold`}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDelete(item.id)}
                            className={`text-${DANGER_COLOR} hover:text-red-800`}
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

    React.useEffect(() => {
        setData(dataType === 'student' ? INITIAL_STUDENT_DATA : INITIAL_STAFF_DATA);
        setSearchQuery('');
    }, [dataType]);

    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete ${id}? This action cannot be undone.`)) {
            setData(data.filter(item => item.id !== id));
            setEditId(null);
        }
    };

    const handleSave = (e, updatedItem) => {
        e.preventDefault();
        setData(data.map(item => (item.id === editId ? updatedItem : item)));
        setEditId(null);
    };

    const columns = dataType === 'student'
        ? ['ID', 'Name', 'Email', 'Phone', 'Major']
        : ['ID', 'Name', 'Email', 'Phone', 'Department'];

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

            {/* Local Search and Filter */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder={`Search by Name or ID in ${dataType} records...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                />
            </div>

            {/* Data Table (Now uses max available width due to main layout change) */}
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(col => (
                                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{col}</th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredData.map((item) => (
                            <RegistryRow
                                key={item.id}
                                item={item}
                                columns={columns}
                                dataType={dataType}
                                isEditing={item.id === editId}
                                setEditId={setEditId}
                                handleSave={handleSave}
                                handleDelete={handleDelete}
                                PRIMARY_ACCENT={PRIMARY_ACCENT}
                                DANGER_COLOR={DANGER_COLOR}
                            />
                        ))}
                        {filteredData.length === 0 && (
                            <tr><td colSpan={columns.length + 1} className="text-center py-6 text-gray-500">No records found matching your search.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


// --- Main Settings Component (MODIFIED) ---

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

            {/* Header: Title + Global Search Bar */}
            <header className="mb-4 pb-4 border-b-2 border-gray-300">
                <div className="flex justify-between items-start mb-4">
                    <h1 className={`text-4xl font-extrabold text-${PRIMARY_ACCENT}`}>User & System Settings</h1>

                    {/* PROFESSIONAL GLOBAL SEARCH BAR */}
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

            {/* MODIFIED SECTION: Horizontal Tabs and Full-Width Content */}
            <section>
                {/* Horizontal Navigation Tabs */}
                <SettingsNav activeSection={activeSection} setActiveSection={setActiveSection} />

                {/* Full-Width Content Area */}
                <div className="mt-8">
                    {renderContent()}
                </div>
            </section>
        </main>
    );
}

export default Settings;