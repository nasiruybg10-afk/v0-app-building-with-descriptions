"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, Calendar } from "lucide-react"
import Link from "next/link"

interface DonationCardProps {
  campaign: {
    id: number
    title: string
    organization: string
    organizationId: number
    description: string
    goal: number
    raised: number
    donors: number
    daysLeft: number
    category: string
    featured: boolean
  }
  onDonate?: (campaignId: number) => void
}

export function DonationCard({ campaign, onDonate }: DonationCardProps) {
  const progress = (campaign.raised / campaign.goal) * 100

  return (
    <Card className={`hover:shadow-lg transition-shadow ${campaign.featured ? "border-primary/20" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{campaign.category}</Badge>
            {campaign.featured && (
              <Badge variant="default" className="bg-primary">
                Featured
              </Badge>
            )}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {campaign.daysLeft} days left
          </div>
        </div>
        <CardTitle className="text-lg">{campaign.title}</CardTitle>
        <CardDescription className="line-clamp-2">{campaign.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress</span>
              <span>
                ${campaign.raised.toLocaleString()} / ${campaign.goal.toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{Math.round(progress)}% funded</span>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {campaign.donors} donors
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link href={`/schools/${campaign.organizationId}`} className="text-sm text-primary hover:underline">
              {campaign.organization}
            </Link>
            <Button size="sm" onClick={() => onDonate?.(campaign.id)}>
              <Heart className="w-4 h-4 mr-1" />
              Donate
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
