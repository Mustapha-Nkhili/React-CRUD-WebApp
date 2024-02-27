const Pagination = ({ paginationLength, currentPage, paginate }) => {
  return (
    <ul className="flex justify-center items-center gap-5 mt-5">
      {Array.from({ length: Math.ceil(paginationLength) }).map((_, index) => {
        return (
          <li
            key={index}
            className={`w-[35px] aspect-square flex justify-center items-center rounded-md font-semibold cursor-pointer transition border-2 border-transparent hover:border-primary ${
              currentPage === index + 1 ? "bg-primary" : "bg-white"
            }`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
