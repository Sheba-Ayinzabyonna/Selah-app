"use client"

import { Shield } from "lucide-react"

interface CreditScoreCardProps {
  creditData: {
    score: number
    maxScore: number
    riskRating: "low" | "medium" | "high"
    creditLimit: number
    availableCredit: number
    lastUpdated: string
  }
}

export default function CreditScoreCard({ creditData }: CreditScoreCardProps) {
  const scorePercentage = (creditData.score / creditData.maxScore) * 100
  const usedCredit = creditData.creditLimit - creditData.availableCredit

  const riskColors = {
    low: "text-emerald-400",
    medium: "text-yellow-400",
    high: "text-red-400",
  }

  const riskBgColors = {
    low: "bg-emerald-500/10 border-emerald-500/30",
    medium: "bg-yellow-500/10 border-yellow-500/30",
    high: "bg-red-500/10 border-red-500/30",
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Score Circle */}
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="2" />
              {/* Score circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray={`${(scorePercentage / 100) * 283} 283`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-5xl font-bold text-emerald-400">{creditData.score}</p>
              <p className="text-slate-400 text-sm">/1000</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <p className="text-slate-400 text-sm mb-2">Risk Rating</p>
            <div
              className={`inline-block px-4 py-2 rounded-full font-semibold border ${riskBgColors[creditData.riskRating]} ${riskColors[creditData.riskRating]}`}
            >
              {creditData.riskRating.charAt(0).toUpperCase() + creditData.riskRating.slice(1)} Risk
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Credit Limit</p>
              <p className="text-2xl font-bold text-white">₦{(creditData.creditLimit / 1000).toFixed(0)}K</p>
            </div>
            <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-500/30">
              <p className="text-slate-400 text-sm mb-1">Available</p>
              <p className="text-2xl font-bold text-emerald-400">₦{(creditData.availableCredit / 1000).toFixed(0)}K</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-slate-400 text-sm">Credit Utilization</p>
              <p className="text-white font-semibold">
                {((1 - creditData.availableCredit / creditData.creditLimit) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3">
              <div
                className="bg-emerald-500 h-3 rounded-full transition-all"
                style={{ width: `${(1 - creditData.availableCredit / creditData.creditLimit) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Shield size={14} />
            <span>Last updated: {new Date(creditData.lastUpdated).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
