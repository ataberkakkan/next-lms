import { getAdminCourses } from "@/app/data/admin/get-admin-courses";
import AdminCourseCard from "@/components/cards/AdminCourseCard";
import EmptyState from "@/components/EmptyState";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Courses() {
  const data = await getAdminCourses();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Your Courses</h1>

        <Link href="/admin/courses/create" className={buttonVariants()}>
          Create Course
        </Link>
      </div>

      {data.length === 0 ? (
        <EmptyState
          title="No Courses Found"
          description="Create a new course to get started."
          buttonText="Create Course"
          href="/admin/courses/create"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-7">
          {data.map((course) => (
            <AdminCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );
}
