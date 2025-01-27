import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { handleOrderCreated, handleOrderRefunded } from "@/data/payment";
import { LemonSqueezyPayload } from "@/types/ls-payload";

const validateWebhookSignature = (
  secret: string,
  signature: Buffer,
  rawBody: string
): boolean => {
  if (signature.length === 0 || rawBody.length === 0) {
    return false;
  }

  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex"
  );

  return crypto.timingSafeEqual(hmac, signature);
};

export const POST = async (request: NextRequest) => {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json("LEMONSQUEEZY_WEBHOOK_SECRET not set in .env", {
      status: 400,
    });
  }

  const rawBody = await request.text();
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "hex"
  );

  if (!validateWebhookSignature(secret, signature, rawBody)) {
    return NextResponse.json("Invalid request", { status: 400 });
  }
  const payload = JSON.parse(rawBody) as LemonSqueezyPayload;
  const event = payload.meta.event_name;
  const userId = payload.meta.custom_data.user_id;
  const analysisId = payload.meta.custom_data.analysis_id;

  try {
    switch (event) {
      case "order_created":
        await handleOrderCreated(payload, userId, analysisId);
        break;
      case "order_refunded":
        await handleOrderRefunded(payload, userId, analysisId);
        break;
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
};
