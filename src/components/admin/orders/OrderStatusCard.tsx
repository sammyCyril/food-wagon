interface OrderStatusCardProps {
  title: string;
  value: number;
  color: "yellow" | "blue" | "green" | "red";
}

const colorStyles = {
  yellow: {
    card: "bg-yellow-50 border-yellow-100",
    text: "text-yellow-600",
    dot: "bg-yellow-500",
  },

  blue: {
    card: "bg-blue-50 border-blue-100",
    text: "text-blue-600",
    dot: "bg-blue-500",
  },

  green: {
    card: "bg-green-50 border-green-100",
    text: "text-green-600",
    dot: "bg-green-500",
  },

  red: {
    card: "bg-red-50 border-red-100",
    text: "text-red-600",
    dot: "bg-red-500",
  },
};

export default function OrderStatusCard({
  title,
  value,
  color,
}: OrderStatusCardProps) {const styles = colorStyles[color];

  return (
    <div
      className={`rounded-2xl border p-5 ${styles.card}`}
    >
      <div className="flex items-center gap-2">
        <div
          className={`h-2.5 w-2.5 rounded-full ${styles.dot}`}
        />

        <p
          className={`text-sm font-medium ${styles.text}`}
        >
          {title}
        </p>
      </div>

      <h3
        className={`mt-2 text-3xl font-bold ${styles.text}`}
      >
        {value}
      </h3>
    </div>
  );
}