import React, { Suspense } from 'react';
import CVUploader from './CVUploader'; // Adjust the path if needed

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10 text-red-500">Loading CV Uploader...</div>}>
      <CVUploader />
    </Suspense>
  );
}
