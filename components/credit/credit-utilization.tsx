"use client"

import { PieChart } from "lucide-react"

interface CreditUtilizationProps {
  creditData: {
    creditLimit: number
    availableCredit: number
  }
}

export default function CreditUtilization({ creditData }: CreditUtilizationProps) {
  const usedCredit = creditData.creditLimit - creditData.availableCredit
  const utilizationPercent = (usedCredit / creditData.creditLimit) * 100

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <PieChart size={20} className="text-emerald-400" />
        Credit Breakdown
      </h2>

      <div className="space-y-4">
        {/* Used Credit */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300">Used Credit</span>
            <span className="text-emerald-400 font-semibold">₦{(usedCredit / 1000).toFixed(0)}K</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: `${utilizationPercent}%` }} />
          </div>
        </div>

        {/* Available Credit */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300">Available Credit</span>
            <span className="text-blue-400 font-semibold">₦{(creditData.availableCredit / 1000).toFixed(0)}K</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${100 - utilizationPercent}%` }} />
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div>
            <p className="text-slate-400 text-xs mb-1">Total Limit</p>
            <p className="text-lg font-bold text-white">₦{(creditData.creditLimit / 1000).toFixed(0)}K</p>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-1">Utilization</p>
            <p className="text-lg font-bold text-emerald-400">{utilizationPercent.toFixed(1)}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
