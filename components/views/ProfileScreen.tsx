"use client";

import { getUserFromDB } from "@/lib/dbAccess";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StoredUser } from "@/types";
import { useUIStore } from "@/stores/useUIStore";

function ProfileSkeleton() {
  return (
    <>
      <header className="text-white px-4 pt-4 pb-3 relative">
        <div className="absolute left-4 top-4 text-2xl">←</div>
        <h1 className="text-center font-bold text-lg">Profile</h1>
      </header>

      <div className="bg-white rounded-t-2xl px-4 py-6 min-h-[calc(100vh-160px)] flex flex-col items-center relative text-black">
        <div className="w-36 h-36 rounded-full bg-gray-200 mb-4 mt-2" />
        <div className="h-5 w-40 bg-gray-300 rounded mb-6" />
        <div className="space-y-3 w-full px-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div className="flex justify-between" key={i}>
              <div className="w-20 h-3 bg-gray-200 rounded" />
              <div className="w-28 h-3 bg-gray-300 rounded" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full px-4 pb-4">
          <div className="h-3 w-48 bg-gray-200 rounded mx-auto" />
        </div>
      </div>
    </>
  );
}

export default function ProfileScreen() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const router = useRouter();

  const hasSeen = useUIStore((s) => s.hasSeenProfileScreen);
  const markAsSeen = useUIStore((s) => s.setHasSeenProfileScreen);

  const [loading, setLoading] = useState(!hasSeen);

  useEffect(() => {
    getUserFromDB().then((u) => {
      setUser(u);
      if (!hasSeen) {
        setTimeout(() => {
          setLoading(false);
          markAsSeen();
        }, 1500);
      }
    });
  }, [hasSeen, markAsSeen]);

  if (!user || loading) return <ProfileSkeleton />;

  return (
    <>
      <header className="bg-[#00C47F] text-white px-4 pt-4 pb-3 relative">
        <button onClick={() => router.back()} className="absolute left-4 top-4 text-2xl">
          ←
        </button>
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
