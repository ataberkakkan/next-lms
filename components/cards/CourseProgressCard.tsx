/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useConstructUrl } from "@/hooks/use-construct-url";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { EnrolledCourses } from "@/app/data/user/get-enrolled-courses";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";

const CourseProgressCard = ({ course }: { course: EnrolledCourses }) => {
  const thumbnailUrl = useConstructUrl(course.Course.fileKey);

  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: course.Course as any });

  return (
    <Card className="group relative py-0 gap-0">
      <Badge className="absolute top-2 right-2 z-10 rounded-xl">
        {course.Course.level}
      </Badge>

      <Image
        src={thumbnailUrl}
        alt={course.Course.title}
        width={600}
        height={400}
        className="w-full rounded-t-xl aspect-video h-full object-cover"
      />

      <CardContent className="p-4">
        <Link
          href={`/courses/${course.Course.slug}`}
          className="font-medium text-lg line-clamp-2 group-hover:text-primary transition-colors"
        >
          {course.Course.title}
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground leading-tight mt-2">
          {course.Course.smallDescription}
        </p>

        <div className="space-y-4 mt-5">
          <div className="flex items-center gap-1 mb-1 text-sm">
            <p>Progress:</p>
            <p className="font-medium">{progressPercentage}%</p>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />

          <p className="text-xs text-muted-foreground mt-1">
            {completedLessons} of {totalLessons} lessons completed
          </p>
        </div>

        <Link
          href={`/dashboard/${course.Course.slug}`}
          className={buttonVariants({
            className: "w-full mt-4",
          })}
        >
          Continue
        </Link>
      </CardContent>
    </Card>
  );
};

export const CourseCardSekeleton = () => {
  return (
    <Card className="group relative py-0 gap-0">
      <div className="absolute top-2 right-2 z-10 flex items-center">
        <Skeleton className="h-6 w-20 rounded-xl" />
      </div>

      <div className="w-full relative h-fit">
        <Skeleton className="w-full rounded-t-xl aspect-video" />
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>

        <div className="mt-4 flex items-center gap-x-5">
          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>

          <div className="flex items-center gap-x-2">
            <Skeleton className="size-6 rounded-md" />
            <Skeleton className="h-4 w-8" />
          </div>
        </div>

        <Skeleton className="mt-4 w-full h-10 rounded-md" />
      </CardContent>
    </Card>
  );
};

export default CourseProgressCard;
