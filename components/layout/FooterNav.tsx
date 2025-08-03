"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";

const navItems = [
  { path: "/", label: "Home", icon: "/home.svg" },
  { path: "/transfers", label: "Transfers", icon: "/transfer.svg" },
  { path: "/profile", label: "Profile", icon: "/profile.svg" },
];

export default function FooterNav() {
  const pathname = usePathname();

  const isActive = useMemo(() => {
    return (path: string) => pathname === path;
  }, [pathname]);

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white flex justify-around items-center border-t z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={isActive(item.path) ? "text-purple-600" : "text-gray-400"}
        >
          <div className="flex flex-col items-center justify-center gap-1">
            <img src={item.icon} alt={item.label} width={20} height={20} />
            <span className="text-xs">{item.label}</span>
          </div>
        </Link>
      ))}
    </nav>
  );
}
