import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Controle Financeiro",
  description: "Aplicação para controle financeiro pessoal.",
  keywords: ["finanças", "controle financeiro", "pessoal"],
  authors: [
    { name: "Mario Marques", url: "https://mario-leandro.github.io/DevMario/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} antialiased min-h-screen bg-violet-200 flex justify-center items-center`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
