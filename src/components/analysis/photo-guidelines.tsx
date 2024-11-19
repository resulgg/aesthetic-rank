import {
  AlertTriangle,
  Ban,
  Camera,
  CheckCircle,
  Grid2X2,
  ImageOff,
  ImagePlus,
  Layers,
  Shield,
  XCircle,
} from "lucide-react";
import { TypographyH2 } from "@/components/typography/typography-h2";

const PhotoGuidelines = () => {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 rounded-lg border bg-muted/50"
      role="region"
      aria-label="Photo upload guidelines"
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center"
            aria-hidden="true"
          >
            <CheckCircle className="h-5 w-5 text-green-600" />
          </div>
          <TypographyH2 className="text-xl font-semibold" id="tips-heading">
            Tips for Best Results
          </TypographyH2>
        </div>
        <ul
          className="space-y-2 text-muted-foreground text-xs md:text-base"
          aria-labelledby="tips-heading"
        >
          <li className="flex items-center gap-2">
            <Camera className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Clear, non-blurry photos in good lighting
          </li>
          <li className="flex items-center gap-2">
            <Shield className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Ensure proper coverage of private areas
          </li>
          <li className="flex items-center gap-2">
            <ImagePlus className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Single photo works, multiple angles recommended
          </li>
          <li className="flex items-center gap-2">
            <Grid2X2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Mirror selfies are fine, background doesn&apos;t matter
          </li>
        </ul>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div
            className="h-8 w-8 rounded-lg bg-destructive/20 flex items-center justify-center"
            aria-hidden="true"
          >
            <XCircle className="h-5 w-5 text-destructive" />
          </div>
          <TypographyH2 className="text-xl font-semibold" id="avoid-heading">
            What to Avoid
          </TypographyH2>
        </div>
        <ul
          className="space-y-2 text-muted-foreground text-xs md:text-base"
          aria-labelledby="avoid-heading"
        >
          <li className="flex items-center gap-2">
            <Ban className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Blurry or unclear photos
          </li>
          <li className="flex items-center gap-2">
            <Layers className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Additional clothing beyond undergarments
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle
              className="h-4 w-4 flex-shrink-0"
              aria-hidden="true"
            />
            Inappropriate or explicit content
          </li>
          <li className="flex items-center gap-2">
            <ImageOff className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
            Filtered or edited photos
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoGuidelines;
