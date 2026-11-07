import Image from "next/image";
import { cn } from "@/lib/utils";

type DeviceMockupProps = {
  desktop: string;
  mobile?: string;
  alt: string;
  /** Text shown in the fake address bar. */
  label?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

const isLocal = (src: string) => src.startsWith("/");

/**
 * A browser window with an optional phone overlapping its lower right corner.
 * Pure markup, so it renders on the server and ships no JavaScript.
 */
export default function DeviceMockup({
  desktop,
  mobile,
  alt,
  label,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  className,
}: DeviceMockupProps) {
  return (
    <div className={cn("relative", mobile && "pb-6 pr-6 sm:pb-10 sm:pr-10", className)}>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-white/10 bg-secondary px-3 py-2" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          {label && (
            <span className="ml-3 truncate rounded-md bg-background/60 px-3 py-0.5 text-xs text-muted-foreground">
              {label}
            </span>
          )}
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={desktop}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            unoptimized={!isLocal(desktop)}
            className="object-cover object-top"
          />
        </div>
      </div>
      {mobile && (
        <div className="absolute bottom-0 right-0 w-[24%] min-w-[84px] max-w-[180px] overflow-hidden rounded-[1.1rem] border-[3px] border-[#1d2433] bg-black shadow-2xl shadow-black/60">
          <div className="relative aspect-[390/844]">
            <Image src={mobile} alt="" fill sizes="180px" unoptimized={!isLocal(mobile)} className="object-cover object-top" />
          </div>
        </div>
      )}
    </div>
  );
}
