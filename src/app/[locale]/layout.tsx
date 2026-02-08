import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import SmoothScrollProvider from "@/app/Providers/SmoothScrollProvider";
import "@/styles/globals.css";
import { Toaster } from "sonner";
import Header from "@/components/Header/Header";


const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "K.O.L.A - Constructions & Interior Finishing",
  description: "K.O.L.A is a leading construction and interior finishing company specializing in high-end commercial spaces. With a commitment to quality and innovation, we transform ordinary spaces into extraordinary environments that inspire and captivate. Our team of experts delivers exceptional craftsmanship and attention to detail, ensuring every project exceeds expectations. From concept to completion, K.O.L.A is your trusted partner for creating stunning commercial interiors that leave a lasting impression.",
};

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header type="drawer" />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
