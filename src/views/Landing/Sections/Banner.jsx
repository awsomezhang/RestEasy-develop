import React from 'react';
import './Banner.css';
import { Parallax, Background } from "react-parallax";
import { withRouter, Redirect } from "react-router-dom";

import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";


export default class Carousel extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            createScroll: this.props.createScroll,
            registerScroll: this.props.registerScroll,
            resourcesScroll: this.props.resourcesScroll,
        }
    }

    render() {
        return (
            <div className="image-section">
                <Container fluid={true}>
                        <Row className="justify-content-md-center">
                                <Col className="tree-col">
                                    <div>
                                        <img className="tree" src={require("../../../assets/img/1x/tree-white.png")}></img>
                                    </div>
                                </Col>
                                <Col className="header-section">
                                    <Row>
                                        <Col>
                                            <div className="header-text">
                                                Losing someone is hard.
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="header-text-sub">
                                                But together, we can<br/>remember your loved one.
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="btn-holder">
                                                <Button className="button-learn-more">Learn More!</Button>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                        </Row>
                </Container>
            </div>
        )
    }
}
