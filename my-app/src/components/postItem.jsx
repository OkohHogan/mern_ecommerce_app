import React, { useState } from "react";
import {Button, Form, Container, Row, Col} from 'react-bootstrap/';
import { useNavigate } from "react-router";

const PostItems = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({title: "", price: "", description: ""});
  const [upFile, setUpFile] = useState()

 function updateForm(value) { 
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

const fileUpload = async (e) => {
  const file = e.target.files[0]
  const base64 = await convertImage(file);
  setUpFile(base64)
}

 async function onSubmit(e) {
  e.preventDefault();
 
  const fileInput = { upFile };
  const newItem = { ...form, ...fileInput };
  // console.log(newItem);
  await fetch("http://localhost:5050/items/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newItem),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  setForm({ title: "", price: "", description: "" });
  setUpFile({ upFile: "" });
  navigate("/post");
}



  return (
    <>
      <Container fluid className="mt-5">
      <Row>
      <Col  xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} ></Col>
      <Col  xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} >
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3"  controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Louis Vutton"   
        value={form.title}
        onChange={(e) => updateForm({ title: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3  " controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control  
        type="number" 
        placeholder="3,000"   
        value={form.price}
        onChange={(e) => updateForm({ price: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3"  controlId="formBasicEmail">
        <Form.Label>Item Description</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        type="text" 
        placeholder="Description"   
        value={form.description}
        onChange={(e) => updateForm({ description: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3  " controlId="formBasicPassword">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control 
        type="file" 
        name="imgFile" 
        accept=".jpeg, .png, .jpg, .webp"
        onChange={fileUpload} />
      </Form.Group>

        <Form.Group className="mb-3">
        <Button className="form-control btn action_trigger" type="submit">
        Post
      </Button>
        </Form.Group>
    </Form>
      </Col>
      <Col  xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} ></Col>
      </Row>
      </Container>
    </>

  );
}

export default PostItems;

function convertImage(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error);
    }
  })
}
