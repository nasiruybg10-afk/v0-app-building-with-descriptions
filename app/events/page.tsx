"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Users, Clock, Search, Filter, Plus, ExternalLink, Share2, BookmarkPlus } from "lucide-react"
import Link from "next/link"

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Annual Quran Recitation Competition",
    type: "musabaqah",
    description:
      "Join us for our annual Quran recitation competition featuring students from across the region. Prizes will be awarded for different age categories.",
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
    status: "approved",
    featured: true,
    tags: ["competition", "quran", "youth"],
  },
  {
    id: 2,
    title: "Tahfiz Graduation Ceremony 2024",
    type: "graduation",
    description:
      "Celebrating the achievements of our graduating class of 2024. Join us as we honor students who have completed their Quran memorization.",
    organizer: "Islamic Center of Excellence",
    organizerId: 3,
    startDate: "2024-12-20",
    endDate: "2024-12-20",
    startTime: "10:00",
    endTime: "14:00",
    venue: "Islamic Center Main Auditorium",
    address: "Victoria Island, Lagos, Nigeria",
    latitude: 6.4281,
    longitude: 3.4219,
    capacity: 300,
    registered: 156,
    ticketPrice: 0,
    livestreamUrl: null,
    contactInfo: "events@icelagos.org",
    status: "approved",
    featured: true,
    tags: ["graduation", "tahfiz", "celebration"],
  },
  {
    id: 3,
    title: "Maulud Celebration 2024",
    type: "maulud",
    description:
      "Join us for the annual Maulud celebration honoring the birth of Prophet Muhammad (PBUH). Features lectures, nasheeds, and community gathering.",
    organizer: "AL-MURATTAL Institute",
    organizerId: 1,
    startDate: "2024-12-28",
    endDate: "2024-12-28",
    startTime: "19:00",
    endTime: "22:00",
    venue: "AL-MURATTAL Institute Mosque",
    address: "M07 Western Transformer Line, Bomala Quarters, Gombe State, Nigeria",
    latitude: 10.2897,
    longitude: 11.1678,
    capacity: 500,
    registered: 234,
    ticketPrice: 0,
    livestreamUrl: "https://youtube.com/live/maulud2024",
    contactInfo: "almurattalinstitute@gmail.com",
    status: "approved",
    featured: true,
    tags: ["maulud", "prophet", "celebration", "community"],
  },
  {
    id: 4,
    title: "Modern Islamic Education Seminar",
    type: "seminar",
    description:
      "A comprehensive seminar on integrating modern teaching methods with traditional Islamic education. Open to educators and administrators.",
    organizer: "Al-Hikmah Academy",
    organizerId: 4,
    startDate: "2025-01-05",
    endDate: "2025-01-06",
    startTime: "09:00",
    endTime: "17:00",
    venue: "Al-Hikmah University Conference Center",
    address: "Ilorin, Kwara State, Nigeria",
    latitude: 8.4799,
    longitude: 4.5418,
    capacity: 150,
    registered: 89,
    ticketPrice: 5000,
    livestreamUrl: null,
    contactInfo: "seminars@alhikmah.edu.ng",
    status: "approved",
    featured: false,
    tags: ["seminar", "education", "teachers", "professional"],
  },
  {
    id: 5,
    title: "Community Walīmah - New School Opening",
    type: "walimah",
    description:
      "Celebration feast for the opening of our new branch campus. All community members are invited to join this joyous occasion.",
    organizer: "Madrasa Al-Noor",
    organizerId: 2,
    startDate: "2025-01-12",
    endDate: "2025-01-12",
    startTime: "12:00",
    endTime: "16:00",
    venue: "New Campus Grounds",
    address: "Pantami Area, Gombe, Nigeria",
    latitude: 10.3,
    longitude: 11.18,
    capacity: 400,
    registered: 67,
    ticketPrice: 0,
    livestreamUrl: null,
    contactInfo: "info@madrasaalnoor.org",
    status: "approved",
    featured: false,
    tags: ["walimah", "opening", "community", "feast"],
  },
]

