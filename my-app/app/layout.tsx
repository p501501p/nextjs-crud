import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ระบบจัดการนักศึกษา",
  description: "จัดการข้อมูลนักศึกษาอย่างเป็นระบบ",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="th"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <header className="border-b border-slate-200/80 bg-white/90 shadow-sm shadow-slate-200/40 backdrop-blur">
          <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <Link href="/" className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-md shadow-blue-600/20">
                S
              </span>
              <span>
                <span className="block text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                  Student Portal
                </span>
                <span className="hidden text-xs text-slate-500 sm:block">
                  ระบบจัดการข้อมูลนักศึกษา
                </span>
              </span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/students"
                className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:px-4"
              >
                รายชื่อนักศึกษา
              </Link>
              <Link
                href="/students/create"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:px-4"
              >
                <span className="sm:hidden">+ เพิ่ม</span>
                <span className="hidden sm:inline">+ เพิ่มนักศึกษา</span>
              </Link>
            </div>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-slate-200 bg-white/70">
          <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-slate-500 sm:px-8">
            ระบบจัดการข้อมูลนักศึกษา
          </div>
        </footer>
      </body>
    </html>
  );
}
