import React from 'react';
import { RecommendationResult } from '../../utils/calculateRecommendation';

interface RecommendationResultProps {
  recommendation: RecommendationResult;
  onReset: () => void;
  onGetQuote: () => void;
}

const RecommendationResult: React.FC<RecommendationResultProps> = ({ recommendation, onReset, onGetQuote }) => (
  <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-gray-700">
    <div className="text-center mb-6">
      <div className="flex justify-center mb-4">
        <div className="bg-emerald-600 p-3 rounded-full shadow-lg">
          {/* Icon can be passed as prop if needed */}
        </div>
      </div>
      <h2 className="text-2xl font-bold text-white mb-3">Your Insurance Plan</h2>
      <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
    </div>
    <div className="bg-gray-700/50 p-5 rounded-lg mb-5">
      <div className="text-center">
        <h3 className="text-lg font-bold text-emerald-400 mb-3">{recommendation.type}</h3>
        <div className="text-3xl font-bold text-white mb-5">${recommendation.coverage.toLocaleString()}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Term</p>
            <p className="text-base font-semibold text-white">{recommendation.term} years</p>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg">
            <p className="text-xs text-gray-400">Monthly Premium</p>
            <p className="text-base font-semibold text-white">${recommendation.monthlyPremium}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-700/30 p-4 rounded-lg mb-5">
      <h4 className="font-medium text-white mb-2 text-center text-sm">Recommendation Details</h4>
      <p className="text-gray-300 leading-relaxed text-center text-xs">{recommendation.explanation}</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        onClick={onReset}
        className="py-2 px-4 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200 text-sm"
      >
        Calculate Again
      </button>
      <button
        onClick={onGetQuote}
        className="py-2 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200 text-sm"
      >
        Get Quote
      </button>
    </div>
  </div>
);

export default RecommendationResult; 