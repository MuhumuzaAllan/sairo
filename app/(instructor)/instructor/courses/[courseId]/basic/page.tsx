import EditCourseForm from '@/components/courses/EditCourseForm'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import React from 'react'

const CourseBasics = async ( {params}: { params:  { courseId: string} } ) => {

  const { userId } = auth()
  if (!userId) {
    return redirect('/sign-in')
  }

  const course = await db.course.findUnique({
    where: {
      id:           params.courseId,
      instructorId: userId 
    }
  })
  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    },
    include: {
      subCategories: true
    }
  })

  const levels = await db.level.findMany({

  })

  if (!course) {
    return redirect('/instructor/courses')
  }
  return (
    <div className='px-10 '>
      <EditCourseForm  
      course=       {course}
      categories=   {categories.map((category) => ({
        label:         category.name,
        value:         category.id,
        subCategories: category.subCategories.map((subcategory) => ({
          label: subcategory.name,
          value: subcategory.id,
          
        }))
      }))}
      levels=     {levels.map((level) => ({
        label: level.name,
        value: level.id
      }))}
      />
    </div>
  )
}

export default CourseBasics