import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const getDate = new Date().getFullYear();

function Footer(){
    return (
        <Container fluid className="footer">
            <Row>
                <Col sm={1} lg={1} md={1} xl={1}></Col>
                <Col sm={10} lg={10} md={10} xl={10} xs={12}>
                    <Row>
                    <Col sm={3} lg={3} md={3} xl={3}>
                    <div className="box">
                    <Link to="/">
                        <h1 className="logo">nelly's</h1>
                        <span>Beautyplace</span>
                        </Link>
                    </div>
                    <div className="box">
                        <ul>
                            <li>
                            <Link to="https://web.facebook.com/nellys/"><i className="lab la-facebook-f"></i></Link>
                            </li>
                            <li>
                            <Link to="https://t.me/+2339493939--"><i className="lab la-telegram"></i></Link>
                            </li>
                            <li>
                            <Link to="https://www.instagram.com/nellys/"><i className="lab la-instagram"></i></Link>
                            </li>
                            <li>
                            <Link to="https://www.twitter.com/nellys/"><i className="lab la-twitter"></i></Link>
                            </li>
                            <li>
                            <Link to="https://wa.me/+2339493939--"><i className="lab la-whatsapp"></i></Link>
                            </li>
                        </ul>
                    </div>
                    </Col>
                    <Col sm={3} lg={3} md={3} xl={3} xs={12}>
                    <div className="box">
                        <h2>About us</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quae cumque dolore reprehenderit error voluptas tenetur, placeat laudantium odit natus.</p>
                    </div>
                    </Col>
                    <Col sm={3} lg={3} md={3} xl={3} xs={12}>
                    <div className="box">
                        <h2>Services</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet quae cumque dolore reprehenderit error voluptas tenetur, placeat laudantium odit natus.</p>
                    </div>
                    </Col>
                    <Col sm={3} lg={3} md={3} xl={3} xs={12}>
                    <div className="box contact_box">
                        <h2>Contact us</h2>
                        <p>
                        <Link to="mailto:info@---">info@nellysbeautyplace.com <FeatherIcon icon="mail" />
                        </Link></p>
                        <p>
                        <Link to="tel:+234---">+234 343 332 2432 <FeatherIcon icon="phone" />
                        </Link></p>
                    </div>
                    </Col>
                    <Col sm={12} lg={12} md={12} xl={12} xs={12}>
                    <div className="box text-center tnc">
                        <p>Copyright &copy; {getDate}  Nellybeautyplace. All rights Reserved</p>
                        <p className="tnc_btn"><Link to="#">Privacy policy</Link> - <Link to="#">Terms &amp; Conditions</Link></p>
                    </div>
                    </Col>
                    </Row>
                </Col>
                <Col sm={1} lg={1} md={1} xl={1}></Col>
            </Row>
        </Container>

    )
}

export default Footer
