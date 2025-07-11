import React from 'react';

interface RiskToleranceSelectorProps {
  value: 'low' | 'medium' | 'high';
  onChange: (value: 'low' | 'medium' | 'high') => void;
  error?: string | false;
}

const options = [
  { value: 'low', label: 'Conservative', desc: 'Stable returns' },
  { value: 'medium', label: 'Balanced', desc: 'Moderate growth' },
  { value: 'high', label: 'Aggressive', desc: 'Higher potential' }
];

const RiskToleranceSelector: React.FC<RiskToleranceSelectorProps> = ({ value, onChange, error }) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-emerald-600/20 p-2 rounded-lg">
        {/* Icon can be added here if needed */}
      </div>
      <div>
        <label className="block text-base font-medium text-white mb-1">Risk Tolerance</label>
        <p className="text-xs text-gray-400">Your investment comfort level</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {options.map(option => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value as 'low' | 'medium' | 'high')}
          className={`p-3 rounded-lg transition-all duration-200 border ${value === option.value
            ? 'bg-emerald-600 text-white border-emerald-500'
            : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:border-gray-500'
          }`}
        >
          <div className="font-medium text-center text-sm">{option.label}</div>
          <div className="text-xs mt-1 opacity-80 text-center">{option.desc}</div>
        </button>
      ))}
    </div>
    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
  </div>
);

export default RiskToleranceSelector; 