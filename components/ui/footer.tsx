import Link from "next/link";
import Image from "next/image";
import lifelogo from "@/public/lifelogo.png";


export default function Footer() {
  return (
    <footer className="flex justify-center items-center border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 mx-2 md:mx-4 xl:mx-10 2xl:mx-48">
      <div>
        <Link href="/" className="mx-auto">
          <Image src={lifelogo} width={80} height={80} alt="Logo Life" />
        </Link>
      </div>
    </footer>
  );
}
