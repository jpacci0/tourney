import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center border-t-2 mt-10 md:mt-20 bg-gray-950 sticky bottom-0 left-0 right-0">
      <div>
        <Link href="/" className="mx-auto">
          <Image src={logo} width={96} height={96} alt="logo life" />
        </Link>
      </div>
    </footer>
  );
}
