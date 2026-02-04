import React, { useState } from "react";
import {
  Settings, // Main Settings Icon
  Palette,  // Theme/Logo
  Users,    // Roles & Permissions
  Database, // Backup
  Activity, // System Info
  X,        // Close
  Save,     // Save Changes
  Clock,    // Uptime
  Server,   // Version
  Download, // Backup Download
  Upload,   // Restore Upload
} from "lucide-react";

// Mock Data
const initialPlatformConfig = {
  platformName: "MentorConnect Platform",
  logoUrl: "https://placehold.co/100x40/4f46e5/ffffff?text=MC+Logo",
  themeColor: "#4f46e5", // Indigo-600
};

const mockRoles = [
  { id: 1, name: "Admin", users: 3, permissions: ["Full Access", "User Management", "System Config"] },
  { id: 2, name: "Mentor", users: 15, permissions: ["View Student Progress", "Post Job Recommendations"] },
  { id: 3, name: "Student", users: 150, permissions: ["Apply to Jobs", "View Mentor Feedback"] },
];

const mockBackupHistory = [
  { id: 1, date: "2024-10-26 02:00:00", type: "Full", sizeMB: 512, status: "Completed" },
  { id: 2, date: "2024-10-25 02:00:00", type: "Differential", sizeMB: 45, status: "Completed" },
  { id: 3, date: "2024-10-24 02:00:00", type: "Full", sizeMB: 510, status: "Failed" },
];

const mockSystemInfo = {
  version: "v2.3.1",
  uptimeDays: 35.2,
  databaseStatus: "Online",
  apiResponseTimeMs: 45,
};

// --- Sub-Components for Tabs ---

