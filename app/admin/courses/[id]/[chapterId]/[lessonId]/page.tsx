import { getAdminLesson } from "@/app/data/admin/get-admin-lesson";
import EditLessonForm from "@/components/forms/EditLessonForm";

type Params = Promise<{
  id: string;
  chapterId: string;
  lessonId: string;
}>;

export default async function EditLesson({ params }: { params: Params }) {
  const { id, chapterId, lessonId } = await params;

  const lesson = await getAdminLesson(lessonId);

  return <EditLessonForm lesson={lesson} chapterId={chapterId} courseId={id} />;
}
