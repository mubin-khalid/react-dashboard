export default function Pagination({
  postsPerPage = 0,
  totalPosts = 0,
  paginateFront = () => {},
  paginateBack = () => {},
  currentPage = 0,
}) {
  const showing = currentPage === 1 ? 1 : currentPage * postsPerPage - 10;

  return (
    <div className="py-2 flex flex-col justify-end items-end mr-10 space-y-1 mb-2">
      <div>
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">&nbsp;{showing}&nbsp;</span>
          to
          <span className="font-medium">
            &nbsp;{currentPage * postsPerPage}&nbsp;
          </span>
          of
          <span className="font-medium">&nbsp;{totalPosts}&nbsp;</span>
          results
        </p>
      </div>
      <nav className="block"></nav>
      <div>
        <nav
          className="relative z-0 inline-flex justify-end rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <a
            onClick={() => {
              paginateBack();
            }}
            href="#"
            className={` inline-flex items-center px-2 py-2 rounded-l-md border border-purple-700 bg-white text-sm font-medium text-purple-700 hover:bg-gray-50 ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            <span>Previous</span>
          </a>

          <a
            onClick={() => {
              paginateFront();
            }}
            href="#"
            className=" inline-flex items-center px-2 py-2 rounded-r-md border  border-purple-700 bg-white text-sm font-medium text-purple-700 hover:bg-gray-50"
          >
            <span>Next</span>
          </a>
        </nav>
      </div>
    </div>
  );
}
