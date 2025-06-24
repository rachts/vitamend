import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Clock, AlertTriangle, Package, Calendar, MapPin, User } from "lucide-react"

export const metadata: Metadata = {
  title: "Medicine Verification - VitaMend Reviewer",
  description: "Review and verify donated medicines for safety and authenticity",
}

// Mock donation data for verification
const pendingDonations = [
  {
    id: 1,
    medicineName: "Paracetamol 500mg",
    brand: "Tylenol",
    quantity: 50,
    expiryDate: "2025-12-31",
    batchNumber: "TY2024001",
    donorName: "John Doe",
    donorLocation: "New York, NY",
    submittedDate: "2024-01-20",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Pain Relief",
    prescription: false,
    condition: "Unopened",
    priority: "normal",
  },
  {
    id: 2,
    medicineName: "Amoxicillin 250mg",
    brand: "Generic",
    quantity: 30,
    expiryDate: "2025-08-15",
    batchNumber: "AMX2024002",
    donorName: "Jane Smith",
    donorLocation: "Los Angeles, CA",
    submittedDate: "2024-01-19",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Antibiotic",
    prescription: true,
    condition: "Unopened",
    priority: "high",
  },
  {
    id: 3,
    medicineName: "Metformin 500mg",
    brand: "Glucophage",
    quantity: 100,
    expiryDate: "2026-03-20",
    batchNumber: "MET2024003",
    donorName: "Anonymous",
    donorLocation: "Chicago, IL",
    submittedDate: "2024-01-18",
    images: ["/placeholder.svg?height=200&width=200"],
    category: "Diabetes",
    prescription: true,
    condition: "Unopened",
    priority: "normal",
  },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-green-100 text-green-800"
  }
}

export default function ReviewerVerifyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a472a] mb-4">Medicine Verification</h1>
          <p className="text-xl text-muted-foreground">
            Review and verify donated medicines to ensure safety and authenticity
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold">23</div>
                  <div className="text-sm text-muted-foreground">Pending Review</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Approved Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">Rejected Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <div className="text-sm text-muted-foreground">High Priority</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert for urgent items */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Urgent:</strong> 3 high-priority medicine donations require immediate verification. These are
            critical medicines needed for emergency cases.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Review (23)</TabsTrigger>
            <TabsTrigger value="approved">Recently Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Items</TabsTrigger>
            <TabsTrigger value="guidelines">Verification Guidelines</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-6">
              {pendingDonations.map((donation) => (
                <Card key={donation.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Package className="h-5 w-5 text-[#1a472a]" />
                          {donation.medicineName}
                        </CardTitle>
                        <CardDescription>
                          {donation.brand} • Batch: {donation.batchNumber}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(donation.priority)}>{donation.priority} priority</Badge>
                        {donation.prescription && <Badge variant="outline">Prescription Required</Badge>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      {/* Medicine Image */}
                      <div>
                        <img
                          src={donation.images[0] || "/placeholder.svg"}
                          alt={donation.medicineName}
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                      </div>

                      {/* Medicine Details */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Category</div>
                            <div>{donation.category}</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Quantity</div>
                            <div>{donation.quantity} units</div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Expiry Date</div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(donation.expiryDate).toLocaleDateString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Condition</div>
                            <div>{donation.condition}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">Donor Information</div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {donation.donorName}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {donation.donorLocation}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Submitted</div>
                          <div>{new Date(donation.submittedDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      {/* Verification Actions */}
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">Verification Checklist</div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id={`packaging-${donation.id}`} />
                              <label htmlFor={`packaging-${donation.id}`} className="text-sm">
                                Original packaging intact
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id={`expiry-${donation.id}`} />
                              <label htmlFor={`expiry-${donation.id}`} className="text-sm">
                                Expiry date valid (6+ months)
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id={`batch-${donation.id}`} />
                              <label htmlFor={`batch-${donation.id}`} className="text-sm">
                                Batch number verified
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <input type="checkbox" id={`condition-${donation.id}`} />
                              <label htmlFor={`condition-${donation.id}`} className="text-sm">
                                Physical condition good
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button variant="outline" className="w-full">
                            Request More Info
                          </Button>
                          <Button variant="destructive" className="w-full">
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardHeader>
                <CardTitle>Recently Approved Medicines</CardTitle>
                <CardDescription>Medicines you've approved in the last 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Recently approved medicines would be listed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardHeader>
                <CardTitle>Rejected Medicines</CardTitle>
                <CardDescription>Medicines that didn't meet verification criteria</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  Rejected medicines with reasons would be listed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Approval Criteria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Original Packaging</div>
                      <div className="text-sm text-muted-foreground">Unopened, sealed, with all original labels</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Valid Expiry Date</div>
                      <div className="text-sm text-muted-foreground">At least 6 months before expiration</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Proper Storage</div>
                      <div className="text-sm text-muted-foreground">No signs of heat, moisture, or light damage</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Verified Batch</div>
                      <div className="text-sm text-muted-foreground">Batch number matches manufacturer records</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Rejection Criteria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Opened Packaging</div>
                      <div className="text-sm text-muted-foreground">Any signs of tampering or opening</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Expired or Near-Expiry</div>
                      <div className="text-sm text-muted-foreground">Less than 6 months until expiration</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Controlled Substances</div>
                      <div className="text-sm text-muted-foreground">Narcotics, psychotropics, or restricted drugs</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <div className="font-medium">Damaged Condition</div>
                      <div className="text-sm text-muted-foreground">
                        Physical damage, discoloration, or contamination
                      </div>
                    </div>
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
