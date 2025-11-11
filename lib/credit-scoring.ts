// Credit Scoring Algorithm
interface CreditScoringInput {
  cyclesCompleted: number
  onTimePayments: number
  totalPayments: number
  missedPayments: number
  defaultCount: number
  averagePaybackDays: number
  totalSavings: number
  averageSavingsPerCycle: number
}

export function calculateCreditScore(input: CreditScoringInput): {
  score: number
  maxScore: number
  riskRating: "low" | "medium" | "high"
  creditLimit: number
} {
  let score = 0
  const maxScore = 1000

  // 1. Cycles Completed (max 150 points)
  const cycleScore = Math.min(input.cyclesCompleted * 50, 150)
  score += cycleScore

  // 2. Payment History (max 400 points)
  const paymentRate = input.totalPayments > 0 ? input.onTimePayments / input.totalPayments : 0
  const paymentScore = paymentRate * 400
  score += paymentScore

  // 3. Missed Payments Penalty (max -150 points)
  const missedPenalty = Math.min(input.missedPayments * 30, 150)
  score -= missedPenalty

  // 4. Default History Penalty (max -200 points)
  const defaultPenalty = Math.min(input.defaultCount * 50, 200)
  score -= defaultPenalty

  // 5. Payback Consistency (max 150 points)
  // Ideal payback time is 30-45 days
  const paybackScore = 150 - Math.abs(input.averagePaybackDays - 37.5) * 2
  score += Math.max(paybackScore, 0)

  // 6. Savings Performance (max 150 points)
  // Bonus for consistent savings
  const savingsBonus = Math.min((input.averageSavingsPerCycle / 10000) * 30, 150)
  score += savingsBonus

  // Normalize score
  const finalScore = Math.min(Math.max(score, 0), maxScore)

  // Determine risk rating
  let riskRating: "low" | "medium" | "high"
  if (finalScore >= 700) {
    riskRating = "low"
  } else if (finalScore >= 500) {
    riskRating = "medium"
  } else {
    riskRating = "high"
  }

  // Calculate credit limit based on score and savings
  let creditLimit = 100000 // Base limit
  creditLimit += (finalScore / maxScore) * 500000 // Score-based increase
  creditLimit += input.totalSavings * 1.5 // Savings-based increase

  return {
    score: Math.round(finalScore),
    maxScore,
    riskRating,
    creditLimit: Math.round(creditLimit),
  }
}

export function getCreditScoreInsights(score: number): string[] {
  const insights: string[] = []

  if (score >= 900) {
    insights.push("Excellent credit profile! You qualify for premium credit products.")
    insights.push("Consider accessing larger credit amounts for business opportunities.")
  } else if (score >= 800) {
    insights.push("Very good credit score. You have strong creditworthiness.")
    insights.push("You can access competitive credit rates and larger limits.")
  } else if (score >= 700) {
    insights.push("Good credit score. Continue maintaining on-time payments.")
    insights.push("Your credit limit will increase as you complete more cycles.")
  } else if (score >= 500) {
    insights.push("Fair credit score. Focus on completing cycles and on-time payments.")
    insights.push("Avoid missed payments to improve your score quickly.")
  } else {
    insights.push("Your credit score is building. Continue with consistent payments.")
    insights.push("Complete more savings cycles to improve your creditworthiness.")
  }

  return insights
}
