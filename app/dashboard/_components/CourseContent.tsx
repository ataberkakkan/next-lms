"use client";

import { LessonContentType } from "@/app/data/course/get-lesson-content";
import RenderContent from "@/components/rich-text-editor/RenderContent";
import { Button } from "@/components/ui/button";
import { useConfetti } from "@/hooks/use-confetti";
import { useConstructUrl } from "@/hooks/use-construct-url";
import { markLessonComplete } from "@/lib/actions/progress.action";
import { BookIcon, CheckCircle } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

interface CourseContentProps {
  data: LessonContentType;
}

const CourseContent = ({ data }: CourseContentProps) => {
  const [isPending, startTransition] = useTransition();

  const { triggerConfetti } = useConfetti();

  function VideoPlayer({
    thumbnailKey,
    videoKey,
  }: {
    thumbnailKey: string;
    videoKey: string;
  }) {
    const thumbnailUrl = useConstructUrl(thumbnailKey);
    const videoUrl = useConstructUrl(videoKey);

    if (!videoKey) {
      return (
        <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
          <BookIcon className="size-16 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">
            This lesson does not have a video yet
          </p>
        </div>
      );
    }

    return (
      <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
        <video
          className="w-full h-full object-cover"
          controls
          poster={thumbnailUrl}
        >
          <source src={videoUrl} type="video/mp4" />
          <source src={videoUrl} type="video/webm" />
          <source src={videoUrl} type="video/ogg" />
        </video>
      </div>
    );
  }

  const handleComplete = () => {
    startTransition(async () => {
      const result = await markLessonComplete(
        data.id,
        data.Chapter.Course.slug
      );

      if (result.status === "error") {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Lesson Completed");
        triggerConfetti();
      }
    });
  };

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer
        thumbnailKey={data.thumbnailKey ?? ""}
        videoKey={data.videoKey ?? ""}
      />

      <div className="py-4 border-b">
        {data.lessonProgress.length > 0 ? (
          <Button
            variant="outline"
            className="bg-green-500/10 text-green-500 hover:text-green-600"
          >
            <CheckCircle className="size-4 mr-1 text-green-500" />
            Completed
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleComplete}
            disabled={isPending}
          >
            <CheckCircle className="size-4 mr-1 text-green-500" />
            Mark As Complete
          </Button>
        )}
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold trackint-tight text-foreground">
          {data.title}
        </h1>
        {data.description && (
          <RenderContent json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
};

export default CourseContent;
