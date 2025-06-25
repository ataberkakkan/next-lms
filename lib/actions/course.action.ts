"use server";

import { courseSchema, CourseSchemaType } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { requireAdmin } from "@/app/data/admin/require-admin";

export async function createCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong.",
    };
  }
}

export async function editCourse(
  values: CourseSchemaType,
  courseId: string
): Promise<ApiResponse> {
  const session = await requireAdmin();

  try {
    const validation = courseSchema.safeParse(values);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: session.user.id as string,
      },
      data: {
        ...validation.data,
      },
    });

    return {
      status: "success",
      message: "Course updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Something went wrong.",
    };
  }
}
