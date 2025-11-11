"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Clock, CheckCircle } from "lucide-react"

interface Automation {
  id: string
  groupName: string
  amount: number
  frequency: "daily" | "weekly" | "monthly"
  nextDeduction: string
  isActive: boolean
}

export default function AutomatedContributions() {
  const [showModal, setShowModal] = useState(false)
  const [automations, setAutomations] = useState<Automation[]>([
    {
      id: "1",
      groupName: "Office Savings Circle",
      amount: 5000,
      frequency: "weekly",
      nextDeduction: "2025-11-20",
      isActive: true,
    },
    {
      id: "2",
      groupName: "Family Esusu",
      amount: 10000,
      frequency: "monthly",
      nextDeduction: "2025-11-25",
      isActive: true,
    },
  ])

  const handleAddAutomation = (newAutomation: Automation) => {
    setAutomations([...automations, { ...newAutomation, id: Date.now().toString() }])
    setShowModal(false)
  }

  const handleToggle = (id: string) => {
    setAutomations(automations.map((auto) => (auto.id === id ? { ...auto, isActive: !auto.isActive } : auto)))
  }

  const handleRemove = (id: string) => {
    setAutomations(automations.filter((auto) => auto.id !== id))
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Automated Contributions</h2>
          <p className="text-slate-400 text-sm mt-1">Schedule automatic deductions from your payment method</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <Plus size={16} />
          Add Automation
        </button>
      </div>

      <div className="space-y-3">
        {automations.map((automation) => (
          <div
            key={automation.id}
            className={`p-4 rounded-lg border transition-colors ${
              automation.isActive ? "bg-slate-700/50 border-slate-600" : "bg-slate-700/30 border-slate-700 opacity-60"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <button
                  onClick={() => handleToggle(automation.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    automation.isActive ? "bg-emerald-500 border-emerald-500" : "border-slate-500"
                  }`}
                >
                  {automation.isActive && <CheckCircle size={16} className="text-white" />}
                </button>

                <div className="flex-1">
                  <p className="font-semibold text-white">{automation.groupName}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-slate-400">
                    <span>₦{automation.amount.toLocaleString()}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {automation.frequency.charAt(0).toUpperCase() + automation.frequency.slice(1)}
                    </span>
                    <span>Next: {automation.nextDeduction}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-600 text-slate-400 rounded-lg transition-colors">
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleRemove(automation.id)}
                  className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {automations.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            <Clock size={32} className="mx-auto mb-2 opacity-50" />
            <p>No automated contributions set up</p>
          </div>
        )}
      </div>
    </div>
  )
}
