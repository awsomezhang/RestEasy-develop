import React from 'react';
import './Carousel.css';
import { Parallax, Background } from "react-parallax";
import "../../../styles.css"

import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";


const image1 = require("../../../assets/img/away-3668344_1920_cropped.jpg")

export default function Carousel() {

    return (
        <div>
            <Container fluid={true}>
                    <Row className="justify-content-md-center header">
                        <Col style={{ "paddingLeft": 0, "paddingRight": 0 }}>
                            <div className="parallax">
                                <div className="section-parallax">
                                    <Container>
                                        <Row>
                                            <Col>
                                                <div className="header">We're sorry you're here, but happy you found us!</div>
                                            </Col>
                                        </Row>
                                        <Row className="middle">
                                            <Col md="5"></Col>
                                            <Col md="7">
                                                <Row>
                                                    <Col>
                                                        Tell their story
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        Fund their Resting Place
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        Commemorate and celebrate Life with RestEasy
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row className="button-row">
                                            <Col>
                                                <Button className="button-links" variant="outline-success" >Create A Digital Memory</Button>
                                            </Col>
                                            <Col>
                                                <Button className="button-links">Register for what you need</Button>
                                            </Col>
                                            <Col>
                                                <Button className="button-links">Find advice and resources to help</Button>
                                            </Col>
                                        
                                        </Row>
                                    
                                    </Container>
                                    
                                </div>
                            </div>
                            <div className="section-parallax">

                            </div>
                            <div className="parallax2">

                            </div>
                            <div className="section-parallax">

                            </div>
                            <div className="parallax">

                            </div>
                        
                        </Col>
                    </Row>
            </Container>

        </div>
    )
}
