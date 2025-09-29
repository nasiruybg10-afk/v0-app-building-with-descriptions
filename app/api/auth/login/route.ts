import { type NextRequest, NextResponse } from "next/server"
import { loginUser, createToken, setSession } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await loginUser(email, password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const token = await createToken(user)
    await setSession(token)

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
