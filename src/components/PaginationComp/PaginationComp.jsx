import { useNavigate } from "react-router";
import { Pagination } from "react-bootstrap";

import { PORTION_OF_PAGES, POSTS_PER_PAGE } from "../../consts";

const PaginationComp = ({ postsLength, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();

  const count = Math.ceil(postsLength / POSTS_PER_PAGE);

  const handleChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
    navigate(`/${page}`);
  };

  const getPreviousPages = (currentPage, number) => {
    const previousArray = [];
    for (let item = --currentPage; item !== currentPage - number; item--) {
      if (item > 0) {
        previousArray.push(item);
      }
    }

    return previousArray.reverse();
  };

  const getNextPages = (currentPage, number) => {
    const nextArray = [];
    for (let item = ++currentPage; item !== currentPage + number; item++) {
      if (item <= count) {
        nextArray.push(item);
      }
    }

    return nextArray;
  };

  const previous = getPreviousPages(currentPage, PORTION_OF_PAGES);
  const next = getNextPages(currentPage, PORTION_OF_PAGES);

  return (
    <Pagination className="d-flex justify-content-center">
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => {
          handleChange(1);
        }}
      />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => {
          handleChange(currentPage - 1);
        }}
      />
      {currentPage > PORTION_OF_PAGES + 1 && (
        <>
          <Pagination.Item
            onClick={() => {
              handleChange(1);
            }}>
            {1}
          </Pagination.Item>
          <Pagination.Ellipsis />
        </>
      )}
      {previous.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => {
            handleChange(page);
          }}>
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Item active>{currentPage}</Pagination.Item>
      {next.map((page) => (
        <Pagination.Item
          key={page}
          onClick={() => {
            handleChange(page);
          }}>
          {page}
        </Pagination.Item>
      ))}
      {currentPage <= count - PORTION_OF_PAGES - 1 && (
        <>
          <Pagination.Ellipsis />
          <Pagination.Item
            onClick={() => {
              handleChange(count);
            }}>
            {count}
          </Pagination.Item>
        </>
      )}
      <Pagination.Next
        disabled={currentPage === count}
        onClick={() => {
          handleChange(currentPage + 1);
        }}
      />
      <Pagination.Last
        disabled={currentPage === count}
        onClick={() => {
          handleChange(count);
        }}
      />
    </Pagination>
  );
};

export default PaginationComp;
