"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateInfo } from "@/actions/analysis";
import { analysisFormSchema } from "@/schemas/analysis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AnalysisInfoValues = z.infer<typeof analysisFormSchema>;
type AnalysisInfo = {
  height: string | null | undefined;
  weight: string | null | undefined;
  gender: "male" | "female" | null | undefined;
};

function UpdateInfoForm({
  analysisId,
  analysisInfo,
}: {
  analysisId: string;
  analysisInfo: AnalysisInfo;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AnalysisInfoValues>({
    resolver: zodResolver(analysisFormSchema),
    defaultValues: {
      height: analysisInfo.height || "",
      weight: analysisInfo.weight || "",
      gender: analysisInfo.gender || undefined,
    },
  });

  async function onSubmit(data: AnalysisInfoValues) {
    const finalData = { ...data, analysisId };
    if (isSubmitting) return;
    try {
      setIsSubmitting(true);
      const result = await updateInfo(finalData);

      if ("error" in result) {
        // Handle specific error cases from the server
        if (result.error === "Authentication required") {
          toast.error("Please sign in to create an analysis");
          router.push("/auth/signin");
          return;
        }
        toast.error(result.error);
        return;
      }
      router.push(`/analysis/${analysisId}/guides?sex=${data.gender}`);
    } catch (error) {
      // Handle unexpected errors
      setIsSubmitting(false);
      console.error("Unexpected error during analysis creation:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 pt-4"
        aria-label="Analysis creation form"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your height"
                  disabled={isSubmitting}
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your height in cm or feet/inches (e.g. 170 or 5&apos;11)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your weight"
                  disabled={isSubmitting}
                  aria-required="true"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Enter your weight in kg or pounds (e.g. 70kg or 154lb)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your sex" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Select your sex</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-14 text-lg"
          disabled={isSubmitting}
          aria-label={isSubmitting ? "Creating analysis..." : "Create analysis"}
        >
          {isSubmitting ? (
            <>
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              Loading...
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default UpdateInfoForm;
