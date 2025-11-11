"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"

interface AutomationModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (automation: any) => void
}

export default function AutomationModal({ isOpen, onClose, onAdd }: AutomationModalProps) {
  const [formData, setFormData] = useState({
    groupName: "",
    amount: "",
    frequency: "weekly" as const,
  })

  const groups = ["Office Savings Circle", "Family Esusu", "Community Fund"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onAdd({
      groupName: formData.groupName,
      amount: Number.parseInt(formData.amount),
      frequency: formData.frequency,
      nextDeduction: new Date().toISOString().split("T")[0],
      isActive: true,
    })

    setFormData({ groupName: "", amount: "", frequency: "weekly" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Set Up Automation</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Group</label>
            <select
              value={formData.groupName}
              onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              required
            >
              <option value="">Choose a group</option>
              {groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Amount (₦)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              placeholder="5,000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Frequency</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-600 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition-colors"
            >
              Create Automation
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
