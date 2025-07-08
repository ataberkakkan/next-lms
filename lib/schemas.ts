import { z } from "zod";

export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;

export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics",
] as const;

export const courseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Course Title is required." })
    .max(100, { message: "Course Title cannot exceed 100 characters." }),
  description: z.string().min(1, { message: "Description is required." }),
  fileKey: z.string().min(1, { message: "File is required." }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be a positive number." }),
  duration: z.coerce
    .number()
    .min(1, { message: "Duration must be at least 1 hour" })
    .max(500, { message: "Duration cannot be more than 500 hours" }),
  level: z.enum(courseLevels, {
    message: "Level is required",
  }),
  category: z.enum(courseCategories, { message: "Category is required." }),
  smallDescription: z
    .string()
    .min(3, { message: "Description should be at least 3 characters," })
    .max(200, { message: "Description cannot exceed 200 characters." }),
  slug: z
    .string()
    .min(3, { message: "Slug must be at least 3 characters long." }),
  status: z.enum(courseStatus, {
    message: "Status is required.",
  }),
});

export const chapterSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Chapter Title should be at least 3 characters" }),
  courseId: z.string().uuid({ message: "Invalid Course ID" }),
});

export const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "Filename is required." }),
  contentType: z.string().min(1, { message: "Content Type is required." }),
  size: z.number().min(1, { message: "Size is required." }),
  isImage: z.boolean(),
});

export type CourseSchemaType = z.infer<typeof courseSchema>;
export type ChapterSchemaType = z.infer<typeof chapterSchema>;
