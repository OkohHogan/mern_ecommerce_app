import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React, {useState, useEffect} from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./loader";




  const FetchCartItem = (props) => {
    return(
    <>
    <div className="cart_data_box">
    <Row>
          <Col sm={2} xxl={3} xl={3} xs={3} md={3} lg={3} >
             <div className="img_box">
                 <div className="img" style={{backgroundImage: `url(${props.upFile})`}}></div>
             </div>
         </Col>
        <Col sm={9} xxl={9} xl={9} xs={9} md={9} lg={9} >
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
                         <h2>{props.title}</h2>
                         <span className="price" >$<span >{props.price}</span></span>
                     </div>
                 </div>
                 {/* <div className="details">
                     <p>Color: Brown</p>
                 </div> */}
                     {/* <Row className="mb-3 mt-3">
                     <Col sm={3} xs={3}>
                     <Form.Select name="qty">
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
                     </Row> */}
             </div>
         </Col>
     </Row>
 </div>
        </>
    )
}

const CartBar = () => {
    const [records, setRecords] = useState([]);
    const [isLoading, SetIsLoading] = useState(false);
    useEffect(() => {
     async function getRecords() {
      SetIsLoading(true);
       const response = await fetch(`https://nelly-ecommerce-app.onrender.com/cartItems`); 
       if (!response.ok) {
         const message = `An error occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
       if(response.ok) { 
         const records = await response.json();
         setRecords(records);
         SetIsLoading(false)
       }
     }
     getRecords();
     return;
   }, [records.length]);

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

   async function deleteRecord(id) {
    await fetch(`https://nelly-ecommerce-app.onrender.com/delCartItem/${id}`, {
    method: "DELETE"
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
    }

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

    const navigate = useNavigate();
    const closeCart = event => {
        const addClass = document.querySelector(".cart_toggle");
        const overLay = document.querySelector(".overlay_bg");
        addClass.classList.remove("active");
        overLay.style.display = "none";
      };

      const redirectCart = event => {
        const addClass = document.querySelector(".cart_toggle");
        const overLay = document.querySelector(".overlay_bg");
        addClass.classList.remove("active");
        overLay.style.display = "none";
        navigate("/cart");
      };

    return (
        <>
    <div className="cart_toggle">
   <div className="cart_toggle_head">
    <Row >
        <Col sm={10} xxl={10} xl={10} xs={10} md={10} lg={10}>
            <div className="heading">
                <h2>Shopping Bag <span>({ number <= 1 ? `${number} Item` : `${number} Items`} )</span></h2>
            </div>
        </Col>
        <Col sm={2} xxl={2} xl={2} xs={2} md={2} lg={2}>
            <div className="close_action text-end" onClick={closeCart}>
               <FeatherIcon icon="x" />
            </div>
        </Col>
    </Row>
   </div>

   <div className="cart_toggle_body wish_list">
    <div className="items_box">
        { isLoading ? <LoadingSpinner /> : recordList()}
   
        <div className="cart_data_box">
            <div className="text_box">
              <Row>
              <Col sm={6} xxl={6} xl={6} xs={6} md={6} lg={6} >
                    <h3>Subtotal</h3>
                </Col>
               <Col sm={6} xxl={6} xl={6} xs={6} md={6} lg={6} >
                   <div className="text-end">
                    <h3>${subData}</h3>
                   </div>
                </Col>
               </Row>
              <Row>
              <Col sm={6} xxl={6} xl={6} xs={6} md={6} lg={6} >
                    <h3><b>Total</b></h3>
                </Col>
               <Col sm={6} xxl={6} xl={6} xs={6} md={6} lg={6} >
                   <div className="text-end">
                    <h3><b>${subData}</b></h3>
                   </div>
                </Col>
               </Row>
            </div>
          </div>

          <div className="checkout_btn">
            <form action="" method="post">
                <Button onClick={redirectCart} className="btn form-control">View Bag</Button>
            </form>
          </div>
    </div>
   </div>

</div>
<div className="overlay_bg"></div>
        </>
    )
}

export default CartBar;