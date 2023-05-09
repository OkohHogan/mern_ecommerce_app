import React from "react";
import { Container, Row, Col,  } from "react-bootstrap";
import OrderData from "../components/order_data";



const Order = () => {
    return (
        <>
        <Container fluid className="wish_list">
        <Row>
            <Col xs={12} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
            <Col xs={12} lg={10} sm={10} md={10} xl={10} xxl={10}>
               <OrderData />
            </Col>
            <Col xs={12} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
        </Row>
        </Container>
        </>
    )
}

export default Order;