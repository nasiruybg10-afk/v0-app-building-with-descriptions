import { neon } from "@neondatabase/serverless"
import bcrypt from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface User {
  id: number
  email: string
  full_name: string
  phone?: string
  role: "user" | "school_owner" | "admin"
  created_at: string
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createToken(user: User): Promise<string> {
  return new SignJWT({
    id: user.id,
    email: user.email,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<User | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload as unknown as User
  } catch {
    return null
  }
}

export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) return null

  return verifyToken(token)
}

export async function setSession(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
}

export async function registerUser(
  email: string,
  password: string,
  fullName: string,
  phone?: string,
  role: "user" | "school_owner" = "user",
): Promise<User> {
  const passwordHash = await hashPassword(password)

  const result = await sql`
    INSERT INTO users (email, password_hash, full_name, phone, role)
    VALUES (${email}, ${passwordHash}, ${fullName}, ${phone || null}, ${role})
    RETURNING id, email, full_name, phone, role, created_at
  `

  return result[0] as User
}

export async function loginUser(email: string, password: string): Promise<User | null> {
  const result = await sql`
    SELECT id, email, password_hash, full_name, phone, role, created_at
    FROM users
    WHERE email = ${email}
  `

  if (result.length === 0) return null

  const user = result[0] as User & { password_hash: string }
  const isValid = await verifyPassword(password, user.password_hash)

  if (!isValid) return null

  const { password_hash, ...userWithoutPassword } = user
  return userWithoutPassword
}

export async function requireAuth(): Promise<User> {
  const user = await getSession()
  if (!user) {
    throw new Error("Unauthorized")
  }
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  if (user.role !== "admin") {
    throw new Error("Forbidden: Admin access required")
  }
  return user
}
