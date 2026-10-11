import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 py-12 sm:px-8 lg:py-20">
      <section className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-7 py-12 text-white shadow-xl shadow-blue-950/15 sm:px-12 sm:py-16 lg:px-16">
        <div className="absolute -right-16 -top-24 size-72 rounded-full bg-blue-400/15 blur-3xl" />
        <div className="absolute -bottom-28 right-1/4 size-64 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-100">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            STUDENT MANAGEMENT SYSTEM
          </span>
          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            จัดการข้อมูลนักศึกษา
            <span className="mt-2 block text-blue-200">ได้ง่ายในที่เดียว</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-blue-100/80 sm:text-lg">
            ระบบสำหรับดูแลข้อมูลนักศึกษา เพิ่ม แก้ไข และจัดการรายชื่อได้อย่างเป็นระเบียบ
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/students"
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-950 shadow-lg transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              ดูรายชื่อนักศึกษา{" "}
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              href="/students/create"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              + เพิ่มนักศึกษา
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
