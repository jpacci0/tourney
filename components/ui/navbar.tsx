import Link from "next/link";
import Image from "next/image";
import lifelogo from "@/public/lifelogo.png";
import AuthButton from "@/components/ui/authButton";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center border-b-2 mx-2 md:mx-4 xl:mx-10 2xl:mx-48 fixed top-0 left-0 right-0 z-50 bg-gray-950">
      <div className="">
        <Link href="/" className="mx-auto">
          <Image src={lifelogo} width={80} height={80} alt="Logo Life" />
        </Link>
      </div>
      <div>
        <AuthButton />
      </div>
    </nav>
  );
}
