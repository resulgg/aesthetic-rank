"use server";

import { auth } from "@/auth";
import { AI_PROMPT, UserPrompt } from "@/constants/ai-prompt";
import db from "@/db";
import { analysis } from "@/db/schema";
import { analysisDataSchema } from "@/schemas/openai-vision";
import { and, eq } from "drizzle-orm";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createAiAnalysis = async (analysisId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { error: "Authentication required." };
    }

    const analysisData = await db.query.analysis.findFirst({
      where: and(
        eq(analysis.id, analysisId),
        eq(analysis.userId, session.user.id)
      ),
      with: {
        photos: true,
      },
    });

    if (analysisData?.isCompleted) {
      return { error: "Analysis has already been completed." };
    }
    // TODO: Check if user is paid
    // if (!analysisData?.isPaid) {
    //   return { error: "Payment required to generate AI analysis." };
    // }

    if (
      !analysisData?.height ||
      !analysisData?.weight ||
      !analysisData?.gender
    ) {
      return {
        error:
          "Missing required data. Please provide height, weight and gender.",
      };
    }

    const photos = analysisData?.photos;

    if (!photos || photos.length < 1) {
      return { error: "Please upload at least 1 photo for analysis." };
    }

    const photoUrls = photos.map((photo) => {
      return {
        type: "image_url" as const,
        image_url: {
          url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${photo.image}`,
        },
      };
    });

    const response = await openai.beta.chat.completions.parse({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: AI_PROMPT,
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: UserPrompt(
                analysisData.height,
                analysisData.weight,
                analysisData.gender
              ),
            },
            ...photoUrls,
          ],
        },
      ],
      response_format: zodResponseFormat(analysisDataSchema, "analysisData"),
    });

    const data = response.choices[0].message.parsed;

    if (data) {
      await db
        .update(analysis)
        .set({
          isNsfw: data.isNsfw.isNsfw,
          isCompleted: true,
          analysisData: data,
        })
        .where(
          and(eq(analysis.id, analysisId), eq(analysis.userId, session.user.id))
        );
    }
    // TODO: Return analysis id
    return {
      id: data,
    };
  } catch (err) {
    console.error(err);
    return {
      error:
        "The system is currently experiencing high load. Please try again in a few minutes.",
    };
  }
};
