import React, {useState, useEffect} from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const FetchCartItem = (props) => {  
    return (
        <>
<div className="table_body">
        <Row>
        <Col   xs={5} lg={5} sm={5} md={5} xl={5} xxl={5} >
            <Row>
                <div className="col-sm-3">
                    <div className="img_box">
                        <div className="img" style={{backgroundImage: `url(${props.upFile})`}}></div>
                    </div>
                </div>
                <div className="col-sm-9">
                    <div className="text_box">
                        <div className="">
                        <h2>{props.title}</h2>
                        <p>Color: Brown</p>
                        </div>
                    </div>
                </div>
            </Row>
        </Col>
        <Col xs={7} lg={7} sm={7} md={7} xl={7} xxl={7} >
            <div className="text_box">
                <Row>
                    <div className="col-sm-4">
                        <div className="table_row">
                            <span id="itemQty">2</span>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="table_row">
                            <span id="price">${props.price}</span>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="table_row">
                            <span id="totalCost">$848</span>
                        </div>
                    </div>
                </Row>
            </div>
        </Col>
        </Row>
    </div>
        </>
    )
}

const CheckoutData = () => {

    const [records, setRecords] = useState([]);
    useEffect(() => {
     async function getRecords() {
       const response = await fetch(`http://localhost:5050/cartItems`); 
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
       if(response.ok) {
         const records = await response.json();
         setRecords(records);
       }
     }
     getRecords();
     return;
   }, [records.length]);

    function recordList() {
        return records.map((data) => {
          return (
            <FetchCartItem
                key={data._id}
                id={data._id}
                title={data.title}
                upFile={data.upFile}
                price={data.price} 
            />
          );
        });
      }

      const navigate = useNavigate();
      const [form, setForm] = useState({
        firstname: "", 
        lastname: "",
        email: "", 
        phone: "", 
        address: "", 
        city: "",
        state: "", 
        country: "",
    });
    
     function updateForm(value) { 
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }

     async function onSubmit(e) {
      e.preventDefault();
      const newItem = { ...form };
      await fetch("http://localhost:5050/items/order", {
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
      setForm({ 
        firstname: "", 
        lastname: "",
        email: "", 
        phone: "", 
        address: "", 
        city: "",
        state: "", 
        country: "",
       });
      navigate("/");
    }


    return (
        <>
            <div className="box heading">
                    <h1>Order Summary</h1>
                </div>
            <div className="items_box">
                   <Row>
                      <Col xs={12} lg={12} sm={12} md={12} xl={12} xxl={12} >
                        <div className="cart_data_box">
                            <div className="table_head">
                               <Row>
                               <Col xs={5} lg={5} sm={5} md={5} xl={5} xxl={5}></Col>
                                   <Col xs={7} lg={7} sm={7} md={7} xl={7} xxl={7} >
                                        <div className="text_box">
                                           <Row>
                                                <div className="col-sm-4">
                                                    <div className="table_row">
                                                        <span>Quantity</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="table_row">
                                                        <span>Price</span>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4">
                                                    <div className="table_row">
                                                        <span>Total</span>
                                                    </div>
                                                </div>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {recordList()}
                         

                            <div className="items_total">
                                <div className="text-end">
                                    <h2>Total: $120</h2>
                                </div>
                            </div>

                            <div className="item_form">
                               <Row>
                               <Col  xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} ></Col>
                               <Col  xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} >
                                    <div className="form_box">
                                    <h2>Delivery Address</h2>
                                        <Form method="post">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="fname" 
                                        placeholder="E.g. John"
                                        value={form.firstname}
                                        onChange={(e) => updateForm({ firstname: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group className="mb-3 " controlId="formBasicPassword">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="lname" 
                                        placeholder="E.g. Doe"
                                        value={form.lastname}
                                        onChange={(e) => updateForm({ lastname: e.target.value })} />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        name="email" 
                                        placeholder="E.g. johndoe@mymail.com" 
                                        value={form.email}
                                        onChange={(e) => updateForm({ email: e.target.value })}
                                        />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Phone</Form.Label>
                                        <Form.Control 
                                        type="tel" 
                                        name="phone" 
                                        placeholder="E.g. +44 93439--" 
                                        value={form.phone}
                                        onChange={(e) => updateForm({ phone: e.target.value })}
                                        />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="address" 
                                        placeholder="E.g. 12 Komptop Drive." 
                                        value={form.address}
                                        onChange={(e) => updateForm({ address: e.target.value })}
                                        />
                                        </Form.Group>

                                        <Form.Group className="mb-3 " controlId="formBasicPassword">
                                        <Form.Label>City</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="city" 
                                        placeholder="" 
                                        value={form.city}
                                        onChange={(e) => updateForm({ city: e.target.value })}
                                        />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>State</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="state" 
                                        placeholder="" 
                                        value={form.state}
                                        onChange={(e) => updateForm({ state: e.target.value })}
                                        />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Country</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        name="country" 
                                        placeholder="" 
                                        value={form.country}
                                        onChange={(e) => updateForm({ country: e.target.value })}
                                        />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                        <Button 
                                        onClick={onSubmit}
                                        className="form-control btn " 
                                        type="submit">
                                        Place Order
                                        </Button>
                                        </Form.Group>
                                        </Form>
            
                                </div>
                                </Col>
                               <Col   xs={4} lg={4} sm={4} md={4} xl={4} xxl={4} ></Col>
                        </Row>
                            </div>              
                        </div>   
                       </Col>

                    </Row>
        </div>
        </>
    );
}

export default CheckoutData;

