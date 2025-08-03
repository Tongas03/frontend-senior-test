"use client";

export default function SuccessCapture({ transfer }: { transfer: any }) {
  const date = new Date(transfer.date);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
        borderRadius: "16px",
        padding: "24px",
        textAlign: "center",
        width: "360px",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ color: "#00C47F", fontWeight: "bold", fontSize: "14px" }}>
        Transfer Successful
      </h2>
      <p style={{ fontSize: "12px", color: "#999999", marginBottom: "16px" }}>
        Your transaction was successful
      </p>

      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "24px" }}>
        ${transfer.amount.toLocaleString()}
      </h1>

      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontWeight: "600" }}>Send to</p>
        <p style={{ marginTop: "8px", fontWeight: "500" }}>{transfer.name}</p>
      </div>

      <h3 style={{ fontSize: "14px", fontWeight: "600", textAlign: "left", width: "100%", marginBottom: "8px" }}>
        Transaction Details
      </h3>

      <div style={{ fontSize: "14px" }}>
        <Detail label="Payment" value={`$${transfer.amount.toFixed(2)}`} />
        <Detail label="Notes" value={transfer.notes || "—"} />
        <Detail
          label="Date"
          value={date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        />
        <Detail
          label="Time"
          value={date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        />
        <Detail label="Reference Number" value={`#${transfer.reference}`} bold />
      </div>
    </div>
  );
}

function Detail({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      <span style={{ color: "#888888" }}>{label}</span>
      <span style={{ fontWeight: bold ? "bold" : "normal", color: "#000000" }}>
        {value}
      </span>
    </div>
  );
}
