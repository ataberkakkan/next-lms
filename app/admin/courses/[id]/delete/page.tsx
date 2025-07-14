"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteCourse } from "@/lib/actions/course.action";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function DeleteCourse() {
  const { id } = useParams<{ id: string }>();

  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const deleteHandler = () => {
    startTransition(async () => {
      const result = await deleteCourse(id);

      if (result.status === "error") {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Course deleted");
        router.push("/admin/courses");
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto w-full">
      <Card className="mt-32">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. This will delete all chapters and
            lessons.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>

          <Button
            variant="destructive"
            onClick={deleteHandler}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="size-4" />
                Delete Course
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
