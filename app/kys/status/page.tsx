"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, CheckCircle, Clock, FileText, MessageSquare, User, Building, Download, Edit } from "lucide-react"
import Link from "next/link"

// Mock application data
const mockApplication = {
  id: "KYS-2024-001",
  organizationName: "Madrasa Al-Noor",
  submittedDate: "2024-11-01",
  currentStatus: "PENDING_STATE",
  progress: 50,
  applicant: {
    name: "Dr. Ahmad Ibrahim",
    email: "ahmad@madrasaalnoor.org",
    phone: "+2348012345678",
  },
  organization: {
    type: "school",
    address: "Central Market Area, Gombe, Nigeria",
    established: 2015,
    capacity: 200,
  },
  timeline: [
    {
      status: "SUBMITTED",
      date: "2024-11-01",
      reviewer: "System",
      notes: "Application submitted successfully",
      completed: true,
    },
    {
      status: "PENDING_LGA",
      date: "2024-11-02",
      reviewer: "LGA Admin",
      notes: "Under review by Gombe LGA",
      completed: true,
    },
    {
      status: "LGA_APPROVED",
      date: "2024-11-05",
      reviewer: "Musa Abdullahi (LGA Admin)",
      notes: "Approved by LGA. All documents verified and facilities inspected.",
      completed: true,
    },
    {
      status: "PENDING_STATE",
      date: "2024-11-06",
      reviewer: "State Admin",
      notes: "Forwarded to Gombe State for review",
      completed: false,
      current: true,
    },
    {
      status: "STATE_APPROVED",
      date: null,
      reviewer: "State Admin",
      notes: "Pending state-level review",
      completed: false,
    },
    {
      status: "PENDING_COUNTRY",
      date: null,
      reviewer: "Country Admin",
      notes: "Pending country-level review",
      completed: false,
    },
    {
      status: "ACTIVATED",
      date: null,
      reviewer: "Global HQ",
      notes: "Final activation pending",
      completed: false,
    },
  ],
  documents: [
    { name: "Registration Certificate", status: "approved", uploadDate: "2024-11-01" },
    { name: "Endorsement Letter", status: "approved", uploadDate: "2024-11-01" },
    { name: "Facility Photos", status: "approved", uploadDate: "2024-11-01" },
    { name: "ID Documents", status: "approved", uploadDate: "2024-11-01" },
  ],
  reviewerNotes: [
    {
      reviewer: "Musa Abdullahi (LGA Admin)",
      date: "2024-11-05",
      note: "Excellent facilities and well-organized curriculum. All safety requirements met. Recommended for state-level approval.",
      status: "approved",
    },
  ],
}

const VERIFICATION_STATUSES = {
  DRAFT: { label: "Draft", color: "bg-gray-500", description: "Application being prepared" },
  SUBMITTED: { label: "Submitted", color: "bg-blue-500", description: "Submitted for review" },
  PENDING_LGA: { label: "LGA Review", color: "bg-yellow-500", description: "Under LGA review" },
  LGA_APPROVED: { label: "LGA Approved", color: "bg-green-500", description: "Approved by LGA" },
  PENDING_STATE: { label: "State Review", color: "bg-yellow-500", description: "Under State review" },
  STATE_APPROVED: { label: "State Approved", color: "bg-green-500", description: "Approved by State" },
  PENDING_COUNTRY: { label: "Country Review", color: "bg-yellow-500", description: "Under Country review" },
  COUNTRY_APPROVED: { label: "Country Approved", color: "bg-green-500", description: "Approved by Country" },
  PENDING_HQ: { label: "HQ Review", color: "bg-yellow-500", description: "Under HQ review" },
  ACTIVATED: { label: "Activated", color: "bg-primary", description: "Fully verified and active" },
  REJECTED: { label: "Rejected", color: "bg-red-500", description: "Application rejected" },
  SUSPENDED: { label: "Suspended", color: "bg-orange-500", description: "Temporarily suspended" },
}

export default function KYSStatusPage() {
  const [application] = useState(mockApplication)
  const currentStatusInfo = VERIFICATION_STATUSES[application.currentStatus as keyof typeof VERIFICATION_STATUSES]

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
              <Button size="sm">Get Verified</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Verification Status</h1>
              <p className="text-muted-foreground">Track your KYS application progress</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Application ID</div>
              <div className="font-mono text-lg">{application.id}</div>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>{application.organizationName}</span>
                  </CardTitle>
                  <CardDescription>
                    Submitted on {new Date(application.submittedDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <Badge className={`${currentStatusInfo.color} text-white`}>{currentStatusInfo.label}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Verification Progress</span>
                    <span className="text-sm text-muted-foreground">{application.progress}% Complete</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">{currentStatusInfo.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="details">Application Details</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="notes">Reviewer Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Verification Timeline</CardTitle>
                <CardDescription>Track the progress of your application through each review stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {application.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {item.completed ? (
                          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-primary-foreground" />
                          </div>
                        ) : item.current ? (
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-muted-foreground rounded-full" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-foreground">
                            {VERIFICATION_STATUSES[item.status as keyof typeof VERIFICATION_STATUSES]?.label}
                          </h3>
                          {item.date && (
                            <span className="text-sm text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                        {item.reviewer && item.reviewer !== "System" && (
                          <p className="text-xs text-muted-foreground mt-1">Reviewer: {item.reviewer}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Applicant Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Name</div>
                    <div className="text-sm text-muted-foreground">{application.applicant.name}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{application.applicant.email}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{application.applicant.phone}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="w-4 h-4" />
                    <span>Organization Details</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">Type</div>
                    <div className="text-sm text-muted-foreground capitalize">{application.organization.type}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <div className="text-sm text-muted-foreground">{application.organization.address}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Established</div>
                    <div className="text-sm text-muted-foreground">{application.organization.established}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Capacity</div>
                    <div className="text-sm text-muted-foreground">{application.organization.capacity} students</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Submitted Documents</CardTitle>
                <CardDescription>Status of all uploaded documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {application.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{doc.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Uploaded on {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={doc.status === "approved" ? "default" : "secondary"}
                          className={doc.status === "approved" ? "bg-primary" : ""}
                        >
                          {doc.status === "approved" ? "Approved" : "Pending"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reviewer Notes</CardTitle>
                <CardDescription>Comments and feedback from reviewers</CardDescription>
              </CardHeader>
              <CardContent>
                {application.reviewerNotes.length > 0 ? (
                  <div className="space-y-4">
                    {application.reviewerNotes.map((note, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{note.reviewer}</div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={note.status === "approved" ? "default" : "secondary"}
                              className={note.status === "approved" ? "bg-primary" : ""}
                            >
                              {note.status === "approved" ? "Approved" : "Pending"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(note.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{note.note}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No reviewer notes yet</h3>
                    <p className="text-muted-foreground">
                      Reviewer comments will appear here as your application progresses.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions */}
        <div className="mt-8 flex items-center justify-center space-x-4">
          <Button variant="outline" className="bg-transparent">
            <Edit className="w-4 h-4 mr-2" />
            Edit Application
          </Button>
          <Button variant="outline" className="bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
