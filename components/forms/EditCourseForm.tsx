"use client";
import { Button } from "@/components/ui/button";

import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/schemas";
import { Loader2, Pencil, Sparkles } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@/components/rich-text-editor/Editor";
import FileUploader from "@/components/file-uploader/FileUploader";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { editCourse } from "@/lib/actions/course.action";
import { AdminCourseSingularType } from "@/app/data/admin/get-admin-course";

interface EditCourseFormProps {
  course: AdminCourseSingularType;
}

const EditCourseForm = ({ course }: EditCourseFormProps) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      fileKey: course.fileKey,
      price: course.price,
      duration: course.duration,
      level: course.level,
      category: course.category as CourseSchemaType["category"],
      smallDescription: course.smallDescription,
      slug: course.slug,
      status: course.status,
    },
  });

  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const result = await editCourse(values, course.id);

      if (result.status === "error") {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Course Updated Successfully!");
        form.reset();
        router.push("/admin/courses");
      }
    });
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Course Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-end">
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            className="w-fit"
            onClick={() => {
              const titleValue = form.getValues("title");

              const slug = slugify(titleValue);

              form.setValue("slug", slug, { shouldValidate: true });
            }}
          >
            Generate Slug <Sparkles className="ml-1" size={16} />
          </Button>
        </div>

        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Small Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Small Description"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <FileUploader value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {courseLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Duration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {courseStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              <Pencil size={16} />
              Edit Course
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default EditCourseForm;
