"use client";
import React from 'react';
import BackgroundPattern from './components/layout/BackgroundPattern';
import Header from './components/layout/Header';
import InsuranceForm from './components/forms/InsuranceForm';
import RecommendationResult from './components/recommendation/RecommendationResult';
import { useInsuranceRecommendation } from './hooks/useInsuranceRecommendation';

const InsuranceRecommendationApp = () => {
  const {
    formik,
    recommendation,
    setRecommendation,
    showHighEarnerInput,
    setShowHighEarnerInput,
    handleIncomeChange,
  } = useInsuranceRecommendation();

  return (
    <div className="min-h-screen bg-gray-900">
      <BackgroundPattern />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        <div className="max-w-xl mx-auto">
          <Header />
          {!recommendation ? (
            <InsuranceForm
              formik={formik}
              showHighEarnerInput={showHighEarnerInput}
              handleIncomeChange={handleIncomeChange}
            />
          ) : (
            <RecommendationResult
              recommendation={recommendation}
              onReset={() => {
                setRecommendation(null);
                setShowHighEarnerInput(false);
                formik.resetForm();
              }}
              onGetQuote={() => alert("Feature coming soon! We'll connect you with a licensed agent.")}
            />
          )}
        </div>
      </div>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
          transition: all 0.2s ease;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 9px rgba(16, 185, 129, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(16, 185, 129, 0.3);
        }
        .no-spinners {
          -moz-appearance: textfield;
        }
        .no-spinners::-webkit-outer-spin-button,
        .no-spinners::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default InsuranceRecommendationApp;