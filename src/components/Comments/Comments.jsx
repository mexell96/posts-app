import { Accordion } from "react-bootstrap";

import { useStoreDispatch } from "../../redux/store";
import { getComments } from "../../redux/posts";

import Loader from "../Loader";

const Comments = ({ post }) => {
  const { id, comments, loading } = post;
  const dispatch = useStoreDispatch();

  const handleGetComments = (postId) => {
    if (!comments?.length) {
      setTimeout(() => {
        dispatch(getComments({ id: postId }));
      }, 500);
    }
  };

  return (
    <Accordion onClick={() => handleGetComments(id)}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Comments</Accordion.Header>
        {loading && !comments?.length && <Loader comments={comments} />}
        {!!comments?.length &&
          comments?.map((comment) => (
            <Accordion.Body key={comment.id}>
              <p className="fw-bold">{comment.email}</p>
              <p>{comment.body}</p>
            </Accordion.Body>
          ))}
      </Accordion.Item>
    </Accordion>
  );
};

export default Comments;
