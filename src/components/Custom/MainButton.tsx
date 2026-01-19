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
      /* ------------------------------- intent ------------------------------ */
      intent: {
        default: "text-primary",
        add: "text-emerald-600",
        edit: "text-blue-600",
        delete: "text-red-600",
        submit: "text-indigo-600",
        warning: "text-amber-500",
        info: "text-cyan-600",
      },

      /* ------------------------------- variant ----------------------------- */
      variant: {
        solid: "",
        outline: "bg-transparent border",
        ghost: "bg-transparent",
        translucent: "backdrop-blur-sm",
        gradient: "text-white",
        link: "bg-transparent underline hover:bg-transparent hover:opacity-80",
      },

      /* -------------------------------- size -------------------------------- */
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-12 min-w-28 px-8 text-lg",
        full: "flex-1 h-12 px-5 text-lg",
      },

      /* ---------------------------- hover effect ---------------------------- */
      hoverEffect: {
        none: "",
        lift: "hover:-translate-y-0.5 hover:shadow-lg",
        glow: "hover:shadow-[0_0_20px_rgba(0,0,0,0.25)]",
        scale: "hover:scale-[1.03] active:scale-[0.98] transition-transform",
        pulse: "hover:animate-pulse",
        shimmer:
          "before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform hover:before:translate-x-full",
      },
    },

    /* ----------------------- intent + variant logic ----------------------- */
    compoundVariants: [
      /* -------------------------------- solid ------------------------------ */
      {
        intent: "add",
        variant: "solid",
        className: "bg-emerald-600 text-white hover:bg-emerald-700",
      },
      {
        intent: "edit",
        variant: "solid",
        className: "bg-blue-600 text-white hover:bg-blue-700",
      },
      {
        intent: "delete",
        variant: "solid",
        className: "bg-red-600 text-white hover:bg-red-700",
      },
      {
        intent: "submit",
        variant: "solid",
        className: "bg-indigo-600 text-white hover:bg-indigo-700",
      },
      {
        intent: "warning",
        variant: "solid",
        className: "bg-amber-500 text-white hover:bg-amber-600",
      },
      {
        intent: "info",
        variant: "solid",
        className: "bg-cyan-600 text-white hover:bg-cyan-700",
      },

      /* ------------------------------- outline ----------------------------- */
      {
        intent: "add",
        variant: "outline",
        className:
          "border-emerald-600 bg-emerald-600/5 hover:bg-emerald-600/10",
      },
      {
        intent: "edit",
        variant: "outline",
        className: "border-blue-600 bg-blue-600/5 hover:bg-blue-600/10",
      },
      {
        intent: "delete",
        variant: "outline",
        className: "border-red-600 bg-red-600/5 hover:bg-red-600/10",
      },
      {
        intent: "submit",
        variant: "outline",
        className: "border-indigo-600 bg-indigo-600/5 hover:bg-indigo-600/10",
      },

      /* -------------------------------- ghost ------------------------------ */
      {
        intent: "add",
        variant: "ghost",
        className: "hover:bg-emerald-600/10",
      },
      {
        intent: "edit",
        variant: "ghost",
        className: "hover:bg-blue-600/10",
      },
      {
        intent: "delete",
        variant: "ghost",
        className: "hover:bg-red-600/10",
      },

      /* ----------------------------- translucent --------------------------- */
      {
        intent: "add",
        variant: "translucent",
        className: "bg-emerald-600/15 text-emerald-700",
      },
      {
        intent: "edit",
        variant: "translucent",
        className: "bg-blue-600/15 text-blue-700",
      },
      {
        intent: "delete",
        variant: "translucent",
        className: "bg-red-600/15 text-red-700",
      },

      /* ------------------------------- gradient ---------------------------- */
      {
        intent: "add",
        variant: "gradient",
        className:
          "bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90",
      },
      {
        intent: "edit",
        variant: "gradient",
        className:
          "bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90",
      },
    ],

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
  press?: boolean;
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
      press = false,
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
          press && "active:scale-[0.95] active:shadow-inner",
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
