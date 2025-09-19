"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Heart, CreditCard, Smartphone, Bitcoin } from "lucide-react"
import Link from "next/link"

// Mock donation campaigns
const mockCampaigns = [
  {
    id: 1,
    title: "Build New Classrooms - Madrasa Al-Noor",
    organization: "Madrasa Al-Noor",
    organizationId: 2,
    description: "Help us build 3 new classrooms to accommodate 150 additional students.",
    goal: 50000,
    raised: 32500,
    donors: 127,
    daysLeft: 45,
    category: "infrastructure",
    featured: true,
    image: "/islamic-school-classroom-construction.jpg",
  },
  {
    id: 2,
    title: "Scholarship Fund for Orphans",
    organization: "AL-MURATTAL Institute",
    organizationId: 1,
    description: "Provide full scholarships for orphaned children to receive quality Islamic education.",
    goal: 25000,
    raised: 18750,
    donors: 89,
    daysLeft: 30,
    category: "scholarships",
    featured: true,
    image: "/islamic-students-studying.jpg",
  },
  {
    id: 3,
    title: "Library Expansion Project",
    organization: "Islamic Center of Excellence",
    organizationId: 3,
    description: "Expand our library with Islamic books, digital resources, and study spaces.",
    goal: 15000,
    raised: 8200,
    donors: 45,
    daysLeft: 60,
    category: "education",
    featured: false,
    image: "/islamic-library-books.jpg",
  },
]

// Mock recent donations
const mockRecentDonations = [
  {
    id: 1,
    donor: "Anonymous",
    amount: 500,
    campaign: "Build New Classrooms",
    date: "2024-11-20",
    isZakat: true,
  },
  {
    id: 2,
    donor: "Ahmad Hassan",
    amount: 250,
    campaign: "Scholarship Fund",
    date: "2024-11-19",
    isZakat: false,
  },
  {
    id: 3,
    donor: "Fatima Ibrahim",
    amount: 100,
    campaign: "Library Expansion",
    date: "2024-11-18",
    isZakat: false,
  },
]

