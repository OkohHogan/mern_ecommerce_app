import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import FpasswordForm from "../components/fpassword-form";

function ForgotPassword() {
    return (
        <Container fluid className="signup">
            <Row>
                <Col xs={12} lg={4} sm={6} md={4} xl={4} xxl={4}></Col>
                <Col xs={12} lg={4} sm={6} md={4} xl={4} xxl={4}>
                <div className="box">
                        <div className="tab_list ">
                        
                            <div className="tab-content">
                            <div className="tab-pane fade show active" id="signIn"  >
                            <div className="items">
                                <div className="text-center">
                                    <h2>Forgot Password</h2>
                                </div>
                               <FpasswordForm />
                                <div class="form-group text-center">
                                <Link to="/signup" class="next_node">Don't have an account? <span>Register</span></Link>
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

export default ForgotPassword;