import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()
    const { full_name, email, phone } = body

    if (!full_name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await getSession()
    const userId = user?.id || null

    const result = await sql`
      INSERT INTO event_registrations (event_id, user_id, full_name, email, phone)
      VALUES (${id}, ${userId}, ${full_name}, ${email}, ${phone})
      RETURNING *
    `

    return NextResponse.json({ registration: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Event registration error:", error)
    return NextResponse.json({ error: "Failed to register for event" }, { status: 500 })
  }
}
