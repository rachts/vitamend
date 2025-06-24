"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, X } from "lucide-react"

interface VolunteerFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  dateOfBirth: string
  occupation: string
  skills: string[]
  availability: string[]
  experience: string
  motivation: string
  references: string
  emergencyContact: string
  emergencyPhone: string
  backgroundCheck: boolean
  terms: boolean
}

const skillOptions = [
  "Medical/Healthcare",
  "Transportation/Driving",
  "Data Entry",
  "Customer Service",
  "Marketing/Outreach",
  "Event Planning",
  "Translation",
  "Photography",
  "Social Media",
  "Administrative",
  "Teaching/Training",
  "Technology/IT",
]

const availabilityOptions = [
  "Monday Morning",
  "Monday Afternoon",
  "Monday Evening",
  "Tuesday Morning",
  "Tuesday Afternoon",
  "Tuesday Evening",
  "Wednesday Morning",
  "Wednesday Afternoon",
  "Wednesday Evening",
  "Thursday Morning",
  "Thursday Afternoon",
  "Thursday Evening",
  "Friday Morning",
  "Friday Afternoon",
  "Friday Evening",
  "Saturday Morning",
  "Saturday Afternoon",
  "Saturday Evening",
  "Sunday Morning",
  "Sunday Afternoon",
  "Sunday Evening",
  "Weekends Only",
  "Evenings Only",
  "Flexible Schedule",
]

export function VolunteerForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<VolunteerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    occupation: "",
    skills: [],
    availability: [],
    experience: "",
    motivation: "",
    references: "",
    emergencyContact: "",
    emergencyPhone: "",
    backgroundCheck: false,
    terms: false,
  })

  const handleInputChange = (field: keyof VolunteerFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayToggle = (field: "skills" | "availability", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((item) => item !== value) : [...prev[field], value],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/volunteer/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: "Application Submitted!",
          description: "Thank you for your interest in volunteering. We'll be in touch soon!",
        })

        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          dateOfBirth: "",
          occupation: "",
          skills: [],
          availability: [],
          experience: "",
          motivation: "",
          references: "",
          emergencyContact: "",
          emergencyPhone: "",
          backgroundCheck: false,
          terms: false,
        })
      } else {
        throw new Error("Failed to submit application")
      }
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => handleInputChange("occupation", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills & Interests */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Skills & Interests</h3>
          <div className="space-y-4">
            <div>
              <Label>Select your skills and areas of interest:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {skillOptions.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleArrayToggle("skills", skill)}
                  >
                    {skill}
                    {formData.skills.includes(skill) && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Availability */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Availability</h3>
          <div className="space-y-4">
            <div>
              <Label>When are you available to volunteer?</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {availabilityOptions.map((time) => (
                  <Badge
                    key={time}
                    variant={formData.availability.includes(time) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleArrayToggle("availability", time)}
                  >
                    {time}
                    {formData.availability.includes(time) && <X className="ml-1 h-3 w-3" />}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Experience & Motivation */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Experience & Motivation</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="experience">Previous Volunteer Experience</Label>
              <Textarea
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange("experience", e.target.value)}
                placeholder="Tell us about any previous volunteer work or relevant experience..."
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="motivation">Why do you want to volunteer with VitaMend? *</Label>
              <Textarea
                id="motivation"
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                placeholder="Share your motivation for joining our mission..."
                rows={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Emergency Contact</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="emergencyContact">Emergency Contact Name *</Label>
              <Input
                id="emergencyContact"
                value={formData.emergencyContact}
                onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="emergencyPhone">Emergency Contact Phone *</Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyPhone}
                onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* References */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">References</h3>
          <div>
            <Label htmlFor="references">Professional or Personal References</Label>
            <Textarea
              id="references"
              value={formData.references}
              onChange={(e) => handleInputChange("references", e.target.value)}
              placeholder="Please provide 2-3 references with names, relationships, and contact information..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Agreements */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Agreements</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="backgroundCheck"
                checked={formData.backgroundCheck}
                onChange={(e) => handleInputChange("backgroundCheck", e.target.checked)}
                className="mt-1"
              />
              <Label htmlFor="backgroundCheck" className="text-sm">
                I consent to a background check if required for my volunteer role
              </Label>
            </div>
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={formData.terms}
                onChange={(e) => handleInputChange("terms", e.target.checked)}
                className="mt-1"
                required
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and privacy policy *
              </Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#1a472a] hover:bg-[#1a472a]/90">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Application...
          </>
        ) : (
          "Submit Volunteer Application"
        )}
      </Button>
    </form>
  )
}
