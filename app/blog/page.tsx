import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - VitaMend",
  description: "Latest news, stories, and insights from the VitaMend community",
}

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Hidden Crisis: Medicine Waste in Developed Countries",
    excerpt:
      "Every year, billions of dollars worth of medicines go to waste while millions lack access to basic healthcare. Learn about this hidden crisis and how we can solve it together.",
    author: "Rachit",
    date: "2024-01-15",
    category: "Healthcare",
    readTime: "5 min read",
    image: "/placeholder.svg?height=200&width=400",
    featured: true,
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Medicine Verification",
    excerpt:
      "Discover how artificial intelligence and machine learning are making medicine donation safer and more efficient through automated verification processes.",
    author: "Rachit",
    date: "2024-01-10",
    category: "Technology",
    readTime: "7 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Success Story: Rural Clinic Saves 200 Lives",
    excerpt:
      "Read the inspiring story of how donated medicines helped a rural clinic in Kenya provide life-saving treatment to over 200 patients during a health crisis.",
    author: "Dr. Sarah Johnson",
    date: "2024-01-05",
    category: "Impact Stories",
    readTime: "4 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Building Sustainable Healthcare Networks",
    excerpt:
      "Exploring how community-driven medicine donation creates sustainable healthcare networks that benefit everyone involved.",
    author: "Rachit",
    date: "2023-12-28",
    category: "Sustainability",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "The Science Behind Safe Medicine Redistribution",
    excerpt:
      "Understanding the rigorous processes and safety measures that ensure donated medicines maintain their efficacy and safety.",
    author: "Dr. Michael Chen",
    date: "2023-12-20",
    category: "Safety",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">VitaMend Blog</h1>
          <p className="text-xl text-muted-foreground">
            Stories, insights, and updates from our mission to make healthcare accessible
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={featuredPost.image || "/placeholder.svg"}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-8">
                <Badge className="mb-4 bg-[#1a472a] hover:bg-[#1a472a]/90">Featured</Badge>
                <h2 className="text-2xl font-bold mb-4 text-[#1a472a]">{featuredPost.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(featuredPost.date).toLocaleDateString()}
                  </div>
                  <Badge variant="outline">{featuredPost.category}</Badge>
                </div>
                <Button className="bg-[#1a472a] hover:bg-[#1a472a]/90">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button variant="outline" size="sm">
            All Posts
          </Button>
          <Button variant="outline" size="sm">
            Healthcare
          </Button>
          <Button variant="outline" size="sm">
            Technology
          </Button>
          <Button variant="outline" size="sm">
            Impact Stories
          </Button>
          <Button variant="outline" size="sm">
            Sustainability
          </Button>
          <Button variant="outline" size="sm">
            Safety
          </Button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-4 text-[#1a472a] hover:text-[#1a472a]/90">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-gradient-to-r from-[#1a472a] to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-6 opacity-90">
              Get the latest stories and updates from VitaMend delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-gray-900"
              />
              <Button variant="secondary">Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
