"use client"

import { useState } from "react"
import { Plus, AlertCircle } from "lucide-react"
import PaymentMethodsList from "./payment-methods-list"
import AddPaymentModal from "./add-payment-modal"
import AutomatedContributions from "./automated-contributions"

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

export default function PaymentManagement() {
  const [showAddPayment, setShowAddPayment] = useState(false)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "bank",
      name: "First Bank Nigeria",
      lastFour: "1234",
      isVerified: true,
      isPrimary: true,
      bankCode: "011",
    },
    {
      id: "2",
      type: "wallet",
      name: "Paystack Wallet",
      lastFour: "0805",
      isVerified: true,
      isPrimary: false,
      provider: "paystack",
    },
  ])

  const handleAddPayment = (newMethod: PaymentMethod) => {
    setPaymentMethods([...paymentMethods, newMethod])
    setShowAddPayment(false)
  }

  const handleSetPrimary = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isPrimary: method.id === id,
      })),
    )
  }

  const handleRemovePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payment Methods</h1>
          <p className="text-slate-400 mt-1">Manage your bank accounts and digital wallets</p>
        </div>
        <button
          onClick={() => setShowAddPayment(true)}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} />
          Add Payment Method
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="text-blue-400 flex-shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-blue-400 font-semibold">Bank-Level Security</p>
          <p className="text-blue-300 text-sm mt-1">
            All payment information is encrypted and processed securely through Paystack and Flutterwave.
          </p>
        </div>
      </div>

      {/* Payment Methods */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Your Payment Methods</h2>
        <PaymentMethodsList methods={paymentMethods} onSetPrimary={handleSetPrimary} onRemove={handleRemovePayment} />
      </div>

      {/* Automated Contributions */}
      <AutomatedContributions />

      {/* Add Payment Modal */}
      <AddPaymentModal isOpen={showAddPayment} onClose={() => setShowAddPayment(false)} onAdd={handleAddPayment} />
    </div>
  )
}
