import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Shield, Globe, Award, Target } from "lucide-react"

export const metadata: Metadata = {
  title: "About VitaMend - Medicine Donation Platform",
  description: "Learn about VitaMend's mission to connect unused medicines with those in need",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">About VitaMend</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bridging the gap between unused medicines and those who need them most, creating a sustainable healthcare
            ecosystem for everyone.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-[#1a472a]" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              VitaMend exists to solve the critical problem of medicine waste while ensuring that life-saving
              medications reach those who cannot afford them. We believe healthcare is a fundamental right, and unused
              medicines should never go to waste when people are suffering without access to basic medications.
            </p>
          </CardContent>
        </Card>

        {/* Values Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Compassion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Every donation is an act of compassion, connecting hearts across communities.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                Safety First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Rigorous verification ensures only safe, unexpired medicines reach recipients.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-500" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Building a network of donors, volunteers, and NGOs working together.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                Sustainability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Reducing pharmaceutical waste while promoting environmental responsibility.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Excellence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Committed to the highest standards in medicine verification and distribution.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-[#1a472a]" />
                Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Measuring success by lives improved and communities strengthened.</p>
            </CardContent>
          </Card>
        </div>

        {/* Statistics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Impact So Far</CardTitle>
            <CardDescription>Making a difference, one donation at a time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a472a]">10K+</div>
                <div className="text-sm text-muted-foreground">Medicines Donated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a472a]">5K+</div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a472a]">500+</div>
                <div className="text-sm text-muted-foreground">Active Donors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#1a472a]">50+</div>
                <div className="text-sm text-muted-foreground">Partner NGOs</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle>Meet the Developer</CardTitle>
            <CardDescription>The mind behind VitaMend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 bg-gradient-to-br from-[#1a472a] to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                R
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Rachit</h3>
                <p className="text-muted-foreground mb-4">Full-Stack Developer & Healthcare Technology Enthusiast</p>
                <p className="leading-relaxed">
                  Passionate about using technology to solve real-world healthcare problems. Rachit developed VitaMend
                  to bridge the gap between medicine waste and healthcare accessibility, combining technical expertise
                  with social impact.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">AI/ML</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
