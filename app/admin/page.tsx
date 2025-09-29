"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  School,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Globe,
  Flag,
  Building,
  GraduationCap,
  Heart,
  MessageSquare,
  Settings,
  Shield,
  BarChart3,
} from "lucide-react"

const stats = [
  {
    title: "Total Schools",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: School,
    color: "text-emerald-600",
  },
  {
    title: "Active Users",
    value: "45,230",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Pending KYS",
    value: "156",
    change: "-5%",
    trend: "down",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Total Donations",
    value: "$1.2M",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
  },
]

const recentActivities = [
  {
    id: 1,
    type: "kys_approval",
    title: "Al-Noor Islamic School KYS Approved",
    description: "School verification completed for Lagos State",
    time: "2 hours ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "donation",
    title: "Large Donation Received",
    description: "$50,000 donated for school construction",
    time: "4 hours ago",
    icon: Heart,
    color: "text-red-600",
  },
  {
    id: 3,
    type: "event",
    title: "Qur'an Competition Registered",
    description: "New competition event created in Nigeria",
    time: "6 hours ago",
    icon: Calendar,
    color: "text-purple-600",
  },
  {
    id: 4,
    type: "announcement",
    title: "Global Announcement Posted",
    description: "New curriculum guidelines published",
    time: "8 hours ago",
    icon: MessageSquare,
    color: "text-blue-600",
  },
]

const pendingApprovals = [
  {
    id: 1,
    type: "KYS Application",
    school: "Madinah Islamic Academy",
    location: "Kano State, Nigeria",
    submittedBy: "Ahmad Ibrahim",
    date: "2024-01-15",
    priority: "high",
  },
  {
    id: 2,
    type: "Event Approval",
    school: "Al-Hikmah School",
    location: "Abuja, Nigeria",
    submittedBy: "Fatima Usman",
    date: "2024-01-14",
    priority: "medium",
  },
  {
    id: 3,
    type: "Donation Campaign",
    school: "Nur Islamic Center",
    location: "Lagos State, Nigeria",
    submittedBy: "Yusuf Mohammed",
    date: "2024-01-13",
    priority: "low",
  },
]

const hierarchyStats = [
  { level: "Global HQ", count: 1, icon: Globe, color: "bg-emerald-100 text-emerald-800" },
  { level: "Countries", count: 15, icon: Flag, color: "bg-blue-100 text-blue-800" },
  { level: "States", count: 127, icon: MapPin, color: "bg-purple-100 text-purple-800" },
  { level: "LGAs", count: 892, icon: Building, color: "bg-orange-100 text-orange-800" },
  { level: "Schools", count: 2847, icon: GraduationCap, color: "bg-gray-100 text-gray-800" },
]

export default function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900">Admin Dashboard</h1>
            <p className="text-lg text-emerald-700 mt-2">AL-MURATTAL Global Network Management Center</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Avatar>
              <AvatarFallback className="bg-emerald-100 text-emerald-700">AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schools">Schools</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        <p
                          className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
                        >
                          <TrendingUp className="h-4 w-4" />
                          {stat.change} from last month
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Network Hierarchy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Network Hierarchy Overview
                </CardTitle>
                <CardDescription>Current structure of the AL-MURATTAL Global Network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {hierarchyStats.map((level) => (
                    <div key={level.level} className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${level.color} mb-3`}
                      >
                        <level.icon className="h-8 w-8" />
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{level.count.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">{level.level}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest actions across the network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className={`p-2 rounded-full bg-gray-100`}>
                          <activity.icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <p className="text-sm text-gray-600">{activity.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Approvals */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Pending Approvals
                  </CardTitle>
                  <CardDescription>Items requiring your attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge
                              className={
                                item.priority === "high"
                                  ? "bg-red-100 text-red-800"
                                  : item.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                              }
                            >
                              {item.priority}
                            </Badge>
                          </div>
                          <p className="font-medium text-gray-900">{item.school}</p>
                          <p className="text-sm text-gray-600">{item.location}</p>
                          <p className="text-xs text-gray-500">
                            Submitted by {item.submittedBy} on {item.date}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="schools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>School Management</CardTitle>
                <CardDescription>Manage all schools in the AL-MURATTAL Global Network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <School className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">School management interface coming soon</p>
                  <p className="text-sm text-gray-500">
                    This will include school listings, verification status, and management tools
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and their roles across the network</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">User management interface coming soon</p>
                  <p className="text-sm text-gray-500">
                    This will include user listings, role management, and access control
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Approval Management</CardTitle>
                <CardDescription>Review and manage all pending approvals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingApprovals.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{item.type}</Badge>
                              <Badge
                                className={
                                  item.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : item.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                }
                              >
                                {item.priority} priority
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900">{item.school}</h3>
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {item.location}
                            </p>
                            <p className="text-sm text-gray-500">
                              Submitted by {item.submittedBy} on {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                            >
                              Reject
                            </Button>
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                              Approve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Network Analytics
                </CardTitle>
                <CardDescription>Detailed insights and statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600">Advanced analytics coming soon</p>
                  <p className="text-sm text-gray-500">
                    This will include detailed charts, reports, and network insights
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
