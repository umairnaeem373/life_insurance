"use client";
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Shield, DollarSign, Users, Target, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';

const InsuranceRecommendationApp = () => {
  const [recommendation, setRecommendation] = useState<{
    type: string;
    coverage: number;
    term: number;
    explanation: string;
    monthlyPremium: number;
  } | null>(null);
  
  const [showHighEarnerInput, setShowHighEarnerInput] = useState(false);

  // Form validation schema
  const validationSchema = Yup.object({
    age: Yup.number()
      .min(18, 'Must be at least 18 years old')
      .max(80, 'Maximum age is 80')
      .required('Age is required'),
    income: Yup.number()
      .min(20000, 'Minimum income is $20,000')
      .required('Income is required'),
    dependents: Yup.number()
      .min(0, 'Cannot be negative')
      .max(10, 'Maximum 10 dependents')
      .required('Dependents is required'),
    riskTolerance: Yup.string()
      .oneOf(['low', 'medium', 'high'], 'Invalid risk tolerance')
      .required('Risk tolerance is required')
  });

  // Formik hook
  const formik = useFormik({
    initialValues: {
      age: 30,
      income: 75000,
      dependents: 1,
      riskTolerance: 'medium',
    },
    validationSchema,
    onSubmit: (values) => {
      const { age, income, dependents, riskTolerance } = values;
      
      let recommendationType = 'Term Life';
      let coverage = Math.max(income * 10, 250000);
      let term = 20;

      // Enhanced logic for high earners
      if (income > 500000) {
        coverage = income * 15;
        term = 25;
        recommendationType = 'Universal Life';
      } else if (age < 30) {
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
      coverage += dependents * 150000;

      // Adjust for risk tolerance
      if (riskTolerance === 'high' && income > 100000) {
        recommendationType = 'Universal Life';
      } else if (riskTolerance === 'low') {
        recommendationType = 'Whole Life';
      }

      // Calculate estimated monthly premium
      const monthlyPremium = Math.round((coverage / 1000) * (age / 10) * 0.8);

      setRecommendation({
        type: recommendationType,
        coverage: coverage,
        term: term,
        monthlyPremium: monthlyPremium,
        explanation: `Based on your profile, we recommend ${recommendationType} insurance with $${coverage.toLocaleString()} coverage${term ? ` for ${term} years` : ''}. This provides ${Math.round(coverage / income)}x your annual income, ensuring comprehensive financial security for your dependents.`
      });
    },
  });

  const handleIncomeChange = (value: number) => {
    formik.setFieldValue('income', value);
    setShowHighEarnerInput(value >= 500000);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-600 p-4 rounded-full shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              HealthGuard Insurance
            </h1>
            <p className="text-gray-300 text-lg mb-2">Smart Life Insurance Calculator</p>
            <p className="text-gray-400 text-sm">Get personalized coverage recommendations</p>
          </div>

          {/* Form */}
          {!recommendation ? (
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
              <div className="space-y-8">
                {/* Age Input */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-white mb-1">
                        Age
                      </label>
                      <p className="text-sm text-gray-400">Your current age</p>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-emerald-400">{formik.values.age}</span>
                      <span className="text-gray-400 ml-2">years</span>
                    </div>
                    <input
                      type="range"
                      id="age"
                      name="age"
                      min="18"
                      max="80"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>18</span>
                      <span>80</span>
                    </div>
                  </div>
                </div>

                {/* Income Input */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                      <DollarSign className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-white mb-1">
                        Annual Income
                      </label>
                      <p className="text-sm text-gray-400">Your yearly income before taxes</p>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <div className="text-center mb-4">
                      <span className="text-3xl font-bold text-emerald-400">
                        ${formik.values.income.toLocaleString()}
                      </span>
                    </div>
                    
                    {!showHighEarnerInput ? (
                      <>
                        <input
                          type="range"
                          id="income"
                          name="income"
                          min="20000"
                          max="500000"
                          step="5000"
                          value={formik.values.income}
                          onChange={(e) => handleIncomeChange(Number(e.target.value))}
                          onBlur={formik.handleBlur}
                          className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>$20k</span>
                          <span>$500k+</span>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="bg-emerald-900/30 p-4 rounded-lg border border-emerald-800">
                          <p className="text-sm text-emerald-300 font-medium text-center">
                            High-Net-Worth Planning
                          </p>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                          <input
                            type="number"
                            id="income"
                            name="income"
                            min="500000"
                            max="10000000"
                            step="10000"
                            value={formik.values.income}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white placeholder-gray-400"
                            placeholder="Enter your annual income"
                          />
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setShowHighEarnerInput(false);
                              formik.setFieldValue('income', 500000);
                            }}
                            className="text-sm text-emerald-400 hover:text-emerald-300 font-medium"
                          >
                            ← Use slider instead
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dependents Input */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                      <Users className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-white mb-1">
                        Dependents
                      </label>
                      <p className="text-sm text-gray-400">Number of people who depend on your income</p>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 p-6 rounded-lg">
                    <input
                      type="number"
                      id="dependents"
                      name="dependents"
                      min="0"
                      max="10"
                      value={formik.values.dependents}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="w-full py-3 px-4 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-white text-lg text-center"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 text-center mt-2">Enter 0-10 dependents</p>
                  </div>
                  {formik.touched.dependents && formik.errors.dependents && (
                    <p className="text-red-400 text-sm mt-2">{formik.errors.dependents}</p>
                  )}
                </div>

                {/* Risk Tolerance */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-emerald-600/20 p-2 rounded-lg">
                      <Target className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <label className="block text-lg font-medium text-white mb-1">
                        Risk Tolerance
                      </label>
                      <p className="text-sm text-gray-400">Your investment comfort level</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { value: 'low', label: 'Conservative', desc: 'Stable returns' },
                      { value: 'medium', label: 'Balanced', desc: 'Moderate growth' },
                      { value: 'high', label: 'Aggressive', desc: 'Higher potential' }
                    ].map(option => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => formik.setFieldValue('riskTolerance', option.value)}
                        className={`p-4 rounded-lg transition-all duration-200 border ${
                          formik.values.riskTolerance === option.value
                            ? 'bg-emerald-600 text-white border-emerald-500'
                            : 'bg-gray-700/50 text-gray-300 border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        <div className="font-medium text-center">{option.label}</div>
                        <div className="text-sm mt-1 opacity-80 text-center">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    onClick={(e) => {
                      e.preventDefault();
                      formik.handleSubmit();
                    }}
                    className="w-full py-4 px-8 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-3"
                  >
                    {formik.isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Calculating...
                      </div>
                    ) : (
                      <>
                        Get Recommendation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Recommendation Result */
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl p-8 border border-gray-700">
              <div className="text-center mb-8">
                <div className="flex justify-center mb-6">
                  <div className="bg-emerald-600 p-4 rounded-full shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Your Insurance Plan</h2>
                <div className="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg mb-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-emerald-400 mb-4">
                    {recommendation.type}
                  </h3>
                  <div className="text-4xl font-bold text-white mb-6">
                    ${recommendation.coverage.toLocaleString()}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Term</p>
                      <p className="text-lg font-semibold text-white">{recommendation.term} years</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Monthly Premium</p>
                      <p className="text-lg font-semibold text-white">${recommendation.monthlyPremium}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 p-6 rounded-lg mb-6">
                <h4 className="font-medium text-white mb-3 text-center">
                  Recommendation Details
                </h4>
                <p className="text-gray-300 leading-relaxed text-center text-sm">
                  {recommendation.explanation}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setRecommendation(null);
                    setShowHighEarnerInput(false);
                    formik.resetForm();
                  }}
                  className="py-3 px-6 bg-gray-700 text-gray-300 rounded-lg font-medium hover:bg-gray-600 transition-all duration-200"
                >
                  Calculate Again
                </button>
                <button
                  onClick={() => alert('Feature coming soon! We\'ll connect you with a licensed agent.')}
                  className="py-3 px-6 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-200"
                >
                  Get Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }
      `}</style>
    </div>
  );
};

export default InsuranceRecommendationApp;