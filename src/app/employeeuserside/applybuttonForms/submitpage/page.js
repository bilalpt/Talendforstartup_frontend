// src/app/employeeuserside/applybuttonForms/submitpage/page.js
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SubmitPageClient from './SubmitPageClient';



export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmitPageClient />
    </Suspense>
  );
}
