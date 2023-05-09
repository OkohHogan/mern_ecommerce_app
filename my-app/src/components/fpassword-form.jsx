import React from "react";
import {Button, Form} from 'react-bootstrap/';

const FpasswordForm = () => {
  return (
    <Form method="post">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="name" placeholder="E.g. johndoe@mymail.com" />
      </Form.Group>
        <Form.Group className="mb-3">
        <Button className="form-control btn action_trigger" type="submit">
        Submit
      </Button>
        </Form.Group>
    </Form>
  );
}

export default FpasswordForm;