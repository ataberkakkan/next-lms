import { getLessonContent } from "@/app/data/course/get-lesson-content";
import CourseContent from "../../_components/CourseContent";

export default async function LessonView({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;

  const data = await getLessonContent(lessonId);

  return <CourseContent data={data} />;
}
