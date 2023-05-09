import React from "react";
import {Button, Form} from 'react-bootstrap/';

const ResetPasswordForm = () => {
  return (
    <Form method="post">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>New password</Form.Label>
        <Form.Control type="password" name="npword" placeholder="New Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control type="password" name="cpword" placeholder="Confirm Password" />
      </Form.Group>
        <Form.Group className="mb-3">
        <Button className="form-control btn action_trigger" type="submit">
        Reset Password
      </Button>
        </Form.Group>
    </Form>
  );
}

export default ResetPasswordForm;
