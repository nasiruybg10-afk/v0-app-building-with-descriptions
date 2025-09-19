"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, Heart, Info, DollarSign, Coins, TrendingUp, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

// Nisab thresholds (configurable)
const NISAB_THRESHOLDS = {
  gold: 87.48, // grams
  silver: 612.36, // grams
  cash: 4000, // USD equivalent
}

// Current market prices (would be fetched from API in real app)
const MARKET_PRICES = {
  gold: 65.5, // USD per gram
  silver: 0.85, // USD per gram
}

// Zakat rates
const ZAKAT_RATES = {
  cash: 0.025, // 2.5%
  gold: 0.025, // 2.5%
  silver: 0.025, // 2.5%
  business: 0.025, // 2.5%
  agriculture: 0.1, // 10% for rain-fed, 5% for irrigated
}

interface ZakatCalculation {
  totalWealth: number
  nisabMet: boolean
  zakatAmount: number
  breakdown: {
    cash: number
    gold: number
    silver: number
    business: number
    debts: number
  }
}

export default function ZakatPage() {
  const [currency, setCurrency] = useState("USD")
  const [formData, setFormData] = useState({
    cash: "",
    bankBalance: "",
    investments: "",
    goldGrams: "",
    silverGrams: "",
    businessAssets: "",
    debtsOwed: "",
    receivables: "",
  })
  const [calculation, setCalculation] = useState<ZakatCalculation | null>(null)
  const [showDonationForm, setShowDonationForm] = useState(false)

  // Calculate Zakat
  const calculateZakat = () => {
    const cash = Number.parseFloat(formData.cash) || 0
    const bankBalance = Number.parseFloat(formData.bankBalance) || 0
    const investments = Number.parseFloat(formData.investments) || 0
    const goldGrams = Number.parseFloat(formData.goldGrams) || 0
    const silverGrams = Number.parseFloat(formData.silverGrams) || 0
    const businessAssets = Number.parseFloat(formData.businessAssets) || 0
    const debtsOwed = Number.parseFloat(formData.debtsOwed) || 0
    const receivables = Number.parseFloat(formData.receivables) || 0

    // Calculate values
    const totalCash = cash + bankBalance + investments + receivables
    const goldValue = goldGrams * MARKET_PRICES.gold
    const silverValue = silverGrams * MARKET_PRICES.silver
    const totalAssets = totalCash + goldValue + silverValue + businessAssets
    const netWealth = totalAssets - debtsOwed

    // Check if Nisab is met
    const goldNisabValue = NISAB_THRESHOLDS.gold * MARKET_PRICES.gold
    const silverNisabValue = NISAB_THRESHOLDS.silver * MARKET_PRICES.silver
    const nisabThreshold = Math.min(goldNisabValue, silverNisabValue, NISAB_THRESHOLDS.cash)
    const nisabMet = netWealth >= nisabThreshold

    // Calculate Zakat
    let zakatAmount = 0
    if (nisabMet) {
      zakatAmount = netWealth * ZAKAT_RATES.cash
    }

    const result: ZakatCalculation = {
      totalWealth: netWealth,
      nisabMet,
      zakatAmount,
      breakdown: {
        cash: totalCash,
        gold: goldValue,
        silver: silverValue,
        business: businessAssets,
        debts: debtsOwed,
      },
    }

    setCalculation(result)
  }

  // Auto-calculate when form changes
  useEffect(() => {
    calculateZakat()
  }, [formData])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AL-MURATTAL</h1>
                <p className="text-xs text-muted-foreground">NETWORK</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/schools" className="text-foreground hover:text-primary transition-colors">
                Schools
              </Link>
              <Link href="/events" className="text-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/zakat" className="text-primary font-medium">
                Zakat Calculator
              </Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">
                About
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Button size="sm">Donate</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Zakat Calculator</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate your Zakat obligation according to Islamic principles. Zakat is one of the Five Pillars of Islam
            and a religious duty for all Muslims who meet the necessary criteria.
          </p>
        </div>

        {/* Nisab Information */}
        <div className="mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="w-5 h-5" />
                <span>Current Nisab Thresholds</span>
              </CardTitle>
              <CardDescription>Minimum wealth required to be eligible for Zakat</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{NISAB_THRESHOLDS.gold}g</div>
                  <div className="text-sm text-muted-foreground">Gold</div>
                  <div className="text-xs text-muted-foreground">
                    ≈ ${(NISAB_THRESHOLDS.gold * MARKET_PRICES.gold).toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{NISAB_THRESHOLDS.silver}g</div>
                  <div className="text-sm text-muted-foreground">Silver</div>
                  <div className="text-xs text-muted-foreground">
                    ≈ ${(NISAB_THRESHOLDS.silver * MARKET_PRICES.silver).toLocaleString()}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">${NISAB_THRESHOLDS.cash.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Cash Equivalent</div>
                  <div className="text-xs text-muted-foreground">Minimum threshold</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Your Zakat</CardTitle>
                <CardDescription>Enter your assets and liabilities to calculate your Zakat obligation</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="assets" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="assets">Cash & Assets</TabsTrigger>
                    <TabsTrigger value="precious">Precious Metals</TabsTrigger>
                    <TabsTrigger value="business">Business & Debts</TabsTrigger>
                  </TabsList>

                  <div className="mb-4">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="NGN">NGN (₦)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <TabsContent value="assets" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="cash">Cash on Hand</Label>
                        <Input
                          id="cash"
                          type="number"
                          placeholder="0.00"
                          value={formData.cash}
                          onChange={(e) => setFormData({ ...formData, cash: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bank">Bank Balance</Label>
                        <Input
                          id="bank"
                          type="number"
                          placeholder="0.00"
                          value={formData.bankBalance}
                          onChange={(e) => setFormData({ ...formData, bankBalance: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="investments">Investments & Savings</Label>
                        <Input
                          id="investments"
                          type="number"
                          placeholder="0.00"
                          value={formData.investments}
                          onChange={(e) => setFormData({ ...formData, investments: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="receivables">Money Owed to You</Label>
                        <Input
                          id="receivables"
                          type="number"
                          placeholder="0.00"
                          value={formData.receivables}
                          onChange={(e) => setFormData({ ...formData, receivables: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="precious" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="gold">Gold (grams)</Label>
                        <Input
                          id="gold"
                          type="number"
                          placeholder="0"
                          value={formData.goldGrams}
                          onChange={(e) => setFormData({ ...formData, goldGrams: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Current price: ${MARKET_PRICES.gold}/gram</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="silver">Silver (grams)</Label>
                        <Input
                          id="silver"
                          type="number"
                          placeholder="0"
                          value={formData.silverGrams}
                          onChange={(e) => setFormData({ ...formData, silverGrams: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Current price: ${MARKET_PRICES.silver}/gram</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="business" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="business">Business Assets</Label>
                        <Input
                          id="business"
                          type="number"
                          placeholder="0.00"
                          value={formData.businessAssets}
                          onChange={(e) => setFormData({ ...formData, businessAssets: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="debts">Debts You Owe</Label>
                        <Input
                          id="debts"
                          type="number"
                          placeholder="0.00"
                          value={formData.debtsOwed}
                          onChange={(e) => setFormData({ ...formData, debtsOwed: e.target.value })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Calculation Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Zakat Calculation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {calculation ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        ${calculation.zakatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-sm text-muted-foreground">Your Zakat Amount</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Total Wealth:</span>
                        <span>${calculation.totalWealth.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Nisab Status:</span>
                        <Badge variant={calculation.nisabMet ? "default" : "secondary"}>
                          {calculation.nisabMet ? "Met" : "Not Met"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Zakat Rate:</span>
                        <span>2.5%</span>
                      </div>
                    </div>

                    {calculation.nisabMet && calculation.zakatAmount > 0 && (
                      <div className="pt-4 border-t">
                        <Button
                          className="w-full"
                          onClick={() => setShowDonationForm(true)}
                          disabled={!calculation.nisabMet}
                        >
                          <Heart className="w-4 h-4 mr-2" />
                          Donate Zakat
                        </Button>
                      </div>
                    )}

                    {!calculation.nisabMet && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Your wealth is below the Nisab threshold. Zakat is not obligatory, but voluntary charity
                          (Sadaqah) is always encouraged.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Enter your assets to calculate Zakat</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Wealth Breakdown */}
            {calculation && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Wealth Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Cash & Savings:</span>
                      <span>${calculation.breakdown.cash.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gold:</span>
                      <span>${calculation.breakdown.gold.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Silver:</span>
                      <span>${calculation.breakdown.silver.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Business Assets:</span>
                      <span>${calculation.breakdown.business.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-red-600">
                      <span>Less: Debts:</span>
                      <span>-${calculation.breakdown.debts.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium pt-2 border-t">
                      <span>Net Wealth:</span>
                      <span>${calculation.totalWealth.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Donate */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Donate</CardTitle>
                <CardDescription>Support Islamic education</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[25, 50, 100, 250].map((amount) => (
                    <Button key={amount} variant="outline" size="sm" className="bg-transparent">
                      ${amount}
                    </Button>
                  ))}
                </div>
                <Button className="w-full bg-transparent" variant="outline">
                  <Heart className="w-4 h-4 mr-2" />
                  Make Donation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Educational Content */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Understanding Zakat</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>What is Zakat?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Zakat is the third pillar of Islam and a religious obligation for all Muslims who meet the necessary
                  criteria. It is a form of almsgiving and religious tax, which is considered a purification of wealth.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Coins className="w-5 h-5" />
                  <span>Who Must Pay?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Muslims who are mentally sound, free, and have reached puberty must pay Zakat if their wealth exceeds
                  the Nisab threshold and they have owned it for a full lunar year.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>How Much to Pay?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  The standard rate of Zakat is 2.5% of qualifying wealth that has been owned for a full lunar year.
                  Different rates apply to agricultural produce and livestock.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Donation Form Modal */}
        {showDonationForm && calculation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Donate Your Zakat</CardTitle>
                <CardDescription>Complete your religious obligation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      ${calculation.zakatAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-sm text-muted-foreground">Calculated Zakat Amount</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Donation Recipient</Label>
                  <Select defaultValue="general">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Zakat Fund</SelectItem>
                      <SelectItem value="education">Islamic Education</SelectItem>
                      <SelectItem value="orphans">Orphan Support</SelectItem>
                      <SelectItem value="poor">Poor & Needy</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <Select defaultValue="card">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">Credit/Debit Card</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="crypto">Cryptocurrency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-xs text-muted-foreground">
                  Platform fee: 5% will be deducted to support AL-MURATTAL NETWORK operations.
                </div>
              </CardContent>
              <div className="flex items-center justify-end space-x-2 p-6 pt-0">
                <Button variant="outline" onClick={() => setShowDonationForm(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={() => setShowDonationForm(false)}>
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
