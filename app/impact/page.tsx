import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Package, Globe, TrendingUp, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Our Impact - VitaMend",
  description: "See the positive impact VitaMend is making in communities worldwide",
}

export default function ImpactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">Our Impact</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Together, we're making a real difference in healthcare accessibility and reducing medicine waste worldwide.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a472a] mb-2">15,247</div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a472a] mb-2">28,593</div>
              <div className="text-sm text-muted-foreground">Medicines Donated</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a472a] mb-2">1,847</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-[#1a472a] mb-2">127</div>
              <div className="text-sm text-muted-foreground">Partner NGOs</div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Towards Goals */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#1a472a]" />
              2024 Goals Progress
            </CardTitle>
            <CardDescription>Our commitment to expanding healthcare access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Medicines Donated</span>
                <span className="text-sm text-muted-foreground">28,593 / 50,000</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Lives Impacted</span>
                <span className="text-sm text-muted-foreground">15,247 / 25,000</span>
              </div>
              <Progress value={61} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Partner NGOs</span>
                <span className="text-sm text-muted-foreground">127 / 200</span>
              </div>
              <Progress value={64} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Impact Stories */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Community Health Centers</CardTitle>
              <CardDescription>Supporting rural healthcare facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Through partnerships with local NGOs, we've supplied essential medicines to 45 community health centers
                in underserved areas, ensuring continuous care for over 8,000 patients.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Rural Healthcare</Badge>
                <Badge variant="secondary">8,000+ Patients</Badge>
                <Badge variant="secondary">45 Centers</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Emergency Relief</CardTitle>
              <CardDescription>Rapid response during crises</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                During natural disasters and health emergencies, our network mobilized to provide critical medicines
                within 24 hours, supporting relief efforts and saving lives when it mattered most.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Emergency Response</Badge>
                <Badge variant="secondary">24hr Delivery</Badge>
                <Badge variant="secondary">Crisis Support</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Environmental Impact
            </CardTitle>
            <CardDescription>Reducing pharmaceutical waste and carbon footprint</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">2.4 tons</div>
                <div className="text-sm text-muted-foreground">Medicine Waste Prevented</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">1,200 kg</div>
                <div className="text-sm text-muted-foreground">CO₂ Emissions Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-sm text-muted-foreground">Donation Success Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card className="bg-gradient-to-r from-[#1a472a] to-green-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Award className="h-8 w-8" />
              <div>
                <h2 className="text-2xl font-bold">Recognition & Awards</h2>
                <p className="opacity-90">Acknowledged for our contribution to healthcare accessibility</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Healthcare Innovation Award 2024</h3>
                <p className="text-sm opacity-90">
                  Recognized by the Global Health Foundation for innovative approach to medicine redistribution.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sustainability Excellence 2024</h3>
                <p className="text-sm opacity-90">
                  Honored for significant contribution to reducing pharmaceutical waste and environmental impact.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
