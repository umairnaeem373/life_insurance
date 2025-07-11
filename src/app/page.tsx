"use client";
import React, { useState } from 'react';

const InsuranceRecommendationApp = () => {
  const [formData, setFormData] = useState({
    age: 30,
    income: 50000,
    dependents: 1,
    riskTolerance: 'medium',
  });

  const [recommendation, setRecommendation] = useState<{
    type: string;
    coverage: number;
    term: number;
    explanation: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRecommendation = () => {
    setIsLoading(true);

    setTimeout(() => {
      const { age, income, dependents, riskTolerance } = formData;

      let recommendationType = 'Term Life';
      let coverage = Math.max(income * 10, 250000);
      let term = 20;

      // Adjust based on age
      if (age < 30) {
        coverage = income * 12;
        term = 30;
      } else if (age < 40) {
        coverage = income * 10;
        term = 20;
      } else if (age < 50) {
        coverage = income * 8;
        term = 15;
      } else {
        coverage = income * 6;
        term = 10;
      }

      // Adjust for dependents
      coverage += dependents * 100000;

      // Adjust for risk tolerance
      if (riskTolerance === 'high') {
        recommendationType = 'Universal Life';
      } else if (riskTolerance === 'low') {
        recommendationType = 'Whole Life';
      }

      setRecommendation({
        type: recommendationType,
        coverage: coverage,
        term: term,
        explanation: `Based on your profile, we recommend ${recommendationType} insurance with $${coverage.toLocaleString()} coverage for ${term} years. This provides ${Math.round(coverage / income)}x your annual income, ensuring financial security for your dependents.`
      });

      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Life Insurance Recommendation</h1>
            <p className="text-gray-600">Get a personalized insurance recommendation</p>
          </div>

          {/* Form */}
          {!recommendation ? (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-6">
                {/* Age Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Age: <span className="font-semibold">{formData.age}</span>
                  </label>
                  <input
                    type="range"
                    min="18"
                    max="80"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>18</span>
                    <span>80</span>
                  </div>
                </div>

                {/* Income Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Income: <span className="font-semibold">${formData.income.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="5000"
                    value={formData.income}
                    onChange={(e) => setFormData(prev => ({ ...prev, income: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$20k</span>
                    <span>$500k</span>
                  </div>
                </div>

                {/* Dependents Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Dependents
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <button
                        key={num}
                        onClick={() => setFormData(prev => ({ ...prev, dependents: num }))}
                        className={`py-2 rounded transition-colors ${formData.dependents === num
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                      >
                        {num === 5 ? '5+' : num}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Risk Tolerance */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Tolerance
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'low' }))}
                      className={`py-2 rounded transition-colors ${formData.riskTolerance === 'low'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      Low
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'medium' }))}
                      className={`py-2 rounded transition-colors ${formData.riskTolerance === 'medium'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      Medium
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({ ...prev, riskTolerance: 'high' }))}
                      className={`py-2 rounded transition-colors ${formData.riskTolerance === 'high'
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      High
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={generateRecommendation}
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded font-medium text-white transition-colors ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                  {isLoading ? 'Calculating...' : 'Get Recommendation'}
                </button>
              </div>
            </div>
          ) : (
            /* Recommendation Result */
            <div className="bg-white rounded-lg shadow p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Your Recommendation</h2>
                <div className="h-1 w-20 bg-blue-500 mx-auto"></div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    {recommendation.type} - ${recommendation.coverage.toLocaleString()}
                  </h3>
                  <p className="text-gray-700">Term: {recommendation.term} years</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Why this recommendation?</h4>
                <p className="text-gray-700">{recommendation.explanation}</p>
              </div>

              <button
                onClick={() => setRecommendation(null)}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded font-medium hover:bg-gray-200 transition-colors"
              >
                Start Over
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsuranceRecommendationApp;