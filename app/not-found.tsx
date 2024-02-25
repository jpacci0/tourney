import Link from "next/link";
import Image from "next/image";
import notFoundImage from "@/public/404.jpeg";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";

export default function NotFound() {
  return (
    <main>
      <Header>Not found</Header>
      <SubHeader subTitle="Not found">
        <p></p>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="mt-10 flex flex-col items-center">
        <Image src={notFoundImage} alt="Not Found" height={370} />
        <p className="text-gray-200 mt-4 md:mt-10">
          We can&apos;t find the page you were trying to view. <br /> If you
          need support or have encountered a technical problem go to the{" "}
          <Link href="/support" className="underline">
            support page
          </Link>{" "}
          please. <br /> Otherwise go back to the{" "}
          <Link href="/" className="underline">
            home page
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
