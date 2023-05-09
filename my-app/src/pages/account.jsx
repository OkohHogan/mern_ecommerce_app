import React from "react";
import { Container, Row, Col,  } from "react-bootstrap";
import AccountData from "../components/account_data";

const Account = () => {
    return (
        <>
        <Container fluid className="wish_list">
        <Row>
            <Col xs={12} lg={2} sm={2} md={2} xl={2} xxl={2}></Col>
            <Col xs={12} lg={8} sm={8} md={8} xl={8} xxl={8}>
               <AccountData />
            </Col>
            <Col xs={12} lg={2} sm={2} md={2} xl={2} xxl={2}></Col>
        </Row>
        </Container>
        </>
    )
}

export default Account;
