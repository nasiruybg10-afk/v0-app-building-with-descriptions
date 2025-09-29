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
    const { content } = body

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO board_comments (board_id, user_id, author_name, content)
      VALUES (${id}, ${user.id}, ${user.full_name}, ${content})
      RETURNING *
    `

    return NextResponse.json({ comment: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Comment creation error:", error)
    return NextResponse.json({ error: "Failed to create comment" }, { status: 500 })
  }
}
