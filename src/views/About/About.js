import React from 'react';
import PageWrapper from "../../PageWrapper"
import "./About.css"
import {Button, Form, Container, Row, Col} from "react-bootstrap";

export default function LoginForm() {
    return (
        <PageWrapper content={
            <div>
                <Container fluid={true} className="header-banner">
                    <Row className="justify-content-center">
                        <Col className="d-flex justify-content-center" style={{ "paddingLeft": 0, "paddingRight": 0 }}>
                            <div className="sub-header-top">
                                About RestEasy
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        }/>
    );
};
