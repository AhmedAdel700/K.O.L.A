"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Spinner                                  */
/* -------------------------------------------------------------------------- */

function Spinner() {
  return (
    <svg className="h-10 w-10 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="5"
        className="opacity-25"
      />
      <path
        fill="currentColor"
        className="opacity-75"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                 CVA Styles                                 */
/* -------------------------------------------------------------------------- */

const buttonStyles = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-medium transition-all cursor-pointer",
  {
    variants: {
      intent: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        add: "bg-emerald-600 text-white hover:bg-emerald-700",
        edit: "bg-blue-600 text-white hover:bg-blue-700",
        delete: "bg-red-600 text-white hover:bg-red-700",
        submit: "bg-indigo-600 text-white hover:bg-indigo-700",
        warning: "bg-amber-500 text-white hover:bg-amber-600",
        info: "bg-cyan-600 text-white hover:bg-cyan-700",
      },

      variant: {
        solid: "",
        outline: "bg-transparent border border-current",
        ghost: "bg-transparent hover:bg-black/5",
        gradient:
          "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white",
        translucent: "bg-white/10 text-white backdrop-blur-sm",
        link: "bg-transparent text-indigo-600 underline hover:text-indigo-700 hover:bg-transparent",
      },

      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-12 min-w-28 px-8 text-lg",
        full: "flex-1 h-12 px-5 text-lg",
      },

      hoverEffect: {
        none: "",
        lift: "hover:-translate-y-0.5 hover:shadow-lg",
        glow: "hover:shadow-[0_0_20px_rgba(99,102,241,0.45)]",
        slide:
          "before:absolute before:inset-0 before:-translate-x-full before:bg-white/10 before:transition-transform hover:before:translate-x-0",
      },
    },

    defaultVariants: {
      intent: "default",
      variant: "solid",
      size: "md",
      hoverEffect: "none",
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export interface MainButtonProps
  extends
    Omit<
      React.ComponentPropsWithoutRef<typeof Button>,
      "size" | "variant" | "prefix" | "suffix"
    >,
    VariantProps<typeof buttonStyles> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  loading?: boolean;
  ripple?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

const MainButton = React.forwardRef<HTMLButtonElement, MainButtonProps>(
  function MainButton(
    {
      intent,
      variant,
      size,
      hoverEffect,
      prefix,
      suffix,
      loading = false,
      ripple = true,
      disabled,
      type,
      className,
      children,
      onClick,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;
    const buttonRef = React.useRef<HTMLButtonElement | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!ripple || isDisabled || !buttonRef.current) {
        onClick?.(e);
        return;
      }

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();

      const rippleSize = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - rippleSize / 2;
      const y = e.clientY - rect.top - rippleSize / 2;

      const rippleEl = document.createElement("span");
      rippleEl.className =
        "absolute rounded-full bg-white/30 pointer-events-none animate-ripple";
      rippleEl.style.width = rippleEl.style.height = `${rippleSize}px`;
      rippleEl.style.left = `${x}px`;
      rippleEl.style.top = `${y}px`;

      button.appendChild(rippleEl);
      setTimeout(() => rippleEl.remove(), 600);

      onClick?.(e);
    };

    return (
      <Button
        ref={(node) => {
          buttonRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        type={type ?? "button"}
        disabled={isDisabled}
        aria-busy={loading}
        onClick={handleClick}
        className={cn(
          buttonStyles({ intent, variant, size, hoverEffect }),
          isDisabled && "cursor-not-allowed opacity-60",
          className,
        )}
        {...rest}
      >
        {loading && <Spinner />}
        {!loading && prefix && <span className="shrink-0">{prefix}</span>}
        {children && <span className="truncate">{children}</span>}
        {!loading && suffix && <span className="shrink-0">{suffix}</span>}
      </Button>
    );
  },
);

export default MainButton;
