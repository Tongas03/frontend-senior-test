"use client";

import { getUserFromDB } from "@/lib/dbAccess";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components";
import { useRouter } from "next/navigation";
import { StoredUser } from "@/types";

export default function ProfileScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserFromDB().then(setUser);
  }, []);

  if (!user) return null;

  return (
    <>
      <header className="bg-[#00C47F] text-white px-4 pt-4 pb-3 relative">
        <button onClick={() => router.back()} className="absolute left-4 top-4 text-2xl">←</button>
        <h1 className="text-center font-bold text-lg">Profile</h1>
      </header>

      <div className="bg-white rounded-t-2xl px-4 py-6 min-h-[calc(100vh-160px)] flex flex-col items-center relative text-black">
        <img
          src={user.avatar}
          alt={`${user.firstName} ${user.lastName}`}
          className="w-36 h-36 rounded-full object-cover mb-4 mt-2"
        />
        <h2 className="text-xl font-bold mb-6">
          {user.firstName} {user.lastName}
        </h2>

        <div className="w-full space-y-3 text-sm text-gray-500 px-2">
          <div className="flex justify-between"><span>City</span><span className="text-black">{user.city}</span></div>
          <div className="flex justify-between"><span>State</span><span className="text-black">{user.state}</span></div>
          <div className="flex justify-between"><span>Street</span><span className="text-black">{user.street}</span></div>
          <div className="flex justify-between"><span>Email</span><span className="text-black font-semibold">{user.email}</span></div>
          <div className="flex justify-between"><span>Phone</span><span className="text-black font-semibold">{user.phone}</span></div>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 pb-4">
          <p className="text-gray-400 text-xs text-center break-all">
            ID<br />{user.id}
          </p>
        </div>
      </div>
    </>
  );
}
