'use client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import axios from "axios"
import { Loader2, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server"
import { useState } from "react"
import toast from "react-hot-toast"
import { Button } from "../ui/button"

interface DeleteProps {
    item:       string,
    courseId:   string,
    sectionId?:  string
}


const Delete = ({ item, courseId, sectionId }: DeleteProps) => {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)
    
    const onDelete = async () => {
        try {
            setIsDeleting(true);
            const url = item === 'course' ? `/api/courses/${courseId}` : `/api/courses/${courseId}/sections/${sectionId}`
            await axios.delete(url)

            setIsDeleting(false)
            const pushedUrl = item === 'course' ? '/instructor/courses' : `/instructor/courses/${courseId}/sections`
            router.push(pushedUrl);
            router.refresh()
            toast.success(`Successfully deleted the ${item}`)
        } catch (error) {
            console.log(`Failed to delete the ${item}`, error)
            toast.error('Something went wrong')
        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button>
                        { isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />  }
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-red-500">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanetly delete your {item}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                        onClick={onDelete}
                        className="bg-[#fdab04] "
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Delete