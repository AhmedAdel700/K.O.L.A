"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister, Control, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "next-intl";
import Image from "next/image";
import SAFlag from "@/assets/SA.svg.webp";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type InputType =
  | "text"
  | "email"
  | "number"
  | "password"
  | "confirmPassword"
  | "phone"
  | "textarea"
  | "select";

type InputShape = "normal" | "bottom" | "none";

interface SelectOption {
  value: string;
  label: string;
}

interface MainInputProps {
  name: string;
  type?: InputType;
  label?: string;
  placeholder?: string;
  required?: boolean;

  outline?: boolean;
  fullWidth?: boolean;

  labelClassName?: string;
  error?: string;

  inputType?: InputShape;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;

  options?: SelectOption[];
  disabled?: boolean;
  className?: string;
}

export const MainInput: React.FC<MainInputProps> = ({
  name,
  type = "text",
  label,
  placeholder,
  required = false,
  outline = true,
  fullWidth = false,
  labelClassName = "",
  error,
  inputType = "normal",
  register,
  control,
  options = [],
  disabled = false,
  className = "",
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const locale = useLocale();

  const getWrapperWidthClasses = () =>
    fullWidth ? "w-full col-span-full flex-1 min-w-0" : "";

  const getInputShapeClass = () => {
    if (inputType === "bottom") return "border-0 border-b rounded-none";
    if (inputType === "none") return "border-0";
    return "";
  };

  const getOutlineClasses = () =>
    outline ? "" : "focus-visible:ring-0 focus-visible:ring-offset-0";

  /* ------------------------------ textarea --------------------------------- */
  if (type === "textarea") {
    return (
      <div className={`flex flex-col gap-1 ${getWrapperWidthClasses()}`}>
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}
            {required && <span className="text-red-600">*</span>}
          </Label>
        )}

        <Textarea
          id={name}
          {...(register ? register(name) : {})}
          placeholder={placeholder}
          disabled={disabled}
          className={`${getInputShapeClass()} ${getOutlineClasses()} ${className}`}
        />

        {error && <span className="text-xs text-red-600">{error}</span>}
      </div>
    );
  }

  /* ------------------------------- select ---------------------------------- */
  if (type === "select") {
    return (
      <div className={`flex flex-col gap-1 ${getWrapperWidthClasses()}`}>
        {label && (
          <Label htmlFor={name} className={labelClassName}>
            {label}
            {required && <span className="text-red-600">*</span>}
          </Label>
        )}

        {control ? (
          <Controller
            control={control}
            name={name}
            rules={{ required }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={disabled}
                dir={locale === "ar" ? "rtl" : "ltr"}
              >
                <SelectTrigger
                  className={`${fullWidth ? "w-full" : ""} ${className}`}
                >
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        ) : (
          <p className="text-red-500 text-xs">
            Admin Error: Select input requires "control" prop.
          </p>
        )}

        {error && <span className="text-xs text-red-600">{error}</span>}
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
    <div className={`flex flex-col gap-1 ${getWrapperWidthClasses()}`}>
      {label && (
        <Label htmlFor={name} className={labelClassName}>
          {label}
          {required && <span className="text-red-600">*</span>}
        </Label>
      )}

      <div className="relative w-full">
        {type === "phone" && (
          <span
            className={`absolute ${locale === "en" ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 flex items-center`}
          >
            <Image src={SAFlag} width={35} alt="SA Flag" />
          </span>
        )}

        <Input
          id={name}
          type={resolvedType}
          {...(register ? register(name, { required }) : {})}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            ${getInputShapeClass()}
            ${getOutlineClasses()}
            ${className}
            ${type === "phone" ? "ps-14" : ""}
          `}
          dir={locale === "ar" ? "rtl" : "ltr"}
        />

        {(type === "password" || type === "confirmPassword") && (
          <button
            type="button"
            suppressHydrationWarning
            tabIndex={-1}
            onClick={() => setShowPassword((p) => !p)}
            className={`absolute ${locale === "en" ? "right-2" : "left-2"} top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700`}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>

      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
};
