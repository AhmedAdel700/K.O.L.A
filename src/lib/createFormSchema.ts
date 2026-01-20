/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";

type Lang = string;

export const createFormSchema = (lang: Lang) => {
  const t = {
    required: lang === "en" ? "This field is required" : "هذا الحقل مطلوب",

    nameMin:
      lang === "en"
        ? "Name Must Be At Least 4 Characters"
        : "الاسم يجب أن يكون 4 أحرف على الأقل",

    nameMax: lang === "en" ? "Name Is Too Long" : "الاسم طويل جدًا",

    email:
      lang === "en"
        ? "Please Enter A Valid Email Address"
        : "يرجى إدخال بريد إلكتروني صحيح",

    phoneShort:
      lang === "en" ? "Phone Number Is Too Short" : "رقم الهاتف قصير جدًا",

    phoneLong:
      lang === "en" ? "Phone Number Is Too Long" : "رقم الهاتف طويل جدًا",

    phoneInvalid:
      lang === "en"
        ? "Invalid Phone Number Format"
        : "صيغة رقم الهاتف غير صحيحة",

    passwordMin:
      lang === "en"
        ? "Password Must Be At Least 8 Characters"
        : "كلمة المرور يجب أن تكون 8 أحرف على الأقل",

    passwordsMatch:
      lang === "en" ? "Passwords Do Not Match" : "كلمتا المرور غير متطابقتين",

    messageMin:
      lang === "en"
        ? "Message Must Be At Least 10 Characters"
        : "الرسالة يجب أن تكون 10 أحرف على الأقل",

    messageMax: lang === "en" ? "Message Is Too Long" : "الرسالة طويلة جدًا",

    addressMin:
      lang === "en"
        ? "Address Must Be At Least 5 Characters"
        : "العنوان يجب أن يكون 5 أحرف على الأقل",
  };

  return {
    // Required versions
    nameRequired: z
      .string()
      .min(1, t.required)
      .min(4, t.nameMin)
      .max(50, t.nameMax),
    emailRequired: z.string().min(1, t.required).email(t.email),
    phoneRequired: z
      .string()
      .min(1, t.required)
      .min(10, t.phoneShort)
      .max(15, t.phoneLong)
      .regex(/^\+?[0-9\s-]+$/, t.phoneInvalid),
    passwordRequired: z.string().min(1, t.required).min(8, t.passwordMin),
    confirmPasswordRequired: z.string().min(1, t.required),
    messageRequired: z
      .string()
      .min(1, t.required)
      .min(10, t.messageMin)
      .max(500, t.messageMax),
    addressRequired: z.string().min(1, t.required).min(5, t.addressMin),

    // Optional versions
    name: z
      .string()
      .min(4, t.nameMin)
      .max(50, t.nameMax)
      .optional()
      .or(z.literal("")),
    email: z.string().email(t.email).optional().or(z.literal("")),
    phone: z
      .string()
      .min(10, t.phoneShort)
      .max(15, t.phoneLong)
      .regex(/^\+?[0-9\s-]+$/, t.phoneInvalid)
      .optional()
      .or(z.literal("")),
    password: z.string().min(8, t.passwordMin).optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
    message: z
      .string()
      .min(10, t.messageMin)
      .max(500, t.messageMax)
      .optional()
      .or(z.literal("")),
    address: z.string().min(5, t.addressMin).optional().or(z.literal("")),

    // ✅ New select field
    selectRequired: z.string().min(1, t.required),
    select: z.string().optional().or(z.literal("")),

    translations: t,
  };
};

// ✅ Helper function to pick only the fields you need
export const pickFormFields = <T extends string[]>(
  lang: Lang,
  fields: { name: T[number]; required?: boolean }[],
) => {
  const schemaFields = createFormSchema(lang);

  const picked = fields.reduce((acc, field) => {
    const fieldName = field.name;
    const isRequired = field.required ?? false;

    let fieldSchema: any;

    if (isRequired) {
      fieldSchema =
        schemaFields[`${fieldName}Required` as keyof typeof schemaFields];
    } else {
      fieldSchema = schemaFields[fieldName as keyof typeof schemaFields];
    }

    if (fieldSchema) {
      acc[fieldName] = fieldSchema;
    }

    return acc;
  }, {} as any);

  const baseSchema = z.object(picked);

  // Add password confirmation validation if both password fields are included
  const hasPassword = fields.some((f) => f.name === "password");
  const hasConfirmPassword = fields.some((f) => f.name === "confirmPassword");

  if (hasPassword && hasConfirmPassword) {
    return baseSchema.refine(
      (data: any) => data.password === data.confirmPassword,
      {
        path: ["confirmPassword"],
        message: schemaFields.translations.passwordsMatch,
      },
    );
  }

  return baseSchema;
};
