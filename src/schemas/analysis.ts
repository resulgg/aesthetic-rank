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
    .regex(/^(\d+(\.\d+)?)(kg|lb?)$/i, {
      message:
        "Weight must be a valid number followed by kg or lb (e.g. 70kg or 154lb)",
    })
    .refine(
      (val) => {
        const match = val.toLowerCase().match(/^(\d+(?:\.\d+)?)(kg|lb?)$/);
        if (!match) return false;

        const num = parseFloat(match[1]);
        const unit = match[2];

        if (!unit) return false;

        // Convert to kg for validation
        const kg = unit.startsWith("lb") ? num / 2.205 : num;

        return kg >= 35 && kg <= 400;
      },
      {
        message:
          "Weight must be between 35-400kg or 77-880lb and must include unit (kg or lb)",
      }
    ),
  gender: z.enum(["male", "female"], { message: "Please select a gender" }),
});
