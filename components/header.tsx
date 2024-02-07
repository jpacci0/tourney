import React from "react";
import H1 from "../components/ui/h1";

export default function Header({children}: {children: React.ReactNode}) {
  return (
    <header className="my-14 md:my-20 text-center">
      <H1>{children}</H1>
    </header>
  );
}
