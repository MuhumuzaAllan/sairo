'use client'
import { UserButton, useAuth } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const Topbar = () => {
  const { userId } = useAuth();
  const topRoutes = [
    {label: 'Instructor', path: '/instructor/courses'},
    {label: 'Learning', path: '/learning'}
  ]

  return (
    <div className='flex justify-between items-center p-4'>
      <Link href='/' >
      <Image 
      src='/logo.png'
      height={100}
      width={200}
      alt='logo'
      />
      </Link>
      <div className="max-md:hidden w-[400px] rounded-full flex ">
        <input type="text" 
        placeholder='Search for Courses'
        className="flex-grow bg-[#fff8eb] rounded-l-full border-none outline-none text-sm pl-4 py-3 " 
        />
        <button className='bg-[#fdab04] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#fdab04]/80'><Search className='h-4 w-4 ' /> </button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="max-sm:hidden flex gap-6">
          {topRoutes.map((route) => (
            <Link 
            href={route.path} 
            key={route.path}
            className='text-sm font-medium hover:text-[#fdab04]'
            >
              {route.label}
            </Link>
          ))}
        </div>
        { userId ? <UserButton afterSignOutUrl='/sign-in' /> : (
          <Link href='/sign-in'><Button className='font-regular text-black'>Sign in</Button></Link>
          )}
        
      </div>
    </div>
  )
}

export default Topbar