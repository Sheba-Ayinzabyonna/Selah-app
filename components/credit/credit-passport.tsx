"use client"

import { useState } from "react"
import CreditScoreCard from "./credit-score-card"
import CreditHistory from "./credit-history"
import CreditStats from "./credit-stats"
import CreditUtilization from "./credit-utilization"

interface CreditData {
  score: 750
  maxScore: 1000
  riskRating: "low" | "medium" | "high"
  creditLimit: 500000
  availableCredit: 350000
  cyclesCompleted: 3
  onTimePayments: 28
  missedPayments: 0
  defaultCount: 0
  averagePaybackDays: 45
  lastUpdated: string
}

export default function CreditPassport() {
  const [creditData] = useState<CreditData>({
    score: 750,
    maxScore: 1000,
    riskRating: "low",
    creditLimit: 500000,
    availableCredit: 350000,
    cyclesCompleted: 3,
    onTimePayments: 28,
    missedPayments: 0,
    defaultCount: 0,
    averagePaybackDays: 45,
    lastUpdated: new Date().toISOString(),
  })

  const scorePercentage = (creditData.score / creditData.maxScore) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Credit Passport</h1>
        <p className="text-slate-400 mt-1">Your formal credit history built through savings performance</p>
      </div>

      {/* Main Score Card */}
      <CreditScoreCard creditData={creditData} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreditStats creditData={creditData} />
        <CreditUtilization creditData={creditData} />
      </div>

      {/* Credit History */}
      <CreditHistory />

      {/* Download Passport */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">Export Your Credit Passport</h3>
            <p className="text-slate-400 text-sm">
              Download your official credit report for banks and financial institutions
            </p>
          </div>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  )
}
