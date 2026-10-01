import { TitleCard } from "./title-card";
import type { TitleCardData } from "@/lib/types";

export function TitleGrid({ items }: { items: TitleCardData[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <TitleCard key={`${item.type}-${item.id}`} item={item} />
      ))}
    </div>
  );
}
