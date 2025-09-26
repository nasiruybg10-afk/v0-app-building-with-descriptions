"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Pin, Calendar, MapPin, MessageSquare, Eye } from "lucide-react"

const announcements = [
  {
    id: 1,
    title: "Global Qur'an Competition 2024 Registration Open",
    content:
      "We are pleased to announce the opening of registration for the Annual Global Qur'an Competition. This year's theme focuses on Tajweed excellence and memorization accuracy.",
    author: "Global HQ Administration",
    level: "global",
    location: "Global",
    date: "2024-01-15",
    priority: "high",
    views: 15420,
    comments: 89,
    pinned: true,
    tags: ["Competition", "Qur'an", "Registration"],
  },
  {
    id: 2,
    title: "New Curriculum Guidelines for Islamic Studies",
    content:
      "Updated curriculum guidelines have been released for all affiliated schools. Please review the new standards for Islamic Studies integration.",
    author: "Nigeria Country Office",
    level: "country",
    location: "Nigeria",
    date: "2024-01-12",
    priority: "medium",
    views: 8750,
    comments: 45,
    pinned: false,
    tags: ["Curriculum", "Guidelines", "Education"],
  },
  {
    id: 3,
    title: "Lagos State Schools Meeting - February 2024",
    content:
      "All school administrators in Lagos State are invited to attend the monthly coordination meeting. Agenda includes KYS updates and event planning.",
    author: "Lagos State Coordinator",
    level: "state",
    location: "Lagos State, Nigeria",
    date: "2024-01-10",
    priority: "medium",
    views: 2340,
    comments: 23,
    pinned: true,
    tags: ["Meeting", "Coordination", "KYS"],
  },
  {
    id: 4,
    title: "Scholarship Opportunities for Outstanding Students",
    content:
      "Several scholarship opportunities are now available for students who have demonstrated excellence in Islamic studies and Qur'anic memorization.",
    author: "Al-Noor Islamic School",
    level: "school",
    location: "Ikeja LGA, Lagos",
    date: "2024-01-08",
    priority: "low",
    views: 1250,
    comments: 12,
    pinned: false,
    tags: ["Scholarship", "Students", "Excellence"],
  },
]

const levelColors = {
  global: "bg-emerald-100 text-emerald-800 border-emerald-200",
  country: "bg-blue-100 text-blue-800 border-blue-200",
  state: "bg-purple-100 text-purple-800 border-purple-200",
  lga: "bg-orange-100 text-orange-800 border-orange-200",
  school: "bg-gray-100 text-gray-800 border-gray-200",
}

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export default function PublicBoardsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "all" || announcement.level === selectedLevel
    const matchesPriority = selectedPriority === "all" || announcement.priority === selectedPriority

    return matchesSearch && matchesLevel && matchesPriority
  })

  const pinnedAnnouncements = filteredAnnouncements.filter((a) => a.pinned)
  const regularAnnouncements = filteredAnnouncements.filter((a) => !a.pinned)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-900 mb-4">Public Announcement Boards</h1>
          <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
            Stay informed with the latest announcements from all levels of the AL-MURATTAL Network
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search announcements..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="global">Global HQ</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="lga">LGA</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High Priority</SelectItem>
                  <SelectItem value="medium">Medium Priority</SelectItem>
                  <SelectItem value="low">Low Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All Announcements</TabsTrigger>
            <TabsTrigger value="pinned">Pinned Only</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {/* Pinned Announcements */}
            {pinnedAnnouncements.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-emerald-900 mb-4 flex items-center gap-2">
                  <Pin className="h-5 w-5" />
                  Pinned Announcements
                </h2>
                <div className="grid gap-6">
                  {pinnedAnnouncements.map((announcement) => (
                    <Card key={announcement.id} className="border-l-4 border-l-emerald-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={levelColors[announcement.level as keyof typeof levelColors]}>
                                {announcement.level.toUpperCase()}
                              </Badge>
                              <Badge className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                                {announcement.priority.toUpperCase()}
                              </Badge>
                              <Pin className="h-4 w-4 text-emerald-600" />
                            </div>
                            <CardTitle className="text-xl text-emerald-900">{announcement.title}</CardTitle>
                            <CardDescription className="flex items-center gap-4 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(announcement.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {announcement.location}
                              </span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{announcement.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {announcement.views.toLocaleString()} views
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              {announcement.comments} comments
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {announcement.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-emerald-100 text-emerald-700">
                              {announcement.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-gray-600">Posted by {announcement.author}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Announcements */}
            <div>
              <h2 className="text-2xl font-semibold text-emerald-900 mb-4">Recent Announcements</h2>
              <div className="grid gap-6">
                {regularAnnouncements.map((announcement) => (
                  <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={levelColors[announcement.level as keyof typeof levelColors]}>
                              {announcement.level.toUpperCase()}
                            </Badge>
                            <Badge className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                              {announcement.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl text-emerald-900">{announcement.title}</CardTitle>
                          <CardDescription className="flex items-center gap-4 mt-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(announcement.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {announcement.location}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 mb-4">{announcement.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {announcement.views.toLocaleString()} views
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {announcement.comments} comments
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {announcement.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700">
                            {announcement.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">Posted by {announcement.author}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pinned" className="space-y-6">
            <div className="grid gap-6">
              {pinnedAnnouncements.map((announcement) => (
                <Card key={announcement.id} className="border-l-4 border-l-emerald-500">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={levelColors[announcement.level as keyof typeof levelColors]}>
                            {announcement.level.toUpperCase()}
                          </Badge>
                          <Badge className={priorityColors[announcement.priority as keyof typeof priorityColors]}>
                            {announcement.priority.toUpperCase()}
                          </Badge>
                          <Pin className="h-4 w-4 text-emerald-600" />
                        </div>
                        <CardTitle className="text-xl text-emerald-900">{announcement.title}</CardTitle>
                        <CardDescription className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(announcement.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {announcement.location}
                          </span>
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{announcement.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {announcement.views.toLocaleString()} views
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {announcement.comments} comments
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {announcement.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-emerald-100 text-emerald-700">
                          {announcement.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600">Posted by {announcement.author}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
