"use client";

import MainButton from "@/components/Custom/MainButton";
import { MainInput } from "@/components/Custom/MainInput";
import { pickFormFields } from "@/lib/createFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

export default function Demo() {
  const locale = useLocale();

  const schema = pickFormFields(locale, [
    { name: "name", required: true },
    { name: "email", required: true },
    { name: "password", required: true },
    { name: "confirmPassword", required: true },
    { name: "select", required: true },
  ]);

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      select: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    toast.success("Form submitted successfully!");
    reset();
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
            outline={false}
            error={errors.name?.message}
            required
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
            required
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
            required
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
            required
          />

          {/* ------------------ select field ------------------ */}
          <MainInput
            name="select"
            type="select"
            label={locale === "en" ? "Select Option" : "اختر خيارًا"}
            placeholder={locale === "en" ? "Choose..." : "اختر..."}
            control={control}
            error={errors.select?.message}
            required
            fullWidth
            options={[
              {
                value: "option1",
                label: locale === "en" ? "Option 1" : "الخيار 1",
              },
              {
                value: "option2",
                label: locale === "en" ? "Option 2" : "الخيار 2",
              },
              {
                value: "option3",
                label: locale === "en" ? "Option 3" : "الخيار 3",
              },
            ]}
          />

          <MainInput
            name="phone"
            type="phone"
            label={locale === "en" ? "Phone Number" : "رقم الهاتف"}
            placeholder={
              locale === "en" ? "+966 5 123 45678" : "+966 5 123 45678"
            }
            register={register}
            error={errors.phone?.message}
            required
            fullWidth
          />

          <MainInput
            name="message"
            type="textarea"
            label={locale === "en" ? "Message" : "الرسالة"}
            placeholder={locale === "en" ? "Enter your message" : "أدخل رسالتك"}
            register={register}
            error={errors.message?.message}
            required
            fullWidth
          />

          <MainButton
            type="submit"
            variant={"solid"}
            intent={"submit"}
            size={"full"}
            className="col-span-2"
          >
            Submit
          </MainButton>
        </form>
      </div>
    </div>
  );
}
