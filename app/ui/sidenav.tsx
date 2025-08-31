"use client";

import {
  HomeIcon,
  PresentationChartLineIcon,
  ArrowUpCircleIcon,
  Squares2X2Icon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOutAction } from "../lib/actions";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Squares2X2Icon },
  {
    name: "Compare",
    href: "/dashboard/compare",
    icon: PresentationChartLineIcon,
  },
  { name: "Upload", href: "/dashboard/upload", icon: ArrowUpCircleIcon },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              { "bg-sky-100 text-blue-600": pathname === link.href }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <form action={signOutAction}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}
