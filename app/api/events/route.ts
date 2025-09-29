import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const status = searchParams.get("status") || "upcoming"
    const city = searchParams.get("city")

    let query = `SELECT * FROM events WHERE status = $1`
    const params: any[] = [status]
    let paramIndex = 2

    if (type) {
      query += ` AND event_type = $${paramIndex}`
      params.push(type)
      paramIndex++
    }

    if (city) {
      query += ` AND city = $${paramIndex}`
      params.push(city)
      paramIndex++
    }

    query += ` ORDER BY start_date ASC`

    const events = await sql(query, params)

    return NextResponse.json({ events })
  } catch (error) {
    console.error("[v0] Events API error:", error)
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const {
      title,
      description,
      event_type,
      start_date,
      end_date,
      location,
      city,
      organizer,
      contact_email,
      contact_phone,
      registration_url,
      image_url,
    } = body

    if (!title || !event_type || !start_date || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO events (
        title, description, event_type, start_date, end_date, location,
        city, organizer, contact_email, contact_phone, registration_url,
        image_url, created_by
      )
      VALUES (
        ${title}, ${description}, ${event_type}, ${start_date}, ${end_date},
        ${location}, ${city}, ${organizer}, ${contact_email}, ${contact_phone},
        ${registration_url}, ${image_url}, ${user.id}
      )
      RETURNING *
    `

    return NextResponse.json({ event: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create event error:", error)
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
