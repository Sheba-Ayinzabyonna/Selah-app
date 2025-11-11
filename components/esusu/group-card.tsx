"use client"

import { Users, Calendar, Lock } from "lucide-react"

interface GroupCardProps {
  group: {
    id: string
    name: string
    description: string
    cycleWeeks: number
    contributionAmount: number
    frequency: "daily" | "weekly" | "monthly"
    currentMembers: number
    maxMembers: number
    status: "active" | "pending" | "completed"
    totalContributions: number
    myContributions: number
    nextPayoutDate: string
  }
}

export default function GroupCard({ group }: GroupCardProps) {
  const memberPercentage = (group.currentMembers / group.maxMembers) * 100
  const progressPercentage = (group.totalContributions / (group.contributionAmount * group.cycleWeeks)) * 100

  const statusColors = {
    active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white">{group.name}</h3>
          <p className="text-slate-400 text-sm mt-1">{group.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[group.status]}`}>
          {group.status.charAt(0).toUpperCase() + group.status.slice(1)}
        </span>
      </div>

      {/* Group Info */}
      <div className="space-y-3 mb-4 pb-4 border-b border-slate-700">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Users size={16} />
          <span>
            {group.currentMembers} of {group.maxMembers} members
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div className="bg-emerald-500 h-2 rounded-full transition-all" style={{ width: `${memberPercentage}%` }} />
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-300 mt-2">
          <Calendar size={16} />
          <span>
            ₦{group.contributionAmount.toLocaleString()} {group.frequency}
          </span>
        </div>
      </div>

      {/* Contributions */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-slate-400 text-xs mb-1">Your Contributions</p>
          <p className="text-2xl font-bold text-emerald-400">₦{group.myContributions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs mb-1">Next Payout</p>
          <p className="text-lg font-semibold text-white">{group.nextPayoutDate}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 py-2 rounded-lg font-semibold transition-colors">
          View Details
        </button>
        <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-semibold transition-colors">
          Make Payment
        </button>
      </div>

      {/* Security Badge */}
      <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
        <Lock size={14} />
        <span>100% Savings Security Guaranteed</span>
      </div>
    </div>
  )
}
