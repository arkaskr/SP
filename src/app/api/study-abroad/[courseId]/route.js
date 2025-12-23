import coursesData from "@/tempdata/courses.json";

// This is the API handler for `/api/certificate-courses`
// It handles both the case when courseId is provided or not.
export const GET = async (req, { params }) => {
  try {
    const { courseId } = await params;

    if (courseId) {
      if(courseId!="all"){  const course = coursesData.courses.find((c) => c.courseId === courseId);

        if (!course) {
          return new Response(
            JSON.stringify({ error: "Course not found" }),
            { status: 404 }
          );
        }

        return new Response(JSON.stringify(course), { status: 200 });
      }
      return new Response(JSON.stringify(coursesData), { status: 200 });
    }

  } catch (error) {
    console.error("Error fetching courses:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch courses" }),
      { status: 500 }
    );
  }
};
