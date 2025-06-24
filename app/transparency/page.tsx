"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Eye, Shield, Users, TrendingUp, MapPin, Calendar } from "lucide-react"

interface TransparencyData {
  overview: {
    totalDonations: number
    verifiedMedicines: number
    distributedMedicines: number
    activeBeneficiaries: number
    partnerOrganizations: number
  }
  distribution: Array<{
    organization: string
    location: string
    medicinesReceived: number
    beneficiaries: number
    lastDistribution: string
  }>
  verification: {
    totalProcessed: number
    approved: number
    rejected: number
    pending: number
    averageProcessingTime: number
  }
  financials: {
    operatingCosts: number
    adminPercentage: number
    programPercentage: number
    fundraisingPercentage: number
  }
  impact: {
    livesImpacted: number
    communitiesServed: number
    wasteReduced: number
    co2Saved: number
  }
}

export default function TransparencyPage() {
  const [data, setData] = useState<TransparencyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTransparencyData()
  }, [])

  const fetchTransparencyData = async () => {
    try {
      const response = await fetch("/api/transparency")
      const transparencyData = await response.json()
      setData(transparencyData)
    } catch (error) {
      console.error("Failed to fetch transparency data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!data) {
    return <div className="flex items-center justify-center min-h-screen">Failed to load data</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf8] to-[#f8faff]">
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1a472a] mb-4">Transparency & Accountability</h1>
          <p className="text-lg text-[#2d3748] max-w-3xl mx-auto">
            We believe in complete transparency about how your donations are processed, verified, and distributed to
            those in need. Here's exactly where your medicines go and the impact they create.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
              <Eye className="h-4 w-4 text-[#2ea043]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2ea043]">{data.overview.totalDonations.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Verified Medicines</CardTitle>
              <Shield className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0ea5e9]">
                {data.overview.verifiedMedicines.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Distributed</CardTitle>
              <Users className="h-4 w-4 text-[#1a472a]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1a472a]">
                {data.overview.distributedMedicines.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
              <TrendingUp className="h-4 w-4 text-[#2ea043]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#2ea043]">
                {data.overview.activeBeneficiaries.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner NGOs</CardTitle>
              <MapPin className="h-4 w-4 text-[#0ea5e9]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#0ea5e9]">{data.overview.partnerOrganizations}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="distribution" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          <TabsContent value="distribution" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Where Your Medicines Go</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Real-time tracking of medicine distribution to our verified partner organizations
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.distribution.map((org, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{org.organization}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {org.location}
                          </p>
                        </div>
                        <Badge variant="outline">{org.beneficiaries} beneficiaries</Badge>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4 mt-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Medicines Received</p>
                          <p className="font-medium">{org.medicinesReceived.toLocaleString()} units</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Distribution</p>
                          <p className="font-medium flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(org.lastDistribution).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Verification Process Transparency</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How we ensure every medicine meets our safety and quality standards
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Verification Statistics</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Approved</span>
                          <span>
                            {data.verification.approved} (
                            {((data.verification.approved / data.verification.totalProcessed) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <Progress
                          value={(data.verification.approved / data.verification.totalProcessed) * 100}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Rejected</span>
                          <span>
                            {data.verification.rejected} (
                            {((data.verification.rejected / data.verification.totalProcessed) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <Progress
                          value={(data.verification.rejected / data.verification.totalProcessed) * 100}
                          className="h-2"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pending</span>
                          <span>{data.verification.pending}</span>
                        </div>
                        <Progress
                          value={(data.verification.pending / data.verification.totalProcessed) * 100}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Process Efficiency</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Average Processing Time</span>
                        <span className="font-medium">{data.verification.averageProcessingTime} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Quality Assurance Rate</span>
                        <span className="font-medium">99.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Pharmacist Reviewers</span>
                        <span className="font-medium">12 certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Verification Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Acceptance Criteria</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Minimum 6 months before expiry</li>
                      <li>• Original packaging intact</li>
                      <li>• Proper storage conditions maintained</li>
                      <li>• Valid batch numbers</li>
                      <li>• No controlled substances</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Rejection Reasons</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Expired or near-expiry medicines</li>
                      <li>• Damaged packaging</li>
                      <li>• Improper storage evidence</li>
                      <li>• Missing or unclear labeling</li>
                      <li>• Recalled medications</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Financial Transparency</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How we use resources to maximize impact and maintain operations
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Resource Allocation</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Program Activities</span>
                          <span>{data.financials.programPercentage}%</span>
                        </div>
                        <Progress value={data.financials.programPercentage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Administrative Costs</span>
                          <span>{data.financials.adminPercentage}%</span>
                        </div>
                        <Progress value={data.financials.adminPercentage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Fundraising</span>
                          <span>{data.financials.fundraisingPercentage}%</span>
                        </div>
                        <Progress value={data.financials.fundraisingPercentage} className="h-2" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Operating Efficiency</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Cost per medicine processed</span>
                        <span className="font-medium">$0.85</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Cost per beneficiary reached</span>
                        <span className="font-medium">$12.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Volunteer contribution value</span>
                        <span className="font-medium">$45,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Accountability Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">External Oversight</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Annual independent audit</li>
                      <li>• Board of directors oversight</li>
                      <li>• Regulatory compliance monitoring</li>
                      <li>• Partner organization verification</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Reporting Standards</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Monthly impact reports</li>
                      <li>• Quarterly financial statements</li>
                      <li>• Annual sustainability report</li>
                      <li>• Real-time donation tracking</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Measurable Impact</CardTitle>
                <p className="text-sm text-muted-foreground">
                  The real-world difference your donations make in communities
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2ea043] mb-2">
                      {data.impact.livesImpacted.toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Lives Directly Impacted</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#0ea5e9] mb-2">{data.impact.communitiesServed}</div>
                    <p className="text-sm text-muted-foreground">Communities Served</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#1a472a] mb-2">
                      {data.impact.wasteReduced.toFixed(1)} kg
                    </div>
                    <p className="text-sm text-muted-foreground">Medical Waste Prevented</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#2ea043] mb-2">{data.impact.co2Saved.toFixed(1)} kg</div>
                    <p className="text-sm text-muted-foreground">CO₂ Emissions Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-[#1a472a]">Impact Stories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-l-green-500 pl-4">
                    <h4 className="font-medium">Rural Health Clinic - Maharashtra</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Received 500 units of essential medicines, enabling treatment for 200+ patients who previously
                      couldn't afford medication. 95% reported improved health outcomes within 30 days.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-blue-500 pl-4">
                    <h4 className="font-medium">Community Health Center - Karnataka</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Emergency medicine supply during monsoon floods helped treat 150 patients with respiratory
                      infections and waterborne diseases, preventing potential epidemic.
                    </p>
                  </div>
                  <div className="border-l-4 border-l-purple-500 pl-4">
                    <h4 className="font-medium">Mobile Health Unit - Rajasthan</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Chronic disease medications enabled continuous treatment for 80 diabetes and hypertension patients
                      in remote villages, reducing emergency hospitalizations by 60%.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
