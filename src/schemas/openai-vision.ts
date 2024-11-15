import { z } from "zod";

export enum PostureType {
  Normal = "Normal",
  Lordosis = "Lordosis",
  Kyphosis = "Kyphosis",
  Scoliosis = "Scoliosis",
  ForwardHead = "Forward Head",
  SwayBack = "Sway Back",
  FlatBack = "Flat Back",
}

export enum MuscleImbalance {
  None = "None",
  Minimal = "Minimal",
  Slight = "Slight",
  Moderate = "Moderate",
  Significant = "Significant",
}

export enum SkeletalStructure {
  Classic = "Classic",
  Athletic = "Athletic",
  SmallFrame = "Small Frame",
  MediumFrame = "Medium Frame",
  LargeFrame = "Large Frame",
  NarrowClavicles = "Narrow Clavicles",
  WideClavicles = "Wide Clavicles",
  NarrowHips = "Narrow Hips",
  WideHips = "Wide Hips",
  LongLimbs = "Long Limbs",
  ShortLimbs = "Short Limbs",
  FrameNarrowClavicles = "Frame Narrow Clavicles",
  FrameWideClavicles = "Frame Wide Clavicles",
  FrameNarrowHips = "Frame Narrow Hips",
  FrameWideHips = "Frame Wide Hips",
  FrameLongLimbs = "Frame Long Limbs",
  FrameShortLimbs = "Frame Short Limbs",
}

export enum VascularityType {
  HighlyVascular = "Highly Vascular",
  Vascular = "Vascular",
  ModeratelyVascular = "Moderately Vascular",
  LowVascularity = "Low Vascularity",
}

export enum SkinHealthType {
  Excellent = "Excellent",
  Good = "Good",
  Poor = "Poor",
  Stretched = "Stretched",
  AcneProne = "Acne Prone",
  Normal = "Normal",
}

export enum SomatotypeClassification {
  Ectomorph = "Ectomorph",
  Mesomorph = "Mesomorph",
  Endomorph = "Endomorph",
  EctoMesomorph = "Ecto-Mesomorph",
  EndoMesomorph = "Endo-Mesomorph",
  EctoEndomorph = "Ecto-Endomorph",
  Balanced = "Balanced",
}

export enum BodySymmetry {
  Exceptional = "Exceptional",
  Excellent = "Excellent",
  Good = "Good",
  Fair = "Fair",
  Poor = "Poor",
  LeftRightAsymmetry = "Left-Right Asymmetry",
  UpperLowerAsymmetry = "Upper-Lower Asymmetry",
}

export enum GeneticPotential {
  Elite = "Elite",
  AboveAverage = "Above Average",
  Average = "Average",
  BelowAverage = "Below Average",
  Challenging = "Challenging",
  Mixed = "Mixed",
}

export enum AestheticRank {
  Supreme = "Supreme Aesthetics",
  Legendary = "Legendary Aesthetics",
  Elite = "Elite Aesthetics",
  Intermediate = "Gold-Tier Aesthetics",
  Developing = "Silver-Tier Aesthetics",
  Beginner = "Bronze-Tier Aesthetics",
  Starting = "Iron-Tier Aesthetics",
}

const measurementSchema = z.object({
  score: z.number(),
  size: z.number(),
  description: z.string(),
});

const ratioSchema = z.object({
  ratio: z.number(),
  description: z.string(),
});

export const bodyAnalysisSchema = z.object({
  measurements: z.object({
    arms: measurementSchema,
    shoulders: measurementSchema,
    trapezius: measurementSchema,
    forearms: measurementSchema,
    calves: measurementSchema,
    neck: measurementSchema,
    chest: measurementSchema,
    abs: measurementSchema,
    lats: measurementSchema,
    thighs: measurementSchema,
    hips: measurementSchema,
    waist: measurementSchema,
    back: measurementSchema,
  }),
  ratios: z.object({
    waistToHip: ratioSchema,
    shoulderToWaist: ratioSchema,
    chestToWaist: ratioSchema,
    thighToWaist: ratioSchema,
    armToWaist: ratioSchema,
    waistToHeight: ratioSchema,
  }),
  bodyFat: z.object({
    score: z.number(),
    percentage: z.string(),
    description: z.string(),
  }),
  posture: z.object({
    score: z.number(),
    type: z.nativeEnum(PostureType),
    description: z.string(),
  }),
  muscleImbalance: z.object({
    score: z.number(),
    imbalance: z.nativeEnum(MuscleImbalance),
    description: z.string(),
  }),
  skeletal: z.object({
    score: z.number(),
    structure: z.nativeEnum(SkeletalStructure),
    description: z.string(),
  }),
  vascularity: z.object({
    score: z.number(),
    type: z.nativeEnum(VascularityType),
    description: z.string(),
  }),
  skinHealth: z.object({
    score: z.number(),
    type: z.nativeEnum(SkinHealthType),
    description: z.string(),
  }),
  bmi: z.object({
    score: z.number(),
    index: z.string(),
    description: z.string(),
  }),
  somatotype: z.object({
    score: z.number(),
    classification: z.nativeEnum(SomatotypeClassification),
    description: z.string(),
  }),
  bodySymmetry: z.object({
    score: z.number(),
    symmetry: z.nativeEnum(BodySymmetry),
    description: z.string(),
  }),
  geneticPotential: z.object({
    score: z.number(),
    potential: z.nativeEnum(GeneticPotential),
    description: z.string(),
  }),
  goldenRatio: z.object({
    score: z.number(),
    ratio: z.number(),
    description: z.string(),
  }),
  aesthetic: z.object({
    score: z.number(),
    rank: z.nativeEnum(AestheticRank),
    description: z.string(),
  }),
  strengths: z.object({
    points: z.array(z.string()),
  }),
  weaknesses: z.object({
    points: z.array(z.string()),
  }),
});

export type BodyAnalysis = z.infer<typeof bodyAnalysisSchema>;
