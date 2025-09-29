import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { rating, comment } = body

    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO school_reviews (school_id, user_id, rating, comment)
      VALUES (${id}, ${user.id}, ${rating}, ${comment})
      RETURNING *
    `

    return NextResponse.json({ review: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create review error:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
