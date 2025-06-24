/**
 * About the Developer Page
 * VitaMend Project - Created by Rachit
 */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Code, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function DeveloperPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Meet the Developer</h1>
          <p className="text-xl text-gray-600">Learn about the person behind VitaMend</p>
        </div>

        {/* Developer Profile */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">R</span>
            </div>
            <CardTitle className="text-2xl">Rachit</CardTitle>
            <CardDescription className="text-lg">
              Full-Stack Developer & Healthcare Technology Enthusiast
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-4 mb-6">
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/rachit" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://linkedin.com/in/rachit" target="_blank">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="mailto:rachit@vitamend.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                The Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                VitaMend was born from a simple yet powerful idea: unused medicines shouldn't go to waste when millions
                lack access to basic healthcare. As a developer passionate about social impact, I created this platform
                to bridge the gap between medicine surplus and scarcity.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                The Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                To create a sustainable ecosystem where technology enables communities to share healthcare resources
                efficiently, safely, and transparently. Every line of code in VitaMend is written with the goal of
                making healthcare more accessible.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Technical Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5 text-blue-500" />
              Technical Stack
            </CardTitle>
            <CardDescription>Technologies used to build VitaMend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Next.js 14</Badge>
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="secondary">MongoDB</Badge>
              <Badge variant="secondary">Tailwind CSS</Badge>
              <Badge variant="secondary">NextAuth.js</Badge>
              <Badge variant="secondary">AI/ML Integration</Badge>
              <Badge variant="secondary">OCR Technology</Badge>
              <Badge variant="secondary">PWA</Badge>
              <Badge variant="secondary">GraphQL</Badge>
              <Badge variant="secondary">Node.js</Badge>
              <Badge variant="secondary">Vercel</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Project Features */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Features Developed</CardTitle>
            <CardDescription>Core functionalities built into VitaMend</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  AI-powered medicine verification
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  OCR for expiry date detection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Real-time notification system
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Multi-role authentication
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Progressive Web App (PWA)
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Sustainability impact tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  NGO partnership dashboard
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Medicine recall monitoring
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Comprehensive analytics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  API SDK for integrations
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Let's Connect</CardTitle>
            <CardDescription>Interested in collaborating or have questions about VitaMend?</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="mailto:rachit@vitamend.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/rachit/vitamend" target="_blank">
                  <Github className="h-4 w-4 mr-2" />
                  View Source Code
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
