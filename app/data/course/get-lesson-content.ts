import { prisma } from "@/lib/prisma";
import { verifyUser } from "../user/verify-user";
import { notFound } from "next/navigation";

export async function getLessonContent(lessonId: string) {
  const user = await verifyUser();

  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      thumbnailKey: true,
      videoKey: true,
      position: true,
      Chapter: {
        select: {
          courseId: true,
        },
      },
    },
  });

  if (!lesson) return notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: lesson.Chapter.courseId,
      },
    },
    select: {
      status: true,
    },
  });

  if (!enrollment || enrollment.status !== "Active") return notFound();

  return lesson;
}

export type LessonContentType = Awaited<ReturnType<typeof getLessonContent>>;
