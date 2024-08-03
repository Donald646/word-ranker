import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Sidebar } from './mobileSidebar';
import { Gamepad2Icon, Globe, Package2 } from 'lucide-react';
import { ThemeChanger } from './themeButton';

export default function PublicNavbar() {
  return (
    <div className='flex justify-between items-center w-full p-4 md:px-[2vw]'>
      <div className='flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 justify-between w-full'>
        <div className='flex flex-row gap-2'>
        <Link href="/rankings" className='flex flex-row gap-2 items-center'><Button className='space-x-2'><Globe/><span>Word Rankings</span> </Button></Link>
        <Link href="/about" className='flex flex-row gap-2 items-center'><Button className='space-x-2'><span>About</span> </Button></Link>
        </div>
        
        <Link href="/" className='flex flex-row gap-2 items-center'><Button className='space-x-2'><Gamepad2Icon/><span>Play</span> </Button></Link>
      </div>
     
    </div>
  );
}
