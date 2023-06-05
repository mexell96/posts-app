import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PaginationComp from "../../components/PaginationComp";
import Search from "../../components/Search";
import List from "../../components/List";
import Sorting from "../../components/Sorting";
import Loader from "../../components/Loader";

import { getPosts, setPosts } from "../../redux/posts";
import { useStoreDispatch } from "../../redux/store";

const Posts = () => {
  const { pathname } = useLocation();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    Number(pathname.split("/")?.[1]) || 1
  );
  const [text, setText] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const navigate = useNavigate();

  const dispatch = useStoreDispatch();
  const { loadingPosts } = useSelector((state) => state.posts);
  const posts = useSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const filterPosts = () => {
    setFilteredPosts(
      posts?.reduce(
        (arr, post) =>
          post.title.indexOf(text) !== -1 ? arr.concat(post) : arr,
        []
      )
    );
    setHasFilter(true);
    navigate(`/`);
  };

  useEffect(() => {
    const sortedPosts = [...posts]?.sort(function (a, b) {
      if (a.title < b.title) {
        return selectValue === "up" ? -1 : 1;
      }
      if (a.title > b.title) {
        return selectValue === "up" ? 1 : -1;
      }
      return 0;
    });

    dispatch(setPosts(sortedPosts));
  }, [selectValue]);

  return (
    <div className="pt-5 d-flex justify-content-center align-items-center flex-column">
      {loadingPosts && !posts?.length && <Loader />}
      {!loadingPosts && (
        <>
          <Search
            text={text}
            setText={setText}
            filterPosts={filterPosts}
            setHasFilter={setHasFilter}
          />
          {((!!posts?.length && !hasFilter) || !!filteredPosts.length) && (
            <Sorting setSelectValue={setSelectValue} />
          )}
          <Row xs={1} md={3} lg={4} xxl={5} className="g-4 p-2 m-0">
            {!!posts?.length &&
              !hasFilter &&
              posts
                ?.slice((currentPage - 1) * 10, currentPage * 10)
                .map((post) => <List post={post} key={post.id} />)}
            {!!filteredPosts.length &&
              hasFilter &&
              filteredPosts
                ?.slice((currentPage - 1) * 10, currentPage * 10)
                .map((post) => <List post={post} key={post.id} />)}
          </Row>
          {((!!posts?.length && !hasFilter) || !!filteredPosts.length) && (
            <PaginationComp
              postsLength={
                !!filteredPosts.length && hasFilter
                  ? filteredPosts.length
                  : posts?.length
              }
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Posts;
