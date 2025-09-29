import { type NextRequest, NextResponse } from "next/server"
import { registerUser, createToken, setSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone, role } = body

    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const user = await registerUser(email, password, fullName, phone, role)
    const token = await createToken(user)
    await setSession(token)

    return NextResponse.json({ user }, { status: 201 })
  } catch (error: any) {
    if (error.message?.includes("duplicate key")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
