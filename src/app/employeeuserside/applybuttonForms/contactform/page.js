import React, { Suspense } from "react";
import ContactForm from "./ContactForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading form...</div>}>
      <ContactForm />
    </Suspense>
  );
}
