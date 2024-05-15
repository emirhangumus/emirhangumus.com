import React from "react";

interface Props {
	currentPage: number;
	total: number;
	limit: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({
	currentPage,
	total,
	limit,
	onPageChange,
}) => {
	const totalPages = Math.ceil(total / limit);

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPages) {
			return;
		}
		onPageChange(page);
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<li
					key={i}
					className={`mx-1 px-3 py-1 rounded-lg cursor-pointer ${i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
						}`}
					onClick={() => handlePageChange(i)}
				>
					{i}
				</li>
			);
		}
		return pageNumbers;
	};

	return (
		<div className="flex justify-center items-center mt-4">
			<ul className="flex">
				<li
					className={`mx-1 px-3 py-1 rounded-lg cursor-pointer ${currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
						}`}
					onClick={() => handlePageChange(currentPage - 1)}
				>
					Prev
				</li>
				{renderPageNumbers()}
				<li
					className={`mx-1 px-3 py-1 rounded-lg cursor-pointer ${currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"
						}`}
					onClick={() => handlePageChange(currentPage + 1)}
				>
					Next
				</li>
			</ul>
		</div>
	);
};

export default Pagination;