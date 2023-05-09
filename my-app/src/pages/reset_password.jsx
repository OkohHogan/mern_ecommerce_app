import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ResetPasswordForm from "../components/rPassword";

function ResetPassword() {
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
                                     <Link to="/signin"  className="nav-link active" ><span>Login</span></Link>
                                  </li>
                                  <li className="nav-item">
                                     <Link to="/signup" id="bg_2"  className="nav-link " ><span>Register</span></Link>
                                  </li>
                               </ul>
                            </div>
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="signIn"  >
                            <div className="items">
                                <div className="text-center">
                                    <h2>Reset Password</h2>
                                </div>
                                <ResetPasswordForm />
                               <div className="text-center">
                                <Link to="/signup" className="next_node">Don't have an account? <span>Register</span></Link>
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
export default ResetPassword;