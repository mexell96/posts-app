import { Button, Form, InputGroup } from "react-bootstrap";

import { ReactComponent as ReactCross } from "../../assets/icons/cross.svg";

const Search = ({ text, setText, filterPosts, setHasFilter }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleClear = () => {
    setText("");
    setHasFilter(false);
  };

  return (
    <InputGroup className="mt-3">
      <Form.Control
        placeholder="Please write title"
        value={text}
        onChange={(e) => handleChange(e)}
      />
      <Button variant="outline-secondary" onClick={handleClear}>
        <ReactCross />
      </Button>
      <Button variant="outline-secondary" onClick={filterPosts}>
        Search
      </Button>
    </InputGroup>
  );
};

export default Search;
