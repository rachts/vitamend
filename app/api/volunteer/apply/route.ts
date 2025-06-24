import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import { VolunteerApplication } from "@/models/VolunteerApplication"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const session = await getServerSession(authOptions)
    const data = await request.json()

    // Validate required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "dateOfBirth",
      "motivation",
      "emergencyContact",
      "emergencyPhone",
    ]

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    if (!data.terms) {
      return NextResponse.json({ error: "Terms and conditions must be accepted" }, { status: 400 })
    }

    // Create volunteer application
    const application = new VolunteerApplication({
      ...data,
      userId: session?.user?.id || null,
      status: "pending",
      submittedAt: new Date(),
    })

    await application.save()

    // TODO: Send confirmation email
    // TODO: Notify admin team

    return NextResponse.json(
      {
        message: "Volunteer application submitted successfully",
        applicationId: application._id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error submitting volunteer application:", error)
    return NextResponse.json({ error: "Failed to submit volunteer application" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    // If admin, return all applications
    if (session.user.role === "admin") {
      const applications = await VolunteerApplication.find({}).sort({ submittedAt: -1 }).limit(50)

      return NextResponse.json({ applications })
    }

    // Otherwise, return user's own applications
    const applications = await VolunteerApplication.find({
      $or: [{ userId: session.user.id }, { email: session.user.email }],
    }).sort({ submittedAt: -1 })

    return NextResponse.json({ applications })
  } catch (error) {
    console.error("Error fetching volunteer applications:", error)
    return NextResponse.json({ error: "Failed to fetch volunteer applications" }, { status: 500 })
  }
}
