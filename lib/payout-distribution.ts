// Payout Distribution Logic

export interface PayoutRosterEntry {
  position: number
  memberId: string
  memberName: string
  totalContributions: number
  expectedPayoutAmount: number
  scheduledPayoutDate: Date
  status: "completed" | "processing" | "scheduled"
  paymentMethodId: string
  transactionReference?: string
}

export interface PayoutCycle {
  groupId: string
  cycleNumber: number
  startDate: Date
  endDate: Date
  totalPoolAmount: number
  payoutSchedule: PayoutRosterEntry[]
  guaranteeReserveUsed: number
}

/**
 * Calculate payout order based on registration order
 * Creates a fair rotation system for payout distribution
 */
export function generatePayoutRoster(
  groupId: string,
  members: Array<{ id: string; name: string; joinDate: Date }>,
  cycleStartDate: Date,
  contributionAmount: number,
  cycleWeeks: number,
): PayoutRosterEntry[] {
  const sortedMembers = [...members].sort((a, b) => a.joinDate.getTime() - b.joinDate.getTime())

  const payoutInterval = (cycleWeeks * 7) / members.length // Days between payouts
  const totalPoolAmount = contributionAmount * members.length

  return sortedMembers.map((member, index) => {
    const payoutDate = new Date(cycleStartDate)
    payoutDate.setDate(payoutDate.getDate() + Math.floor(payoutInterval * (index + 1)))

    return {
      position: index + 1,
      memberId: member.id,
      memberName: member.name,
      totalContributions: contributionAmount,
      expectedPayoutAmount: totalPoolAmount,
      scheduledPayoutDate: payoutDate,
      status: "scheduled",
      paymentMethodId: "", // Will be populated later
    }
  })
}

/**
 * Calculate guarantee reserve needed
 * 1-3% of total pool to cover potential defaults
 */
export function calculateGuaranteeReserve(
  totalPoolAmount: number,
  riskFactor = 0.02, // 2% by default
): number {
  return Math.ceil(totalPoolAmount * riskFactor)
}

/**
 * Check if payout is eligible for processing
 */
export function isPayoutEligible(
  rostEntry: PayoutRosterEntry,
  currentDate: Date,
  contributionsReceived: number,
  expectedContributions: number,
): {
  eligible: boolean
  reason: string
} {
  // Check if payout date has arrived
  if (rostEntry.scheduledPayoutDate > currentDate) {
    return {
      eligible: false,
      reason: "Payout date has not arrived yet",
    }
  }

  // Check if minimum contributions received (allow 90% threshold)
  const contributionThreshold = expectedContributions * 0.9
  if (contributionsReceived < contributionThreshold) {
    return {
      eligible: false,
      reason: "Insufficient contributions received",
    }
  }

  return {
    eligible: true,
    reason: "Payout is eligible for processing",
  }
}

/**
 * Process payout distribution
 */
export async function processPayout(
  rostEntry: PayoutRosterEntry,
  paymentProvider: "paystack" | "flutterwave",
  userBankDetails: {
    accountNumber: string
    bankCode: string
    amount: number
  },
): Promise<{ success: boolean; transactionRef: string; error?: string }> {
  try {
    // Call payment provider API
    const response = await fetch("/api/payouts/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rostEntry,
        paymentProvider,
        bankDetails: userBankDetails,
      }),
    })

    const result = await response.json()

    if (!result.success) {
      return {
        success: false,
        transactionRef: "",
        error: result.error || "Payment processing failed",
      }
    }

    return {
      success: true,
      transactionRef: result.transactionRef,
    }
  } catch (error) {
    return {
      success: false,
      transactionRef: "",
      error: "Failed to process payout",
    }
  }
}

/**
 * Calculate days until next payout
 */
export function daysUntilPayout(payoutDate: Date): number {
  const today = new Date()
  const diffTime = payoutDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Generate payout summary for user
 */
export function generatePayoutSummary(rosters: PayoutRosterEntry[]): {
  totalExpectedPayouts: number
  completedPayouts: number
  upcomingPayouts: number
  nextPayoutDate: Date | null
  totalAmountReceived: number
} {
  const completed = rosters.filter((r) => r.status === "completed")
  const upcoming = rosters.filter((r) => r.status === "scheduled" && new Date() < r.scheduledPayoutDate)

  return {
    totalExpectedPayouts: rosters.length,
    completedPayouts: completed.length,
    upcomingPayouts: upcoming.length,
    nextPayoutDate: upcoming.length > 0 ? upcoming[0].scheduledPayoutDate : null,
    totalAmountReceived: completed.reduce((sum, r) => sum + r.expectedPayoutAmount, 0),
  }
}
