import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import { VolunteerApplication } from "@/models/VolunteerApplication"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const filter = status ? { status } : {}

    const applications = await VolunteerApplication.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("userId", "name email")

    const total = await VolunteerApplication.countDocuments(filter)

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching volunteer applications:", error)
    return NextResponse.json({ error: "Failed to fetch volunteer applications" }, { status: 500 })
  }
}
