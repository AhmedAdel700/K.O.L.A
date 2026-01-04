import { z } from "zod";

type Lang = "en" | "ar";

export const createFormSchema = (lang: Lang) => {
  const t = {
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

  return z
    .object({
      name: z.string().min(4, t.nameMin).max(50, t.nameMax),
      email: z.string().email(t.email),
      phone: z
        .string()
        .min(10, t.phoneShort)
        .max(15, t.phoneLong)
        .regex(/^\+?[0-9\s-]+$/, t.phoneInvalid),
      password: z.string().min(8, t.passwordMin),
      confirmPassword: z.string(),
      message: z.string().min(10, t.messageMin).max(500, t.messageMax),
      address: z.string().min(5, t.addressMin),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: t.passwordsMatch,
    });
};
