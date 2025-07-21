import { ChartAreaInteractive } from "@/components/sidebar/chart-area-interactive";
import { SectionCards } from "@/components/sidebar/section-cards";
import { getAdminEnrollmentStats } from "../data/admin/get-admin-enrollment-stats";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getAdminRecentCourses } from "../data/admin/get-admin-recent-courses";
import EmptyState from "@/components/EmptyState";
import AdminCourseCard, {
  AdminCourseCardSkeleton,
} from "@/components/cards/AdminCourseCard";
import { Suspense } from "react";

export default async function AdminIndexPage() {
  const enrollmentData = await getAdminEnrollmentStats();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Courses</h2>
          <Link
            href="/admin/courses"
            className={buttonVariants({ variant: "outline" })}
          >
            View All Courses
          </Link>
        </div>

        <Suspense fallback={<RecentCoursesSekeletonLayout />}>
          <RenderRecentCourses />
        </Suspense>
      </div>
    </>
  );
}

async function RenderRecentCourses() {
  const data = await getAdminRecentCourses();

  if (data.length === 0) {
    return (
      <EmptyState
        title="You dont have any courses yet!"
        description="You dont have any courses. Create one to see them here"
        buttonText="Create New Course"
        href="/admin/courses/create"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.map((course) => (
        <AdminCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

function RecentCoursesSekeletonLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <AdminCourseCardSkeleton key={index} />
      ))}
    </div>
  );
}
