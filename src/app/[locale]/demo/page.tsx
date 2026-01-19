"use client";

import MainButton from "@/components/Custom/MainButton";
import { MainInput } from "@/components/Custom/MainInput";
import { pickFormFields } from "@/lib/createFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Demo() {
  const locale = useLocale();

  // ✅ Pick only the fields you want - they will ALL be required
  const schema = pickFormFields(locale, [
    "name",
    "email",
    "password",
    "confirmPassword",
  ]);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    alert("Form submitted successfully! Check console for data.");
    reset(); // ✅ Reset to empty values
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          {locale === "en" ? "Registration Form" : "نموذج التسجيل"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <MainInput
            name="name"
            type="text"
            label={locale === "en" ? "Full Name" : "الاسم الكامل"}
            placeholder={locale === "en" ? "Enter your name" : "أدخل اسمك"}
            register={register}
            error={errors.name?.message}
          />

          <MainInput
            name="email"
            type="email"
            label={locale === "en" ? "Email Address" : "البريد الإلكتروني"}
            placeholder={
              locale === "en" ? "you@example.com" : "you@example.com"
            }
            register={register}
            error={errors.email?.message}
            fullWidth
          />

          <MainInput
            name="password"
            type="password"
            label={locale === "en" ? "Password" : "كلمة المرور"}
            placeholder={
              locale === "en" ? "Enter password" : "أدخل كلمة المرور"
            }
            register={register}
            error={errors.password?.message}
            fullWidth
          />

          <MainInput
            name="confirmPassword"
            type="confirmPassword"
            label={locale === "en" ? "Confirm Password" : "تأكيد كلمة المرور"}
            placeholder={
              locale === "en" ? "Confirm password" : "أكد كلمة المرور"
            }
            register={register}
            error={errors.confirmPassword?.message}
            fullWidth
          />

          <MainButton type="submit" variant={"solid"} intent={"submit"} size={"full"} className="col-span-2">Submit</MainButton>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2 font-semibold">
            {locale === "en" ? "Usage Examples:" : "أمثلة الاستخدام:"}
          </p>
          <code className="text-xs block bg-white p-2 rounded border">
            {`// Contact form
const schema = pickFormFields(locale, ["name", "email", "message"]);

// Profile form  
const schema = pickFormFields(locale, ["name", "phone", "address"]);`}
          </code>
        </div>
      </div>
    </div>
  );
}
