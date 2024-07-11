'use client'
import { Resource, Section } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
import axios from 'axios'
import { PlusCircle } from 'lucide-react'
import FileUpload from '../custom/FileUpload'

const formSchema = z.object({
    name:       z.string().min(2, {
      message: "Name is required and must be at least 2 characters.",
    }),
    fileUrl:    z.string().min(1, {
        message: 'File is required'
    })
  })

interface ResourceFormProps {
    section:    Section & { resources: Resource[] } ;
    courseId:   string
}

const ResourceForm = ( {section, courseId, }: ResourceFormProps ) => {
    
    const router = useRouter();
    
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:         "",
      fileUrl:      '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/sections`, values)
      router.push(`/instructor/courses/${courseId}/sections/${response.data.id}`)
      toast.success('Section created successfully! 😊')
    } catch (error) {
      console.log('Failed to create section', error)
      toast.error('Something went wrong')
    }
  }

  
  return (
    <>
    <div className="flex gap-2 items-center text-xl font-bold mt-12">
        <PlusCircle />
        Add Resources (optional)
    </div>
    <p className="text-sm font-medium mt-2">
        Add resources to this section to help students learn better
    </p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 my-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File Name</FormLabel>
              <FormControl>
                <Input placeholder="Text book" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
              <FormLabel>Upload File</FormLabel>
              <FormControl>
                <FileUpload 
                value={field.value || ''}
                onChange={ (url) => field.onChange(url) }
                endpoint='sectionResource'
                />
              </FormControl>
             
              <FormMessage />
            </FormItem>
          )}
        />
            <Button type="submit">Upload</Button>
        
      </form>
    </Form>
    </>
        
    
  )
}

export default ResourceForm