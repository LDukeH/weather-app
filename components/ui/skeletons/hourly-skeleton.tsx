import { Button } from "../button";
import { Card, CardHeader, CardContent } from "../card";
import { Skeleton } from "../skeleton";
import { cn } from "@/lib/utils";
import DropDownIcon from "@/public/assets/images/icon-dropdown.svg";

export default function HourlySkeleton() {
  return (
    <main>
      <Card size="hourly">
        <CardHeader className="px-4 pt-4 pb-2">
          <section className="flex flex-row items-center justify-between">
            {/* title skeleton */}
            <h2 className="text-lg font-semibold text-accent-foreground ">
              Hourly Forecast
            </h2>

            {/* dropdown skeleton */}
            <Button variant="popover">
              <div className="flex flex-row items-center justify-center gap-2 px-1">
                --
                <DropDownIcon className="pt-1" />
              </div>
            </Button>
          </section>
        </CardHeader>

        <CardContent
          className={cn(
            "overflow-y-auto h-[36rem]",
            "[&::-webkit-scrollbar]:w-1  [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#302F4A]",
            "[&::-webkit-scrollbar-thumb]:rounded-xl [&::-webkit-scrollbar-thumb]:border-1 [&::-webkit-scrollbar-thumb]:border-[#3C3B5E]",
          )}
        >
          <section className="flex flex-col gap-4 p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-2 p-4 border rounded-xl border-border"
              >
                {/* condition */}
                <Skeleton className="w-6 h-6 rounded-full" />

                {/* time */}
                <Skeleton className="w-16 h-6 rounded-md" />
              </div>
            ))}
          </section>
        </CardContent>
      </Card>
    </main>
  );
}
