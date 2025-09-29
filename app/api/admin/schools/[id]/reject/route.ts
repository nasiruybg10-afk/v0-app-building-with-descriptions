import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { requireAdmin } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAdmin()

    const { id } = await params

    const result = await sql`
      UPDATE schools
      SET status = 'rejected', updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "School not found" }, { status: 404 })
    }

    return NextResponse.json({ school: result[0] })
  } catch (error) {
    console.error("[v0] School rejection error:", error)
    return NextResponse.json({ error: "Failed to reject school" }, { status: 500 })
  }
}
