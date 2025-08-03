export const formatDates = (isoDate: string) => {
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Invalid Date";

  const now = new Date();
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(date, now)) {
    return `Today · ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Yesterday · ${time}`;
  }

  const formattedDate = date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return `${formattedDate} · ${time}`;
};
