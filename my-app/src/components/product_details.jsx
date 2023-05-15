import React, {useState, useEffect, useRef} from "react";
import { Accordion, Col, Row, Card } from "react-bootstrap";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useParams, useNavigate } from "react-router";
import {Button, Form} from "react-bootstrap";
import LoadingAnim from "./loadinganim";
import LoadingAnimBlack from "./loadingAnimBlack";
import AlertModal from "./alertModal";

const ProductDetails = () => {
    const params = useParams();
    const navigate = useNavigate();
    const isLoggedIn = window.localStorage.getItem("loggedIn");
    const  titleRef= useRef(null);
    const  priceRef = useRef(null);
    const  descRef = useRef(null);
    const  upFileRef = useRef(null);
    const  itemIdRef = useRef(null);
    const  userIdRef = useRef(null);
    const  categoryRef = useRef(null);
    const  colorRef = useRef(null);
    const [loadingAnim, setLoadingAnim] = useState(false);
    const [loadingAnimBlack, setLoadingAnimBlack] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalData, setModaldata] = useState({titleData: "", descData:""});

    const addToCart = async (e) => {
    if(isLoggedIn !== "true"){
        alert("Login or Register to add to continue shopping");
        return;    
    }
      else {
        e.preventDefault();
        const title = titleRef.current.value;
        const price = priceRef.current.value;
        const description = descRef.current.value;
        const upFile = upFileRef.current.value;
        const itemId = itemIdRef.current.value;
        const userid = userIdRef.current.value;
        const category = categoryRef.current.value;
        const color = colorRef.current.value;
        setLoadingAnim(true);
        let result = await fetch(
        'https://nelly-ecommerce-app.onrender.com/items/addToCart', {
            method: "POST",
            body: JSON.stringify({ title, price, description, upFile, itemId, userid, category, color }),
            headers: {
                'Content-Type': 'application/json'
            }
        })       
        result = await result.json();
        if (result) {        
            setModalShow(true);
            setLoadingAnim(false);
            setModaldata({
              titleData: "Successful",
              descData: "Item successfully added to cart",
            })           
        }
        if(!result) {
          setModalShow(true);
          setLoadingAnim(false);
          setModaldata({
            titleData: "Error",
            descData: "Error!! try adding item to cart again.",
          }) 
        }
      }
    }

    const addToWishList = async (e) => {
      if(isLoggedIn !== "true"){
        alert("Login or Register to add to wishlist");
        return;    
      } 
      else {
        e.preventDefault();
        setLoadingAnimBlack(true)
        const title = titleRef.current.value;
        const price = priceRef.current.value;
        const description = descRef.current.value;
        const upFile = upFileRef.current.value;
        const itemId = itemIdRef.current.value;
        const userid = userIdRef.current.value;
        const category = categoryRef.current.value;
        const color = colorRef.current.value;
        let result = await fetch(
        'https://nelly-ecommerce-app.onrender.com/items/addToWishList', {
            method: "POST",
            body: JSON.stringify({ title, price, description, upFile, itemId, userid, category, color }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result) {
            setLoadingAnimBlack(false);
            setModalShow(true);
            setModaldata({
              titleData: "Successful",
              descData: "Item successfully added to wishlist",
            }) 
        }
        if(!result) {
          setModalShow(true);
          setLoadingAnim(false);
          setModaldata({
            titleData: "Error",
            descData: "Error!! Try adding item to wishlist again.",
          }) 
        }
      }
    }       

    const [fetchRecord, setFetchRecord] = useState({title: "", price: "", _id: "", category: "", color: ""})    
    useEffect(() => {
        async function fetchData() {
        const id = params.id.toString();
        const response = await fetch(`https://nelly-ecommerce-app.onrender.com/item/${params.id.toString()}`);
        const record = await response.json();
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        } 
        if(response.ok) {
            setFetchRecord(record)
        }    
        if (!record) {
          window.alert(`Record with id ${id} not found`);
          navigate("/");
          return;
        }    
      }
      fetchData();
      return;
    }, [params.id, navigate]);


    const [getToken, setToken] = useState({email: "", username: "", userID: ""});
    useEffect(() =>{
      function getUserData() {
        fetch("https://nelly-ecommerce-app.onrender.com/success", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
      })
      .then((response) => response.json())
      .then((data) => { 
          const objects = {
             email: data.data.email,
             username: data.data.username,
             userID: data.data._id,
          }
            setToken(objects);
            if(data.data === "token expired"){
              navigate("/signin");
              window.localStorage.clear()
            }
      })
        }
        getUserData();
        return;
    }, [getToken.length]);


    return (
      
        <div className="prod_details">
            <div className="itemDetails">
            <span className="float-end">{fetchRecord._id}</span>
            <span>Category: <b>{fetchRecord.category}</b></span> <br></br>
            <span>Color: <b>{fetchRecord.color}</b></span>   
            
            <h2>{fetchRecord.title}</h2>
            <h3>${fetchRecord.price} </h3>
            </div>

        <Accordion defaultActiveKey="0">
            <Card>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Product Description</Accordion.Header>
            <Accordion.Body>
            <Card.Body >
                <div className="details">
                <p>{fetchRecord.description !== "" ?  fetchRecord.description : "No description for this item"}</p>
                </div>
            </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
            </Card>


            <Card>
            <Accordion.Item eventKey="1">
            <Accordion.Header>Product Details</Accordion.Header>
            <Accordion.Body>
            <Card.Body >
                <div className="details">
                    <ul>
                        <li>Dimensions: 4.3" x 9.75</li>
                        <li>Volume: 12.5L</li>
                        <li>Front Zip Pocket</li>
                        <li>Mesh Size pocket</li>
                        <li>Product Color: Blue Fusion</li>
                    </ul>
                </div>
            </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
            </Card>


            <Card>
            <Accordion.Item eventKey="2">
            <Accordion.Header>Product Care</Accordion.Header>
            <Accordion.Body>
            <Card.Body >
                <div className="details">
                    <ul>
                        <li>Do not Bleach</li>
                        <li>Maximum Carrying weight: 3KG</li>
                        <li>Clean with moist Cloth only</li>
                        <li>Do not iron</li>
                        <li>No mashing washing</li>
                    </ul>
                </div>
            </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
            </Card>

            <Card>
            <Accordion.Item eventKey="3">
            <Accordion.Header>Product Review</Accordion.Header>
            <Accordion.Body>
            <Card.Body >
                <div className="text-end">
                    <div className="add_action" data-target="#add_review" data-toggle="modal">
                        <span>Write Review</span> <div className="float-end plus_btn"><FeatherIcon icon="plus" /></div>
                    </div>
                    </div>

                    <div className="rev_box">
                    <h2>Jamie Lanniester</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, est? Maiores labore reiciendis dolorem aspernatur mollitia qui voluptatem odio commodi. Rem sunt voluptatum voluptate, veniam molestiae praesentium dolore eius vero.</p>
                    <span>23 April 2023</span>
                    </div>

                    <div className="rev_box">
                    <h2>Ragner Limiter</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, est? Maiores labore reiciendis dolorem aspernatur mollitia qui voluptatem odio commodi. Rem sunt voluptatum voluptate, veniam molestiae praesentium dolore eius vero.</p>
                    <span>4 March 2023</span>
                    </div>
            </Card.Body>
            </Accordion.Body>
            </Accordion.Item>
            </Card>     
        </Accordion>

    <div className="action_btns">
    <Row>
        <Col xs={6}  sm={6} xxl={6} xl={6} md={6} lg={6}>
        <Form >
      <Form.Group className="mb-3" hidden  controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Louis Vutton"  
        readOnly 
        defaultValue={fetchRecord.title}
        ref={titleRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control  
        type="number" 
        placeholder="3,000" 
        readOnly  
       defaultValue={fetchRecord.price}
       ref={priceRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Item Id</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord._id}
       ref={itemIdRef}
        />
      </Form.Group>

   <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord.category}
       ref={categoryRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Color</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord.color}
       ref={colorRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden   controlId="formBasicPassword">
        <Form.Label>user Id</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={getToken.userID}
       ref={userIdRef}
        />
      </Form.Group>  

      <Form.Group className="mb-3" hidden  controlId="formBasicEmail">
        <Form.Label>Item Description</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        type="text" 
        readOnly
        placeholder="Description"   
        defaultValue={fetchRecord.description}
        ref={descRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden controlId="formBasicEmail">
        <Form.Label>Item Image</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        type="text" 
        readOnly
        placeholder="Image URL"   
       defaultValue={fetchRecord.upFile}
       ref={upFileRef}
         />
      </Form.Group>
      <Button onClick={addToCart} type="submit" className="form-control btn submit_trigger">{loadingAnim ? <LoadingAnim /> : "Add to Bag"}</Button>
    </Form>         
        </Col>

        <Col  xs={6} sm={6} xxl={6} xl={6} md={6} lg={6}>
        <Form >
      <Form.Group className="mb-3" hidden  controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control 
        type="text" 
        placeholder="Louis Vutton"  
        readOnly 
        defaultValue={fetchRecord.title}
        ref={titleRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control  
        type="number" 
        placeholder="3,000" 
        readOnly  
       defaultValue={fetchRecord.price}
       ref={priceRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Item Id</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord._id}
       ref={itemIdRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Category</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord.category}
       ref={categoryRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicPassword">
        <Form.Label>Color</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={fetchRecord.color}
       ref={colorRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden   controlId="formBasicPassword">
        <Form.Label>user Id</Form.Label>
        <Form.Control  
        type="text" 
        placeholder="" 
        readOnly  
       defaultValue={getToken.userID}
       ref={userIdRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" hidden  controlId="formBasicEmail">
        <Form.Label>Item Description</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        type="text" 
        readOnly
        placeholder="Description"   
        defaultValue={fetchRecord.description}
        ref={descRef}
         />
      </Form.Group>

      <Form.Group className="mb-3" hidden controlId="formBasicEmail">
        <Form.Label>Item Image</Form.Label>
        <Form.Control 
        as="textarea" 
        rows={4}
        type="text" 
        readOnly
        placeholder="Image URL"   
       defaultValue={fetchRecord.upFile}
       ref={upFileRef}
         />
      </Form.Group>
      <Button onClick={addToWishList} type="submit" className="fav_action btn form-control ">
       {loadingAnimBlack ? <LoadingAnimBlack /> : " Add to Wishlist"}
      </Button>
    </Form> 
        </Col>
    </Row>
    </div>
      <AlertModal
      show={modalShow}
      title={modalData.titleData}
      desc={modalData.descData}
      onHide={() => setModalShow(false)}
      />
    </div>
    )
}


export default ProductDetails;