export default function DonationsPage() {
  const [donationAmount, setDonationAmount] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [donationType, setDonationType] = useState("sadaqah")

  const totalRaised = mockCampaigns.reduce((sum, campaign) => sum + campaign.raised, 0)
  const totalDonors = mockCampaigns.reduce((sum, campaign) => sum + campaign.donors, 0)

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
              <Link href="/zakat" className="text-foreground hover:text-primary transition-colors">
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
              <Button size="sm">
                <Heart className="w-4 h-4 mr-1" />
                Donate
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Support Islamic Education</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your donations help provide quality Islamic education to students worldwide. Every contribution makes a
            difference in building a better future for the Muslim community.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="mb-8">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="py-6">
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">${totalRaised.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total Raised</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{totalDonors}</div>
                  <div className="text-sm text-muted-foreground">Donors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{mockCampaigns.length}</div>
                  <div className="text-sm text-muted-foreground">Active Campaigns</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Students Supported</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Donation Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>Support Islamic education and community development</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Donation Type</Label>
                  <Select value={donationType} onValueChange={setDonationType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zakat">Zakat</SelectItem>
                      <SelectItem value="sadaqah">Sadaqah</SelectItem>
                      <SelectItem value="general">General Donation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Select Campaign</Label>
                  <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Fund</SelectItem>
                      {mockCampaigns.map((campaign) => (
                        <SelectItem key={campaign.id} value={campaign.id.toString()}>
                          {campaign.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Donation Amount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {[25, 50, 100, 250].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setDonationAmount(amount.toString())}
                        className="bg-transparent"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={paymentMethod === "card" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod("card")}
                      className={paymentMethod !== "card" ? "bg-transparent" : ""}
                    >
                      <CreditCard className="w-4 h-4 mr-1" />
                      Card
                    </Button>
                    <Button
                      variant={paymentMethod === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod("mobile")}
                      className={paymentMethod !== "mobile" ? "bg-transparent" : ""}
                    >
                      <Smartphone className="w-4 h-4 mr-1" />
                      Mobile
                    </Button>
                    <Button
                      variant={paymentMethod === "crypto" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod("crypto")}
                      className={paymentMethod !== "crypto" ? "bg-transparent" : ""}
                    >
                      <Bitcoin className="w-4 h-4 mr-1" />
                      Crypto
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Message (Optional)</Label>
                  <Textarea placeholder="Leave a message of support..." rows={3} />
                </div>

                <div className="text-xs text-muted-foreground">
                  Platform fee: 5% will be deducted to support AL-MURATTAL NETWORK operations.
                </div>

                <Button className="w-full" disabled={!donationAmount}>
                  <Heart className="w-4 h-4 mr-2" />
                  Donate ${donationAmount || "0"}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Campaigns and Activity */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="campaigns" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="campaigns">Active Campaigns</TabsTrigger>
                <TabsTrigger value="recent">Recent Donations</TabsTrigger>
                <TabsTrigger value="impact">Impact Stories</TabsTrigger>
              </TabsList>

              <TabsContent value="campaigns" className="space-y-6">
                <div className="grid gap-6">
                  {mockCampaigns.map((campaign) => {
                    const progress = (campaign.raised / campaign.goal) * 100

                    return (
                      <Card key={campaign.id} className={campaign.featured ? "border-primary/20" : ""}>
                        <div className="md:flex">
                          <div className="md:w-48 h-48 bg-muted rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                            <img
                              src={campaign.image || "/placeholder.svg"}
                              alt={campaign.title}
                              className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                            />
                          </div>
                          <div className="flex-1">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{campaign.category}</Badge>
                                  {campaign.featured && (
                                    <Badge variant="default" className="bg-primary">
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-muted-foreground">{campaign.daysLeft} days left</span>
                              </div>
                              <CardTitle className="text-lg">{campaign.title}</CardTitle>
                              <CardDescription>{campaign.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-2">
                                    <span>Progress</span>
                                    <span>
                                      ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div
                                      className="bg-primary h-2 rounded-full transition-all"
                                      style={{ width: `${Math.min(progress, 100)}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>{Math.round(progress)}% funded</span>
                                    <span>{campaign.donors} donors</span>
                                  </div>
                                </div>

                                <div className="flex items-center justify-between">
                                  <Link
                                    href={`/schools/${campaign.organizationId}`}
                                    className="text-sm text-primary hover:underline"
                                  >
                                    {campaign.organization}
                                  </Link>
                                  <Button size="sm" onClick={() => setSelectedCampaign(campaign.id.toString())}>
                                    <Heart className="w-4 h-4 mr-1" />
                                    Donate
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="recent" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Donations</CardTitle>
                    <CardDescription>Latest contributions from our community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockRecentDonations.map((donation) => (
                        <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Heart className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium">{donation.donor}</div>
                              <div className="text-sm text-muted-foreground">{donation.campaign}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${donation.amount}</div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date(donation.date).toLocaleDateString()}
                              </span>
                              {donation.isZakat && (
                                <Badge variant="outline" className="text-xs">
                                  Zakat
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="impact" className="space-y-6">
                <div className="grid gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Student Success Story</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        "Thanks to the scholarship fund, I was able to complete my Tahfiz program and am now teaching
                        other students. The support from AL-MURATTAL NETWORK changed my life and my family's future."
                      </p>
                      <div className="text-sm font-medium">- Ahmad, Scholarship Recipient</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>New Classroom Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        The new classrooms funded by our donors have allowed us to accept 150 additional students this
                        year. We've seen a 40% increase in enrollment and improved learning outcomes across all age
                        groups.
                      </p>
                      <div className="text-sm font-medium">- Madrasa Al-Noor Administration</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
