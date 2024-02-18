import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
          Link: <span className="text-orange-500">Link discord</span>
        </Link>
        <p className="text-gray-200 mt-4">
          Username: <span className="text-orange-500">jacopo2704</span>
        </p>
        <div className="mt-20">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-orange-500">
                Did you update or add data but don&apos;t see the change?
              </AccordionTrigger>
              <AccordionContent className="text-gray-200">
                If you have received a confirmation message that the data has
                been added, sent or updated correctly but you do not see the
                updated data please reload the page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
