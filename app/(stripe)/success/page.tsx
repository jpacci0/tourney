import { Separator } from "@/components/ui/separator";
import Header from "@/components/header";
import SubHeader from "@/components/subHeader";
import { CheckCircle } from "lucide-react";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Success',
};

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  return (
    <main>
      <Header>Success</Header>
      <SubHeader subTitle="Payment completed">
        <div className="flex gap-2">
          <p></p>
        </div>
      </SubHeader>
      <Separator className="mt-4" />
      <div className="mt-10 flex flex-col items-center">
        <CheckCircle className="text-green-500" size={100} />
        <h3 className="text-2xl mt-5 inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">
          Payment successful!
        </h3>
        <p className="text-gray-200 text-center mt-10">
          Congratulations! You bought the slot for the tournament with id{" "}
          {searchParams.id} successfully.
        </p>
      </div>
    </main>
  );
}
