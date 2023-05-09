import React  from "react";
import { Container, Row, Col } from "react-bootstrap";
import ControlledCarousel  from "../components/product_carousel";
import ProductDetails from "../components/product_details";
// import Recommended from "./recommended";


const Product = () => {
    return (
        <>
        <Container fluid className="product_prev">
        <Row>
            <Col xs={12} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
            <Col xs={12} lg={10} sm={10} md={10} xl={10} xxl={10}>
                <Row>
                    <Col xs={12} lg={6} sm={6} md={6} xl={6} xxl={6}>
                        <div className="prod_itemImg">
                        <ControlledCarousel />
                        </div>
                    </Col>
                    <Col xs={12} lg={6} sm={6} md={6} xl={6} xxl={6}>
                        <ProductDetails />
                    </Col>
                </Row>
            </Col>
            <Col xs={12} lg={1} sm={1} md={1} xl={1} xxl={1}></Col>
        </Row>
        </Container>

        {/* <Recommended /> */}
        </>
    )
}

export default Product;