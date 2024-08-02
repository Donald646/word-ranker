import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Sidebar } from './mobileSidebar';
import { Package2 } from 'lucide-react';
import { ThemeChanger } from './themeButton';

export default function PublicNavbar() {
  return (
    <div className='flex justify-between items-center w-full sticky top-0 backdrop-blur-sm p-2 md:px-[2vw]'>
      <div className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link href="/" className='flex flex-row gap-2 items-center'><Package2/> SaaS Starter</Link>
      </div>
      <div className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
      <Link className='text-muted-foreground transition-colors hover:text-foreground' href="/pricing">Pricing</Link>
        <Link className='text-muted-foreground transition-colors hover:text-foreground' href="/">About</Link>
        <Link className='text-muted-foreground transition-colors hover:text-foreground' href="/gallery">Mission</Link>
      </div>
      <div className='md:hidden xl:hidden sm:flex'>
        <Sidebar/>
      </div>
      <div className='flex items-center gap-2'>
        <Link href="/login">
        <Button variant={"outline"}  className='hidden md:flex'>Login</Button>
        </Link>
        <Link href="/signup"><Button> Sign Up</Button></Link>
      </div>
    </div>
  );
}
