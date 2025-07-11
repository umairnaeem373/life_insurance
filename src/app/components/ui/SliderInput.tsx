import React from 'react';

interface SliderInputProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  description?: string;
  error?: string | false;
  showHighEarnerInput?: boolean;
  setShowHighEarnerInput?: () => void;
  formik?: any;
}

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  name,
  description,
  error,
  showHighEarnerInput,
  setShowHighEarnerInput,
  formik
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
      <div className="text-center mb-3">
        <span className="text-2xl font-bold text-emerald-400">{typeof value === 'number' ? value.toLocaleString() : value}</span>
        {name === 'age' && <span className="text-gray-400 ml-2 text-sm">years</span>}
      </div>
      {!showHighEarnerInput ? (
        <>
          <input
            type="range"
            id={name}
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={onChange}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{name === 'income' ? `$${(min/1000).toFixed(0)}k` : min}</span>
            <span>{name === 'income' ? `$${(max/1000).toFixed(0)}k+` : max}</span>
          </div>
        </>
      ) : (
        <div className="space-y-3">
          <div className="bg-emerald-900/30 p-3 rounded-lg border border-emerald-800">
            <p className="text-xs text-emerald-300 font-medium text-center">High-Net-Worth Planning</p>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              id={name}
              name={name}
              min={500000}
              max={10000000}
              step={10000}
              value={value}
              onChange={formik ? formik.handleChange : onChange}
              className="w-full pl-7 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400 text-sm"
              placeholder="Enter your annual income"
            />
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={setShowHighEarnerInput}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
            >
              ← Use slider instead
            </button>
          </div>
        </div>
      )}
    </div>
    {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
  </div>
);

export default SliderInput; 