import { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

interface CtaButtonProps extends ButtonProps {
  asChild?: boolean;
}

const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
  ({ className, asChild = false, size, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ size }), // Inherit base button styles like flex, gap, etc.
          "p-2 pl-4 pr-4 rounded-sm brand-gradient text-primary-foreground font-bold shadow-[0_4px_14px_-4px_hsl(var(--accent)/0.35)] transition-[filter,box-shadow] duration-300 hover:brightness-110 hover:shadow-[0_6px_22px_-4px_hsl(var(--accent)/0.5)]",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
CtaButton.displayName = "CtaButton";

export default CtaButton;
