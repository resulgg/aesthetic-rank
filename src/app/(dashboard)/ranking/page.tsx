import Image from "next/image";
import Link from "next/link";
import { getTop100Aesthetic } from "@/data/rank";
import { EyeOff, User } from "lucide-react";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function RankingsPage() {
  const { data, cacheExpiresAt, totalMembers } = await getTop100Aesthetic();

  return (
    <div className="space-y-8 md:space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="flex justify-center items-center bg-muted/50 px-10 py-8 rounded-full border-2 border-border">
          <Image
            src="/ranking-logo.png"
            alt="logo"
            width={90}
            height={90}
            quality={100}
          />
        </div>
        <TypographyH1
          className={
            "inline-flex text-5xl md:text-6xl animate-text-gradient bg-[200%_auto] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#999999] via-[#808080] to-[#999999] dark:from-[#E8E8E8] dark:via-[#D3D3D3] dark:to-[#E8E8E8]"
          }
        >
          Top 100
        </TypographyH1>
        <span className="max-w-2xl px-16 md:px-0 text-xs md:text-base text-muted-foreground">
          Discover the top 100 aesthetic physiques out of {totalMembers} total
          analyses
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.map((item, index) => (
          <Link
            key={item.id}
            href={item.isPublic ? `/analysis/public/${item.id}` : "#"}
            className={cn("group", {
              "cursor-not-allowed": !item.isPublic,
            })}
          >
            <div className="relative overflow-hidden rounded-lg border-2 border-border/30 hover:border-primary/30 transition-colors">
              <div className="relative h-[400px]">
                {item.isPublic ? (
                  item.photos && item.photos.length > 0 ? (
                    <>
                      <Image
                        src={`https://${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${item.photos[0].image}`}
                        alt={`${item.name || "Anonymous"}'s physique analysis`}
                        fill
                        className={cn(
                          "object-cover transition-transform group-hover:scale-105",
                          {
                            "filter blur-xl": item.isNsfw,
                          }
                        )}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {item.isNsfw && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-background/80 px-4 py-2 rounded-md">
                            <p className="text-sm text-muted-foreground">
                              NSFW Content
                            </p>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted">
                      <User className="h-20 w-20 text-muted-foreground/40" />
                    </div>
                  )
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-muted">
                    <EyeOff className="h-20 w-20 text-muted-foreground/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background from-10% to-transparent" />
              </div>

              <div className="absolute bottom-0 w-full p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      #{index + 1}{" "}
                      {item.isPublic ? item.name || "Anonymous" : "Anonymous"}
                    </span>
                  </div>
                  <span className="text-primary font-bold">
                    {Number(item.score).toFixed(1)}/10
                  </span>
                </div>

                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="capitalize">{item.gender || "Unknown"}</span>
                  <span>
                    {item.height && item.weight
                      ? `${item.height} • ${item.weight}`
                      : "No stats available"}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center w-full">
        {cacheExpiresAt && (
          <span className="text-xs md:text-sm text-muted-foreground">
            Next update in{" "}
            {Math.ceil((cacheExpiresAt - Date.now()) / 1000 / 60)} minutes
          </span>
        )}
      </div>
    </div>
  );
}
