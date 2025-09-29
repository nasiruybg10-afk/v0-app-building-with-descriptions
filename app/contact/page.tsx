import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-xl text-muted-foreground">
              We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">📍</span>
                </div>
                <CardTitle>Global Headquarters</CardTitle>
                <CardDescription>Visit us at our main office</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="font-medium text-foreground">AL-MURATTAL Institute</p>
                <p>M07 Western Transformer Line</p>
                <p>Bomala Quarters</p>
                <p>Gombe State, Nigeria</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">📞</span>
                </div>
                <CardTitle>Phone & Email</CardTitle>
                <CardDescription>Call or email us directly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Phone Numbers:</p>
                  <p>+234 803 458 5973</p>
                  <p>+234 802 274 3886</p>
                </div>
                <div className="pt-2">
                  <p className="font-medium text-foreground">Email:</p>
                  <p>almurattalinstitute@gmail.com</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">⏰</span>
                </div>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>When we're available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>
                  <p className="font-medium text-foreground">Monday - Friday:</p>
                  <p>8:00 AM - 5:00 PM (WAT)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Saturday:</p>
                  <p>9:00 AM - 2:00 PM (WAT)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Sunday:</p>
                  <p>Closed</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-2xl">💬</span>
                </div>
                <CardTitle>Quick Support</CardTitle>
                <CardDescription>Get immediate assistance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">For urgent inquiries or technical support:</p>
                <Button className="w-full">Start Live Chat</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Visit Help Center
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you within 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+234 XXX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <select
                      id="subject"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="school">School Registration</option>
                      <option value="verification">KYS Verification</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership Opportunity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Tell us how we can help you..." rows={6} />
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-8 p-6 bg-muted/50 rounded-lg">
            <h3 className="font-semibold text-foreground mb-2">Frequently Asked Questions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Before reaching out, you might find answers to common questions in our Help Center.
            </p>
            <Button variant="outline" asChild>
              <a href="/help">Browse Help Center</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
