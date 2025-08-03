import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  perPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export default function Pagination({
  currentPage,
  totalCount,
  perPage,
  onPageChange,
  disabled = false,
}: PaginationProps) {
  const totalPages = Math.min(Math.ceil(totalCount / perPage), 100); // github api limits to 1000 results (100 pages)

  if (totalPages <= 1) return null;

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1); // react-paginate uses 0-based indexing
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
  
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * perPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * perPage, totalCount)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{totalCount.toLocaleString()}</span>{" "}
            results
          </p>
        </div>

        <div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <div className="flex items-center">
                <span className="sr-only">Next</span>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </div>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel={
              <div className="flex items-center">
                <span className="sr-only">Previous</span>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </div>
            }
            renderOnZeroPageCount={null}
            forcePage={currentPage - 1} // react-paginate uses 0-based indexing
            containerClassName="isolate inline-flex -space-x-px rounded-md shadow-sm"
            pageClassName="relative inline-flex items-center"
            pageLinkClassName={`px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors duration-200 ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            previousClassName="relative inline-flex items-center rounded-l-md"
            previousLinkClassName={`px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors duration-200 ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            nextClassName="relative inline-flex items-center rounded-r-md"
            nextLinkClassName={`px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 transition-colors duration-200 ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
            }`}
            breakClassName="relative inline-flex items-center"
            breakLinkClassName="px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
            activeClassName="z-10"
            activeLinkClassName="bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
        </div>
      </div>
    </div>
  );
}
