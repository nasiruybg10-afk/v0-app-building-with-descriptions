import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const events = await sql`SELECT * FROM events WHERE id = ${id}`

    if (events.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    const registrations = await sql`
      SELECT COUNT(*) as registration_count
      FROM event_registrations
      WHERE event_id = ${id} AND status = 'registered'
    `

    return NextResponse.json({
      event: events[0],
      registration_count: registrations[0].registration_count,
    })
  } catch (error) {
    console.error("[v0] Get event error:", error)
    return NextResponse.json({ error: "Failed to fetch event" }, { status: 500 })
  }
}
