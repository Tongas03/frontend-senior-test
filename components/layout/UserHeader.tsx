"use client";

import { useUserFromDB } from "@/hooks";

export default function UserHeader() {
  const { data: user, isLoading } = useUserFromDB();

  if (isLoading || !user) {
    return (
      <div className="px-5 pt-4 flex items-center gap-4 animate-pulse">
        <div className="w-12 h-12 bg-gray-200 rounded-full" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </div>
    );
  }

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
