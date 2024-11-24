import { analysis, photos } from "@/db/schema";

export interface Analysis {
  id: string;
  userId: string;
  height?: string;
  weight?: string;
  gender?: string;
  isPublic: boolean;
  isCompleted: boolean;
  isPaid: boolean;
  photos?: Array<{
    image: string;
  }>;
}
export type SelectAnalysisAndPhotos = typeof analysis.$inferSelect & {
  photos: (typeof photos.$inferSelect)[];
};
