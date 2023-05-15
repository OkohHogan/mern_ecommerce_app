import React, {useState, useEffect} from "react";
import { Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import LoadingSpinner from "./loader";


const FetchCartItem = (props) => {
    return (
        <>
           <div className="cart_data_box">
                           <Row>
                                 <Col xs={4} lg={4} sm={4} md={4} xl={4} xxl={4}>
                                    <div className="img_box">
                                        <div className="img" style={{backgroundImage: `url(${props.upFile})`}}></div>
                                    </div>
                                </Col>
                               <Col xs={8} lg={8} sm={8} md={8} xl={8} xxl={8}>
                                    <div className="text_box">
                                        <div className="">
                                            <div className="cost float-end">
                                              
                                                <button className="btn"
                                                onClick={() => {
                                                props.deleteRecord(props._id);
                                                }}
                                                >
                                                <span><FeatherIcon icon="x" /></span>
                                                </button>
                                            </div>
                                            <div className="heading">
                                            <Link to={`/product/${props.id}`}>
                                            <h2>{props.title}</h2>
                                            <span className="price">${props.price}</span>
                                            </Link>
                                            </div>
                                        </div>
                                        <div className="details">
                                            {/* <p>Color: Brown</p> */}
                                            {/* <p>In-stock</p> */}
                                            <Form onSubmit={handleSubmit}>
                                          <Row className="mb-3 mt-3">
                                          <Col sm={4} xs={5}>
                                          <Form.Select name="qty"  onChange={handleSubmit}>
                                          <option value="1" >1</option>
                                          <option value="2">2</option>
                                          <option value="3">3</option>
                                          <option value="4">4</option>
                                          <option value="5">5</option>
                                          <option value="6">6</option>
                                          <option value="7">7</option>
                                          <option value="8">8</option>
                                          </Form.Select>
                                          </Col>
                                          </Row>
                                          </Form>
                                        </div>
                                       
                                    </div>
                                </Col>
                            </Row>
                        </div>
        </>
    )
}

const handleSubmit = (e) => {
  e.preventDefault();
  alert()
} 

const CartData = () => {

    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
     async function getRecords() {
      setIsLoading(true);
       const response = await fetch(`https://nelly-ecommerce-app.onrender.com/cartItems`); 
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
       if(response.ok) {
         const records = await response.json();
         setRecords(records);
         setIsLoading(false);
       }
     }
     getRecords();
     return;
   }, [records.length]);

   async function deleteRecord(id) {
    await fetch(`https://nelly-ecommerce-app.onrender.com/delCartItem/${id}`, {
    method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    }

    const [subData, getSubData] = useState([]);
    useEffect(() => {
     async function getData() {
       const response = await fetch(`https://nelly-ecommerce-app.onrender.com/cartItems`); 
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
       if(response.ok) { 
         const record = await response.json();
         const sum = record.map(datum => parseInt(datum.price) ).reduce((a, b) => a + b)
         getSubData(sum); 
       }
     }
     getData();
     return;
   }, [subData.length]);

   const [number, setNumber] = useState([]);
   useEffect(() => {
    async function getNumber() {
      const response = await fetch(`https://nelly-ecommerce-app.onrender.com/cartCounter`); 
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      if(response.ok) {
        const getNumber = await response.json();
        setNumber(getNumber);
      }
    }
    getNumber();
    return;
  }, [number.length]);

    function recordList() {
        return records.map((data) => {
          return (
            <FetchCartItem
                key={data._id}
                id={data._id}
                title={data.title}
                upFile={data.upFile}
                price={data.price} 
                deleteRecord={() => deleteRecord(data._id)}
            />
          );
        });
      }
    return (
        <>
                <div className="box heading">
                <h1>Your Bag</h1>
                <p>{ number <= 1 ? `${number} Item` : `${number} Items`}</p>
            </div>
            <div className="items_box">
                   <Row>
                      <Col xs={12} lg={8} sm={12} md={8} xl={8} xxl={8}>
                        { isLoading ? <LoadingSpinner /> : recordList()}
                       </Col>
                        <Col xs={12} lg={4} sm={12} md={4} xl={4} xxl={4}>
                              <div className="cart_data_box">
                                <div className="text_box">
                                   <div className="heading">
                                    <h1>Order Summary <span>({ number <= 1 ? `${number} Item` : `${number} Items`})</span></h1>
                                   </div>
                                  <Row>
                                    <Col xs={6} lg={6} sm={6} md={6} xl={6} xxl={6}>
                                        <h3>Subtotal</h3>
                                    </Col>
                                    <Col xs={6} lg={6} sm={6} md={6} xl={6} xxl={6}>
                                       <div className="text-end">
                                        <h3>${subData}</h3>
                                       </div>
                                    </Col>
                                   </Row>
                                  <Row>
                                    <Col xs={6} lg={6} sm={6} md={6} xl={6} xxl={6}>
                                        <h3><b>Total</b></h3>
                                    </Col>
                                    <Col xs={6} lg={6} sm={6} md={6} xl={6} xxl={6}>
                                       <div className="text-end">
                                        <h3><b>${subData}</b></h3>
                                       </div>
                                    </Col>
                                   </Row>
                                </div>
                              </div> 
                              
                              <div className="checkout_btn">
                                <form action="" method="post">
                                    <Link to="/checkout" className="btn form-control">Checkout</Link>
                                </form>
                              </div>
                       </Col>
                    </Row>
        </div>
        </>
    );
}

export default CartData;