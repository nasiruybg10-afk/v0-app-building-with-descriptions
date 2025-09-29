import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status") || "active"

    let query = "SELECT * FROM boards WHERE status = $1"
    const params: any[] = [status]
    let paramIndex = 2

    if (category) {
      query += ` AND category = $${paramIndex}`
      params.push(category)
      paramIndex++
    }

    query += " ORDER BY is_pinned DESC, created_at DESC"

    const boards = await sql(query, params)

    return NextResponse.json({ boards })
  } catch (error) {
    console.error("[v0] Boards fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch boards" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, category } = body

    if (!title || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO boards (title, content, category, author_id, author_name)
      VALUES (${title}, ${content}, ${category}, ${user.id}, ${user.full_name})
      RETURNING *
    `

    return NextResponse.json({ board: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Board creation error:", error)
    return NextResponse.json({ error: "Failed to create board post" }, { status: 500 })
  }
}
