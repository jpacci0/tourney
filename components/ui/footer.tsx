import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function Footer() {
  return (
    <footer className="flex justify-center items-center border-t-2 bg-gray-950 fixed bottom-0 left-0 right-0 mx-2 md:mx-4 xl:mx-10 2xl:mx-48">
      <div>
        <Link href="/" className="mx-auto">
          <Image src={logo} width={96} height={96} alt="logo life" />
        </Link>
      </div>
    </footer>
  );
}
