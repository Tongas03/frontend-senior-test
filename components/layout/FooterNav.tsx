"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FooterNav() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="absolute bottom-0 left-0 right-0 h-16 bg-white flex justify-around items-center border-t">
      <Link
        href="/"
        className={isActive("/") ? "text-purple-600" : "text-gray-400"}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <img src="/home.svg" alt="Home" width={20} height={20} />
          <span className="text-xs">Home</span>
        </div>
      </Link>
      <Link
        href="/transfers"
        className={isActive("/transfers") ? "text-purple-600" : "text-gray-400"}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <img src="/transfer.svg" alt="Transfer" width={20} height={20} />
          <span className="text-xs">Transfers</span>
        </div>
      </Link>
      <Link
        href="/profile"
        className={isActive("/profile") ? "text-purple-600" : "text-gray-400"}
      >
        <div className="flex flex-col items-center justify-center gap-1">
          <img src="/profile.svg" alt="Profile" width={20} height={20} />
          <span className="text-xs">Profile</span>
        </div>
      </Link>
    </nav>
  );
}
