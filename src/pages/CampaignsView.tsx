import React from 'react';

const CampaignsView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Campaigns</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <p className="text-gray-400">Campaign management module. Integration with Meta API is currently pending configuration.</p>
      </div>
    </div>
  );
};

export default CampaignsView;
