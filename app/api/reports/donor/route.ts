import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { handleApiError } from "@/lib/api-error"
import { ReportGenerator } from "@/lib/report-generator"

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const fromDate = searchParams.get("from") ? new Date(searchParams.get("from")!) : undefined
    const toDate = searchParams.get("to") ? new Date(searchParams.get("to")!) : undefined
    const format = searchParams.get("format") || "json"

    const report = await ReportGenerator.generateDonorReport(session.user.id, fromDate, toDate)

    if (format === "pdf") {
      // Generate PDF (you'd implement PDF generation here)
      return new NextResponse("PDF generation not implemented yet", { status: 501 })
    }

    return NextResponse.json(report)
  } catch (error) {
    return handleApiError(error)
  }
}
