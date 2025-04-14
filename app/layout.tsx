import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@/components/analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pawan Sachdeva",
  description: "",
  keywords: [
    "Pawan Sachdeva",
    "Pawan",
    "Sachdeva",
    "Portfolio",
    "Software Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Django Developer",
    "Ai Agents",
    "LangChain",
  ],
  openGraph: {
    title: "Pawan Sachdeva",
    description: "",
    type: "website",
    // url: "https://rahul.bora",
  },
  // twitter: {
  //   title: "Pawan Sachdeva",
  //   description: "",
  //   card: "summary_large_image",
  //   site: "https://x.com/SimplyRahul7",
  //   creator: "@pwsd21",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
