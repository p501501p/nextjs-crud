import prisma from "@/app/lib/prisma";
import DeleteButton from "./delete-button";
import Link from "next/link";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-sm font-semibold tracking-wide text-blue-700">
            STUDENT DIRECTORY
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            รายชื่อนักศึกษา
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            ดูและจัดการข้อมูลนักศึกษาทั้งหมดในระบบ
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <span className="size-2 rounded-full bg-emerald-500" />
          <span className="text-sm text-slate-500">นักศึกษาทั้งหมด</span>
          <strong className="text-lg font-bold text-slate-900">
            {students.length}
          </strong>
          <span className="text-sm text-slate-500">คน</span>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/60">
        {students.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center sm:py-20">
            <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
              +
            </span>
            <h2 className="text-lg font-semibold text-slate-900">
              ยังไม่มีข้อมูลนักศึกษา
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              เริ่มต้นใช้งานด้วยการเพิ่มข้อมูลนักศึกษาคนแรกของคุณ
            </p>
            <Link
              href="/students/create"
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              + เพิ่มนักศึกษา
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-5 py-4 font-semibold">ID</th>
              <th className="px-5 py-4 font-semibold">
                รหัสนักศึกษา
              </th>
              <th className="px-5 py-4 font-semibold">
                ชื่อ
              </th>
              <th className="px-5 py-4 font-semibold">
                Email
              </th>
              <th className="px-5 py-4 font-semibold">
                สาขา
              </th>
              <th className="px-5 py-4 font-semibold">
                ชั้นปี
              </th>
              <th className="px-5 py-4 font-semibold">
                สถานะ
              </th>
              <th className="px-5 py-4 text-right font-semibold">
                จัดการ
              </th>
            </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <tr
                key={student.id}
                className="transition-colors hover:bg-blue-50/40"
              >
                <td className="px-5 py-4 text-slate-500">
                  {student.id}
                </td>

                <td className="px-5 py-4 font-mono text-xs font-medium text-slate-600">
                  {student.studentCode}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-900">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
                      {student.name.trim().charAt(0)}
                    </span>
                    {student.name}
                  </div>
                </td>

                <td className="px-5 py-4 text-slate-500">
                  {student.email ?? "-"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {student.major}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {student.year}
                </td>

                <td className="px-5 py-4">
                  {student.status ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      กำลังศึกษา
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10">
                      <span className="size-1.5 rounded-full bg-slate-400" />
                      ไม่ใช้งาน
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/students/${student.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                      แก้ไข
                    </Link>
                    <DeleteButton id={student.id} />
                  </div>
                </td>
              </tr>
            ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
