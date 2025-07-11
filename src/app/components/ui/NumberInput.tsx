import React from 'react';

interface NumberInputProps {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  description?: string;
  error?: string | false;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  min,
  max,
  value,
  onChange,
  name,
  description,
  error
}) => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-emerald-600/20 p-2 rounded-lg">
        {/* Icon can be added here if needed */}
      </div>
      <div>
        <label className="block text-base font-medium text-white mb-1">{label}</label>
        {description && <p className="text-xs text-gray-400">{description}</p>}
      </div>
    </div>
    <div className="bg-gray-700/50 p-4 rounded-lg">
      <input
        type="number"
        id={name}
        name={name}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full py-2 px-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-base text-center no-spinners"
        placeholder={min.toString()}
      />
      <p className="text-xs text-gray-500 text-center mt-2">Enter {min}-{max} {name}</p>
    </div>
    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
  </div>
);

export default NumberInput; 