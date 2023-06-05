import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Card } from "react-bootstrap";

import { useStoreDispatch } from "../../redux/store";
import { getUser } from "../../redux/users";
import Loader from "../../components/Loader";

const User = () => {
  const { pathname } = useLocation();

  const dispatch = useStoreDispatch();
  const currentUser = Number(pathname.split("/")?.[2]);
  const users = useSelector((state) => state.users.list);
  const user = users?.find((user) => user.id === currentUser);

  const loading = useSelector((state) => state.users.loading);

  useEffect(() => {
    dispatch(getUser({ id: currentUser }));
  }, [dispatch]);

  return (
    <div className="pt-3 mt-5 d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card className="w-100 mt-3 m-auto">
            <Card.Header>{user?.name}</Card.Header>
            <Card.Body>
              <Card.Text>{user?.email}</Card.Text>
              <Card.Text>{user?.username}</Card.Text>
              <Card.Text>{user?.phone}</Card.Text>
              <Card.Text>{user?.website}</Card.Text>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default User;
