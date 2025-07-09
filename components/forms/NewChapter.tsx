"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chapterSchema, ChapterSchemaType } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createChapter } from "@/lib/actions/course.action";
import { toast } from "sonner";

const NewChapter = ({ courseId }: { courseId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: "",
      courseId: courseId,
    },
  });

  function onSubmit(values: ChapterSchemaType) {
    startTransition(async () => {
      const result = await createChapter(values);

      if (result.status === "error") {
        toast.error(result.message || "Something went wrong.");
      } else {
        toast.success(result.message || "Chapter added");
        form.reset();
        setIsOpen(false);
      }
    });
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }

    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Plus className="size-4" />
          New Chapter
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Chapter</DialogTitle>
          <DialogDescription>
            What would you like to name your chapter?
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Chapter Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Chages"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewChapter;
