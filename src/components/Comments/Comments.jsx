import { Accordion } from "react-bootstrap";

import { useStoreDispatch } from "../../redux/store";
import { getComments } from "../../redux/posts";

const Comments = ({ post }) => {
  const { id, comments } = post;
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
