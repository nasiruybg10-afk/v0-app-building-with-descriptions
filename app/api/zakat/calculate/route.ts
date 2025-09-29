import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { getSession } from "@/lib/auth"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      cash_in_hand,
      bank_balance,
      gold_value,
      silver_value,
      investments,
      business_assets,
      rental_income,
      other_assets,
      liabilities,
    } = body

    // Calculate total assets
    const total_assets =
      (Number.parseFloat(cash_in_hand) || 0) +
      (Number.parseFloat(bank_balance) || 0) +
      (Number.parseFloat(gold_value) || 0) +
      (Number.parseFloat(silver_value) || 0) +
      (Number.parseFloat(investments) || 0) +
      (Number.parseFloat(business_assets) || 0) +
      (Number.parseFloat(rental_income) || 0) +
      (Number.parseFloat(other_assets) || 0)

    // Calculate zakatable amount (assets - liabilities)
    const zakatable_amount = total_assets - (Number.parseFloat(liabilities) || 0)

    // Calculate zakat due (2.5% of zakatable amount)
    const zakat_due = zakatable_amount * 0.025

    const user = await getSession()
    const userId = user?.id || null

    // Save calculation
    const result = await sql`
      INSERT INTO zakat_calculations (
        user_id, cash_in_hand, bank_balance, gold_value, silver_value,
        investments, business_assets, rental_income, other_assets,
        total_assets, liabilities, zakatable_amount, zakat_due
      )
      VALUES (
        ${userId}, ${cash_in_hand}, ${bank_balance}, ${gold_value}, ${silver_value},
        ${investments}, ${business_assets}, ${rental_income}, ${other_assets},
        ${total_assets}, ${liabilities}, ${zakatable_amount}, ${zakat_due}
      )
      RETURNING *
    `

    return NextResponse.json({
      calculation: result[0],
      total_assets,
      zakatable_amount,
      zakat_due,
    })
  } catch (error) {
    console.error("[v0] Zakat calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate zakat" }, { status: 500 })
  }
}
