"use server";

import { courseSchema, CourseSchemaType } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function createCourse(
  values: CourseSchemaType
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

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
