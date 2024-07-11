
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const CoursesPage = async () => {
    const { userId } = auth();
    if(!userId) {
        return redirect('/sign-in')
    }
    const courses = await db.course.findMany({
        where: {
            instructorId: userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
    

  return (
    <div className='px-6 py-4 '>
        <Link href='/instructor/create-course'>
            <Button className='text-black'>
                Create New Course
            </Button>
        </Link>
        <div className="mt-10">
            {courses.map((course) => (
                <Link href={`/instructor/courses/${course.id}/basic`}>{course.title}</Link>
            ))}
        </div>
    </div>
  )
}

export default CoursesPage