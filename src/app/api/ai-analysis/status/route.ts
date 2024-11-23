import { NextRequest } from "next/server";
import { auth } from "@/auth";
import db from "@/db";
import { analysis } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

const requestSchema = z.object({
  analysisId: z.string().uuid("Invalid analysis ID format"),
});

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return Response.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return Response.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { analysisId } = result.data;

    // Fetch analysis data
    const analysisData = await db.query.analysis.findFirst({
      columns: {
        isCompleted: true,
      },
      where: and(
        eq(analysis.id, analysisId),
        eq(analysis.userId, session.user.id)
      ),
    });

    if (!analysisData) {
      return Response.json({ error: "Analysis not found" }, { status: 404 });
    }

    return Response.json({
      isCompleted: analysisData.isCompleted,
    });
  } catch (error) {
    console.error("Error checking analysis status:", error);
    return Response.json(
      { error: "An error occurred while checking analysis status" },
      { status: 500 }
    );
  }
}
