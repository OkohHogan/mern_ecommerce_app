import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/card_item";
import LoadingSpinner from "../components/loader";

const  createCard =  (data) => {
    return (
     <Col key={data._id} xs={12} sm={3} xl={3} lg={3} md={3}>
       <Card 
        id={data._id}
        title={data.title}
        image={data.upFile}
        price={data.price} 
      />
     </Col>
    )
  }

const WishList = () => {

    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    useEffect(() => {
     async function getRecords() {
      setIsLoading(true);
       const response = await fetch(`https://nelly-ecommerce-app.onrender.com/wishlist`);
   
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


   const [number, setNumber] = useState([]); 
   useEffect(() => {
    async function getNumber() {
      const response = await fetch(`https://nelly-ecommerce-app.onrender.com/wishlistcount`); 
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

    return (
        <Container fluid className="wish_list">
            <Row>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
                <Col xs={12} lg={10} sm={12} md={10} xl={10} xxl={10}>
                    <div className="box heading">
                    <h1>My Wishlist</h1>
                    <p> { number >= 1 ? `${number} Item`  :  `${number} Items` } </p>
                    </div>
                    <div className="items_box">
                    <Row>
                    {isLoading ? <LoadingSpinner /> : records.map(createCard)}
                    </Row>             
                    </div>
                </Col>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
            </Row>
        </Container>
    )  
}

export default WishList;