import type { Metadata } from "next"
import { VolunteerForm } from "./volunteer-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Clock, MapPin, Award, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Volunteer - VitaMend",
  description: "Join our community of volunteers and help make a difference",
}

export default function VolunteerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">Become a Volunteer</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our community of dedicated volunteers and help us bridge the gap between unused medicines and those who
            need them most.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Volunteer Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Volunteer Application
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and how you'd like to contribute to our mission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <VolunteerForm />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            {/* Volunteer Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Volunteer Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Medicine Verification</div>
                    <div className="text-sm text-muted-foreground">Help verify donated medicines for safety</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Collection & Delivery</div>
                    <div className="text-sm text-muted-foreground">Assist with pickup and distribution</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Community Outreach</div>
                    <div className="text-sm text-muted-foreground">Spread awareness in your community</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <div className="font-medium">Administrative Support</div>
                    <div className="text-sm text-muted-foreground">Help with data entry and coordination</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">18+ years old</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Background check (for some roles)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Commitment to our mission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Reliable transportation (for some roles)</span>
                </div>
              </CardContent>
            </Card>

            {/* Time Commitment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  Time Commitment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="font-medium">Flexible Schedule</div>
                  <div className="text-sm text-muted-foreground">Choose hours that work for you</div>
                  <Badge variant="outline" className="mt-1">
                    2-10 hours/week
                  </Badge>
                </div>
                <div>
                  <div className="font-medium">Remote Options</div>
                  <div className="text-sm text-muted-foreground">Many roles can be done from home</div>
                  <Badge variant="outline" className="mt-1">
                    Work from anywhere
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Volunteer Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Make a real difference in people's lives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Join a passionate community</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Gain valuable experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Flexible location options</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-[#1a472a] to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-6 opacity-90">
              Every volunteer makes our mission possible. Join us today and help save lives through medicine donation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm opacity-90">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm opacity-90">Hours Contributed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">25K+</div>
                <div className="text-sm opacity-90">Lives Impacted</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
