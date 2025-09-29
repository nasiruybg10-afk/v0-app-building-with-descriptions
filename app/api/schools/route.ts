import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const city = searchParams.get("city")
    const type = searchParams.get("type")
    const status = searchParams.get("status") || "approved"

    let query = `
      SELECT s.*, 
        COALESCE(AVG(sr.rating), 0) as average_rating,
        COUNT(sr.id) as review_count
      FROM schools s
      LEFT JOIN school_reviews sr ON s.id = sr.school_id
      WHERE s.status = $1
    `
    const params: any[] = [status]
    let paramIndex = 2

    if (search) {
      query += ` AND (s.name ILIKE $${paramIndex} OR s.description ILIKE $${paramIndex})`
      params.push(`%${search}%`)
      paramIndex++
    }

    if (city) {
      query += ` AND s.city = $${paramIndex}`
      params.push(city)
      paramIndex++
    }

    if (type) {
      query += ` AND s.type = $${paramIndex}`
      params.push(type)
      paramIndex++
    }

    query += ` GROUP BY s.id ORDER BY s.created_at DESC`

    const schools = await sql(query, params)

    return NextResponse.json({ schools })
  } catch (error) {
    console.error("[v0] Schools API error:", error)
    return NextResponse.json({ error: "Failed to fetch schools" }, { status: 500 })
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
      name,
      description,
      address,
      city,
      state,
      phone,
      email,
      website,
      established_year,
      student_count,
      teacher_count,
      type,
      latitude,
      longitude,
      image_url,
    } = body

    if (!name || !address || !city || !state || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO schools (
        name, description, address, city, state, phone, email, website,
        established_year, student_count, teacher_count, type, latitude, 
        longitude, image_url, owner_id, status
      )
      VALUES (
        ${name}, ${description}, ${address}, ${city}, ${state}, ${phone},
        ${email}, ${website}, ${established_year}, ${student_count},
        ${teacher_count}, ${type}, ${latitude}, ${longitude}, ${image_url},
        ${user.id}, 'pending'
      )
      RETURNING *
    `

    return NextResponse.json({ school: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create school error:", error)
    return NextResponse.json({ error: "Failed to create school" }, { status: 500 })
  }
}
