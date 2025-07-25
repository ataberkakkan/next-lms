import { prisma } from "@/lib/prisma";
import { verifyUser } from "../user/verify-user";
import { notFound } from "next/navigation";

export async function getCourseSidebarData(slug: string) {
  const user = await verifyUser();

  const course = await prisma.course.findUnique({
    where: {
      slug: slug,
    },
    select: {
      id: true,
      title: true,
      fileKey: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      chapter: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: user.id,
                },
                select: {
                  completed: true,
                  lessonId: true,
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) return notFound();

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: user.id,
        courseId: course.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== "Active") return notFound();

  return { course };
}

export type EnrolledCourse = Awaited<ReturnType<typeof getCourseSidebarData>>;
