import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "ПринтСелект — создай свой принт",
  description:
    "Конструктор одежды, аксессуаров и готовые коллекции HOBBY#. Загрузи принт, настрой товар и оформи заказ с доставкой по России.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}