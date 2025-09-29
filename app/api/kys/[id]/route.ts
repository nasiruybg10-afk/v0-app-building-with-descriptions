import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    const { id } = await params

    let query = "SELECT * FROM kys_applications WHERE id = $1"
    const queryParams: any[] = [id]

    // If not admin, only show user's own application
    if (user && user.role !== "admin") {
      query += " AND user_id = $2"
      queryParams.push(user.id)
    }

    const applications = await sql(query, queryParams)

    if (applications.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ application: applications[0] })
  } catch (error) {
    console.error("[v0] KYS application fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { status, admin_notes } = body

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 })
    }

    const result = await sql`
      UPDATE kys_applications
      SET status = ${status},
          admin_notes = ${admin_notes},
          reviewed_at = CURRENT_TIMESTAMP,
          reviewed_by = ${user.id}
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    return NextResponse.json({ application: result[0] })
  } catch (error) {
    console.error("[v0] KYS application update error:", error)
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 })
  }
}
