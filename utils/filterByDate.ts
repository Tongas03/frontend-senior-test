export function filterByDate<T extends { date: string }>(items: T[], filter: string): T[] {
  const now = new Date();

  return items.filter((item) => {
    const date = new Date(item.date);
    const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    switch (filter) {
      case "today":
        return date.toDateString() === now.toDateString();
      case "yesterday":
        const y = new Date();
        y.setDate(now.getDate() - 1);
        return date.toDateString() === y.toDateString();
      case "last5days":
        return diffDays <= 5;
      default:
        return true;
    }
  });
}
