import React from 'react';

const TeamView: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Team Management</h1>
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <p className="text-gray-400">Manage team members and roles. Integration with Supabase Auth profiles is active.</p>
      </div>
    </div>
  );
};

export default TeamView;
