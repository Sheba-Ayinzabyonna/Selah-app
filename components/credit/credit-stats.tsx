"use client"

import { CheckCircle, AlertCircle, TrendingUp } from "lucide-react"

interface CreditStatsProps {
  creditData: {
    cyclesCompleted: number
    onTimePayments: number
    missedPayments: number
    defaultCount: number
    averagePaybackDays: number
  }
}

export default function CreditStats({ creditData }: CreditStatsProps) {
  const stats = [
    {
      icon: TrendingUp,
      label: "Cycles Completed",
      value: creditData.cyclesCompleted,
      subtext: "Esusu cycles",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: CheckCircle,
      label: "On-Time Payments",
      value: creditData.onTimePayments,
      subtext: "out of total",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
    },
    {
      icon: AlertCircle,
      label: "Missed Payments",
      value: creditData.missedPayments,
      subtext: "payment defaults",
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/30",
    },
    {
      icon: TrendingUp,
      label: "Avg Payback Days",
      value: creditData.averagePaybackDays,
      subtext: "days to repay",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Credit Performance</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.bgColor} border ${stat.borderColor} rounded-lg p-4`}>
            <div className="flex items-start justify-between mb-2">
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-slate-400 mt-1">{stat.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
