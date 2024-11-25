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
export enum WarriorType {
  Spartan = "Spartan",
  Persian = "Persian",
  Viking = "Viking",
  Mongol = "Mongol",
  Samurai = "Samurai",
  Aztec = "Aztec",
  Ottoman = "Ottoman",
  Roman = "Roman",
  Celtic = "Celtic",
  Zulu = "Zulu",
  Sumo = "Sumo",
  Ninja = "Ninja",
  Berserker = "Berserker",
  Scout = "Scout",
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
  CompactFrame = "Compact Frame",
  ElongatedFrame = "Elongated Frame",
  BroadShoulders = "Broad Shoulders",
  NarrowShoulders = "Narrow Shoulders",
  HighHipRatio = "High Hip Ratio",
  LowHipRatio = "Low Hip Ratio",
  ProportionalFrame = "Proportional Frame",
  DisproportionalFrame = "Disproportional Frame",
  RobustBoneStructure = "Robust Bone Structure",
  DelicateBoneStructure = "Delicate Bone Structure",
  BalancedFrame = "Balanced Frame",
  UnbalancedFrame = "Unbalanced Frame",
  StrongJoints = "Strong Joints",
  FlexibleJoints = "Flexible Joints",
  DenseBonesStructure = "Dense Bones Structure",
  LightBonesStructure = "Light Bones Structure",
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
export enum BmiType {
  Underweight = "Underweight",
  Normal = "Normal",
  Overweight = "Overweight",
  Obese = "Obese",
}
export enum Gender {
  Male = "Male",
  Female = "Female",
}
const bodySchema = z.object({
  score: z.number(),
  evaluation: z.string(),
});

const ratioSchema = z.object({
  ratio: z.number(),
  evaluation: z.string(),
});

export const analysisDataSchema = z.object({
  body: z.object({
    arms: bodySchema,
    shoulders: bodySchema,
    trapezius: bodySchema,
    forearms: bodySchema,
    calves: bodySchema,
    chest: bodySchema,
    abs: bodySchema,
    lats: bodySchema,
    thighs: bodySchema,
    hips: bodySchema,
    waist: bodySchema,
    back: bodySchema,
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
    percentage: z.string(),
    evaluation: z.string(),
  }),
  posture: z.object({
    score: z.number(),
    type: z.nativeEnum(PostureType),
    evaluation: z.string(),
  }),
  muscleImbalance: z.object({
    score: z.number(),
    imbalance: z.nativeEnum(MuscleImbalance),
    evaluation: z.string(),
  }),
  skeletal: z.object({
    score: z.number(),
    structure: z.array(z.nativeEnum(SkeletalStructure)),
    evaluation: z.string(),
  }),
  vascularity: z.object({
    score: z.number(),
    type: z.nativeEnum(VascularityType),
    evaluation: z.string(),
  }),
  skinHealth: z.object({
    score: z.number(),
    type: z.nativeEnum(SkinHealthType),
    evaluation: z.string(),
  }),
  bmi: z.object({
    type: z.nativeEnum(BmiType),
    index: z.string(),
    evaluation: z.string(),
  }),
  somatotype: z.object({
    classification: z.nativeEnum(SomatotypeClassification),
    evaluation: z.string(),
  }),
  bodySymmetry: z.object({
    score: z.number(),
    symmetry: z.nativeEnum(BodySymmetry),
    description: z.string(),
  }),
  geneticPotential: z.object({
    score: z.number(),
    potential: z.nativeEnum(GeneticPotential),
    evaluation: z.string(),
  }),
  aesthetic: z.object({
    score: z.number(),
    rank: z.nativeEnum(AestheticRank),
    evaluation: z.string(),
  }),
  strengths: z.object({
    points: z.array(z.string()),
  }),
  weaknesses: z.object({
    points: z.array(z.string()),
  }),
  height: z.string(),
  weight: z.string(),
  isNsfw: z.object({
    isNsfw: z.boolean(),
    reason: z.string(),
  }),
  isNatural: z.object({
    isNatural: z.boolean(),
    reason: z.string(),
  }),
  sportSuitability: z.object({
    recommendedSport: z.array(z.string()),
    evaluation: z.string(),
  }),
  bodyAge: z.object({
    age: z.number(),
    evaluation: z.string(),
  }),
  warriorType: z.object({
    type: z.nativeEnum(WarriorType),
    evaluation: z.string(),
  }),
  gender: z.nativeEnum(Gender),
});

export type analysisDataType = z.infer<typeof analysisDataSchema>;
