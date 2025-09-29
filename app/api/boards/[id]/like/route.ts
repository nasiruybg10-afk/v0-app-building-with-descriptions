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

    await sql`UPDATE boards SET likes = likes + 1 WHERE id = ${id}`

    return NextResponse.json({ message: "Board post liked successfully" })
  } catch (error) {
    console.error("[v0] Board like error:", error)
    return NextResponse.json({ error: "Failed to like board post" }, { status: 500 })
  }
}
