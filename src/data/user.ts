import "server-only";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Retrieves a user's profile data and payment history
 * @param userId - The unique identifier of the user
 * @returns Promise containing user profile data and payment history
 * @throws Error if user not found or on database error
 */
export const getUserProfileAndPayments = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required.");
  }

  try {
    // Get user profile data
    const userProfile = await db.query.users.findFirst({
      where: eq(users.id, userId),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
      },
      with: {
        payments: true,
      },
    });

    return {
      profile: userProfile,
    };
  } catch (error) {
    console.error("Error fetching user profile and payments:", error);
    throw new Error("Failed to fetch user data.");
  }
};
