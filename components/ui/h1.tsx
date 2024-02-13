import { Black_Ops_One } from "next/font/google";

const BlackOpsOne = Black_Ops_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function H1({ children }: { children: React.ReactNode }) {
  return <h1 className={`text-3xl md:text-5xl py-1 font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500 uppercase, ${BlackOpsOne.className}`}>{children}</h1>;
}
