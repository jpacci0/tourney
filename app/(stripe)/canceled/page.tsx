import { Separator } from "@/components/ui/separator";
import { XCircle } from "lucide-react";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Canceled',
};

export default function CancelPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <main>
      <Header>Canceled</Header>
      <SubHeader subTitle="Payment canceled">
        <div className="flex gap-2">
          <p></p>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <div className="mt-10 flex flex-col items-center">
        <XCircle className="text-red-500" size={100} />
        <h3 className="text-2xl mt-5 inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-700">
          Payment canceled
        </h3>
        <p className="text-gray-200 text-center mt-10">
        The payment for the slot in the tournament has been canceled. If you need support go to the <Link href="/support" className="underline">support page</Link>.
        </p>
      </div>
    </main>
  );
}

