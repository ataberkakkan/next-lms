"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { enrollInCourse } from "@/lib/actions/enrollment.action";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const EnrollmentButton = ({ courseId }: { courseId: string }) => {
  const [isPending, startTransition] = useTransition();

  const enroll = () => {
    startTransition(async () => {
      const result = await enrollInCourse(courseId);

      if (result.status === "error") {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Course Created Successfully!");
      }
    });
  };

  return (
    <Button className="w-full" onClick={enroll} disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Please Wait
        </>
      ) : (
        "Enroll Now!"
      )}
    </Button>
  );
};
export default EnrollmentButton;
