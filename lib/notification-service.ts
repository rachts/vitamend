/**
 * Notification Service
 * VitaMend Project - Created by Rachit
 */
import dbConnect from "./dbConnect"
import Notification from "@/models/Notification"

export interface NotificationData {
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  actionUrl?: string
  metadata?: Record<string, any>
}

export class NotificationService {
  static async createNotification(data: NotificationData) {
    try {
      await dbConnect()

      const notification = new Notification({
        userId: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        actionUrl: data.actionUrl,
        metadata: data.metadata,
        read: false,
        createdAt: new Date(),
      })

      await notification.save()

      // Here you could add real-time notification logic
      // e.g., WebSocket, Server-Sent Events, or push notifications

      return notification
    } catch (error) {
      console.error("Error creating notification:", error)
      throw error
    }
  }

  static async getUserNotifications(userId: string, limit = 20) {
    try {
      await dbConnect()

      const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).limit(limit).lean()

      return notifications
    } catch (error) {
      console.error("Error fetching notifications:", error)
      throw error
    }
  }

  static async markAsRead(notificationId: string, userId: string) {
    try {
      await dbConnect()

      await Notification.findOneAndUpdate({ _id: notificationId, userId }, { read: true, readAt: new Date() })
    } catch (error) {
      console.error("Error marking notification as read:", error)
      throw error
    }
  }

  static async markAllAsRead(userId: string) {
    try {
      await dbConnect()

      await Notification.updateMany({ userId, read: false }, { read: true, readAt: new Date() })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      throw error
    }
  }

  static async deleteNotification(notificationId: string, userId: string) {
    try {
      await dbConnect()

      await Notification.findOneAndDelete({ _id: notificationId, userId })
    } catch (error) {
      console.error("Error deleting notification:", error)
      throw error
    }
  }

  // Notification templates for common actions
  static async notifyDonationReceived(userId: string, donationId: string) {
    return this.createNotification({
      userId,
      title: "Donation Received",
      message: "Your medicine donation has been received and is being processed.",
      type: "success",
      actionUrl: `/donations/${donationId}`,
      metadata: { donationId },
    })
  }

  static async notifyDonationApproved(userId: string, donationId: string) {
    return this.createNotification({
      userId,
      title: "Donation Approved",
      message: "Your medicine donation has been approved and will be redistributed.",
      type: "success",
      actionUrl: `/donations/${donationId}`,
      metadata: { donationId },
    })
  }

  static async notifyMedicineRecall(userId: string, medicineName: string) {
    return this.createNotification({
      userId,
      title: "Medicine Recall Alert",
      message: `Important: ${medicineName} has been recalled. Please check your donations.`,
      type: "warning",
      actionUrl: "/recalls",
      metadata: { medicineName },
    })
  }
}
