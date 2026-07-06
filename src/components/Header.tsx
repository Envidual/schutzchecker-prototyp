import { Search, MapPin, Menu } from "lucide-react";

export function Header({ title }: { title?: string }) {
  return (
    <div className="bg-white">
      <div className="border-b border-header-border flex items-center justify-between h-[72px] px-4">
        <div className="flex items-center gap-[6px] leading-[0.85]">
          <span className="font-headline font-bold text-[11px] text-navy tracking-tight">
            VER<br />SICHER<br />UNGS
          </span>
          <span className="w-[2px] self-stretch bg-teal" />
          <span className="font-headline font-bold text-[11px] text-navy tracking-tight">
            KAMMER<br />BAYERN
          </span>
        </div>
        <div className="flex items-center gap-6 text-teal">
          <Search size={22} strokeWidth={1.75} />
          <MapPin size={22} strokeWidth={1.75} />
          <Menu size={22} strokeWidth={1.75} />
        </div>
      </div>
      {title && (
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <h1 className="font-headline font-bold text-[28px] leading-[1.15] text-ink text-center">{title}</h1>
        </div>
      )}
    </div>
  );
}
