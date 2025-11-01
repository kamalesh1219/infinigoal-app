export const getDueText = (dueDateStr: string) => {
  if (!dueDateStr || dueDateStr === "No date") return "";

  const dueDate = new Date(dueDateStr);
  const today = new Date();

  // Remove time for accurate date-only comparison
  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffMs = dueDate.getTime() - today.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Due today";
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} left`;
  return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
};