const EVENT_TYPES = {
  musabaqah: { label: "Musabaqah", color: "bg-blue-500", icon: "🏆" },
  graduation: { label: "Graduation", color: "bg-green-500", icon: "🎓" },
  maulud: { label: "Maulud", color: "bg-purple-500", icon: "🌙" },
  walimah: { label: "Walīmah", color: "bg-orange-500", icon: "🍽️" },
  seminar: { label: "Seminar", color: "bg-indigo-500", icon: "📚" },
}

export default function EventsPage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDate, setSelectedDate] = useState("all")
  const [viewMode, setViewMode] = useState<"upcoming" | "past" | "all">("upcoming")

  // Filter events
  useEffect(() => {
    let filtered = events

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((event) => event.type === selectedType)
    }

    // Filter by date
    const now = new Date()
    if (viewMode === "upcoming") {
      filtered = filtered.filter((event) => new Date(event.startDate) >= now)
    } else if (viewMode === "past") {
      filtered = filtered.filter((event) => new Date(event.startDate) < now)
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

    setFilteredEvents(filtered)
  }, [searchTerm, selectedType, selectedDate, viewMode, events])

  const upcomingEvents = events.filter((event) => new Date(event.startDate) >= new Date())
  const featuredEvents = events.filter((event) => event.featured)

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
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Islamic Events</h1>
          <p className="text-muted-foreground">
            Discover and participate in Islamic educational and community events worldwide
          </p>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Featured Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.slice(0, 3).map((event) => (
                <Card key={event.id} className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${EVENT_TYPES[event.type as keyof typeof EVENT_TYPES].color} text-white`}>
                        {EVENT_TYPES[event.type as keyof typeof EVENT_TYPES].label}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.venue}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {event.registered}/{event.capacity} registered
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm font-medium text-foreground">
                        {event.ticketPrice === 0 ? "Free" : `₦${event.ticketPrice.toLocaleString()}`}
                      </span>
                      <Button size="sm" asChild>
                        <Link href={`/events/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events, organizers, or venues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="md:w-auto bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Event Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {Object.entries(EVENT_TYPES).map(([key, type]) => (
                  <SelectItem key={key} value={key}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDate} onValueChange={setSelectedDate}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">Next 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Event Tabs */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "upcoming" | "past" | "all")}>
          <TabsList className="grid w-full grid-cols-3 md:w-96">
            <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>

          <TabsContent value={viewMode} className="mt-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{filteredEvents.length} Events Found</h2>
                {searchTerm && <p className="text-sm text-muted-foreground">Results for "{searchTerm}"</p>}
              </div>
            </div>

            {/* Event List */}
            <div className="grid gap-6">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${EVENT_TYPES[event.type as keyof typeof EVENT_TYPES].color} text-white`}>
                            {EVENT_TYPES[event.type as keyof typeof EVENT_TYPES].label}
                          </Badge>
                          {event.featured && (
                            <Badge variant="outline" className="border-primary text-primary">
                              Featured
                            </Badge>
                          )}
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-xl mb-2">
                          <Link href={`/events/${event.id}`} className="hover:text-primary transition-colors">
                            {event.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="mb-3">{event.description}</CardDescription>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span className="font-medium">Organized by:</span>
                          <Link href={`/schools/${event.organizerId}`} className="ml-1 text-primary hover:underline">
                            {event.organizer}
                          </Link>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-foreground">
                          {event.ticketPrice === 0 ? "Free" : `₦${event.ticketPrice.toLocaleString()}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {event.registered}/{event.capacity} registered
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(event.startDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2" />
                        {event.venue}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <BookmarkPlus className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Share2 className="w-4 h-4 mr-1" />
                          Share
                        </Button>
                        {event.livestreamUrl && (
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Live Stream
                          </Button>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild className="bg-transparent">
                          <Link href={`/events/${event.id}`}>View Details</Link>
                        </Button>
                        <Button size="sm">Register Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters to find more events.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedType("all")
                    setSelectedDate("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
