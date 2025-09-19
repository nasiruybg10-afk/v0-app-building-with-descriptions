import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Clock } from "lucide-react"
import Link from "next/link"

interface EventCardProps {
  event: {
    id: number
    title: string
    type: string
    description: string
    organizer: string
    organizerId: number
    startDate: string
    startTime: string
    endTime: string
    venue: string
    capacity: number
    registered: number
    ticketPrice: number
    featured: boolean
    tags: string[]
  }
}

const EVENT_TYPES = {
  musabaqah: { label: "Musabaqah", color: "bg-blue-500" },
  graduation: { label: "Graduation", color: "bg-green-500" },
  maulud: { label: "Maulud", color: "bg-purple-500" },
  walimah: { label: "Walīmah", color: "bg-orange-500" },
  seminar: { label: "Seminar", color: "bg-indigo-500" },
}

export function EventCard({ event }: EventCardProps) {
  const eventType = EVENT_TYPES[event.type as keyof typeof EVENT_TYPES]

  return (
    <Card className={`hover:shadow-lg transition-shadow ${event.featured ? "border-primary/20 bg-primary/5" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge className={`${eventType.color} text-white`}>{eventType.label}</Badge>
            {event.featured && (
              <Badge variant="outline" className="border-primary text-primary">
                Featured
              </Badge>
            )}
          </div>
          <span className="text-sm text-muted-foreground">{new Date(event.startDate).toLocaleDateString()}</span>
        </div>
        <CardTitle className="text-lg">
          <Link href={`/events/${event.id}`} className="hover:text-primary transition-colors">
            {event.title}
          </Link>
        </CardTitle>
        <CardDescription className="line-clamp-2">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
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

        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {event.ticketPrice === 0 ? "Free" : `₦${event.ticketPrice.toLocaleString()}`}
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href={`/events/${event.id}`}>View Details</Link>
            </Button>
            <Button size="sm">Register</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
