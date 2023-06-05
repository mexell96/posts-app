import React from "react";
import { Form } from "react-bootstrap";

const Sorting = ({ setSelectValue }) => {
  const onChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <Form.Select
      aria-label="Sorting"
      className="w-auto mt-3 ms-auto"
      onChange={onChange}>
      <option defaultValue>Sorting</option>
      <option value="up">a-z</option>
      <option value="down">z-a</option>
    </Form.Select>
  );
};

export default Sorting;
