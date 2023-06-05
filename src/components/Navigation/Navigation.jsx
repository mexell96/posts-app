import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CloseButton,
  Image,
  Nav,
  Navbar,
  NavLink,
  Offcanvas,
} from "react-bootstrap";
import { useSelector } from "react-redux";

import Avatar from "../../img/avatar.svg";

import { getProfile } from "../../redux/users";
import { useStoreDispatch } from "../../redux/store";

const Navigation = () => {
  const dispatch = useStoreDispatch();
  const { current } = useSelector((state) => state.users);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="false"
        bg="primary"
        variant="dark"
        className="p-3"
        fixed="top">
        <CloseButton variant="white" onClick={handleShow} />
      </Navbar>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <NavLink as={Link} to="/about" onClick={handleClose}>
              <Image src={Avatar} roundedCircle width={30} />
              <span className="ps-2 pe-2">{current?.name}</span>
              <span>{current?.email}</span>
            </NavLink>
            <NavLink as={Link} to="/" onClick={handleClose}>
              Posts
            </NavLink>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;
