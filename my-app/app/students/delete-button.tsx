"use client";

import { deleteStudent } from "./actions";

type DeleteButtonProps = {
  id: number;
};

export default function DeleteButton({
  id,
}: DeleteButtonProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "คุณต้องการลบนักศึกษาคนนี้ใช่หรือไม่?"
    );

    if (!confirmed) {
      return;
    }

    await deleteStudent(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-lg border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
    >
      ลบ
    </button>
  );
}