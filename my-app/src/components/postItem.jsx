import React, { useState } from "react";
import {Button, Form, Container, Row, Col} from 'react-bootstrap/';
import { useNavigate } from "react-router";
import LoadingAnim from "./loadinganim";

const PostItems = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({title: "", price: "", description: "", category: "", color: ""});
  const [upFile, setUpFile] = useState()
  const [loadingAnim, setLoadingAnim] = useState(false);
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
  setLoadingAnim(true)
  const fileInput = { upFile };
  const newItem = { ...form, ...fileInput };
  const result = await fetch(
    'https://nelly-ecommerce-app.onrender.com/items/add', {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
            'Content-Type': 'application/json'
        }
    })  
    result = await result.json();     
    if (result) {        
        alert("Data saved succesfully");
        setForm({ title: "", price: "", description: "",  category: "", color: "" });
        setUpFile({ upFile: "" });
        navigate("/post");
        setLoadingAnim(false);
    }
    if(!result) {
      console.warn(result);
      alert("Error");
    }
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
        placeholder="E.g. Louis Vutton"   
        value={form.title}
        onChange={(e) => updateForm({ title: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3  " controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control  
        type="number" 
        placeholder="E.g. 3,000"   
        value={form.price}
        onChange={(e) => updateForm({ price: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3  " controlId="formBasicPassword">
        <Form.Label>Upload Image</Form.Label>
        <Form.Control 
        type="file" 
        name="imgFile" 
        accept=".jpeg, .png, .jpg, .webp"
        onChange={fileUpload} />
      </Form.Group>

      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="E.g. Men"   
        value={form.category}
        onChange={(e) => updateForm({ category: e.target.value })} />
      </Form.Group>

      <Form.Group className="mb-3  " controlId="formBasicPassword">
        <Form.Label>Color</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="E.g. Brown"   
        value={form.color}
        onChange={(e) => updateForm({ color: e.target.value })} />
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

        <Form.Group className="mb-3">
        <Button className="form-control btn action_trigger" type="submit">
        {loadingAnim ? <LoadingAnim /> : "Post Item"}
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
