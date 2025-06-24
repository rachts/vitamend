"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Package, Award, TrendingUp } from "lucide-react"
import Link from "next/link"

interface DashboardData {
  donations: any[]
  volunteerStats: {
    hoursContributed: number
    activitiesCompleted: number
    impactScore: number
  }
  credits: number
  recentActivity: any[]
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("/api/dashboard")
      const data = await response.json()
      setDashboardData(data)
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return <div className="flex items-center justify-center min-h-screen">Please sign in</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "collected":
        return "bg-blue-100 text-blue-800"
      case "distributed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-[#f8faff]">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1a472a]">Welcome back, {session.user.name}!</h1>
          <p className="text-[#2d3748] mt-2">Track your impact and manage your contributions to VitaMend</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credits</CardTitle>
              <Award className="h-4 w-4 text-[#2ea043]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2ea043]">{dashboardData?.credits || 0}</div>
              <p className="text-xs text-muted-foreground">Earned from donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Donations Made</CardTitle>
              <Package className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0ea5e9]">{dashboardData?.donations?.length || 0}</div>
              <p className="text-xs text-muted-foreground">Medicine donations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Volunteer Hours</CardTitle>
              <Heart className="h-4 w-4 text-[#1a472a]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1a472a]">
                {dashboardData?.volunteerStats?.hoursContributed || 0}
              </div>
              <p className="text-xs text-muted-foreground">Hours contributed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#2ea043]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2ea043]">{dashboardData?.volunteerStats?.impactScore || 0}</div>
              <p className="text-xs text-muted-foreground">Lives impacted</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations">My Donations</TabsTrigger>
            <TabsTrigger value="volunteer">Volunteer Activity</TabsTrigger>
            <TabsTrigger value="credits">Credits & Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="donations" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#1a472a]">Donation History</h2>
              <Button asChild className="bg-[#2ea043] hover:bg-[#2ea043]/90">
                <Link href="/donate">New Donation</Link>
              </Button>
            </div>

            <div className="space-y-4">
              {dashboardData?.donations?.map((donation, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Donation #{donation._id?.slice(-6)}</h3>
                        <p className="text-sm text-muted-foreground">
                          {donation.medicines?.length || 0} medicines •{" "}
                          {new Date(donation.createdAt).toLocaleDateString()}
                        </p>
                        {donation.verificationNotes && (
                          <p className="text-sm mt-2 text-[#2d3748]">{donation.verificationNotes}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                        {donation.creditsEarned > 0 && (
                          <p className="text-sm text-[#2ea043] mt-1">+{donation.creditsEarned} credits</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) || (
                <Card>
                  <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">No donations yet. Start making a difference today!</p>
                    <Button asChild className="mt-4 bg-[#2ea043] hover:bg-[#2ea043]/90">
                      <Link href="/donate">Make Your First Donation</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="volunteer" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#1a472a]">Volunteer Activity</h2>
              <Button asChild className="bg-[#2ea043] hover:bg-[#2ea043]/90">
                <Link href="/volunteer">Find Opportunities</Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a472a]">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Medicine Collection</span>
                      <span className="text-sm text-muted-foreground">2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quality Control</span>
                      <span className="text-sm text-muted-foreground">3 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Community Outreach</span>
                      <span className="text-sm text-muted-foreground">1 hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-[#1a472a]">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-[#2ea043]" />
                      <span className="text-sm">First Time Volunteer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-[#2ea043]" />
                      <span className="text-sm">Community Helper</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="credits" className="space-y-4">
            <h2 className="text-xl font-semibold text-[#1a472a]">Credits & Rewards</h2>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">How to Earn Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Donate unexpired medicines</span>
                    <span className="text-[#2ea043] font-medium">10-50 credits</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Volunteer for collection</span>
                    <span className="text-[#2ea043] font-medium">20 credits/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality control assistance</span>
                    <span className="text-[#2ea043] font-medium">25 credits/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Community outreach</span>
                    <span className="text-[#2ea043] font-medium">15 credits/hour</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Redeem Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Use your credits to access subsidized medicines or donate to others in need.
                </p>
                <Button className="bg-[#2ea043] hover:bg-[#2ea043]/90">Browse Marketplace</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
