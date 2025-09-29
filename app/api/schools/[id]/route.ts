import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    const schools = await sql`
      SELECT s.*, 
        COALESCE(AVG(sr.rating), 0) as average_rating,
        COUNT(sr.id) as review_count
      FROM schools s
      LEFT JOIN school_reviews sr ON s.id = sr.school_id
      WHERE s.id = ${id}
      GROUP BY s.id
    `

    if (schools.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    const reviews = await sql`
      SELECT sr.*, u.full_name as user_name
      FROM school_reviews sr
      LEFT JOIN users u ON sr.user_id = u.id
      WHERE sr.school_id = ${id}
      ORDER BY sr.created_at DESC
    `

    return NextResponse.json({ school: schools[0], reviews })
  } catch (error) {
    console.error("[v0] Get school error:", error)
    return NextResponse.json({ error: "Failed to fetch school" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    // Check ownership or admin
    const school = await sql`SELECT owner_id FROM schools WHERE id = ${id}`
    if (school.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    if (school[0].owner_id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const updates = Object.keys(body)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ")
    const values = Object.values(body)

    const result = await sql(
      `UPDATE schools SET ${updates}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`,
      [id, ...values],
    )

    return NextResponse.json({ school: result[0] })
  } catch (error) {
    console.error("[v0] Update school error:", error)
    return NextResponse.json({ error: "Failed to update school" }, { status: 500 })
  }
}
