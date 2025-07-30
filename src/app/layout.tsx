import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

// Crie a variável para a fonte Roboto
const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "CodeLeap Network",
  description: "CodeLeap Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}