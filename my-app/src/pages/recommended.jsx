import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/card_item";
import cardData from "../components/data";

const  createCard =  (data) => {
    return (
     <Col key={data.id} xs={12} sm={3} xl={3} lg={3} md={3}>
       <Card 
        id={data.id}
        title={data.title}
        image={data.image}
        price={data.price} 
      />
     </Col>
    )
  }

const Recommended = () => {
    return (
        <Container fluid className="wish_list">
            <Row>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
                <Col xs={10} lg={10} sm={10} md={10} xl={10} xxl={10}>
                    <div className="box heading">
                    <h1>You May Also Like</h1>
                    <p>6 Items</p>
                    </div>
                    <div className="items_box">
                    <Row>
                    {cardData.map(createCard)}
                    </Row>             
                    </div>
                </Col>
                <Col xs={1} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
            </Row>
        </Container>
    )
    
}

export default Recommended;