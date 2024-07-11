import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { courseId: string }}) => {
    try {
        const { userId } = auth()
        if(!userId){
            return new NextResponse('Unauthorised', { status: 401})
        }

        const course = await db.course.findUnique({
            where:      { id: params.courseId, instructorId: userId },
        });

        if(!course) {
            return new NextResponse('Course not found', { status: 404})
        }

        const lastSection = await db.section.findFirst({
            where:      { courseId: params.courseId },
            orderBy:    { position: 'desc' }
        })

        const newPosition = lastSection ? lastSection.position + 1 : 0;

        const { title } = await req.json();
        const newSection = await db.section.create({
            data:       {
                title,
                courseId:      params.courseId,
                position:      newPosition
            },
        })

        return NextResponse.json(newSection, { status: 200 });

        

    } catch (error) {
       console.log('[sections_POST]', error) 
       return new NextResponse('Internal Server error', { status: 500 })
    }
}