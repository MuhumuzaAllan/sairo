import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (
  req: NextRequest,
  { params }: { params: { courseId: string } }
) => {
  try {
    const { userId } = auth();
    const { courseId } = params;
    

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: courseId, instructorId: userId },
      });

    if(!course) {
        return new NextResponse('Course not found', { status: 404})
    }

    const unpublishedCourse = await db.course.update({
        where: { id: courseId, instructorId: userId},
        data: { isPublished: false }
    })

    return  NextResponse.json(unpublishedCourse, { status: 200})

} catch (err){
    console.log('[courseId_unpublish_POST]', err)
    return new NextResponse('Internal server error', { status: 500})
}
}