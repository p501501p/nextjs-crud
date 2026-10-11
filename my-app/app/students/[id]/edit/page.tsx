import prisma from "@/app/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStudent(
  studentId: number,
  formData: FormData,
) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.update({
    where: {
      id: studentId,
    },

    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

async function EditStudentContent({ params }: EditStudentPageProps) {
  const { id } = await params;

  const studentId = Number(id);

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    return (
      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="rounded-2xl border border-rose-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-rose-700">
          ไม่พบข้อมูลนักศึกษา
          </h1>
          <Link
            href="/students"
            className="mt-5 inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            กลับไปหน้ารายชื่อ
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
      <div className="mb-7">
        <Link
          href="/students"
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-700"
        >
          <span aria-hidden="true">←</span> กลับไปหน้ารายชื่อนักศึกษา
        </Link>
        <p className="mb-2 text-sm font-semibold tracking-wide text-blue-700">
          STUDENT DIRECTORY
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          แก้ไขนักศึกษา
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          แก้ไขข้อมูลนักศึกษา ID: {student.id}
        </p>
      </div>

      <form
        action={async (formData) => {
          "use server";

          await updateStudent(studentId, formData);
        }}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60 sm:p-8"
      >
        <div>
          <label
            htmlFor="studentCode"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            รหัสนักศึกษา
          </label>

          <input
            id="studentCode"
            type="text"
            name="studentCode"
            defaultValue={student.studentCode}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            ชื่อ-นามสกุล
          </label>

          <input
            id="name"
            type="text"
            name="name"
            defaultValue={student.name}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            defaultValue={student.email ?? ""}
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="major"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            สาขา
          </label>

          <input
            id="major"
            type="text"
            name="major"
            defaultValue={student.major}
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label
            htmlFor="year"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            ชั้นปี
          </label>

          <input
            id="year"
            type="number"
            name="year"
            defaultValue={student.year}
            min="1"
            max="8"
            required
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            บันทึกการแก้ไข
          </button>

          <Link
            href="/students"
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ยกเลิก
          </Link>
        </div>
      </form>
    </main>
  );
}

export default function EditStudentPage({ params }: EditStudentPageProps) {
  return (
    <Suspense
      fallback={
        <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 lg:py-14">
          <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500 shadow-sm">
            กำลังโหลดข้อมูลนักศึกษา...
          </div>
        </main>
      }
    >
      <EditStudentContent params={params} />
    </Suspense>
  );
}
