import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, NavLink, Row } from "react-bootstrap";

import List from "../../components/List";
import PaginationComp from "../../components/PaginationComp";
import Loader from "../../components/Loader";

import { useStoreDispatch } from "../../redux/store";
import { getUser } from "../../redux/users";

const User = () => {
  const dispatch = useStoreDispatch();
  const { pathname, search } = useLocation();
  const [currentPage, setCurrentPage] = useState(
    Number(search.split("=")?.[1]) || 1
  );
  const currentUser = Number(pathname.split("/")?.[2]);
  const users = useSelector((state) => state.users.list);
  const user = users?.find((user) => user.id === currentUser);

  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(getUser({ id: currentUser }));
  }, [dispatch, currentUser]);

  return (
    <div className="pt-3 mt-5 d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loader />
      ) : (
        <>
          <NavLink as={Link} to={`/`} className="me-auto mx-3">
            <Button variant="primary">Back</Button>
          </NavLink>
          <Card className="w-100 mt-3 m-auto">
            <Card.Header>{user?.name}</Card.Header>
            <Card.Body>
              <Card.Text>{user?.email}</Card.Text>
              <Card.Text>{user?.username}</Card.Text>
              <Card.Text>{user?.phone}</Card.Text>
              <Card.Text>{user?.website}</Card.Text>
            </Card.Body>
          </Card>
          <Row xs={1} md={3} lg={4} xxl={5} className="g-4 p-2 m-0">
            {!!user?.posts?.length &&
              user?.posts
                ?.slice((currentPage - 1) * 10, currentPage * 10)
                .map((post) => (
                  <List post={post} key={post.id} profileId={currentUser} />
                ))}
          </Row>
          <PaginationComp
            postsLength={user?.posts?.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default User;
