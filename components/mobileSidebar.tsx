"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Menu, Package2, X } from "lucide-react";
import Link from "next/link";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

   const sideBar = (
    <div className="">
      <div
        className={`fixed z-40 top-0 left-0 h-screen w-2/3 p-2 text-foreground bg-background shadow-lg transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full flex justify-end">
        <Button variant="ghost" className="ml-auto" size={"icon"} onClick={toggleDrawer}>
          <X/>
          </Button>
        </div>
        <div>
        <Link href="/login">
        <Button variant={"outline"}>Login</Button>
        </Link>
        </div>
      </div>
      <div
        className={`fixed z-30 top-0 left-0 w-full h-screen bg-black opacity-50 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleDrawer}
      />
    </div>
  )
return(
    <div>
      <div className="flex flex-row items-center">
      <Button variant="ghost" onClick={toggleDrawer} className=""><Menu /></Button>
      <Link href="/" className="flex gap-2 flex-row"><Package2/> Saas Starter</Link>
      </div>
    
    {sideBar}
    </div>
)
}