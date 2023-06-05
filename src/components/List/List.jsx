import { Link } from "react-router-dom";
import { Card, Col, Figure, NavLink } from "react-bootstrap";

import Avatar from "../../img/avatar.svg";

const List = ({ post }) => (
  <Col>
    <Card bg="primary" text="white">
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>{post.body}</Card.Text>
        <NavLink
          as={Link}
          to={`/users/${post.userId}?page=${1}`}
          className="d-sm-inline-block">
          <Figure className="m-0">
            <Figure.Image
              width={50}
              height={50}
              alt={post.title}
              src={Avatar}
              className="rounded-circle mb-3"
            />
          </Figure>
        </NavLink>
      </Card.Body>
    </Card>
  </Col>
);

export default List;
