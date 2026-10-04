interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (value: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {

    const getVisiblePages = () => {
        const pages: (number | string)[] = [];

        const siblingCount = 1;

       const leftSibling = Math.max(currentPage - siblingCount, 1); // 11-1, 1 = 10
       const rightSibling = Math.min(currentPage + siblingCount, totalPages); // 11+1, 12 = 12

        pages.push(1);

        if (leftSibling > 2) {
            pages.push("...");
        }

        for (let i = Math.max(leftSibling, 2); i <= Math.min(rightSibling, totalPages - 1); i++) {
            pages.push(i);
        }

        if(rightSibling < totalPages - 1){
            pages.push("...")
        }


        if(totalPages > 1) {
            pages.push(totalPages)
        }
            

        return pages;
    }

    return (
        <div className='flex justify-center items-center gap-2 mt-8'>
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed`}
            >
                Previous
            </button>
            {
                getVisiblePages().map((page) => {

                    if (typeof page === "number"){
                        return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 border rounded cursor-pointer ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white'}`}
                        >
                            {page}
                        </button>
                    )     
                    } else {
                        return (
                            <span key={page}>{page}</span>
                        )
                    }

                    
                })
            }
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 border rounded disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed`}
            >
                Next
            </button>
        </div>
    )
}

export default Pagination
