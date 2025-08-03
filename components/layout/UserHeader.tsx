"use client";

import { useEffect, useState } from "react";
import { useUserFromDB } from "@/hooks";
import { useUIStore } from "@/stores/useUIStore";

function UserHeaderSkeleton() {
  return (
    <div className="px-5 pt-4 flex items-center gap-4 animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full" />
      <div className="h-4 w-32 bg-gray-200 rounded" />
    </div>
  );
}

export default function UserHeader() {
  const { data: user } = useUserFromDB();
  const hasSeen = useUIStore((s) => s.hasSeenUserHeader);
  const markAsSeen = useUIStore((s) => s.setHasSeenUserHeader);
  const [loading, setLoading] = useState(!hasSeen);

  useEffect(() => {
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setLoading(false);
        markAsSeen();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [hasSeen, markAsSeen]);

  if (loading || !user) return <UserHeaderSkeleton />;

  return (
    <div className="px-5 pt-4 flex items-center gap-4">
      <img
        src={user.avatar}
        alt={user.firstName}
        className="w-12 h-12 rounded-full object-cover border-2 border-white"
      />
      <h2 className="text-white font-semibold text-md">
        Hola, {user.firstName} {user.lastName}
      </h2>
    </div>
  );
}
