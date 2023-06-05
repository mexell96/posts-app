import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Search from "../../components/Search";
import List from "../../components/List";
import Sorting from "../../components/Sorting";
import Loader from "../../components/Loader";

import { getPosts, setPosts } from "../../redux/posts";
import { useStoreDispatch } from "../../redux/store";

const Posts = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { loadingPosts } = useSelector((state) => state.posts);

  const dispatch = useStoreDispatch();
  const posts = useSelector((state) => state.posts.list);

  const [text, setText] = useState("");
  const [hasFilter, setHasFilter] = useState(false);
  const [selectValue, setSelectValue] = useState("");
  const navigate = useNavigate();

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
          <Sorting setSelectValue={setSelectValue} />
          <Row xs={1} md={3} lg={4} xxl={5} className="g-4 p-2 m-0">
            {!!posts?.length &&
              !hasFilter &&
              posts?.map((post) => <List post={post} key={post.id} />)}
            {!!filteredPosts.length &&
              hasFilter &&
              filteredPosts?.map((post) => <List post={post} key={post.id} />)}
          </Row>
        </>
      )}
    </div>
  );
};

export default Posts;
