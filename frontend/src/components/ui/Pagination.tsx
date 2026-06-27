type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(
    totalItems / itemsPerPage
  );

  return (
    <div className="mt-6 flex items-center justify-between  px-4 py-4">
  <button
    onClick={() => onPageChange(currentPage - 1)}
    disabled={currentPage === 1}
    className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
  >
    Previous
  </button>

  {/* Desktop */}
  <div className="hidden items-center gap-2 md:flex">
    {Array.from({ length: totalPages }).map((_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index + 1)}
        className={`h-10 w-10 rounded-lg transition ${
          currentPage === index + 1
            ? "bg-black text-white"
            : "border hover:bg-gray-100"
        }`}
      >
        {index + 1}
      </button>
    ))}
  </div>

  {/* Mobile */}
  <p className="text-sm font-medium text-gray-600 md:hidden">
    Page {currentPage} of {totalPages}
  </p>

  <button
    onClick={() => onPageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    className="rounded-lg border px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
  >
    Next
  </button>
</div>
  );
}