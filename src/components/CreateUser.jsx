import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function CreateUser() {
  const [valueInput, setValueInput] = useState({
    athlete: "",
    age: null,
    country: "",
  });
  const navigate = useNavigate();

  const handleChangeInputName = (e) => {
    const { value } = e.target;
    setValueInput((prev) => {
      return {
        ...prev,
        athlete: value,
      };
    });
  };

  const handleChangeInputAge = (e) => {
    const { value } = e.target;
    setValueInput((prev) => {
      return {
        ...prev,
        age: value,
      };
    });
  };

  const handleChangeInputCountry = (e) => {
    const { value } = e.target;
    setValueInput((prev) => {
      return {
        ...prev,
        country: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: Math.random,
      athlete: valueInput.athlete,
      age: valueInput.age,
      country: valueInput.country,
    };
    axios.post("http://localhost:5000/olympic", payload);
    navigate('/');
  };
  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={handleChangeInputName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age"
            onChange={handleChangeInputAge}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            onChange={handleChangeInputCountry}
          />
        </Form.Group>
        <div className="text-center">
          <Button size="sm" variant="btn btn-outline-primary" type="submit">
            Create User
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateUser;
