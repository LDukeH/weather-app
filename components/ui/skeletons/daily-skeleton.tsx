import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function DailyCardSkeleton() {
  return (
    <Card size="small" className="flex flex-col items-center h-[9.8rem]"></Card>
  );
}

export default function DailySkeleton() {
  return (
    <main className="flex flex-col gap-5">
      <header className="text-xl font-medium text-accent-foreground">
        Daily forecast
      </header>
      <section className="grid grid-cols-3 gap-2 lg:gap-6 sm:flex">
        {Array.from({ length: 7 }).map((_, i) => (
          <DailyCardSkeleton key={i} />
        ))}
      </section>
    </main>
  );
}
