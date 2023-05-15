import React, {useState} from "react";
import {Button, Form, Row, Col} from 'react-bootstrap/';
import { useNavigate } from "react-router-dom";
import AlertModal from "./alertModal";

const SignUpForm = () => {

  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "", 
    email: "", 
    phone: "",
    password: "",
  });
  const [modalData, setModaldata] = useState({titleData:"", descData:""});
  const [modalShow, setModalShow] = useState(false);
 function updateForm(value) { 
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

 async function userSignup(e) {
  e.preventDefault();
  const newItem = { ...form };
  await fetch("https://nelly-ecommerce-app.onrender.com/register", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(newItem),
  })
  .then((res) => res.json())
  .then((data) => {
    if(data === "error") {
      setModalShow(true)
     // window.alert("User already exist");
      setModaldata({
        titleData: "Error",
        descData: "User already exist.",
      }); 
    } 
    else {
      setForm({ 
        username: "", 
        email: "", 
        phone: "",
        password: "",
      })
      navigate("/signin");
      setModalShow(true);
      setModaldata({
        titleData: "Successful",
        descData: "Your account has been successfully created.",
      }); 
    }
  })
}

  return (
    <>
    <Form>
     <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="E.g. John Doe" 
        autoComplete="off"
        value={form.username}
        onChange={(e) => updateForm({ username: e.target.value })}
        />

      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="E.g. johndoe@mymail.com" 
        value={form.email}
        autoComplete="off"
        onChange={(e) => updateForm({ email: e.target.value })}
        />
      </Form.Group>
    
        <Row className="mb-3">
        <Col sm={12} xs={12}>
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control 
        type="tel" 
        name="phone" placeholder="Mobile Number" 
        value={form.phone}
        autoComplete="off"
        onChange={(e) => updateForm({ phone: e.target.value })}
         />
        </Col>
        </Row>

        <Form.Group className="mb-3  password-group" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
            <span className="pass-view">
            <i className="las la-eye"></i>
            </span>
        <Form.Control 
        type="password"  
        placeholder="Password" 
        value={form.password}
        autoComplete="off"
        onChange={(e) => updateForm({ password: e.target.value })}
        />
      </Form.Group>

        <Form.Group className="mb-3">
        <Button onClick={userSignup} className="form-control btn action_trigger" type="submit">
        Sign up
      </Button>
        </Form.Group>
    </Form>

    <AlertModal 
       show={modalShow}
      title={modalData.titleData}
      desc={modalData.descData}
      onHide={() => setModalShow(false)}
    />
    </>
  );
}

export default SignUpForm;