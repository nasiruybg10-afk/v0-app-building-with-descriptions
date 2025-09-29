import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdmin } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    await requireAdmin()

    const stats = await sql`
      SELECT 
        COUNT(*) as total_donations,
        SUM(CASE WHEN payment_status = 'completed' THEN amount ELSE 0 END) as total_amount,
        SUM(CASE WHEN payment_status = 'completed' THEN 1 ELSE 0 END) as completed_donations,
        SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending_donations
      FROM donations
    `

    return NextResponse.json({ stats: stats[0] })
  } catch (error) {
    console.error("[v0] Donation stats error:", error)
    return NextResponse.json({ error: "Failed to fetch donation stats" }, { status: 500 })
  }
}
