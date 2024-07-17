'use client'
import { UserButton, useAuth } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

const Topbar = () => {
  const { userId } = useAuth();

  const router = useRouter();

  const topRoutes = [
    {label: 'Instructor', path: '/instructor/courses'},
    {label: 'Learning', path: '/learning'}
  ]

  const [searchInput, setSearchInput] = useState('')
  const handleSearch = () => {
    if(searchInput.trim() !== ''){
      router.push(`search?query=${searchInput}`)
    } 
    setSearchInput('')
  }

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
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className='bg-[#fdab04] rounded-r-full border-none outline-none cursor-pointer px-4 py-3 hover:bg-[#fdab04]/80'
        disabled={searchInput.trim() === ''}
        onClick={handleSearch}
        >
        <Search className='h-4 w-4 ' /> 
        </button>
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