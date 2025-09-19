"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Search, Filter, Users, Phone, Mail, ExternalLink, Shield } from "lucide-react"
import Link from "next/link"

// Mock data for schools
const mockSchools = [
  {
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
    description: "Global headquarters for AL-MURATTAL NETWORK - A premier Islamic educational institution.",
    curriculum: ["Tahfiz", "Tajweed", "Arabic", "Islamic Studies"],
    verified: true,
    boarding: true,
    womenFriendly: true,
    scholarships: true,
    students: 500,
    established: 2010,
  },
  {
    id: 2,
    name: "Madrasa Al-Noor",
    type: "school",
    address: "Central Market Area, Gombe, Nigeria",
    country: "Nigeria",
    state: "Gombe State",
    lga: "Gombe",
    latitude: 10.2897,
    longitude: 11.1678,
    contact_email: "info@madrasaalnoor.org",
    contact_phone: "+2348012345678",
    description: "A community-focused Islamic school offering comprehensive Quranic education.",
    curriculum: ["Tahfiz", "Tajweed", "Arabic Language", "Islamic Studies"],
    verified: true,
    boarding: false,
    womenFriendly: true,
    scholarships: false,
    students: 200,
    established: 2015,
  },
  {
    id: 3,
    name: "Islamic Center of Excellence",
    type: "school",
    address: "Victoria Island, Lagos, Nigeria",
    country: "Nigeria",
    state: "Lagos State",
    lga: "Lagos Island",
    latitude: 6.4281,
    longitude: 3.4219,
    contact_email: "info@icelagos.org",
    contact_phone: "+2348098765432",
    description: "Modern Islamic education with technology integration and international curriculum.",
    curriculum: ["Tahfiz", "Tajweed", "Arabic", "Islamic Studies", "Modern Sciences"],
    verified: true,
    boarding: true,
    womenFriendly: true,
    scholarships: true,
    students: 800,
    established: 2008,
  },
  {
    id: 4,
    name: "Al-Hikmah Academy",
    type: "school",
    address: "Ilorin, Kwara State, Nigeria",
    country: "Nigeria",
    state: "Kwara State",
    lga: "Ilorin West",
    latitude: 8.4799,
    longitude: 4.5418,
    contact_email: "contact@alhikmah.edu.ng",
    contact_phone: "+2348087654321",
    description: "University-affiliated Islamic academy with research programs.",
    curriculum: ["Tahfiz", "Tajweed", "Arabic", "Islamic Studies", "Research Methods"],
    verified: true,
    boarding: true,
    womenFriendly: false,
    scholarships: true,
    students: 300,
    established: 2012,
  },
]

export default function SchoolsPage() {
  const [schools, setSchools] = useState(mockSchools)
  const [filteredSchools, setFilteredSchools] = useState(mockSchools)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showMap, setShowMap] = useState(false)

  // Filter schools based on search and filters
  useEffect(() => {
    let filtered = schools

    if (searchTerm) {
      filtered = filtered.filter(
        (school) =>
          school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
          school.curriculum.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    if (selectedCountry !== "all") {
      filtered = filtered.filter((school) => school.country === selectedCountry)
    }

    if (selectedState !== "all") {
      filtered = filtered.filter((school) => school.state === selectedState)
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((school) => school.type === selectedType)
    }

    setFilteredSchools(filtered)
  }, [searchTerm, selectedCountry, selectedState, selectedType, schools])

  const countries = [...new Set(schools.map((school) => school.country))]
  const states = [...new Set(schools.map((school) => school.state))]

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Global School Directory</h1>
          <p className="text-muted-foreground">
            Discover verified Islamic educational institutions worldwide. Find schools by location, curriculum, and
            facilities.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search schools, locations, or curriculum..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showMap ? "default" : "outline"}
              onClick={() => setShowMap(!showMap)}
              className="md:w-auto"
            >
              <MapPin className="w-4 h-4 mr-2" />
              {showMap ? "Hide Map" : "Show Map"}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="md:w-48">
                <SelectValue placeholder="School Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="school">Madrasa</SelectItem>
                <SelectItem value="mosque">Mosque School</SelectItem>
                <SelectItem value="university">Islamic University</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Map View */}
        {showMap && (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Interactive map will be displayed here</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Showing {filteredSchools.length} schools on the map
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{filteredSchools.length} Schools Found</h2>
            <p className="text-sm text-muted-foreground">{searchTerm && `Results for "${searchTerm}"`}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Sort by relevance</span>
          </div>
        </div>

        {/* School Cards */}
        <div className="grid gap-6">
          {filteredSchools.map((school) => (
            <Card key={school.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{school.name}</CardTitle>
                      {school.verified && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="flex items-center text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {school.address}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">{school.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Est. {school.established}</div>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="w-4 h-4 mr-1" />
                      {school.students} students
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Curriculum */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">Curriculum</h4>
                    <div className="flex flex-wrap gap-2">
                      {school.curriculum.map((subject) => (
                        <Badge key={subject} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    {school.boarding && (
                      <span className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                        Boarding Available
                      </span>
                    )}
                    {school.womenFriendly && (
                      <span className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                        Women-Friendly
                      </span>
                    )}
                    {school.scholarships && (
                      <span className="flex items-center text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                        Scholarships Available
                      </span>
                    )}
                  </div>

                  {/* Contact and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-4 text-sm">
                      <a
                        href={`mailto:${school.contact_email}`}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-1" />
                        Email
                      </a>
                      <a
                        href={`tel:${school.contact_phone}`}
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </a>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Donate
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredSchools.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No schools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters to find more schools.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCountry("all")
                setSelectedState("all")
                setSelectedType("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
