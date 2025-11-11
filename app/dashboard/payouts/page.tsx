"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import PayoutManagement from "@/components/payouts/payout-management"

export default function PayoutsPage() {
  return (
    <DashboardLayout>
      <PayoutManagement />
    </DashboardLayout>
  )
}
