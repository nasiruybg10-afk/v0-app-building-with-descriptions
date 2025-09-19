import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Calendar, Heart, Shield, Search } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AL-MURATTAL</h1>
                <p className="text-xs text-muted-foreground">NETWORK</p>
              </div>
            </div>
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
              <Button size="sm">Apply for Verification</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Global Network of Verified Qur'ān Schools
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Discover trusted Islamic educational institutions worldwide. Connect with verified schools, attend events,
              and support the global Muslim education community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8">
                <Search className="w-5 h-5 mr-2" />
                Find Schools
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                <Shield className="w-5 h-5 mr-2" />
                Get Verified
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-muted-foreground">Verified Schools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">45</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">156</div>
              <div className="text-muted-foreground">Upcoming Events</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.4M</div>
              <div className="text-muted-foreground">Donations Raised</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Empowering Islamic Education Globally
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform connects the global Muslim community through verified educational institutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>KYS Verification</CardTitle>
                <CardDescription>
                  Rigorous Know Your School verification ensures authentic, safe educational institutions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multi-level approval process</li>
                  <li>• Document verification</li>
                  <li>• Safety compliance checks</li>
                  <li>• Community references</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Global Directory</CardTitle>
                <CardDescription>Interactive map and searchable directory of Islamic schools worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Location-based search</li>
                  <li>• Curriculum filtering</li>
                  <li>• School profiles & reviews</li>
                  <li>• Contact information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Event Management</CardTitle>
                <CardDescription>Discover and participate in Islamic educational and community events</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Walīmah celebrations</li>
                  <li>• Qur'ān competitions</li>
                  <li>• Graduation ceremonies</li>
                  <li>• Educational seminars</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Events */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">Upcoming Events</h2>
            <Button variant="outline">View All Events</Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Musabaqah</Badge>
                  <span className="text-sm text-muted-foreground">Dec 15, 2024</span>
                </div>
                <CardTitle className="text-lg">Annual Quran Recitation Competition</CardTitle>
                <CardDescription>Madrasa Al-Noor, Gombe, Nigeria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    200 capacity
                  </div>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Graduation</Badge>
                  <span className="text-sm text-muted-foreground">Dec 20, 2024</span>
                </div>
                <CardTitle className="text-lg">Tahfiz Graduation Ceremony</CardTitle>
                <CardDescription>Islamic Center of Excellence, Lagos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    150 capacity
                  </div>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Seminar</Badge>
                  <span className="text-sm text-muted-foreground">Jan 5, 2025</span>
                </div>
                <CardTitle className="text-lg">Modern Islamic Education Methods</CardTitle>
                <CardDescription>Al-Hikmah University, Ilorin</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-1" />
                    300 capacity
                  </div>
                  <Button size="sm">Register</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Donation CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Support Islamic Education</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Your donations help provide quality Islamic education to students worldwide. Calculate your Zakat and
              contribute to this noble cause.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">Calculate Zakat</Button>
              <Button variant="outline" size="lg">
                Make Donation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">AM</span>
                </div>
                <div>
                  <h3 className="font-bold text-foreground">AL-MURATTAL</h3>
                  <p className="text-xs text-muted-foreground">NETWORK</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Connecting the global Muslim community through verified Islamic education.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/schools" className="hover:text-primary">
                    Find Schools
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-primary">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/zakat" className="hover:text-primary">
                    Zakat Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/kys" className="hover:text-primary">
                    Get Verified
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Global HQ</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>AL-MURATTAL Institute</p>
                <p>
                  M07 Western Transformer Line
                  <br />
                  Bomala Quarters, Gombe State
                  <br />
                  Nigeria
                </p>
                <p>
                  +2348034585973
                  <br />
                  +2348022743886
                </p>
                <p>almurattalinstitute@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AL-MURATTAL NETWORK. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
