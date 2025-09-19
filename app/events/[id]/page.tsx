"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  Share2,
  BookmarkPlus,
  Heart,
  Phone,
  Mail,
  Globe,
  Play,
  UserPlus,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock event data
const mockEvent = {
  id: 1,
  title: "Annual Quran Recitation Competition",
  type: "musabaqah",
  description:
    "Join us for our annual Quran recitation competition featuring students from across the region. This prestigious event brings together young reciters to showcase their mastery of the Holy Quran with proper Tajweed. Prizes will be awarded for different age categories, and all participants will receive certificates of participation.",
  organizer: "Madrasa Al-Noor",
  organizerId: 2,
  startDate: "2024-12-15",
  endDate: "2024-12-15",
  startTime: "09:00",
  endTime: "17:00",
  venue: "Madrasa Al-Noor Main Hall",
  address: "Central Market Area, Gombe, Nigeria",
  latitude: 10.2897,
  longitude: 11.1678,
  capacity: 200,
  registered: 87,
  ticketPrice: 0,
  livestreamUrl: "https://youtube.com/live/example",
  contactInfo: "info@madrasaalnoor.org",
  contactPhone: "+2348012345678",
  website: "https://madrasaalnoor.org",
  status: "approved",
  featured: true,
  tags: ["competition", "quran", "youth", "tajweed"],
  schedule: [
    { time: "09:00", activity: "Registration and Welcome" },
    { time: "09:30", activity: "Opening Ceremony and Recitation of Quran" },
    { time: "10:00", activity: "Competition Begins - Age Group 8-12" },
    { time: "12:00", activity: "Lunch Break and Zuhr Prayer" },
    { time: "13:30", activity: "Competition Continues - Age Group 13-17" },
    { time: "15:30", activity: "Competition Continues - Age Group 18+" },
    { time: "16:30", activity: "Judging and Results Compilation" },
    { time: "17:00", activity: "Award Ceremony and Closing" },
  ],
  prizes: [
    { category: "Age 8-12", first: "₦50,000", second: "₦30,000", third: "₦20,000" },
    { category: "Age 13-17", first: "₦75,000", second: "₦50,000", third: "₦30,000" },
    { category: "Age 18+", first: "₦100,000", second: "₦75,000", third: "₦50,000" },
  ],
  requirements: [
    "Participants must be able to recite at least 5 Surahs from memory",
    "Proper Tajweed rules must be observed",
    "Registration deadline: December 10, 2024",
    "Participants should arrive 30 minutes before their scheduled time",
    "Modest Islamic dress code required",
  ],
  attendees: [
    { name: "Ahmad Hassan", school: "Al-Furqan Academy", registeredDate: "2024-11-20" },
    { name: "Fatima Ibrahim", school: "Madrasa Al-Noor", registeredDate: "2024-11-18" },
    { name: "Yusuf Mohammed", school: "Islamic Center", registeredDate: "2024-11-15" },
  ],
}

const EVENT_TYPES = {
  musabaqah: { label: "Musabaqah", color: "bg-blue-500", icon: "🏆" },
  graduation: { label: "Graduation", color: "bg-green-500", icon: "🎓" },
  maulud: { label: "Maulud", color: "bg-purple-500", icon: "🌙" },
  walimah: { label: "Walīmah", color: "bg-orange-500", icon: "🍽️" },
  seminar: { label: "Seminar", color: "bg-indigo-500", icon: "📚" },
}

