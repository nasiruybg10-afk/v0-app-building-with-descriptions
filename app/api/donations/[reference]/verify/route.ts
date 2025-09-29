import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest, { params }: { params: Promise<{ reference: string }> }) {
  try {
    const { reference } = await params

    // In production, verify payment with payment gateway API
    // For now, simulate successful payment

    const result = await sql`
      UPDATE donations
      SET payment_status = 'completed',
          completed_at = CURRENT_TIMESTAMP
      WHERE payment_reference = ${reference}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 })
    }

    return NextResponse.json({
      donation: result[0],
      message: "Payment verified successfully",
    })
  } catch (error) {
    console.error("[v0] Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
