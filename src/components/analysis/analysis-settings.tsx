"use client";

import { useState } from "react";
import { updateAnalysisSettings } from "@/actions/analysis";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import { Switch } from "@/components/ui/switch";

const analysisSettingsSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(30, "Name must be less than 30 characters"),
  instagram: z
    .string()
    .max(30, "Instagram handle must be less than 30 characters")
    .optional(),
  isPublic: z.boolean().default(false),
});

type AnalysisSettingsFormValues = z.infer<typeof analysisSettingsSchema>;

interface AnalysisSettingsProps {
  analysisId: string;
  defaultValues: {
    name: string;
    instagram?: string | null;
    isPublic: boolean;
  };
}

export function AnalysisSettings({
  analysisId,
  defaultValues,
}: AnalysisSettingsProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPublicUrl, setShowPublicUrl] = useState(defaultValues.isPublic);
  const [isCopied, setIsCopied] = useState(false);
  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/analysis/public/${analysisId}`;

  const form = useForm<AnalysisSettingsFormValues>({
    resolver: zodResolver(analysisSettingsSchema),
    defaultValues: {
      name: defaultValues.name,
      instagram: defaultValues.instagram || "",
      isPublic: defaultValues.isPublic,
    },
  });

  const handleSubmit = async (values: AnalysisSettingsFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await updateAnalysisSettings(analysisId, values);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(result.message);

      // Show public URL if analysis is set to public
      if (values.isPublic) {
        setShowPublicUrl(true);
      } else {
        setShowPublicUrl(false);
      }
    } catch (error) {
      console.error("Failed to update settings:", error);
      toast.error("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPublicUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setIsCopied(true);
      toast.success("Public URL copied to clipboard");
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      toast.error("Failed to copy URL");
    }
  };

  return (
    <ResponsiveDialog
      trigger={
        <Button
          variant="ghost"
          className="text-foreground cursor-pointer rounded-full p-2 h-8 w-8 bg-muted/50"
          asChild
        >
          <Settings />
        </Button>
      }
      title="Analysis Settings"
      description="Change your analysis settings"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="username (optional)" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Public Analysis</FormLabel>
                  <div className="text-sm text-muted-foreground">
                    {field.value
                      ? "Toggle to make it private"
                      : "Toggle to make it public"}
                  </div>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="ml-4"
                    aria-label="Make analysis public"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {showPublicUrl && (
            <div className="flex flex-col space-y-2 p-4 rounded-lg border bg-card/50 backdrop-blur-sm">
              <div className="flex flex-col w-full">
                <div className="text-md mb-1">Public URL</div>
                <div className="w-full break-all">
                  <p className="text-sm font-medium text-foreground/80">
                    {publicUrl}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={copyPublicUrl}
                className="w-full flex items-center justify-center gap-2 transition-colors bg-muted/50 hover:bg-secondary/80 text-md py-6"
                aria-label={isCopied ? "URL copied" : "Copy URL"}
              >
                {isCopied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy URL</span>
                  </>
                )}
              </Button>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </ResponsiveDialog>
  );
}
