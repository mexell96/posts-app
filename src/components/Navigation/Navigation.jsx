import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Nav, Navbar, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";

import Avatar from "../../img/avatar.svg";

import { getProfile } from "../../redux/users";
import { useStoreDispatch } from "../../redux/store";

const Navigation = () => {
  const dispatch = useStoreDispatch();
  const { current } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Navbar
      collapseOnSelect
      expand="false"
      bg="primary"
      variant="dark"
      className="p-1"
      fixed="top">
      <Navbar.Toggle />
      <Navbar.Collapse id="navbarScroll">
        <Nav>
          <NavLink eventKey="2" as={Link} to="/about">
            <Image src={Avatar} roundedCircle width={30} />
            <span className="ps-2 pe-2">{current?.name}</span>
            <span>{current?.email}</span>
          </NavLink>
          <NavLink eventKey="1" as={Link} to="/">
            Posts
          </NavLink>
          <NavLink eventKey="2" as={Link} to="/about">
            About
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
