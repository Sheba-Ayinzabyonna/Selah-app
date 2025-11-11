"use client"

import { useState } from "react"

import { Calendar, AlertCircle, CheckCircle } from "lucide-react"

interface UpcomingPayout {
  groupName: string
  position: number
  amount: number
  date: string
  daysUntil: number
  paymentMethod: string
}

export default function UpcomingPayouts() {
  const [upcomingPayouts] = useState<UpcomingPayout[]>([
    {
      groupName: "Office Savings Circle",
      position: 3,
      amount: 280000,
      date: "2025-11-24",
      daysUntil: 14,
      paymentMethod: "GTB Account",
    },
    {
      groupName: "Family Esusu",
      position: 2,
      amount: 500000,
      date: "2025-12-15",
      daysUntil: 35,
      paymentMethod: "Access Bank",
    },
  ])

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 h-fit">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Calendar size={20} className="text-emerald-400" />
        Upcoming Payouts
      </h3>

      <div className="space-y-4">
        {upcomingPayouts.map((payout, idx) => (
          <div key={idx} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-white text-sm">{payout.groupName}</p>
                <p className="text-xs text-slate-400 mt-1">Position #{payout.position}</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                In {payout.daysUntil} days
              </span>
            </div>

            <div className="space-y-2 py-3 border-y border-slate-600">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Amount</span>
                <span className="text-emerald-400 font-semibold">₦{(payout.amount / 1000).toFixed(0)}K</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Payout Date</span>
                <span className="text-white">{new Date(payout.date).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
              <CheckCircle size={14} className="text-emerald-400" />
              <span>{payout.paymentMethod}</span>
            </div>
          </div>
        ))}

        {upcomingPayouts.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <AlertCircle size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">No upcoming payouts</p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
        <p className="text-xs text-emerald-400 font-semibold mb-1">Payout Protection</p>
        <p className="text-xs text-emerald-300">
          Your payout is guaranteed even if group members default. The guarantee reserve covers 100% of all payouts.
        </p>
      </div>
    </div>
  )
}
