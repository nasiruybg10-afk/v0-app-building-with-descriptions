import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface SchoolCardProps {
  school: {
    id: number
    name: string
    type: string
    address: string
    country: string
    state: string
    lga: string
    contact_email: string
    contact_phone: string
    description: string
    curriculum: string[]
    verified: boolean
    boarding: boolean
    womenFriendly: boolean
    scholarships: boolean
    students: number
    established: number
  }
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-xl">
                <Link href={`/schools/${school.id}`} className="hover:text-primary transition-colors">
                  {school.name}
                </Link>
              </CardTitle>
              {school.verified && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <span className="mr-1">✅</span>
                  Verified
                </Badge>
              )}
            </div>
            <CardDescription className="flex items-center text-muted-foreground mb-2">
              <span className="mr-1">📍</span>
              {school.address}
            </CardDescription>
            <p className="text-sm text-muted-foreground">{school.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Est. {school.established}</div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <span className="mr-1">👥</span>
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
                <span className="mr-1">📧</span>
                Email
              </a>
              <a
                href={`tel:${school.contact_phone}`}
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="mr-1">📞</span>
                Call
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/schools/${school.id}`}>View Profile</Link>
              </Button>
              <Button size="sm">
                <span className="mr-1">🔗</span>
                Donate
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
