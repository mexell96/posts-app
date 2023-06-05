import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Row } from "react-bootstrap";

import List from "../../components/List";

import { getPosts } from "../../redux/posts";
import { useStoreDispatch } from "../../redux/store";

const Posts = () => {
  const dispatch = useStoreDispatch();
  const posts = useSelector((state) => state.posts.list);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className="pt-5 d-flex justify-content-center align-items-center flex-column">
      <Row xs={1} md={3} lg={4} xxl={5} className="g-4 p-2 m-0">
        {!!posts?.length &&
          posts?.map((post) => <List post={post} key={post.id} />)}
      </Row>
    </div>
  );
};

export default Posts;
