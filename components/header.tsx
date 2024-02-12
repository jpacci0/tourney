import React from "react";
import H1 from "../components/ui/h1";

export default function Header({children}: {children: React.ReactNode}) {
  return (
    <header className="my-10 md:my-14 text-center">
      <H1>{children}</H1>
    </header>
  );
}
