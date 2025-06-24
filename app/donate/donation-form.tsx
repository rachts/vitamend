"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"
import { put } from "@vercel/blob"

const medicineSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  expiryDate: z.string().refine((date) => {
    const expiryDate = new Date(date)
    const sixMonthsFromNow = new Date()
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6)
    return expiryDate >= sixMonthsFromNow
  }, "Expiry date must be at least 6 months from now"),
  description: z.string().optional(),
  image: z.any().optional(),
})

const donationSchema = z.object({
  medicines: z.array(medicineSchema).min(1, "At least one medicine is required"),
  pickupAddress: z.string().min(5, "Pickup address is required"),
  pickupDate: z.string().refine((date) => {
    const pickupDate = new Date(date)
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return pickupDate >= tomorrow
  }, "Pickup date must be at least tomorrow"),
})

type DonationFormValues = z.infer<typeof donationSchema>

export default function DonationForm() {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUploading, setImageUploading] = useState<Record<number, boolean>>({})

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      medicines: [{ name: "", quantity: 1, expiryDate: "", description: "" }],
      pickupAddress: "",
      pickupDate: "",
    },
  })

  const { register, handleSubmit, formState, watch, setValue, getValues } = form
  const { errors } = formState
  const medicines = watch("medicines")

  const addMedicine = () => {
    const currentMedicines = getValues("medicines") || []
    setValue("medicines", [...currentMedicines, { name: "", quantity: 1, expiryDate: "", description: "" }])
  }

  const removeMedicine = (index: number) => {
    const currentMedicines = getValues("medicines") || []
    setValue(
      "medicines",
      currentMedicines.filter((_, i) => i !== index),
    )
  }

  const handleImageUpload = async (index: number, file: File) => {
    if (!file) return

    try {
      setImageUploading((prev) => ({ ...prev, [index]: true }))

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        })
        return
      }

      // Upload to Vercel Blob
      const blob = await put(`medicines/${Date.now()}-${file.name}`, file, {
        access: "public",
      })

      // Update form value with image URL
      const currentMedicines = getValues("medicines")
      currentMedicines[index].image = blob.url
      setValue("medicines", currentMedicines)

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      })
    } catch (error) {
      console.error("Error uploading image:", error)
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setImageUploading((prev) => ({ ...prev, [index]: false }))
    }
  }

  const onSubmit = async (data: DonationFormValues) => {
    if (!session?.user) {
      toast({
        title: "Error",
        description: "You must be logged in to donate medicines",
        variant: "destructive",
      })
      router.push("/auth/signin")
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit donation")
      }

      toast({
        title: "Success",
        description: "Your donation has been submitted successfully",
      })

      router.push("/dashboard?tab=donations")
    } catch (error) {
      console.error("Error submitting donation:", error)
      toast({
        title: "Error",
        description: "Failed to submit donation",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Donate Medicines</CardTitle>
          <CardDescription>Please sign in to donate medicines</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={() => router.push("/auth/signin")}>Sign In</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donate Medicines</CardTitle>
        <CardDescription>
          Help those in need by donating your unused medicines. All donations are verified by licensed pharmacists.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Medicines</h3>
              <Button type="button" variant="outline" size="sm" onClick={addMedicine}>
                <Plus className="h-4 w-4 mr-2" />
                Add Medicine
              </Button>
            </div>

            {medicines.map((medicine, index) => (
              <div key={index} className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Medicine {index + 1}</h4>
                  {medicines.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMedicine(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`medicines.${index}.name`}>Medicine Name</Label>
                    <Input
                      id={`medicines.${index}.name`}
                      {...register(`medicines.${index}.name`)}
                      placeholder="e.g., Paracetamol 500mg"
                    />
                    {errors.medicines?.[index]?.name && (
                      <p className="text-sm text-red-500">{errors.medicines[index]?.name?.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`medicines.${index}.quantity`}>Quantity</Label>
                    <Input
                      id={`medicines.${index}.quantity`}
                      type="number"
                      min="1"
                      {...register(`medicines.${index}.quantity`)}
                    />
                    {errors.medicines?.[index]?.quantity && (
                      <p className="text-sm text-red-500">{errors.medicines[index]?.quantity?.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`medicines.${index}.expiryDate`}>Expiry Date</Label>
                  <Input
                    id={`medicines.${index}.expiryDate`}
                    type="date"
                    {...register(`medicines.${index}.expiryDate`)}
                  />
                  {errors.medicines?.[index]?.expiryDate && (
                    <p className="text-sm text-red-500">{errors.medicines[index]?.expiryDate?.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`medicines.${index}.description`}>Description (Optional)</Label>
                  <Textarea
                    id={`medicines.${index}.description`}
                    {...register(`medicines.${index}.description`)}
                    placeholder="Additional details about the medicine"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Medicine Image (Optional)</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files && handleImageUpload(index, e.target.files[0])}
                      className="max-w-xs"
                    />
                    {imageUploading[index] && <span className="text-sm">Uploading...</span>}
                    {medicines[index].image && (
                      <div className="relative w-16 h-16 border rounded overflow-hidden">
                        <img
                          src={medicines[index].image || "/placeholder.svg"}
                          alt={`Medicine ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Pickup Details</h3>

            <div className="space-y-2">
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <Textarea
                id="pickupAddress"
                {...register("pickupAddress")}
                placeholder="Enter the address where the medicines can be picked up"
              />
              {errors.pickupAddress && <p className="text-sm text-red-500">{errors.pickupAddress.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pickupDate">Preferred Pickup Date</Label>
              <Input id="pickupDate" type="date" {...register("pickupDate")} />
              {errors.pickupDate && <p className="text-sm text-red-500">{errors.pickupDate.message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Donation"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
