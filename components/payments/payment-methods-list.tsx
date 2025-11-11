"use client"

import { CreditCard, Wallet, CheckCircle, Trash2 } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "bank" | "wallet"
  name: string
  lastFour: string
  isVerified: boolean
  isPrimary: boolean
  bankCode?: string
  provider?: string
}

interface PaymentMethodsListProps {
  methods: PaymentMethod[]
  onSetPrimary: (id: string) => void
  onRemove: (id: string) => void
}

export default function PaymentMethodsList({ methods, onSetPrimary, onRemove }: PaymentMethodsListProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method.id}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              {/* Icon */}
              <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                {method.type === "bank" ? (
                  <CreditCard className="text-emerald-400" size={24} />
                ) : (
                  <Wallet className="text-blue-400" size={24} />
                )}
              </div>

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white">{method.name}</h3>
                  {method.isVerified && <CheckCircle className="text-emerald-400" size={18} />}
                  {method.isPrimary && (
                    <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded border border-emerald-500/30">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-slate-400 text-sm mt-1">
                  {method.type === "bank" ? "Bank Account" : "Digital Wallet"} • ••• {method.lastFour}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {!method.isPrimary && (
                <button
                  onClick={() => onSetPrimary(method.id)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg text-sm font-medium transition-colors"
                >
                  Set Primary
                </button>
              )}
              <button
                onClick={() => onRemove(method.id)}
                disabled={method.isPrimary}
                className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {methods.length === 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-12 text-center">
          <CreditCard className="text-slate-600 mx-auto mb-3" size={32} />
          <p className="text-slate-400">No payment methods added yet</p>
          <p className="text-slate-500 text-sm mt-1">Add a payment method to enable automated contributions</p>
        </div>
      )}
    </div>
  )
}
