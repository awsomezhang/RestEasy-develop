import React from 'react';
import "./CreateMemorySection.css"

import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";
  
  
  export default function Wave(){
    return (
        <div className="image-wave">
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <Col md="7" className="wave-header-section">
                        <Row>
                            <Col>
                                <div className="header-text-celebrate">
                                Create a<br/><span className="header-text-celebrate-emphasis">Digital Memory</span><br/>celebrating the life of your loved one.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="information">
                                Choose from our templates and customization tools. Add photos, videos, music, and stories to make it truly unique and meaningful.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="divider-dot">
                                    •
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="information">
                                Publish & share with family and friends so they can add their memories.

                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="divider-dot">
                                    •
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="information">
                                Come back at any time - it’ll always be here for you.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div style={{ textAlign: "center", fontSize: "20px", marginLeft: "20px", padding: "30px 0px"}}>
                                    Curious? Check out <a href="/templatedigitalmemory">sample</a> or <a href="/template2digitalmemory">sample2</a>.
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="memory-graphic-col">
                        <div>
                            <img className="memory-graphic" src={require("../../../assets/img/1x/memory_graphic2.png")}></img>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
  }
  