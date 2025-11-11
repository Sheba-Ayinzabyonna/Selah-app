"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import PayoutRoster from "./payout-roster"
import UpcomingPayouts from "./upcoming-payouts"
import PayoutStats from "./payout-stats"

interface PayoutData {
  totalPayoutsReceived: number
  upcomingPayoutAmount: number
  nextPayoutDate: string
  groupsInCycle: number
}

export default function PayoutManagement() {
  const [payoutData] = useState<PayoutData>({
    totalPayoutsReceived: 150000,
    upcomingPayoutAmount: 280000,
    nextPayoutDate: "2025-12-15",
    groupsInCycle: 2,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Payout Management</h1>
        <p className="text-slate-400 mt-1">Track your scheduled payouts and distribution status</p>
      </div>

      {/* Stats Cards */}
      <PayoutStats payoutData={payoutData} />

      {/* Info Banner */}
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-emerald-400 font-semibold">Guaranteed Distribution</p>
          <p className="text-emerald-300 text-sm mt-1">
            All payouts are protected by our guarantee reserve. You will receive your full allocation on the scheduled
            date.
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PayoutRoster />
        </div>
        <UpcomingPayouts />
      </div>
    </div>
  )
}
