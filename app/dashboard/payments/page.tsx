"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import PaymentManagement from "@/components/payments/payment-management"

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <PaymentManagement />
    </DashboardLayout>
  )
}
