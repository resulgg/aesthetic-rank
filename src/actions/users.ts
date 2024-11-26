"use server";

import { auth } from "@/auth";
import db from "@/db";
import { analysis, users } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Deletes a user account if they have no existing analyses
 * @param userId The ID of the user to delete
 * @returns Object indicating success or containing an error message
 */
export const deleteUser = async (userId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    // Check if user has any analyses
    const existingAnalyses = await db.query.analysis.findFirst({
      where: eq(analysis.userId, userId),
    });

    if (existingAnalyses) {
      return {
        error:
          "User account cannot be deleted - please delete all analyzes and drafts first.",
      };
    }

    // Delete user if no analyses exist
    await db.delete(users).where(eq(users.id, userId));

    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { error: "Failed to delete user account." };
  }
};
