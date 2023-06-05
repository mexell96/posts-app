import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import Search from "../../components/Search";
import List from "../../components/List";
import Loader from "../../components/Loader";

import { getPosts } from "../../redux/posts";
import { useStoreDispatch } from "../../redux/store";

const Posts = () => {
  const [filteredPosts, setFilteredPosts] = useState([]);

  const { loadingPosts } = useSelector((state) => state.posts);

  const dispatch = useStoreDispatch();
  const posts = useSelector((state) => state.posts.list);

  const [text, setText] = useState("");
  const [hasFilter, setHasFilter] = useState(false);

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
