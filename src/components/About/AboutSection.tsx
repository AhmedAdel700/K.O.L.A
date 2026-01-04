"use client";

import TextEffect from "../Custom/TextEffect";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema } from "@/lib/createFormSchema";
import type { z } from "zod";

export default function AboutSection() {
  const locale = useLocale();
  const lang = locale === "ar" ? "ar" : "en";

  const schema = createFormSchema(lang);
  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log("VALID DATA:", data);
  };

  return (
    <section className="flex flex-col justify-center items-center min-h-screen bg-amber-400 px-4">
      {/* Title */}
      <TextEffect
        animationType="hologram"
        lang={lang}
        duration={1.5}
        text="This Is An About Section"
        className="text-5xl text-center text-white font-semibold mb-10"
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white p-6 rounded-xl shadow-lg space-y-4"
      >
        {/* Name */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            {...register("phone")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.phone && (
            <p className="text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            rows={4}
            {...register("message")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400 resize-none"
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Address */}
        <div className="space-y-1">
          <label className="block font-medium text-gray-700">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full p-3 rounded-md border outline-none focus:ring-2 focus:ring-amber-400"
          />
          {errors.address && (
            <p className="text-sm text-red-600">{errors.address.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
