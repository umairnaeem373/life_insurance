import React from 'react';
import { FormikProps } from 'formik';
import { RecommendationInput } from '../../utils/calculateRecommendation';
import SliderInput from '../ui/SliderInput';
import NumberInput from '../ui/NumberInput';
import RiskToleranceSelector from '../ui/RiskToleranceSelector';

interface InsuranceFormProps {
  formik: FormikProps<RecommendationInput>;
  showHighEarnerInput: boolean;
  handleIncomeChange: (value: number) => void;
}

const InsuranceForm: React.FC<InsuranceFormProps> = ({ formik, showHighEarnerInput, handleIncomeChange }) => (
  <form className="space-y-6" onSubmit={formik.handleSubmit}>
    <SliderInput
      label="Age"
      min={18}
      max={80}
      value={formik.values.age}
      onChange={formik.handleChange}
      name="age"
      description="Your current age"
      error={formik.touched.age && formik.errors.age ? formik.errors.age : ''}
    />
    <SliderInput
      label="Annual Income"
      min={20000}
      max={500000}
      step={5000}
      value={formik.values.income}
      onChange={(e) => handleIncomeChange(Number(e.target.value))}
      name="income"
      description="Your yearly income before taxes"
      error={formik.touched.income && formik.errors.income ? formik.errors.income : ''}
      showHighEarnerInput={showHighEarnerInput}
      setShowHighEarnerInput={() => handleIncomeChange(500000)}
      formik={formik}
    />
    <NumberInput
      label="Dependents"
      min={0}
      max={10}
      value={formik.values.dependents}
      onChange={formik.handleChange}
      name="dependents"
      description="Number of people who depend on your income"
      error={formik.touched.dependents && formik.errors.dependents ? formik.errors.dependents : ''}
    />
    <RiskToleranceSelector
      value={formik.values.riskTolerance}
      onChange={(value) => formik.setFieldValue('riskTolerance', value)}
      error={formik.touched.riskTolerance && formik.errors.riskTolerance ? formik.errors.riskTolerance : ''}
    />
    <div className="pt-3">
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full py-3 px-6 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2 text-sm"
      >
        {formik.isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Calculating...
          </div>
        ) : (
          <>
            Get Recommendation
          </>
        )}
      </button>
    </div>
  </form>
);

export default InsuranceForm; 