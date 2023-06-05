import { Accordion } from "react-bootstrap";

const Comments = ({ post }) => {
  const { comments } = post;

  return (
    <Accordion onClick={() => {}}>
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
