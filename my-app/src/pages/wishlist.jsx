import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/card_item";

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
    useEffect(() => {
     async function getRecords() {
       const response = await fetch(`http://localhost:5050/wishlist`);
   
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

    return (
        <Container fluid className="wish_list">
            <Row>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
                <Col xs={10} lg={10} sm={10} md={10} xl={10} xxl={10}>
                    <div className="box heading">
                    <h1>My Wishlist</h1>
                    <p>6 Items</p>
                    </div>
                    <div className="items_box">
                    <Row>
                    {records.map(createCard)}
                    </Row>             
                    </div>
                </Col>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
            </Row>
        </Container>
    )
    
}

export default WishList;