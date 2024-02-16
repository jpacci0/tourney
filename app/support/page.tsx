import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SupportPage() {
  return (
    <main>
      <Header>FAQ / Support</Header>
      <SubHeader subTitle="Support">
        <p></p>
      </SubHeader>
      <Separator className="mt-4" />
      <section className="mt-10">
        <p className="text-gray-200 mb-4">
          If you need support or have encountered problems using the site or any
          other problem text me on discords.
        </p>
        <Link
          href="https://discord.com/users/149826779287126018"
          className="text-gray-200 mt-4"
          target="_blank"
        >
          Link:{" "}
          <span className="text-orange-500">
            https://discord.com/users/149826779287126018
          </span>
        </Link>
        <p className="text-gray-200 mt-4">
          Username: <span className="text-orange-500">jacopo2704</span>
        </p>

        <p className="text-gray-500 mt-10">FAQ - under construction</p>
      </section>
    </main>
  );
}
