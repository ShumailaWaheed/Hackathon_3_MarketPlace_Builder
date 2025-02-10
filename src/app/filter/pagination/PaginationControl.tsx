"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 sm:px-6 py-2 rounded-lg text-white font-medium transition ${
          currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-[#029FAE] hover:bg-blue-700"
        }`}
      >
        Previous
      </button>

      <span className="text-lg font-medium text-gray-700 my-2">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 sm:px-6 py-2 rounded-lg text-white font-medium transition ${
          currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-[#029FAE] hover:bg-blue-700"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
