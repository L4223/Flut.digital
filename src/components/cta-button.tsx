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
          "p-2 pl-4 pr-4 rounded-sm brand-gradient text-primary-foreground font-bold shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-accent/30",
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
