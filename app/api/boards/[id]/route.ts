import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params

    // Increment view count
    await sql`UPDATE boards SET views = views + 1 WHERE id = ${id}`

    const boards = await sql`SELECT * FROM boards WHERE id = ${id}`

    if (boards.length === 0) {
      return NextResponse.json({ error: "Board post not found" }, { status: 404 })
    }

    const comments = await sql`
      SELECT * FROM board_comments
      WHERE board_id = ${id}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ board: boards[0], comments })
  } catch (error) {
    console.error("[v0] Board fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch board post" }, { status: 500 })
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
    const board = await sql`SELECT author_id FROM boards WHERE id = ${id}`
    if (board.length === 0) {
      return NextResponse.json({ error: "Board post not found" }, { status: 404 })
    }

    if (board[0].author_id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const { title, content, category } = body

    const result = await sql`
      UPDATE boards
      SET title = ${title}, content = ${content}, category = ${category}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `

    return NextResponse.json({ board: result[0] })
  } catch (error) {
    console.error("[v0] Board update error:", error)
    return NextResponse.json({ error: "Failed to update board post" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Check ownership or admin
    const board = await sql`SELECT author_id FROM boards WHERE id = ${id}`
    if (board.length === 0) {
      return NextResponse.json({ error: "Board post not found" }, { status: 404 })
    }

    if (board[0].author_id !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    await sql`UPDATE boards SET status = 'deleted' WHERE id = ${id}`

    return NextResponse.json({ message: "Board post deleted successfully" })
  } catch (error) {
    console.error("[v0] Board deletion error:", error)
    return NextResponse.json({ error: "Failed to delete board post" }, { status: 500 })
  }
}
