import React from "react";
import H1 from "@/components/ui/h1";

export default function Header({children}: {children: React.ReactNode}) {
  return (
    <header className="text-center mt-28 mb-5">
      <H1>{children}</H1>
    </header>
  );
}
