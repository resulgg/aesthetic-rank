import { z } from "zod";

export const analysisFormSchema = z.object({
  height: z
    .string()
    .min(1, { message: "Height is required" })
    .regex(/^(\d+(\.\d+)?|\d+'?\d*\"?)$/, {
      message: "Height must be a valid number (e.g. 170 or 5'11)",
    })
    .refine(
      (val) => {
        // Handle feet/inches format (e.g. 5'11" or 5'11)
        if (val.includes("'")) {
          const [feet, inches] = val.split("'");
          const ft = parseInt(feet);
          const inch = parseInt(inches);
          const totalCm = ft * 30.48 + inch * 2.54;
          return totalCm >= 100 && totalCm <= 250;
        }
        // Handle cm
        const num = parseInt(val);
        return num >= 100 && num <= 250;
      },
      { message: "Height must be between 100cm - 250cm (3'3 - 8'2)" }
    ),
  weight: z
    .string()
    .min(1, { message: "Weight is required" })
    .regex(/^\d+(\.\d+)?$/, { message: "Weight must be a valid number" })
    .refine(
      (val) => {
        const num = parseFloat(val);
        // Check if weight is in pounds (roughly 2.2x kg)
        if (num > 400) {
          const kg = num / 2.205;
          return kg >= 35 && kg <= 400;
        }
        // Assume kg
        return num >= 35 && num <= 400;
      },
      { message: "Weight must be between 35kg - 400kg (77lb - 880lb)" }
    ),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
});
