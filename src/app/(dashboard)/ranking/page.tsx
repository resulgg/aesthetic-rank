import Image from "next/image";
import Link from "next/link";
import { getTop100Aesthetic } from "@/data/rank";
import { Ban, ExternalLink } from "lucide-react";
import { TypographyH1 } from "@/components/typography/typography-h1";
import { Card } from "@/components/ui/card";

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

      <div className="grid gap-4 md:gap-6 max-w-4xl mx-auto">
        {data.map((item, index) => (
          <Card
            key={item.id}
            className="group hover:shadow-lg transition-all duration-300 border-border bg-muted/50"
          >
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted">
                  <span className="text-lg font-bold">#{index + 1}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-md md:text-lg font-semibold cursor-default">
                      {item.isPublic ? item.name || "Anonymous" : "Anonymous"}
                    </span>
                    {item.isPublic && item.instagram && (
                      <a
                        href={`https://instagram.com/${item.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-md text-muted-foreground hover:text-primary transition-colors"
                      >
                        <span>@{item.instagram}</span>
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 text-xs md:text-base text-muted-foreground cursor-default">
                    {item.gender && (
                      <span className="capitalize">{item.gender}</span>
                    )}
                    {item.height && <span>{item.height}</span>}
                    {item.weight && <span>{item.weight}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 justify-center">
                <span className="text-md md:text-lg font-semibold cursor-default">
                  {Number(item.score).toFixed(1)}
                </span>
                {item.isPublic ? (
                  <Link
                    href={`/analysis/public/${item.id}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink size={19} />
                  </Link>
                ) : (
                  <Ban size={19} className="text-muted-foreground/40" />
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex items-center justify-center w-full">
        {cacheExpiresAt && (
          <span className="text-xs md:text-sm text-muted-foreground ">
            Next update in{" "}
            {Math.ceil((cacheExpiresAt - Date.now()) / 1000 / 60)} minutes
          </span>
        )}
      </div>
    </div>
  );
}
