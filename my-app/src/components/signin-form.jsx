import React, {useState} from "react";
import {Button, Form} from 'react-bootstrap/';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AlertModal from "./alertModal";

const SignInForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "", 
    password: ""
  });
  const [modalData, setModaldata] = useState({titleData:"", descData:""});
  const [modalShow, setModalShow] = useState(false);
 function updateForm(value) { 
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

 async function handleSubmit(e) {
  e.preventDefault();
  const newItem = { ...form };
  await fetch("https://nelly-ecommerce-app.onrender.com/login", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(newItem),
  })
  .then((response) => response.json())
  .then((data) => {
    if(data === "error") {
    //  window.alert("Invalid Login Details");
    setModaldata({
      titleData: "Error",
      descData: "Invalid Login Details",
    }); 
      return;
    }
    if(data.status === "ok") { 
      window.localStorage.setItem("token", data.data);
      window.localStorage.setItem("loggedIn", true);
      setModalShow(true)
      navigate("/")
      setForm({ 
        email: "", 
        password: ""
      });
      setModaldata({
        titleData: "Successful",
        descData: "Login Successful",
      });          
    }
  
  })
}

  return (
    <>
    <Form method="post">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="E.g. johndoe@mymail.com"
        value={form.email}
        autoComplete="off"
        onChange={(e) => updateForm({ email: e.target.value })} />
      </Form.Group>

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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div className="text-end">
            <Link  to="/forgot-password"  className="next_node forgot_password">Forgot password?</Link>
            </div>
      </Form.Group>
        <Form.Group className="mb-3">
        <Button onClick={handleSubmit} className="form-control btn action_trigger" type="submit">
        Login
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

export default SignInForm;