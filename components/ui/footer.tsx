import Link from "next/link";
import Image from "next/image";
import lifelogo from "@/public/lifelogo.png";
import {LinkButton2} from "@/components/ui/linkButton";

export default function Footer() {
  return (
    <footer className="flex shrink-0 justify-between items-center border-t-2 bg-gray-950 mt-24">
      <div>
        <Link href="/">
          <Image src={lifelogo} width={80} height={80} alt="Logo Life" />
        </Link>
      </div>
      <Link href="/support" className="text-gray-200">Support</Link>
    </footer>
  );
}
