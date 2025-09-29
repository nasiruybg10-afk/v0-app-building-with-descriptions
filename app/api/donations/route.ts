import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const schoolId = searchParams.get("school_id")

    let query = "SELECT d.*, s.name as school_name FROM donations d LEFT JOIN schools s ON d.school_id = s.id WHERE 1=1"
    const params: any[] = []
    let paramIndex = 1

    if (status) {
      query += ` AND d.payment_status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    if (schoolId) {
      query += ` AND d.school_id = $${paramIndex}`
      params.push(schoolId)
      paramIndex++
    }

    query += " ORDER BY d.created_at DESC"

    const donations = await sql(query, params)

    return NextResponse.json({ donations })
  } catch (error) {
    console.error("[v0] Donations fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      donor_name,
      donor_email,
      donor_phone,
      amount,
      currency,
      donation_type,
      school_id,
      payment_method,
      is_anonymous,
      message,
    } = body

    if (!donor_name || !donor_email || !amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate payment reference
    const payment_reference = `DON-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`

    const result = await sql`
      INSERT INTO donations (
        donor_name, donor_email, donor_phone, amount, currency, donation_type,
        school_id, payment_method, payment_reference, payment_status, is_anonymous, message
      )
      VALUES (
        ${donor_name}, ${donor_email}, ${donor_phone}, ${amount}, ${currency || "NGN"},
        ${donation_type || "one_time"}, ${school_id}, ${payment_method || "card"},
        ${payment_reference}, 'pending', ${is_anonymous || false}, ${message}
      )
      RETURNING *
    `

    // In production, integrate with payment gateway here (Paystack, Flutterwave, etc.)
    // For now, return the donation with payment reference

    return NextResponse.json(
      {
        donation: result[0],
        payment_reference,
        message: "Donation initiated. Complete payment to finalize.",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Donation creation error:", error)
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}
