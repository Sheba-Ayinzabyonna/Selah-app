"use client"

import type React from "react"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"

interface KycFormProps {
  userData: {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
  }
}

export default function KycForm({ userData }: KycFormProps) {
  const [kycStep, setKycStep] = useState(1)
  const [nin, setNin] = useState("")
  const [bvn, setBvn] = useState("")
  const [idPhotoUrl, setIdPhotoUrl] = useState("")
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleIdPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setIdPhotoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePhotoUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = async () => {
    setError("")

    if (kycStep === 1) {
      if (!nin.trim() || !bvn.trim()) {
        setError("Please enter both NIN and BVN")
        return
      }
      setKycStep(2)
    } else if (kycStep === 2) {
      if (!idPhotoUrl) {
        setError("Please upload your ID photo")
        return
      }
      setKycStep(3)
    } else if (kycStep === 3) {
      if (!profilePhotoUrl) {
        setError("Please upload your profile photo")
        return
      }
      handleKycSubmit()
    }
  }

  const handleKycSubmit = async () => {
    setIsLoading(true)
    try {
      // API call would go here
      console.log("KYC Data:", {
        ...userData,
        nin,
        bvn,
        idPhotoUrl,
        profilePhotoUrl,
      })
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSuccess(true)
    } catch (err) {
      setError("Failed to submit KYC. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-white">Verification Complete</h2>
        <p className="text-slate-400">
          Your KYC verification has been submitted. You'll be able to access all features once approved.
        </p>
        <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-lg p-4 mt-6">
          <p className="text-emerald-400 text-sm">Check your email for verification updates</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Complete KYC Verification</h2>
        <p className="text-slate-400 text-sm">Step {kycStep} of 3</p>
        <div className="mt-3 flex gap-2">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`flex-1 h-1 rounded-full ${step <= kycStep ? "bg-emerald-500" : "bg-slate-700"}`}
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
          <span className="text-sm">{error}</span>
        </div>
      )}

      {/* Step 1: NIN/BVN */}
      {kycStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">National ID Number (NIN)</label>
            <input
              type="text"
              value={nin}
              onChange={(e) => setNin(e.target.value.replace(/\D/g, "").slice(0, 11))}
              maxLength={11}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="11-digit NIN"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Bank Verification Number (BVN)</label>
            <input
              type="text"
              value={bvn}
              onChange={(e) => setBvn(e.target.value.replace(/\D/g, "").slice(0, 11))}
              maxLength={11}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              placeholder="11-digit BVN"
            />
          </div>

          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              Your NIN and BVN are securely encrypted and used only for verification purposes.
            </p>
          </div>
        </div>
      )}

      {/* Step 2: ID Photo */}
      {kycStep === 2 && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
            {idPhotoUrl ? (
              <div className="space-y-3">
                <img
                  src={idPhotoUrl || "/placeholder.svg"}
                  alt="ID"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                <p className="text-emerald-400 text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> ID Photo Uploaded
                </p>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2">
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-white font-medium">Upload ID Photo</p>
                <p className="text-slate-400 text-sm">PNG or JPG, max 5MB</p>
                <input type="file" accept="image/*" onChange={handleIdPhotoUpload} className="hidden" />
              </label>
            )}
          </div>
          <p className="text-slate-400 text-sm">
            Clearly capture your national ID, driver's license, or international passport.
          </p>
        </div>
      )}

      {/* Step 3: Profile Photo */}
      {kycStep === 3 && (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
            {profilePhotoUrl ? (
              <div className="space-y-3">
                <img
                  src={profilePhotoUrl || "/placeholder.svg"}
                  alt="Profile"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
                <p className="text-emerald-400 text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Profile Photo Uploaded
                </p>
              </div>
            ) : (
              <label className="cursor-pointer space-y-2">
                <Upload className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-white font-medium">Upload Profile Photo</p>
                <p className="text-slate-400 text-sm">Recent selfie, clear face visible</p>
                <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} className="hidden" />
              </label>
            )}
          </div>
          <p className="text-slate-400 text-sm">Take a clear selfie with good lighting. Face must be fully visible.</p>
        </div>
      )}

      <button
        onClick={handleNext}
        disabled={isLoading}
        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
      >
        {isLoading ? "Processing..." : kycStep === 3 ? "Complete Verification" : "Next"}
      </button>
    </div>
  )
}
