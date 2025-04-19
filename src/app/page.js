import Image from "next/image";
// 'use client';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import Navbar from "./(navbar)/navbar/page";
import EmployeHome from "./employeeuserside/emplyeehomepage/employehome/page";

export default function Home() {
  return (
    <div>
      <EmployeHome/>
      </div> 

  );
}
