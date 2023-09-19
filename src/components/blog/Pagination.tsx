import { useState } from "react";

type PaginationProps = {
    current: number;
    total: number;
    limit: number;
    callback: (page: string) => void;
}

function Arrow({ className }: { className: string }) {
    return (
        <svg
            className={className}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M14.5816 2.39052C15.1395 2.91123 15.1395 3.75544 14.5816 4.27615L8.44888 10L14.5816 15.7239C15.1395 16.2446 15.1395 17.0888 14.5816 17.6095C14.0237 18.1302 13.1192 18.1302 12.5613 17.6095L5.41842 10.9428C4.86053 10.4222 4.86053 9.57788 5.41842 9.05721L12.5613 2.39052C13.1192 1.86983 14.0237 1.86983 14.5816 2.39052Z" />
        </svg>
    )
}

export default function Pagination({ current, total, limit, callback }: PaginationProps) {

    const [page, setPage] = useState<number>(current || 1)

    const pages = Math.ceil(total / limit)

    const handlePageChange = (page: number) => {
        if (page <= 0 || page > pages) return
        setPage(page)
        callback && callback(page.toString())
    }

    return (
        <div className="flex justify-center items-stretch gap-2">
            <button
                className="flex items-center justify-center rounded-md border border-cinder-800 bg-cinder-900 text-white px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-8"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
            >
                <Arrow className="h-4 w-4 fill-white" />
            </button>
            <div className="flex items-center justify-center rounded-md border border-cinder-800 bg-cinder-900 text-white px-2 py-1 aspect-square w-8">
                {page}
            </div>
            <button
                className="flex items-center justify-center rounded-md border border-cinder-800 bg-cinder-900 text-white px-2 py-1 disabled:opacity-50 disabled:cursor-not-allowed w-8"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === pages}
            >
                <Arrow className="transform rotate-180 h-4 w-4 fill-white" />
            </button>
        </div>
    )
}
