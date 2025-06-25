import "server-only";
import { requireAdmin } from "./require-admin";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getAdminCourse(courseId: string) {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export type AdminCourseSingularType = Awaited<
  ReturnType<typeof getAdminCourse>
>;
