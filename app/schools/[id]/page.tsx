"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Shield,
  Users,
  Calendar,
  BookOpen,
  Home,
  Award,
  Heart,
  Star,
  Clock,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock school data
const mockSchool = {
  id: 1,
  name: "AL-MURATTAL Institute (Global HQ)",
  type: "school",
  address: "M07 Western Transformer Line, Bomala Quarters, Gombe State, Nigeria",
  country: "Nigeria",
  state: "Gombe State",
  lga: "Gombe",
  latitude: 10.2897,
  longitude: 11.1678,
  contact_email: "almurattalinstitute@gmail.com",
  contact_phone: "+2348034585973",
  website: "https://almurattal.org",
  description:
    "Global headquarters for AL-MURATTAL NETWORK - A premier Islamic educational institution dedicated to providing comprehensive Quranic education and fostering Islamic values in students worldwide.",
  curriculum: ["Tahfiz", "Tajweed", "Arabic", "Islamic Studies", "Modern Sciences"],
  verified: true,
  boarding: true,
  womenFriendly: true,
  scholarships: true,
  students: 500,
  established: 2010,
  rating: 4.8,
  reviews: 127,
  facilities: [
    "Modern Classrooms",
    "Prayer Hall",
    "Library",
    "Dormitories",
    "Dining Hall",
    "Sports Complex",
    "Computer Lab",
    "Medical Center",
  ],
  programs: [
    {
      name: "Tahfiz Program",
      description: "Complete memorization of the Holy Quran with proper Tajweed",
      duration: "3-5 years",
      ageGroup: "8-18 years",
    },
    {
      name: "Islamic Studies",
      description: "Comprehensive study of Islamic theology, jurisprudence, and history",
      duration: "4 years",
      ageGroup: "14-18 years",
    },
    {
      name: "Arabic Language",
      description: "Classical and modern Arabic language instruction",
      duration: "2-3 years",
      ageGroup: "10+ years",
    },
  ],
  events: [
    {
      id: 1,
      title: "Annual Quran Recitation Competition",
      type: "musabaqah",
      date: "2024-12-15",
      time: "09:00 AM",
      description: "Join us for our annual Quran recitation competition featuring students from across the region.",
    },
    {
      id: 2,
      title: "Graduation Ceremony 2024",
      type: "graduation",
      date: "2024-12-20",
      time: "10:00 AM",
      description: "Celebrating the achievements of our graduating class of 2024.",
    },
  ],
  announcements: [
    {
      id: 1,
      title: "New Semester Registration Open",
      content:
        "Registration for the new academic semester is now open. Please visit our office or contact us for more information.",
      date: "2024-11-15",
      pinned: true,
    },
    {
      id: 2,
      title: "Scholarship Applications Available",
      content: "We are now accepting applications for need-based scholarships for the upcoming academic year.",
      date: "2024-11-10",
      pinned: false,
    },
  ],
}

export default function SchoolProfilePage() {
  const params = useParams()
  const [school] = useState(mockSchool) // In real app, fetch based on params.id

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
              <Link href="/schools" className="text-primary font-medium">
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
              <Button size="sm">Get Verified</Button>
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
          <Link href="/schools" className="hover:text-primary">
            Schools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{school.name}</span>
        </nav>

        {/* School Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl font-bold text-foreground">{school.name}</h1>
                    {school.verified && (
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {school.address}
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {school.rating} ({school.reviews} reviews)
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">{school.description}</p>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Users className="w-4 h-4 mr-2" />
                  {school.students} Students
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  Est. {school.established}
                </div>
                {school.boarding && (
                  <div className="flex items-center text-muted-foreground">
                    <Home className="w-4 h-4 mr-2" />
                    Boarding Available
                  </div>
                )}
                {school.scholarships && (
                  <div className="flex items-center text-muted-foreground">
                    <Award className="w-4 h-4 mr-2" />
                    Scholarships Available
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <Card className="md:w-80">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <a href={`mailto:${school.contact_email}`} className="text-primary hover:underline">
                    {school.contact_email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <a href={`tel:${school.contact_phone}`} className="text-primary hover:underline">
                    {school.contact_phone}
                  </a>
                </div>
                {school.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-muted-foreground" />
                    <a
                      href={school.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}
                <div className="pt-4 space-y-2">
                  <Button className="w-full">
                    <Heart className="w-4 h-4 mr-2" />
                    Donate to School
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact School
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="announcements">News</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Curriculum */}
              <Card>
                <CardHeader>
                  <CardTitle>Curriculum</CardTitle>
                  <CardDescription>Subjects and areas of study offered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {school.curriculum.map((subject) => (
                      <Badge key={subject} variant="outline">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facilities */}
              <Card>
                <CardHeader>
                  <CardTitle>Facilities</CardTitle>
                  <CardDescription>Available facilities and amenities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {school.facilities.map((facility) => (
                      <div key={facility} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                        {facility}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>School location and directions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Interactive map will be displayed here</p>
                    <p className="text-sm text-muted-foreground mt-2">{school.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="programs" className="space-y-6">
            <div className="grid gap-6">
              {school.programs.map((program, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{program.name}</CardTitle>
                    <CardDescription>{program.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Duration: {program.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        Age Group: {program.ageGroup}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid gap-6">
              {school.events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{event.title}</CardTitle>
                        <CardDescription>{event.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{event.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.time}
                        </div>
                      </div>
                      <Button size="sm">Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <div className="grid gap-6">
              {school.announcements.map((announcement) => (
                <Card key={announcement.id} className={announcement.pinned ? "border-primary/20" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        {announcement.title}
                        {announcement.pinned && (
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            Pinned
                          </Badge>
                        )}
                      </CardTitle>
                      <span className="text-sm text-muted-foreground">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <div className="text-center py-12">
              <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Reviews Coming Soon</h3>
              <p className="text-muted-foreground">School reviews and ratings will be available in a future update.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
