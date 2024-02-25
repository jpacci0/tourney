"use client"; // Error components must be Client Components

import { useEffect } from "react";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import errorImage from "@/public/error.jpeg";
import Image from "next/image";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error);
  // }, [error]);

  return (
    <main>
      <Header>Error</Header>
      <SubHeader subTitle="Error">
        <p></p>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="mt-10 flex flex-col items-center">
        <Image src={errorImage} alt="Error" height={370} />
        <p className="text-gray-200 mt-4 md:mt-10">
          We don&apos;t know why you ended up on this page.
          <br /> If you know, please{" "}
          <Link href="/support" className="underline">
            contact us
          </Link>
          . <br /> Otherwise go back to{" "}
          <Link href="/" className="underline">
            home page
          </Link>
          .
        </p>
      </section>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}
