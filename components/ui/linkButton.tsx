import Link from "next/link";
import { cn } from "@/lib/utils"

export function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-gray-900 bg-gray-200 hover:bg-gray-100 font-bold px-4 py-2"
    >
      {children}
    </Link>
  );
}

export function LinkButton2({
    className,
    href,
    children,
  }: {
    className: string;
    href: string;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-gray-400 hover:bg-primary/90 font-bold px-4 py-2", className)}
      >
        {children}
      </Link>
    );
  }