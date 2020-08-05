import React from 'react'

import "./CreateRegistrySection.css"
import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

export default function CreateRegistrySection(){
    return(
        <div>
            <Container fluid={true}>
                <Row className="register-row">
                    <Col md="5">
                        <div>
                            <img className="registry-graphic" src={require("../../../assets/img/1x/registry_graphic.png")}></img>
                        </div>
                    </Col>
                    <Col md="7">
                        <Row>
                            <Col>
                                <div className="register-header-text">
                                    Register For What You Need
                                </div>
                            </Col>
                        </Row>
                        <div className="registry-options-desktop">
                            <Row className="registry-options">
                                <Col>
                                    <div>
                                        <h3>
                                            Create A Registry
                                        </h3>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <h3>
                                            Find A Registry
                                        </h3>   
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <h3>
                                            Browse Creative Commemoration
                                        </h3>  
                                    </div>
                                </Col>
                            </Row>
                            <Row className="registry-descriptions">
                                <Col>
                                    <div>
                                        Harness the power of your community and direct support to the things that matter to you and to them.
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        Is someone you care about in mourning? Contributing to their registry guarantees that your support goes toward something that truly makes a difference.
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                    Take a look at some unique ways to commemorate your loved one.Turn their ashes into diamonds or send their body to space to rest with the stars
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className="registry-options-mobile">
                            <Row className="registry-options">
                                <Col md="4">
                                    <div>
                                        <h3>
                                            Create A Registry
                                        </h3>
                                    </div>
                                    <div className="registry-descriptions">
                                        Harness the power of your community and direct support to the things that matter to you and to them.
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div>
                                        <h3>
                                            Find A Registry
                                        </h3>   
                                    </div>
                                    <div className="registry-descriptions">
                                        Is someone you care about in mourning? Contributing to their registry guarantees that your support goes toward something that truly makes a difference.
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div>
                                        <h3>
                                            Browse Creative Commemoration
                                        </h3>  
                                    </div>
                                    <div className="registry-descriptions">
                                        Take a look at some unique ways to commemorate your loved one.Turn their ashes into diamonds or send their body to space to rest with the stars
                                    </div>
                                </Col>
                            </Row>
                        </div>
                            
                    </Col>
                </Row>
            </Container>
        </div>
    )
}