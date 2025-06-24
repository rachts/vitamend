import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Award, Heart, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Profile - VitaMend",
  description: "Manage your VitaMend profile and donation history",
}

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">My Profile</h1>
          <p className="text-xl text-muted-foreground">Manage your account and track your impact</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="donations">Donations</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.doe@example.com" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea id="address" defaultValue="123 Main St, New York, NY 10001" />
                    </div>

                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself and why you support VitaMend..."
                        defaultValue="Passionate about making healthcare accessible to everyone. Happy to contribute to this amazing cause."
                      />
                    </div>

                    <Button className="bg-[#1a472a] hover:bg-[#1a472a]/90">Save Changes</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Profile Summary */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#1a472a] to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      JD
                    </div>
                    <h3 className="font-semibold text-lg">John Doe</h3>
                    <p className="text-muted-foreground">Active Donor</p>
                    <Badge className="mt-2 bg-[#1a472a] hover:bg-[#1a472a]/90">Verified Member</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#1a472a]" />
                        <span className="text-sm">Donations</span>
                      </div>
                      <span className="font-semibold">12</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Lives Impacted</span>
                      </div>
                      <span className="font-semibold">47</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Member Since</span>
                      </div>
                      <span className="font-semibold">Jan 2024</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Donations Tab */}
          <TabsContent value="donations">
            <Card>
              <CardHeader>
                <CardTitle>Donation History</CardTitle>
                <CardDescription>Track all your medicine donations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((donation) => (
                    <div key={donation} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">Paracetamol 500mg</h4>
                        <p className="text-sm text-muted-foreground">Donated on Jan 15, 2024</p>
                        <Badge variant="outline" className="mt-1">
                          Delivered
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">50 tablets</p>
                        <p className="text-sm text-muted-foreground">Helped 12 people</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Impact</CardTitle>
                  <CardDescription>See how your donations are making a difference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1a472a]">47</div>
                      <div className="text-sm text-muted-foreground">Lives Impacted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1a472a]">12</div>
                      <div className="text-sm text-muted-foreground">Successful Donations</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-[#1a472a]">$2,340</div>
                      <div className="text-sm text-muted-foreground">Estimated Value Donated</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your contribution milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="font-semibold">First Donation</div>
                        <div className="text-sm text-muted-foreground">Made your first medicine donation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <div className="font-semibold">Helping Hand</div>
                        <div className="text-sm text-muted-foreground">Helped 25+ people with your donations</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold text-muted-foreground">Community Hero</div>
                        <div className="text-sm text-muted-foreground">Help 100+ people (22/100)</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-muted-foreground">Receive updates about your donations</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Impact Reports</div>
                      <div className="text-sm text-muted-foreground">Monthly reports about your impact</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">New Opportunities</div>
                      <div className="text-sm text-muted-foreground">Alerts about new donation opportunities</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Public Profile</div>
                      <div className="text-sm text-muted-foreground">Show your profile to other users</div>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Show Donation History</div>
                      <div className="text-sm text-muted-foreground">Display your donations publicly</div>
                    </div>
                    <input type="checkbox" className="rounded" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
