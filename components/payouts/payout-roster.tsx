"use client"

import { useState } from "react"
import { ChevronDown, Lock, Download } from "lucide-react"

interface PayoutEntry {
  position: number
  memberName: string
  memberId: string
  totalContribution: number
  payoutAmount: number
  payoutDate: string
  status: "completed" | "scheduled" | "processing"
  paymentMethod: string
}

export default function PayoutRoster() {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("office-circle")
  const [groups] = useState([
    {
      id: "office-circle",
      name: "Office Savings Circle",
      cycle: 1,
      totalMembers: 8,
      payouts: [
        {
          position: 1,
          memberName: "Chioma Okafor",
          memberId: "chi-001",
          totalContribution: 40000,
          payoutAmount: 280000,
          payoutDate: "2025-11-10",
          status: "completed",
          paymentMethod: "First Bank",
        },
        {
          position: 2,
          memberName: "You (Adeyemi)",
          memberId: "ade-002",
          totalContribution: 35000,
          payoutAmount: 280000,
          payoutDate: "2025-11-17",
          status: "completed",
          paymentMethod: "Access Bank",
        },
        {
          position: 3,
          memberName: "Tunde Adeleke",
          memberId: "tun-003",
          totalContribution: 35000,
          payoutAmount: 280000,
          payoutDate: "2025-11-24",
          status: "scheduled",
          paymentMethod: "GTB",
        },
        {
          position: 4,
          memberName: "Blessing Igwe",
          memberId: "ble-004",
          totalContribution: 38000,
          payoutAmount: 280000,
          payoutDate: "2025-12-01",
          status: "scheduled",
          paymentMethod: "Zenith Bank",
        },
      ] as PayoutEntry[],
    },
    {
      id: "family-esusu",
      name: "Family Esusu",
      cycle: 2,
      totalMembers: 5,
      payouts: [
        {
          position: 1,
          memberName: "Mama Iya",
          memberId: "mam-001",
          totalContribution: 50000,
          payoutAmount: 500000,
          payoutDate: "2025-11-05",
          status: "completed",
          paymentMethod: "First Bank",
        },
        {
          position: 2,
          memberName: "You (Adeyemi)",
          memberId: "ade-001",
          totalContribution: 10000,
          payoutAmount: 500000,
          payoutDate: "2025-12-15",
          status: "scheduled",
          paymentMethod: "Access Bank",
        },
      ] as PayoutEntry[],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      case "processing":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "scheduled":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Payout Roster</h2>
        <button className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-300 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Download size={16} />
          Export
        </button>
      </div>

      <div className="space-y-3">
        {groups.map((group) => (
          <div key={group.id} className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            {/* Group Header */}
            <button
              onClick={() => setExpandedGroup(expandedGroup === group.id ? null : group.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1 text-left">
                <ChevronDown
                  size={20}
                  className={`text-slate-400 transition-transform ${expandedGroup === group.id ? "rotate-180" : ""}`}
                />
                <div>
                  <p className="font-semibold text-white">{group.name}</p>
                  <p className="text-sm text-slate-400">
                    Cycle {group.cycle} • {group.totalMembers} members
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-400">Payout Position</p>
                <p className="text-emerald-400 font-semibold">{group.payouts.length} positions</p>
              </div>
            </button>

            {/* Expanded Content */}
            {expandedGroup === group.id && (
              <div className="border-t border-slate-700 bg-slate-900/50">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="px-6 py-3 text-left text-slate-400 font-medium">Position</th>
                        <th className="px-6 py-3 text-left text-slate-400 font-medium">Member</th>
                        <th className="px-6 py-3 text-left text-slate-400 font-medium">Payout Date</th>
                        <th className="px-6 py-3 text-right text-slate-400 font-medium">Amount</th>
                        <th className="px-6 py-3 text-left text-slate-400 font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-slate-400 font-medium">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.payouts.map((payout, idx) => (
                        <tr
                          key={idx}
                          className={`border-b border-slate-700 hover:bg-slate-800/50 transition-colors ${
                            payout.memberId.includes("ade") ? "bg-emerald-500/5" : ""
                          }`}
                        >
                          <td className="px-6 py-4 text-white font-semibold">#{payout.position}</td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white font-medium">{payout.memberName}</p>
                              {payout.memberId.includes("ade") && <p className="text-xs text-emerald-400">You</p>}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-slate-300">
                            {new Date(payout.payoutDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right text-emerald-400 font-semibold">
                            ₦{(payout.payoutAmount / 1000).toFixed(0)}K
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                payout.status,
                              )}`}
                            >
                              {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-300">{payout.paymentMethod}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Security Badge */}
                <div className="px-6 py-3 bg-slate-800/50 border-t border-slate-700 flex items-center gap-2 text-xs text-emerald-400">
                  <Lock size={14} />
                  <span>All payouts are secured by the guarantee reserve</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
