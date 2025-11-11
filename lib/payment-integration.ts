// Payment Integration Service
interface PaymentConfig {
  provider: "paystack" | "flutterwave"
  apiKey: string
  baseUrl: string
}

interface PaymentInitiation {
  reference: string
  authorizationUrl?: string
  accessCode?: string
}

export class PaymentService {
  private config: PaymentConfig

  constructor(provider: "paystack" | "flutterwave", apiKey: string) {
    this.config = {
      provider,
      apiKey,
      baseUrl: provider === "paystack" ? "https://api.paystack.co" : "https://api.flutterwave.com/v3",
    }
  }

  async initiatePayment(data: {
    email: string
    amount: number
    reference: string
  }): Promise<PaymentInitiation> {
    if (this.config.provider === "paystack") {
      return this.paystackInitiate(data)
    } else {
      return this.flutterwaveInitiate(data)
    }
  }

  private async paystackInitiate(data: {
    email: string
    amount: number
    reference: string
  }): Promise<PaymentInitiation> {
    const response = await fetch(`${this.config.baseUrl}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        amount: data.amount * 100,
        reference: data.reference,
      }),
    })

    const result = await response.json()
    return {
      reference: data.reference,
      authorizationUrl: result.data.authorization_url,
      accessCode: result.data.access_code,
    }
  }

  private async flutterwaveInitiate(data: {
    email: string
    amount: number
    reference: string
  }): Promise<PaymentInitiation> {
    const response = await fetch(`${this.config.baseUrl}/payments`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tx_ref: data.reference,
        amount: data.amount,
        currency: "NGN",
        customer: {
          email: data.email,
        },
        redirect_url: `${window.location.origin}/payment/callback`,
      }),
    })

    const result = await response.json()
    return {
      reference: data.reference,
      authorizationUrl: result.data.link,
    }
  }

  async verifyPayment(reference: string): Promise<boolean> {
    if (this.config.provider === "paystack") {
      return this.paystackVerify(reference)
    } else {
      return this.flutterwaveVerify(reference)
    }
  }

  private async paystackVerify(reference: string): Promise<boolean> {
    const response = await fetch(`${this.config.baseUrl}/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    })

    const result = await response.json()
    return result.data.status === "success"
  }

  private async flutterwaveVerify(reference: string): Promise<boolean> {
    const response = await fetch(`${this.config.baseUrl}/transactions/${reference}/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
    })

    const result = await response.json()
    return result.status === "success"
  }
}

// Scheduled Payment Handler
export interface ScheduledPayment {
  id: string
  userId: string
  groupId: string
  amount: number
  frequency: "daily" | "weekly" | "monthly"
  nextDeductionDate: Date
  paymentMethodId: string
  isActive: boolean
}

export function calculateNextDeductionDate(
  frequency: "daily" | "weekly" | "monthly",
  fromDate: Date = new Date(),
): Date {
  const date = new Date(fromDate)

  switch (frequency) {
    case "daily":
      date.setDate(date.getDate() + 1)
      break
    case "weekly":
      date.setDate(date.getDate() + 7)
      break
    case "monthly":
      date.setMonth(date.getMonth() + 1)
      break
  }

  return date
}

export function shouldProcessPayment(scheduledPayment: ScheduledPayment): boolean {
  const now = new Date()
  return scheduledPayment.isActive && new Date(scheduledPayment.nextDeductionDate) <= now
}
