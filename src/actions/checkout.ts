"use server";

import { auth } from "@/auth";
import { createCheckout } from "@lemonsqueezy/lemonsqueezy.js";
import setUpLemonSqueezy from "@/lib/lemon-squeezy";

const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;
const PRODUCT_ID = process.env.LEMONSQUEEZY_PRODUCT_ID!;
type CheckoutResponse = {
  url?: string;
  error?: string;
};

export const checkoutUrl = async (
  analysisId: string
): Promise<CheckoutResponse> => {
  // Verify authentication
  const session = await auth();
  if (!session?.user?.email || !session.user.id) {
    return { error: "Unauthorized Access" };
  }

  try {
    // Initialize LemonSqueezy
    setUpLemonSqueezy();

    // Create checkout session
    const checkout = await createCheckout(STORE_ID, PRODUCT_ID, {
      checkoutData: {
        email: session.user.email,
        custom: {
          userId: session.user.id,
          analysisId,
        },
      },
      productOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/analysis/${analysisId}/status`,
      },
    });

    return { url: checkout.data?.data.attributes.url };
  } catch (error) {
    console.error("Checkout error:", error);
    return { error: "Failed to create checkout session" };
  }
};
