import Link from "next/link";
import Image from "next/image";
import lifelogo from "@/public/lifelogo.png";


export default function Footer() {
  return (
    <footer className="flex shrink-0 justify-center items-center border-t-2 bg-gray-950 mt-24">
      <div>
        <Link href="/" className="mx-auto">
          <Image src={lifelogo} width={80} height={80} alt="Logo Life" />
        </Link>
      </div>
    </footer>
  );
}
