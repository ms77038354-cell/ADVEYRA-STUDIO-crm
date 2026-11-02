import React from 'react';

const MetaIntegrationView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Meta Integrations</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-lg font-semibold text-white mb-4">Connection Status</h2>
        <ul className="space-y-2 text-gray-400">
          <li>Facebook: <span className="text-red-400">NOT CONNECTED</span></li>
          <li>Instagram: <span className="text-red-400">NOT CONNECTED</span></li>
          <li>WhatsApp: <span className="text-red-400">NOT CONNECTED</span></li>
        </ul>
      </div>
    </div>
  );
};

export default MetaIntegrationView;
