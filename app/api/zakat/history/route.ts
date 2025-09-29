import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAuth } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    const user = await requireAuth()

    const calculations = await sql`
      SELECT * FROM zakat_calculations
      WHERE user_id = ${user.id}
      ORDER BY calculation_date DESC
      LIMIT 10
    `

    return NextResponse.json({ calculations })
  } catch (error) {
    console.error("[v0] Zakat history error:", error)
    return NextResponse.json({ error: "Failed to fetch zakat history" }, { status: 500 })
  }
}
