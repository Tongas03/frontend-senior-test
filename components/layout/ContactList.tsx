"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useContactsFromDB } from "@/hooks";
import { useUIStore } from "@/stores/useUIStore";

export default function ContactList() {
  const { data: contacts } = useContactsFromDB();
  const hasSeen = useUIStore((s) => s.hasSeenContacts);
  const markAsSeen = useUIStore((s) => s.setHasSeenContacts);

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

  return (
    <div className="mb-6">
      <h3 className="text-[20px] font-semibold text-center text-gray-800 mb-4">
        Send Again
      </h3>
      <div className="flex gap-4 overflow-x-auto px-1">
        {loading || !contacts
          ? Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 animate-pulse"
              >
                <div className="w-14 h-14 rounded-full bg-gray-200" />
                <div className="w-12 h-3 bg-gray-200 rounded" />
              </div>
            ))
          : contacts.map((contact) => (
              <Link
                key={contact.id}
                href={`/send/${contact.id}`}
                className="flex flex-col items-center gap-1 shrink-0"
              >
                <img
                  src={contact.avatar}
                  alt={contact.firstName}
                  className="w-14 h-14 rounded-full object-cover border"
                />
                <span className="text-xs text-gray-700 text-center">
                  {contact.firstName}
                </span>
              </Link>
            ))}
      </div>
    </div>
  );
}
