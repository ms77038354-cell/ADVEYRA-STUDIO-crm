import React from 'react';

const SettingsView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <p className="text-gray-400">Organization and profile settings. Changes will persist to the database.</p>
      </div>
    </div>
  );
};

export default SettingsView;
