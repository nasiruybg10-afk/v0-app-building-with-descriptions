import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">Find answers to common questions and get support</p>

            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input placeholder="Search for help articles..." className="flex-1" />
                <Button>Search</Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🏫</span>
                </div>
                <CardTitle className="text-lg">School Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Learn how to search and find schools</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">✅</span>
                </div>
                <CardTitle className="text-lg">KYS Verification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Get your school verified</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💝</span>
                </div>
                <CardTitle className="text-lg">Donations & Zakat</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Calculate and donate</p>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  View Guides
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I register my school on the platform?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  To register your school, navigate to the KYS Verification page and click "Start Verification". You'll
                  need to provide:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>School registration documents</li>
                  <li>Proof of address</li>
                  <li>Educational licenses and certifications</li>
                  <li>Contact information for references</li>
                </ul>
                <p className="mt-4">The verification process typically takes 5-7 business days.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is the KYS verification process?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Know Your School (KYS) is our rigorous verification process that ensures all schools on our platform
                  are authentic, safe, and meet educational standards. The process includes document verification,
                  reference checks, and compliance reviews.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I calculate my Zakat?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Visit our Zakat Calculator page and enter your assets including cash, gold, silver, investments, and
                  business inventory. The calculator will automatically compute your Zakat obligation based on Islamic
                  principles.
                </p>
                <Link href="/zakat">
                  <Button variant="link" className="p-0">
                    Go to Zakat Calculator
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How can I register for events?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Browse available events on the Events page, click on an event you're interested in, and click the
                  "Register" button. You'll need to provide your contact information and any event-specific details
                  requested by the organizers.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What are Public Boards?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                  Public Boards are community spaces where users can share announcements, ask questions, and engage in
                  discussions about Islamic education. All posts are moderated to ensure respectful and beneficial
                  conversations.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How do I make a donation?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Visit the Donations page, select a school or cause you'd like to support, choose your donation amount,
                  and complete the secure payment process. You'll receive a receipt via email for your records.
                </p>
                <Link href="/donations">
                  <Button variant="link" className="p-0">
                    Make a Donation
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Is my personal information secure?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p className="mb-4">
                  Yes, we take data security seriously. All personal information is encrypted and stored securely. We
                  never share your information with third parties without your consent. For more details, please review
                  our Privacy Policy.
                </p>
                <Link href="/privacy">
                  <Button variant="link" className="p-0">
                    Read Privacy Policy
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 p-8 bg-primary/5 rounded-lg text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">Still Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Support</Button>
              </Link>
              <Button variant="outline" size="lg">
                Start Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
