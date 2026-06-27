type Props = {
  status:
    | "Pending"
    | "Processing"
    | "Delivered"
    | "Cancelled";
};

export default function OrderTimeline({
  status,
}: Props) {
  const steps = [
    "Pending",
    "Processing",
    "Delivered",
  ];

  const currentStep =
    status === "Pending"
      ? 0
      : status === "Processing"
      ? 1
      : status === "Delivered"
      ? 2
      : -1;

  if (status === "Cancelled") {
    return (
      <div className="rounded-xl bg-red-50 border border-red-200 p-4">
        <p className="font-medium text-red-600">
          Order Cancelled
        </p>

        <p className="text-sm text-red-500 mt-1">
          This order was cancelled.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const completed =
          index <= currentStep;

        return (
          <div
            key={step}
            className="flex items-start gap-4"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                ✓
              </div>

              {index !==
                steps.length - 1 && (
                <div
                  className={`w-1 h-10 ${
                    index < currentStep
                      ? "bg-green-500"
                      : "bg-gray-200"
                  }`}
                />
              )}
            </div>

            <div>
              <p
                className={`font-medium ${
                  completed
                    ? "text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {step}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}