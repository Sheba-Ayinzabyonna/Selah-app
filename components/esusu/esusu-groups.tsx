"use client"

import { useState } from "react"
import { Plus, Users, TrendingUp, AlertCircle } from "lucide-react"
import GroupCard from "./group-card"
import CreateGroupModal from "./create-group-modal"

interface Group {
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

export default function EsusuGroups() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [groups, setGroups] = useState<Group[]>([
    {
      id: "1",
      name: "Office Savings Circle",
      description: "Weekly savings with office team members",
      cycleWeeks: 10,
      contributionAmount: 5000,
      frequency: "weekly",
      currentMembers: 8,
      maxMembers: 10,
      status: "active",
      totalContributions: 280000,
      myContributions: 35000,
      nextPayoutDate: "2025-12-15",
    },
    {
      id: "2",
      name: "Family Esusu",
      description: "Monthly savings for family emergencies",
      cycleWeeks: 12,
      contributionAmount: 10000,
      frequency: "monthly",
      currentMembers: 5,
      maxMembers: 8,
      status: "active",
      totalContributions: 120000,
      myContributions: 10000,
      nextPayoutDate: "2025-11-20",
    },
  ])

  const totalSavings = groups.reduce((sum, group) => sum + group.myContributions, 0)
  const activeGroupsCount = groups.filter((g) => g.status === "active").length

  const handleCreateGroup = (groupData: any) => {
    const newGroup: Group = {
      id: Date.now().toString(),
      ...groupData,
      currentMembers: 1,
      totalContributions: 0,
      myContributions: 0,
      status: "pending",
    }
    setGroups([...groups, newGroup])
    setShowCreateModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">My Esusu Groups</h1>
          <p className="text-slate-400 mt-1">Manage your savings circles and track contributions</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} />
          Create Group
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Savings</p>
              <p className="text-3xl font-bold text-white mt-2">₦{totalSavings.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-emerald-500" size={32} />
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Groups</p>
              <p className="text-3xl font-bold text-white mt-2">{activeGroupsCount}</p>
            </div>
            <Users className="text-blue-500" size={32} />
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">100% Secured</p>
              <p className="text-emerald-400 text-sm font-semibold mt-2">Guarantee Reserve Active</p>
            </div>
            <AlertCircle className="text-emerald-500" size={32} />
          </div>
        </div>
      </div>

      {/* Groups List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Your Groups</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateGroup}
      />
    </div>
  )
}