// 1. Platform Config
const PlatformConfig = ({ config, setConfig }) => {
  const [tempConfig, setTempConfig] = useState(config);

  const handleSave = () => {
    setConfig(tempConfig);
    // In a real application, this would send an API request to save settings
    alert("Platform configuration saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        
        {/* Platform Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
          <input
            type="text"
            value={tempConfig.platformName}
            onChange={(e) => setTempConfig({ ...tempConfig, platformName: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Theme Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Primary Theme Color</label>
          <div className="flex gap-4 items-center">
            <input
              type="color"
              value={tempConfig.themeColor}
              onChange={(e) => setTempConfig({ ...tempConfig, themeColor: e.target.value })}
              className="w-12 h-12 p-1 border border-gray-300 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={tempConfig.themeColor}
              readOnly
              className="flex-grow p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>
        </div>
        
        {/* Logo URL (Mock Upload) */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL (Preview)</label>
          <div className="flex items-center gap-4">
            <div className="w-24 h-10 border border-gray-300 rounded-lg flex items-center justify-center p-1 bg-white shadow-sm">
                <img src={tempConfig.logoUrl} alt="Logo Preview" className="max-w-full max-h-full object-contain" onError={(e) => e.target.src = 'https://placehold.co/100x40/94a3b8/ffffff?text=Image+Error'}/>
            </div>
            <input
              type="text"
              placeholder="Enter new logo URL"
              value={tempConfig.logoUrl}
              onChange={(e) => setTempConfig({ ...tempConfig, logoUrl: e.target.value })}
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.02] font-semibold"
        >
          <Save className="w-5 h-5" /> Save Configuration
        </button>
      </div>
    </div>
  );
};

// 2. Roles and Permissions
const RolesAndPermissions = () => (
    <div className="space-y-6">
        <p className="text-gray-600">
            Define, edit, and assign platform roles to manage user access and capabilities.
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-4 text-left font-semibold text-gray-700">Role Name</th>
                        <th className="p-4 text-center font-semibold text-gray-700">Total Users</th>
                        <th className="p-4 text-left font-semibold text-gray-700">Key Permissions</th>
                        <th className="p-4 text-center font-semibold text-gray-700">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {mockRoles.map((role) => (
                        <tr key={role.id} className="hover:bg-gray-50">
                            <td className="p-4 font-bold text-indigo-700">{role.name}</td>
                            <td className="p-4 text-center text-gray-700">{role.users}</td>
                            <td className="p-4 text-gray-700 italic">{role.permissions.join(', ')}</td>
                            <td className="p-4 text-center">
                                <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition">
                                    Edit Permissions
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        <div className="flex justify-end">
             <button
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition font-semibold"
            >
                <Users className="w-5 h-5" /> Create New Role
            </button>
        </div>
    </div>
);

// 3. Backup and Restore
const BackupAndRestore = () => {
    const handleBackup = (type) => {
        alert(`Initiating new ${type} backup. This may take a few moments.`);
    };

    const getStatusColor = (status) => {
        if (status === 'Completed') return 'bg-green-100 text-green-700';
        if (status === 'Failed') return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                    onClick={() => handleBackup('Full')}
                    className="flex flex-col items-center justify-center p-6 bg-indigo-50 border border-indigo-200 rounded-xl shadow-md hover:bg-indigo-100 transition duration-150"
                >
                    <Download className="w-8 h-8 text-indigo-600 mb-2" />
                    <span className="font-semibold text-indigo-700">Run Full Backup</span>
                    <span className="text-xs text-gray-500 mt-1">Includes all data and media.</span>
                </button>
                <button
                    onClick={() => handleBackup('Differential')}
                    className="flex flex-col items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-md hover:bg-blue-100 transition duration-150"
                >
                    <Download className="w-8 h-8 text-blue-600 mb-2" />
                    <span className="font-semibold text-blue-700">Run Differential Backup</span>
                    <span className="text-xs text-gray-500 mt-1">Includes changes since last Full Backup.</span>
                </button>
                <div className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-xl shadow-md">
                    <input type="file" id="restoreFile" className="hidden" />
                    <label htmlFor="restoreFile" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-600 mb-2" />
                        <span className="font-semibold text-gray-700">Restore Database</span>
                        <span className="text-xs text-gray-500 mt-1">Upload a backup file to restore.</span>
                    </label>
                </div>
            </div>

            <h4 className="text-xl font-semibold text-indigo-700 pt-4 border-t mt-6">Backup History</h4>
            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-4 text-left font-semibold text-gray-700">Date/Time</th>
                            <th className="p-4 text-center font-semibold text-gray-700">Type</th>
                            <th className="p-4 text-center font-semibold text-gray-700">Size</th>
                            <th className="p-4 text-center font-semibold text-gray-700">Status</th>
                            <th className="p-4 text-center font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                        {mockBackupHistory.map((backup) => (
                            <tr key={backup.id} className="hover:bg-gray-50">
                                <td className="p-4 font-medium text-gray-900">{backup.date}</td>
                                <td className="p-4 text-center text-gray-700">{backup.type}</td>
                                <td className="p-4 text-center text-gray-700">{backup.sizeMB} MB</td>
                                <td className="p-4 text-center">
                                    <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full ${getStatusColor(backup.status)}`}>
                                        {backup.status}
                                    </span>
                                </td>
                                <td className="p-4 text-center">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm transition" disabled={backup.status !== 'Completed'}>
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 4. System Version and Uptime
const SystemInfo = () => {
    const Card = ({ icon: Icon, title, value, color }) => (
        <div className={`p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex items-center gap-4 transition duration-200 hover:shadow-xl`}>
            <div className={`p-3 rounded-full ${color === 'green' ? 'bg-green-100 text-green-600' : color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card icon={Server} title="System Version" value={mockSystemInfo.version} color="blue" />
                <Card icon={Clock} title="Uptime (Days)" value={mockSystemInfo.uptimeDays} color="green" />
                <Card icon={Database} title="Database Status" value={mockSystemInfo.databaseStatus} color={mockSystemInfo.databaseStatus === 'Online' ? 'green' : 'red'} />
                <Card icon={Activity} title="API Latency" value={`${mockSystemInfo.apiResponseTimeMs} ms`} color="blue" />
            </div>

            <div className="p-6 bg-yellow-50 border-l-4 border-yellow-500 rounded-xl shadow-md">
                <p className="font-semibold text-yellow-800">Note:</p>
                <p className="text-sm text-yellow-700">
                    Real-time status metrics (Uptime, Latency) are simulated here. In a production environment, these would be fetched live from the monitoring service.
                </p>
            </div>
        </div>
    );
};


// Main Component
export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState('config');
  const [config, setConfig] = useState(initialPlatformConfig); // State for shared config

  const tabs = [
    { id: 'config', label: 'Platform Configuration', icon: Palette, component: PlatformConfig },
    { id: 'roles', label: 'Roles & Permissions', icon: Users, component: RolesAndPermissions },
    { id: 'backup', label: 'Backup & Restore', icon: Database, component: BackupAndRestore },
    { id: 'info', label: 'System Info', icon: Activity, component: SystemInfo },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab).component;

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-10 font-sans">
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 border-b-4 border-indigo-100 pb-4 mb-8 flex items-center gap-2">
        <Settings className="w-8 h-8"/> System Settings
      </h2>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-4 
              ${activeTab === tab.id
                ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50'
                : 'text-gray-500 border-transparent hover:text-indigo-600 hover:border-gray-300'
              }
            `}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="p-2">
        {/* Pass config state down to the PlatformConfig component */}
        {activeTab === 'config' ? <PlatformConfig config={config} setConfig={setConfig} /> : <ActiveComponent />}
      </div>
      
    </div>
  );
}
