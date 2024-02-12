export default function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl md:text-5xl py-1 font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500">{children}</h1>;
}
