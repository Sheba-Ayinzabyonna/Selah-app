"use client"

import { useState } from "react"
import { X, AlertCircle } from "lucide-react"

interface AddPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (method: any) => void
}

export default function AddPaymentModal({ isOpen, onClose, onAdd }: AddPaymentModalProps) {
  const [step, setStep] = useState(1)
  const [paymentType, setPaymentType] = useState<"bank" | "wallet" | null>(null)
  const [formData, setFormData] = useState({
    accountNumber: "",
    bankCode: "",
    accountName: "",
    provider: "",
  })
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState("")

  const banks = [
    { code: "011", name: "First Bank Nigeria" },
    { code: "044", name: "Access Bank" },
    { code: "050", name: "Guaranty Trust Bank" },
    { code: "058", name: "Guaranteed Trust Bank" },
    { code: "063", name: "Zenith Bank" },
  ]

  const walletProviders = [
    { id: "paystack", name: "Paystack" },
    { id: "flutterwave", name: "Flutterwave" },
  ]

  const handleVerifyAccount = async () => {
    setError("")
    setVerifying(true)

    try {
      // Simulate API call to verify account
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock verification
      const newMethod = {
        id: Date.now().toString(),
        type: paymentType,
        name:
          paymentType === "bank"
            ? banks.find((b) => b.code === formData.bankCode)?.name || "Bank"
            : walletProviders.find((p) => p.id === formData.provider)?.name || "Wallet",
        lastFour: formData.accountNumber.slice(-4),
        isVerified: true,
        isPrimary: false,
        ...(paymentType === "bank" && { bankCode: formData.bankCode }),
        ...(paymentType === "wallet" && { provider: formData.provider }),
      }

      onAdd(newMethod)
      setStep(1)
      setPaymentType(null)
      setFormData({ accountNumber: "", bankCode: "", accountName: "", provider: "" })
    } catch (err) {
      setError("Failed to verify account. Please check your details.")
    } finally {
      setVerifying(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">Add Payment Method</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method Type</h3>

              {/* Bank Option */}
              <button
                onClick={() => {
                  setPaymentType("bank")
                  setStep(2)
                }}
                className="w-full p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500 rounded-lg transition-colors text-left"
              >
                <p className="font-semibold text-white">Bank Account</p>
                <p className="text-slate-400 text-sm mt-1">Nigerian bank transfer</p>
              </button>

              {/* Wallet Option */}
              <button
                onClick={() => {
                  setPaymentType("wallet")
                  setStep(2)
                }}
                className="w-full p-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500 rounded-lg transition-colors text-left"
              >
                <p className="font-semibold text-white">Digital Wallet</p>
                <p className="text-slate-400 text-sm mt-1">Paystack or Flutterwave</p>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setStep(1)}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-semibold mb-4"
              >
                ← Back
              </button>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg flex items-start gap-2 text-sm">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {paymentType === "bank" ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Select Bank</label>
                    <select
                      value={formData.bankCode}
                      onChange={(e) => setFormData({ ...formData, bankCode: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="">Choose a bank</option>
                      {banks.map((bank) => (
                        <option key={bank.code} value={bank.code}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Account Number</label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.slice(0, 10) })}
                      maxLength={10}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="10-digit account"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Account Name</label>
                    <input
                      type="text"
                      value={formData.accountName}
                      onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      placeholder="Your account name"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Select Wallet Provider</label>
                  <select
                    value={formData.provider}
                    onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">Choose provider</option>
                    {walletProviders.map((provider) => (
                      <option key={provider.id} value={provider.id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleVerifyAccount}
                disabled={
                  verifying ||
                  (!formData.bankCode && paymentType === "bank") ||
                  (!formData.provider && paymentType === "wallet")
                }
                className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-2 rounded-lg transition-colors"
              >
                {verifying ? "Verifying..." : "Verify & Add"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
