import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const user = await getSession()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = "SELECT * FROM kys_applications WHERE 1=1"
    const params: any[] = []
    let paramIndex = 1

    // If not admin, only show user's own applications
    if (user && user.role !== "admin") {
      query += ` AND user_id = $${paramIndex}`
      params.push(user.id)
      paramIndex++
    }

    if (status) {
      query += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    query += " ORDER BY submitted_at DESC"

    const applications = await sql(query, params)

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("[v0] KYS applications fetch error:", error)
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      applicant_name,
      applicant_email,
      applicant_phone,
      school_name,
      school_address,
      principal_name,
      student_count,
      teacher_count,
      facilities,
      curriculum,
      documents,
      school_id,
    } = body

    if (!applicant_name || !applicant_email || !applicant_phone || !school_name || !school_address) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await getSession()
    const userId = user?.id || null

    const result = await sql`
      INSERT INTO kys_applications (
        user_id, school_id, applicant_name, applicant_email, applicant_phone,
        school_name, school_address, principal_name, student_count, teacher_count,
        facilities, curriculum, documents, status
      )
      VALUES (
        ${userId}, ${school_id}, ${applicant_name}, ${applicant_email}, ${applicant_phone},
        ${school_name}, ${school_address}, ${principal_name}, ${student_count}, ${teacher_count},
        ${facilities}, ${curriculum}, ${JSON.stringify(documents)}, 'pending'
      )
      RETURNING *
    `

    return NextResponse.json({ application: result[0] }, { status: 201 })
  } catch (error) {
    console.error("[v0] KYS application submission error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
