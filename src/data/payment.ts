import "server-only";
import db from "@/db";
import { analysis, payments } from "@/db/schema";
import { LemonSqueezyPayload } from "@/types/ls-payload";
import { and, eq } from "drizzle-orm";
import { queue } from "@/lib/queue-client";

/**
 * Retrieves payment information for a specific analysis
 * @param analysisId - The ID of the analysis to fetch payment for
 * @param userId - The ID of the user to validate ownership
 * @returns Promise containing payment details
 */
export const getPayment = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    const payment = await db.query.payments.findFirst({
      where: eq(payments.userId, userId),
    });

    return payment;
  } catch (error) {
    console.error("Failed to fetch payment:", error);
    throw new Error("Failed to fetch payment");
  }
};

/**
 * Handles creation of new payment records from LemonSqueezy webhook
 * @param payload - The webhook payload from LemonSqueezy
 * @param userId - The ID of the user to associate with payment
 * @param analysisId - The ID of the analysis being paid for
 */
export const handleOrderCreated = async (
  payload: LemonSqueezyPayload,
  userId: string,
  analysisId: string
) => {
  try {
    // Create payment record
    await db.insert(payments).values({
      status: payload.data.attributes.status,
      userId,
      analysisId,
      backupAnalysisId: analysisId,
      customerId: `${payload.data.attributes.customer_id}`,
      orderNumber: `${payload.data.attributes.order_number}`,
      orderId: `${payload.data.attributes.first_order_item.order_id}`,
      total: payload.data.attributes.total,
      totalFormatted: payload.data.attributes.total_formatted,
      receiptUrl: payload.data.attributes.urls.receipt,
      customerEmail: payload.data.attributes.user_email,
      customerName: payload.data.attributes.user_name,
      createdAt: payload.data.attributes.created_at,
      updatedAt: payload.data.attributes.updated_at,
    });

    // Update analysis payment status
    await db
      .update(analysis)
      .set({ isPaid: true })
      .where(eq(analysis.id, analysisId));

    await queue.enqueueJSON({
      url: `${process.env.NODE_ENV === "development" ? process.env.DEV_APP_URL : process.env.NEXT_PUBLIC_APP_URL}/api/ai-analysis/generate`,
      body: { analysisId, userId },
    });
  } catch (error) {
    console.error("Failed to create payment:", error);
    throw new Error("Failed to create payment");
  }
};

/**
 * Handles order refund updates from LemonSqueezy webhook
 * @param payload - The webhook payload from LemonSqueezy
 * @param userId - The ID of the user associated with the order
 * @param analysisId - The ID of the analysis associated with the order
 */
export const handleOrderRefunded = async (
  payload: LemonSqueezyPayload,
  userId: string,
  analysisId: string
) => {
  try {
    await db
      .update(payments)
      .set({
        status: payload.data.attributes.status,
        refunded: payload.data.attributes.refunded,
        refundedAt: payload.data.attributes.refunded_at,
        updatedAt: payload.data.attributes.updated_at,
      })
      .where(
        and(eq(payments.userId, userId), eq(payments.analysisId, analysisId))
      );

    // Update analysis payment status
    await db
      .update(analysis)
      .set({ isPaid: false })
      .where(eq(analysis.id, analysisId));
  } catch (error) {
    console.error("Failed to process refund:", error);
    throw new Error("Failed to process refund");
  }
};