export default function EventDetailPage() {
  const params = useParams()
  const [event] = useState(mockEvent) // In real app, fetch based on params.id
  const [isRegistered, setIsRegistered] = useState(false)
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)

  const eventType = EVENT_TYPES[event.type as keyof typeof EVENT_TYPES]
  const isUpcoming = new Date(event.startDate) > new Date()
  const registrationProgress = (event.registered / event.capacity) * 100

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
              <Link href="/events" className="text-primary font-medium">
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
              <Button size="sm">Create Event</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/events" className="hover:text-primary">
            Events
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{event.title}</span>
        </nav>

        {/* Event Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <Badge className={`${eventType.color} text-white`}>{eventType.label}</Badge>
                {event.featured && (
                  <Badge variant="outline" className="border-primary text-primary">
                    Featured
                  </Badge>
                )}
                {isUpcoming && (
                  <Badge variant="outline" className="border-green-500 text-green-600">
                    Upcoming
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-4">{event.title}</h1>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">
                      {new Date(event.startDate).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm">
                      {event.startTime} - {event.endTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">{event.venue}</div>
                    <div className="text-sm">{event.address}</div>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">
                      {event.registered}/{event.capacity} Registered
                    </div>
                    <div className="text-sm">{Math.round(registrationProgress)}% capacity</div>
                  </div>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Heart className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium text-foreground">
                      {event.ticketPrice === 0 ? "Free Event" : `₦${event.ticketPrice.toLocaleString()}`}
                    </div>
                    <div className="text-sm">
                      Organized by{" "}
                      <Link href={`/schools/${event.organizerId}`} className="text-primary hover:underline">
                        {event.organizer}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{event.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {isUpcoming && (
                  <Button
                    size="lg"
                    onClick={() => setShowRegistrationForm(true)}
                    disabled={event.registered >= event.capacity}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {event.registered >= event.capacity ? "Event Full" : "Register Now"}
                  </Button>
                )}
                <Button variant="outline" size="lg" className="bg-transparent">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  Save Event
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                {event.livestreamUrl && (
                  <Button variant="outline" size="lg" className="bg-transparent">
                    <Play className="w-4 h-4 mr-2" />
                    Live Stream
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Event Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a href={`mailto:${event.contactInfo}`} className="text-primary hover:underline">
                      {event.contactInfo}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <a href={`tel:${event.contactPhone}`} className="text-primary hover:underline">
                      {event.contactPhone}
                    </a>
                  </div>
                  {event.website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="w-5 h-5 text-muted-foreground" />
                      <a
                        href={event.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Registration Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Registration Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Registered</span>
                      <span>
                        {event.registered}/{event.capacity}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${Math.min(registrationProgress, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{event.capacity - event.registered} spots remaining</p>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Interactive map</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle>Requirements & Guidelines</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Prizes */}
              <Card>
                <CardHeader>
                  <CardTitle>Prizes & Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {event.prizes.map((prize, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-medium mb-2">{prize.category}</h4>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center">
                            <div className="text-yellow-600 font-medium">1st Place</div>
                            <div>{prize.first}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-gray-600 font-medium">2nd Place</div>
                            <div>{prize.second}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-orange-600 font-medium">3rd Place</div>
                            <div>{prize.third}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
                <CardDescription>Detailed timeline of activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.schedule.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                      <div className="w-16 text-sm font-medium text-primary">{item.time}</div>
                      <div className="flex-1">
                        <div className="font-medium">{item.activity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendees" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Registered Attendees</CardTitle>
                <CardDescription>{event.registered} people registered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.attendees.map((attendee, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{attendee.name}</div>
                        <div className="text-sm text-muted-foreground">{attendee.school}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Registered {new Date(attendee.registeredDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                  <div className="text-center py-4">
                    <Button variant="outline" className="bg-transparent">
                      View All Attendees
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discussion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Discussion</CardTitle>
                <CardDescription>Ask questions and connect with other attendees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">Discussion Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Event discussion and Q&A features will be available in a future update.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Registration Form Modal */}
        {showRegistrationForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Register for Event</CardTitle>
                <CardDescription>Please fill in your details to register</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">School/Organization</Label>
                  <Input id="school" placeholder="Enter your school or organization" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea id="notes" placeholder="Any special requirements or notes" />
                </div>
              </CardContent>
              <div className="flex items-center justify-end space-x-2 p-6 pt-0">
                <Button variant="outline" onClick={() => setShowRegistrationForm(false)} className="bg-transparent">
                  Cancel
                </Button>
                <Button onClick={() => setShowRegistrationForm(false)}>Register</Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
