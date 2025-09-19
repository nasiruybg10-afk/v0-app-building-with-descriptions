"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Shield, Upload, CheckCircle, FileText, Camera, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"

const VERIFICATION_STEPS = [
  { id: 1, title: "Organization Details", description: "Basic information about your institution" },
  { id: 2, title: "Location & Contact", description: "Address and contact information" },
  { id: 3, title: "Curriculum & Programs", description: "Educational programs offered" },
  { id: 4, title: "Facilities & Safety", description: "Infrastructure and safety measures" },
  { id: 5, title: "Documentation", description: "Required documents and media" },
  { id: 6, title: "Review & Submit", description: "Final review before submission" },
]

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

export default function KYSPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Organization Details
    organizationName: "",
    organizationType: "",
    topOfficialName: "",
    topOfficialId: "",
    topOfficialContact: "",
    establishedYear: "",

    // Location & Contact
    address: "",
    country: "",
    state: "",
    lga: "",
    latitude: "",
    longitude: "",
    contactEmail: "",
    contactPhone: "",
    website: "",

    // Curriculum & Programs
    curriculumSummary: "",
    programs: [],
    languages: [],
    ageGroups: "",
    capacity: "",

    // Facilities & Safety
    facilities: [],
    safeguardingPolicy: false,
    emergencyProcedures: false,
    teacherCredentials: "",
    references: "",

    // Documentation
    documents: [],
    media: [],
    endorsementLetter: null,
    agreementAccepted: false,
  })

  const progress = (currentStep / VERIFICATION_STEPS.length) * 100

  const handleNext = () => {
    if (currentStep < VERIFICATION_STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Submitting KYS application:", formData)
    // In real app, this would submit to API
  }

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
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Know Your School (KYS) Verification</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete the verification process to join the AL-MURATTAL NETWORK as a trusted educational institution. This
            process ensures the authenticity and safety of all schools in our network.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-foreground">
              Step {currentStep} of {VERIFICATION_STEPS.length}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {VERIFICATION_STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm ${
                  step.id === currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.id < currentStep
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {step.id < currentStep ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <span className="w-4 h-4 rounded-full border-2 border-current flex items-center justify-center text-xs">
                    {step.id}
                  </span>
                )}
                <span className="hidden md:inline">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>{VERIFICATION_STEPS[currentStep - 1].title}</span>
              </CardTitle>
              <CardDescription>{VERIFICATION_STEPS[currentStep - 1].description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Organization Details */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="orgName">Organization Name *</Label>
                      <Input
                        id="orgName"
                        placeholder="Enter your institution's official name"
                        value={formData.organizationName}
                        onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="orgType">Organization Type *</Label>
                      <Select
                        value={formData.organizationType}
                        onValueChange={(value) => setFormData({ ...formData, organizationType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">Islamic School/Madrasa</SelectItem>
                          <SelectItem value="mosque">Mosque School</SelectItem>
                          <SelectItem value="university">Islamic University</SelectItem>
                          <SelectItem value="ngo">Educational NGO</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Top Official Information</h3>
                    <p className="text-sm text-muted-foreground">
                      The top official must be the head of the institution who can legally represent the organization.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="officialName">Top Official Name *</Label>
                        <Input
                          id="officialName"
                          placeholder="Full name of the head of institution"
                          value={formData.topOfficialName}
                          onChange={(e) => setFormData({ ...formData, topOfficialName: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="officialId">Official ID Number *</Label>
                        <Input
                          id="officialId"
                          placeholder="National ID or passport number"
                          value={formData.topOfficialId}
                          onChange={(e) => setFormData({ ...formData, topOfficialId: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="officialContact">Official Contact *</Label>
                        <Input
                          id="officialContact"
                          placeholder="Phone number"
                          value={formData.topOfficialContact}
                          onChange={(e) => setFormData({ ...formData, topOfficialContact: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="established">Year Established *</Label>
                        <Input
                          id="established"
                          type="number"
                          placeholder="YYYY"
                          value={formData.establishedYear}
                          onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Location & Contact */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="address">Physical Address *</Label>
                    <Textarea
                      id="address"
                      placeholder="Complete physical address of the institution"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nigeria">Nigeria</SelectItem>
                          <SelectItem value="ghana">Ghana</SelectItem>
                          <SelectItem value="senegal">Senegal</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province *</Label>
                      <Input
                        id="state"
                        placeholder="State or province"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lga">LGA/District *</Label>
                      <Input
                        id="lga"
                        placeholder="Local government area"
                        value={formData.lga}
                        onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="latitude">Latitude (Optional)</Label>
                      <Input
                        id="latitude"
                        placeholder="GPS latitude"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="longitude">Longitude (Optional)</Label>
                      <Input
                        id="longitude"
                        placeholder="GPS longitude"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Contact Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="official@school.org"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Contact Phone *</Label>
                      <Input
                        id="phone"
                        placeholder="+234 xxx xxx xxxx"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website (Optional)</Label>
                    <Input
                      id="website"
                      placeholder="https://www.yourschool.org"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Curriculum & Programs */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="curriculum">Curriculum Summary *</Label>
                    <Textarea
                      id="curriculum"
                      placeholder="Describe your educational programs, subjects taught, and teaching methodology"
                      value={formData.curriculumSummary}
                      onChange={(e) => setFormData({ ...formData, curriculumSummary: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Programs Offered *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Tahfiz (Quran Memorization)",
                        "Tajweed",
                        "Arabic Language",
                        "Islamic Studies",
                        "Fiqh (Islamic Jurisprudence)",
                        "Hadith Studies",
                        "Modern Sciences",
                        "Mathematics",
                        "English Language",
                        "Computer Studies",
                      ].map((program) => (
                        <div key={program} className="flex items-center space-x-2">
                          <Checkbox id={program} />
                          <Label htmlFor={program} className="text-sm">
                            {program}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="ageGroups">Age Groups Served *</Label>
                      <Input
                        id="ageGroups"
                        placeholder="e.g., 5-18 years"
                        value={formData.ageGroups}
                        onChange={(e) => setFormData({ ...formData, ageGroups: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Student Capacity *</Label>
                      <Input
                        id="capacity"
                        type="number"
                        placeholder="Maximum number of students"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Facilities & Safety */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Available Facilities *</Label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        "Classrooms",
                        "Prayer Hall/Mosque",
                        "Library",
                        "Dormitories",
                        "Dining Hall",
                        "Sports Facilities",
                        "Computer Lab",
                        "Medical Center",
                        "Playground",
                        "Parking Area",
                      ].map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Checkbox id={facility} />
                          <Label htmlFor={facility} className="text-sm">
                            {facility}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Safety & Compliance *</Label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="safeguarding"
                          checked={formData.safeguardingPolicy}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, safeguardingPolicy: checked as boolean })
                          }
                        />
                        <Label htmlFor="safeguarding" className="text-sm">
                          We have a child safeguarding policy in place
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="emergency"
                          checked={formData.emergencyProcedures}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, emergencyProcedures: checked as boolean })
                          }
                        />
                        <Label htmlFor="emergency" className="text-sm">
                          We have emergency procedures and safety protocols
                        </Label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teachers">Teacher Credentials</Label>
                    <Textarea
                      id="teachers"
                      placeholder="Brief description of teacher qualifications and credentials"
                      value={formData.teacherCredentials}
                      onChange={(e) => setFormData({ ...formData, teacherCredentials: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="references">Community References *</Label>
                    <Textarea
                      id="references"
                      placeholder="Names and contacts of local Imam, community leaders, or other references"
                      value={formData.references}
                      onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 5: Documentation */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Required Documents</h3>
                    <p className="text-sm text-muted-foreground">
                      Please upload the following documents. All documents should be clear and legible.
                    </p>

                    <div className="grid gap-4">
                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                            <div className="flex-1">
                              <h4 className="font-medium">Official Registration Documents</h4>
                              <p className="text-sm text-muted-foreground">
                                Certificate of incorporation, registration with education ministry
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <FileText className="w-8 h-8 text-muted-foreground" />
                            <div className="flex-1">
                              <h4 className="font-medium">Top Official ID & Endorsement Letter</h4>
                              <p className="text-sm text-muted-foreground">
                                ID copy and signed endorsement letter from the top official
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Camera className="w-8 h-8 text-muted-foreground" />
                            <div className="flex-1">
                              <h4 className="font-medium">Facility Photos</h4>
                              <p className="text-sm text-muted-foreground">
                                Photos of classrooms, prayer area, and other facilities
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-dashed">
                        <CardContent className="p-6">
                          <div className="flex items-center space-x-4">
                            <Camera className="w-8 h-8 text-muted-foreground" />
                            <div className="flex-1">
                              <h4 className="font-medium">Video Walkthrough (Optional)</h4>
                              <p className="text-sm text-muted-foreground">
                                Short video tour of your facilities (max 5 minutes)
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Review & Submit */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">Application Review</h3>
                    <p className="text-sm text-muted-foreground">
                      Please review your application details before submitting. Once submitted, your application will
                      enter the verification process.
                    </p>

                    <div className="grid gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Organization Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div>
                            <strong>Name:</strong> {formData.organizationName || "Not provided"}
                          </div>
                          <div>
                            <strong>Type:</strong> {formData.organizationType || "Not provided"}
                          </div>
                          <div>
                            <strong>Top Official:</strong> {formData.topOfficialName || "Not provided"}
                          </div>
                          <div>
                            <strong>Established:</strong> {formData.establishedYear || "Not provided"}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Location & Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                          <div>
                            <strong>Address:</strong> {formData.address || "Not provided"}
                          </div>
                          <div>
                            <strong>Location:</strong> {formData.lga}, {formData.state}, {formData.country}
                          </div>
                          <div>
                            <strong>Email:</strong> {formData.contactEmail || "Not provided"}
                          </div>
                          <div>
                            <strong>Phone:</strong> {formData.contactPhone || "Not provided"}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="agreement"
                          checked={formData.agreementAccepted}
                          onCheckedChange={(checked) =>
                            setFormData({ ...formData, agreementAccepted: checked as boolean })
                          }
                        />
                        <Label htmlFor="agreement" className="text-sm">
                          I agree to the AL-MURATTAL NETWORK Terms & Conditions and Privacy Policy
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="accuracy" />
                        <Label htmlFor="accuracy" className="text-sm">
                          I certify that all information provided is accurate and complete
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                {currentStep < VERIFICATION_STEPS.length ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={!formData.agreementAccepted}>
                    Submit Application
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Process Info */}
        <div className="mt-12 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Verification Process Timeline</span>
              </CardTitle>
              <CardDescription>
                Understanding the steps your application will go through after submission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: "LGA Review", time: "3-5 days", description: "Local Government Area verification" },
                  { step: "State Review", time: "5-7 days", description: "State-level approval process" },
                  { step: "Country Review", time: "7-10 days", description: "Country headquarters review" },
                  { step: "HQ Review", time: "10-14 days", description: "Final approval by Global HQ" },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-primary font-semibold">{index + 1}</span>
                    </div>
                    <h4 className="font-medium text-foreground">{item.step}</h4>
                    <p className="text-sm text-muted-foreground">{item.time}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
