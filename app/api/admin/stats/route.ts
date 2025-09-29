import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdmin } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    await requireAdmin()

    const schoolStats = await sql`
      SELECT 
        COUNT(*) as total_schools,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_schools,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_schools
      FROM schools
    `

    const eventStats = await sql`
      SELECT 
        COUNT(*) as total_events,
        SUM(CASE WHEN status = 'upcoming' THEN 1 ELSE 0 END) as upcoming_events
      FROM events
    `

    const kysStats = await sql`
      SELECT 
        COUNT(*) as total_applications,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending_applications,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved_applications
      FROM kys_applications
    `

    const donationStats = await sql`
      SELECT 
        COUNT(*) as total_donations,
        SUM(CASE WHEN payment_status = 'completed' THEN amount ELSE 0 END) as total_amount
      FROM donations
    `

    const userStats = await sql`
      SELECT COUNT(*) as total_users FROM users
    `

    return NextResponse.json({
      stats: {
        schools: schoolStats[0],
        events: eventStats[0],
        kys: kysStats[0],
        donations: donationStats[0],
        users: userStats[0],
      },
    })
  } catch (error) {
    console.error("[v0] Admin stats error:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
