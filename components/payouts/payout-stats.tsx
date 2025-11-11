"use client"

import { DollarSign, Calendar, Users, TrendingUp } from "lucide-react"

interface PayoutStatsProps {
  payoutData: {
    totalPayoutsReceived: number
    upcomingPayoutAmount: number
    nextPayoutDate: string
    groupsInCycle: number
  }
}

export default function PayoutStats({ payoutData }: PayoutStatsProps) {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Payouts Received",
      value: `₦${(payoutData.totalPayoutsReceived / 1000).toFixed(0)}K`,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: TrendingUp,
      label: "Upcoming Payout",
      value: `₦${(payoutData.upcomingPayoutAmount / 1000).toFixed(0)}K`,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: Calendar,
      label: "Next Payout Date",
      value: payoutData.nextPayoutDate,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: Users,
      label: "Groups in Cycle",
      value: payoutData.groupsInCycle.toString(),
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div key={idx} className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-6`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            </div>
            <stat.icon size={24} className={stat.color} />
          </div>
        </div>
      ))}
    </div>
  )
}
