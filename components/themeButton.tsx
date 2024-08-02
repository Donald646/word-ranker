"use client"
import React from 'react'
import { useTheme } from 'next-themes'
import { MoonStar, Sun } from 'lucide-react'
import { Button } from './ui/button'

export const ThemeChanger: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {theme === "dark" ? <Button variant="ghost" size="icon" onClick={() => setTheme('light')}><MoonStar/></Button>
 : 
<Button variant="ghost" size="icon" onClick={() => setTheme('dark')}><Sun /></Button>
 }
    </>
  )
}
