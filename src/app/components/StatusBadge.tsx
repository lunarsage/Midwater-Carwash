type Status = "pending" | "approved" | "completed" | "cancelled";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: "bg-warning/10 text-warning border-warning/20",
    approved: "bg-approved/10 text-approved border-approved/20",
    completed: "bg-completed/10 text-completed border-completed/20",
    cancelled: "bg-cancelled/10 text-cancelled border-cancelled/20"
  };

  const labels = {
    pending: "Pending",
    approved: "Approved",
    completed: "Completed",
    cancelled: "Cancelled"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
