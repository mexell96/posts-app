import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div className="d-flex p-5">
    <Spinner animation="border" variant="primary" className="m-auto" />
  </div>
);

export default Loader;
