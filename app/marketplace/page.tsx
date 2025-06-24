import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, MapPin, Calendar, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Medicine Marketplace - VitaMend",
  description: "Find available medicines donated by the community",
}

// Mock data for available medicines
const availableMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    quantity: 50,
    expiryDate: "2025-12-31",
    location: "New York, NY",
    donor: "Anonymous",
    verified: true,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    category: "Antibiotic",
    quantity: 30,
    expiryDate: "2025-08-15",
    location: "Los Angeles, CA",
    donor: "John D.",
    verified: true,
  },
  {
    id: 3,
    name: "Metformin 500mg",
    category: "Diabetes",
    quantity: 100,
    expiryDate: "2026-03-20",
    location: "Chicago, IL",
    donor: "Sarah M.",
    verified: true,
  },
  {
    id: 4,
    name: "Lisinopril 10mg",
    category: "Blood Pressure",
    quantity: 60,
    expiryDate: "2025-11-10",
    location: "Houston, TX",
    donor: "Anonymous",
    verified: true,
  },
]

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#1a472a] mb-4">Medicine Marketplace</h1>
          <p className="text-xl text-muted-foreground">Find available medicines donated by our community</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search for medicines..." className="pl-10" />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Medicines Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableMedicines.map((medicine) => (
            <Card key={medicine.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{medicine.name}</CardTitle>
                    <CardDescription>{medicine.category}</CardDescription>
                  </div>
                  {medicine.verified && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Verified
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>Quantity: {medicine.quantity} units</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Expires: {new Date(medicine.expiryDate).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{medicine.location}</span>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Donated by: </span>
                  <span className="font-medium">{medicine.donor}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-[#1a472a] hover:bg-[#1a472a]/90">Request Medicine</Button>
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State Message */}
        {availableMedicines.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No medicines available</h3>
              <p className="text-muted-foreground mb-4">Be the first to donate medicines to help others in need.</p>
              <Button className="bg-[#1a472a] hover:bg-[#1a472a]/90">Donate Medicines</Button>
            </CardContent>
          </Card>
        )}

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-[#1a472a] to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Can't Find What You Need?</h2>
            <p className="text-lg mb-6 opacity-90">
              Submit a request and we'll notify you when the medicine becomes available.
            </p>
            <Button variant="secondary" size="lg">
              Submit Medicine Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
