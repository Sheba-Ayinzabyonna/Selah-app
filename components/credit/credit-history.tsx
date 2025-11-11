"use client"

import { TrendingUp, Calendar, CheckCircle } from "lucide-react"

interface CreditTransaction {
  id: string
  type: "credit_access" | "repayment" | "contribution"
  amount: number
  date: string
  status: "completed" | "pending"
  description: string
}

export default function CreditHistory() {
  const transactions: CreditTransaction[] = [
    {
      id: "1",
      type: "credit_access",
      amount: 150000,
      date: "2025-11-01",
      status: "completed",
      description: "Emergency Credit Access",
    },
    {
      id: "2",
      type: "repayment",
      amount: 150000,
      date: "2025-11-10",
      status: "completed",
      description: "Full Repayment",
    },
    {
      id: "3",
      type: "contribution",
      amount: 35000,
      date: "2025-11-15",
      status: "completed",
      description: "Monthly Esusu Contribution",
    },
    {
      id: "4",
      type: "credit_access",
      amount: 200000,
      date: "2025-10-15",
      status: "completed",
      description: "Business Credit Access",
    },
  ]

  const typeIcons = {
    credit_access: TrendingUp,
    repayment: CheckCircle,
    contribution: Calendar,
  }

  const typeColors = {
    credit_access: "text-yellow-400",
    repayment: "text-emerald-400",
    contribution: "text-blue-400",
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-white mb-6">Transaction History</h2>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const Icon = typeIcons[transaction.type]
          return (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Icon size={20} className={typeColors[transaction.type]} />
                <div>
                  <p className="text-white font-medium">{transaction.description}</p>
                  <p className="text-slate-400 text-sm">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`text-lg font-bold ${
                    transaction.type === "credit_access" ? "text-yellow-400" : "text-emerald-400"
                  }`}
                >
                  {transaction.type === "credit_access" ? "+" : "-"}₦{(transaction.amount / 1000).toFixed(0)}K
                </p>
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                  {transaction.status}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
