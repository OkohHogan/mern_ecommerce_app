import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignUpForm from "../components/signup-form";

function Signup() {
    return (
        <Container fluid className="signup">
            <Row>
                <Col xs={12} lg={4} sm={6} md={4} xl={4} xxl={4}></Col>
                <Col xs={12} lg={4} sm={6} md={4} xl={4} xxl={4}>
                <div className="box">
                        <div className="tab_list ">
                            <div className="d-flex">
                               <ul className="nav nav-mobile-role" role="tablist">
                                  <li className="nav-item ">
                                     <Link to="/signin"  className="nav-link " ><span>Login</span></Link>
                                  </li>
                                  <li className="nav-item">
                                     <Link to="/signup" id="bg_2"  className="nav-link active" ><span>Register</span></Link>
                                  </li>
                               </ul>
                            </div>
                            <div className="tab-content">
                            <div className="tab-pane fade show active" id="signIn"  >
                            <div className="items">
                                <div className="text-center">
                                    <h2>Signup</h2>
                                </div>
                                <SignUpForm />
                                <div className="form-group text-center">
                                <Link to="/signin" className="next_node">Already have an account? <span>Login</span></Link>
                                </div>
                            </div>
                            </div>     
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} lg={4} sm={6} md={4} xl={4} xxl={4}></Col>
            </Row>
        </Container>

    )
}

export default Signup;