"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "next-intl";

type InputType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "confirmPassword"
  | "phone"
  | "textarea";

type InputSize = "sm" | "md" | "lg";
type BorderSize = "none" | "sm" | "md" | "lg" | "full";

interface MainInputProps {
  name: string;
  type?: InputType;
  label?: string;
  placeholder?: string;

  size?: InputSize;
  borderSize?: BorderSize;
  outline?: boolean;
  fullWidth?: boolean;

  labelClassName?: string;

  error?: string;
  onError?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;

  disabled?: boolean;
  className?: string;
}

export const MainInput: React.FC<MainInputProps> = ({
  name,
  type = "text",
  label,
  placeholder,
  size = "md",
  borderSize = "md",
  outline = true,
  fullWidth = false,
  labelClassName = "",
  error,
  onError,
  register,
  disabled = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const displayError = onError || error;
  const locale = useLocale();

  /* ------------------------------ textarea --------------------------------- */
  if (type === "textarea") {
    return (
      <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}
          </Label>
        )}
        <Textarea
          id={name}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          disabled={disabled}
          className={className}
          {...(outline ? { "data-outline": true } : {})}
        />
        {displayError && (
          <span className="text-xs text-red-500">{displayError}</span>
        )}
      </div>
    );
  }

  /* ------------------------------- input ---------------------------------- */
  const resolvedType =
    type === "confirmPassword" || type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type === "phone"
        ? "tel"
        : type;

  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? "w-full" : ""}`}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
        </Label>
      )}

      <div className="relative w-full">
        {/* Input with padding-right for icon */}
        <Input
          id={name}
          type={resolvedType}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          disabled={disabled}
          className={`${type === "password" || type === "confirmPassword" ? "pr-10" : ""} ${className}`}
        />

        {/* Eye icon inside the input */}
        {(type === "password" || type === "confirmPassword") && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((p) => !p)}
            className={`absolute ${locale === "en" ? "right-2" : "left-2"} top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 flex items-center justify-center`}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {displayError && (
        <span className="text-xs text-red-500">{displayError}</span>
      )}
    </div>
  );
};
