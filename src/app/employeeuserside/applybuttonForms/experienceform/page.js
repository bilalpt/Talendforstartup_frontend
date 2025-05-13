import { Suspense } from 'react';
import ExperienceFormClient from './ExperienceFormClient'; // import the Client Component directly

export default function ExperienceFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExperienceFormClient />
    </Suspense>
  );
}
