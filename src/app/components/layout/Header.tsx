import React from 'react';
import { Shield } from 'lucide-react';

const Header: React.FC = () => (
  <div className="text-center mb-8">
    <div className="flex justify-center mb-4">
      <div className="bg-emerald-600 p-3 rounded-full shadow-lg">
        <Shield className="w-6 h-6 text-white" />
      </div>
    </div>
    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
      HealthGuard Insurance
    </h1>
    <p className="text-gray-300 text-base mb-1">Smart Life Insurance Calculator</p>
    <p className="text-gray-400 text-sm">Get personalized coverage recommendations</p>
  </div>
);

export default Header; 