import { getAdminCourse } from "@/app/data/admin/get-admin-course";
import CourseStructure from "@/components/forms/CourseStructure";
import EditCourseForm from "@/components/forms/EditCourseForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function EditCourse({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getAdminCourse(id);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Edit Course: <span className="text-primary">{data.title}</span>
      </h1>

      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="basic-info">Basic Information</TabsTrigger>
          <TabsTrigger value="course-structure">Course Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>
                Edit basic information about the course
              </CardDescription>
            </CardHeader>

            <CardContent>
              <EditCourseForm course={data} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="course-structure">
          <Card>
            <CardHeader>
              <CardTitle>Course Structure</CardTitle>
              <CardDescription>
                Here you can update your course structure
              </CardDescription>
            </CardHeader>

            <CardContent>
              <CourseStructure course={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
