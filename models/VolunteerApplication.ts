import mongoose from "mongoose"

const VolunteerApplicationSchema = new mongoose.Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    occupation: { type: String },

    // Address Information
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },

    // Skills and Availability
    skills: [{ type: String }],
    availability: [{ type: String }],

    // Experience and Motivation
    experience: { type: String },
    motivation: { type: String, required: true },
    references: { type: String },

    // Emergency Contact
    emergencyContact: { type: String, required: true },
    emergencyPhone: { type: String, required: true },

    // Agreements
    backgroundCheck: { type: Boolean, default: false },
    terms: { type: Boolean, required: true },

    // Application Status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "interview_scheduled", "background_check", "onboarding"],
      default: "pending",
    },

    // Metadata
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    notes: { type: String },

    // Volunteer Assignment
    assignedRoles: [{ type: String }],
    startDate: { type: Date },
    hoursCommitted: { type: Number },
  },
  {
    timestamps: true,
  },
)

// Indexes for better query performance
VolunteerApplicationSchema.index({ email: 1 })
VolunteerApplicationSchema.index({ status: 1 })
VolunteerApplicationSchema.index({ submittedAt: -1 })
VolunteerApplicationSchema.index({ userId: 1 })

export const VolunteerApplication =
  mongoose.models.VolunteerApplication || mongoose.model("VolunteerApplication", VolunteerApplicationSchema)
