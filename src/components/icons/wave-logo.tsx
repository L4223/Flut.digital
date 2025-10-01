
import { cn } from "@/lib/utils";
import React from "react";

const WaveLogo = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("lucide lucide-code", className)}
        {...props}
      >
        <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12" />
        <path d="M2 18C2 18 5 12 12 12C19 12 22 18 22 18" />
      </svg>
    );
  }
);
WaveLogo.displayName = "WaveLogo";

export default WaveLogo;
