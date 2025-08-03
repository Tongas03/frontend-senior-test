"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { useTransferStore } from "@/stores";
import { SuccessCapture } from "@/components";

import html2canvas from "html2canvas";

export default function SuccessScreen() {
  const { lastTransfer, clearLastTransfer } = useTransferStore();
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);

  if (!lastTransfer) return null;

const handleShare = async () => {
  if (!captureRef.current) return;

  await new Promise((r) => requestAnimationFrame(r)); // espera render

  const canvas = await html2canvas(captureRef.current, {
    backgroundColor: "#ffffff",
    useCORS: true,
  });

  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = `transfer-${lastTransfer.id}.png`;
  link.click();
};
  return (
    <div className="flex flex-col h-full justify-between text-white p-4">
      <div className="bg-white text-black rounded-2xl p-6 text-center flex flex-col items-center flex-grow">

        <h2 className="text-[#00C47F] font-bold text-sm">
          Transfer Successful
        </h2>
        <p className="text-xs text-gray-500 mb-4">

          Your transaction was successful

        </p>

        <h1 className="text-4xl text-black font-semibold my-4">
          ${lastTransfer.amount.toLocaleString()}
        </h1>

        <div className="mb-4">
          <p className="text-black font-semibold">Send to</p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <img

              src={lastTransfer.avatar}
              className="w-10 h-10 rounded-full object-cover"
              alt="avatar"
            />
            <p className="font-medium">{lastTransfer.name}</p>
          </div>
        </div>


        <TransactionDetails transfer={lastTransfer} />
      </div>

      <div
        ref={captureRef}
        style={{
          position: "absolute",
          top: "-10000px",
          left: "-10000px",
          opacity: 1,
          pointerEvents: "none",
          zIndex: -1,
        }}
      >
        <SuccessCapture transfer={lastTransfer} />
      </div>


      <div className="mt-6 space-y-3 px-1">
        <button
          onClick={handleShare}
          className="w-full border border-white rounded-full py-3 font-semibold"
        >
          Share
        </button>
        <button
          onClick={() => {
            clearLastTransfer();
            router.push("/");
          }}
          className="w-full bg-white text-[#00C47F] rounded-full py-3 font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function TransactionDetails({ transfer }: any) {
  return (
    <>
      <h3 className="text-sm font-semibold text-left w-full mt-4 mb-2">
        Transaction Details
      </h3>
      <div className="w-full max-w-sm space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Payment</span>
          <span className="text-black font-semibold">
            ${transfer.amount.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Notes</span>
          <span className="text-black">{transfer.notes || "—"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Date</span>
          <span className="text-black font-semibold">
            {new Date(transfer.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Time</span>
          <span className="text-black font-semibold">
            {new Date(transfer.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Reference Number</span>
          <span className="text-black font-bold">#{transfer.reference}</span>
        </div>
      </div>
    </>
  );
}

