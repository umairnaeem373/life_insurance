export interface RecommendationInput {
  age: number;
  income: number;
  dependents: number;
  riskTolerance: 'low' | 'medium' | 'high';
}

export interface RecommendationResult {
  type: string;
  coverage: number;
  term: number;
  explanation: string;
  monthlyPremium: number;
}

export function calculateRecommendation({ age, income, dependents, riskTolerance }: RecommendationInput): RecommendationResult {
  let recommendationType = 'Term Life';
  let coverage = Math.max(income * 10, 250000);
  let term = 20;

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

  coverage += dependents * 150000;

  if (riskTolerance === 'high' && income > 100000) {
    recommendationType = 'Universal Life';
  } else if (riskTolerance === 'low') {
    recommendationType = 'Whole Life';
  }

  const monthlyPremium = Math.round((coverage / 1000) * (age / 10) * 0.8);

  return {
    type: recommendationType,
    coverage,
    term,
    monthlyPremium,
    explanation: `Based on your profile, we recommend ${recommendationType} insurance with $${ coverage.toLocaleString() } coverage${term ? ` for ${term} years` : ''}. This provides ${Math.round(coverage / income)}x your annual income, ensuring comprehensive financial security for your dependents.`
  };
} 