

type Props = { 
  search: string;

  setSearch: ( value: string ) => void;

  statusFilter: | "All" | "Active" | "Inactive";

  setStatusFilter: (
    value:
      | "All"
      | "Active"
      | "Inactive"
  ) => void;
};

export default function CustomersFilters({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) {

  return (
    <div className="flex flex-col gap-4 rounded-t-xl mt-10 border-t bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Search */}
      <input
        type="text"
        placeholder="Search customers..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500 md:max-w-md"
      />

      {/* Filters */}
      <div className="flex items-center gap-2">

        {[
          "All",
          "Active",
          "Inactive",
        ].map((status) => (

          <button
            key={status}
            onClick={() =>
              setStatusFilter(
                status as
                  | "All"
                  | "Active"
                  | "Inactive"
              )
            }
            className={`rounded-xl px-4 py-2 text-sm transition ${
              statusFilter === status
                ? "bg-green-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >

            {status}

          </button>

        ))}

      </div>

    </div>
  );
}