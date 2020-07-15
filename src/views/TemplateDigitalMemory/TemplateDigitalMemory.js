import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import PageWrapper from "../../PageWrapper"
import "./TemplateDigitalMemory.css"
import "../../styles/styles.css"

export default function LoginForm() {
    return (
        <PageWrapper content={
            <div>
                <div style={{height: "100px", backgroundColor:"grey"}} />
                <br />
                <h1 className="centered-text emphasis-text"> In loving memory of [name] </h1>
                <h3 className="centered-text"> date - date </h3>
                <br />
                <Container fluid={true}>
                    <Row className="justify-content-md-center">
                        <Col md="1" />
                        <Col md="10">
                            <Row className="justify-content-md-center">
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image1.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image2.jpg')} className="double-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image3.jpg')} className="normal-height" />
                                </Col>
                                <Col md="6" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image8.png')} className="normal-height" />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="2" className="padded" >
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image4.jpg')} className="double-height" />
                                </Col>
                                <Col md="2" />
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image5.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image6.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image7.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image9.jpg')} className="normal-height" />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="2" className="padded" />
                                <Col md="6" className="padded">
                                    <div style={{backgroundColor: "lightgrey", height: "100%"}} className="center">
                                        memories shared go here
                                    </div>
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image10.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image11.jpg')} className="double-height" />
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image16.jpg')} className="double-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image12.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image13.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image14.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" className="padded">
                                    <img src={require('../../assets/img/TemplateDigitalMemoryPictures/image15.jpg')} className="normal-height" />
                                </Col>
                                <Col md="2" />
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="2" className="padded" />
                                <Col md="10" className="padded">
                                    <div style={{backgroundColor: "lightgrey", height: "100%"}} className="center">
                                        memories shared go here
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="1" />
                    </Row>
                </Container>
                <br />
            </div>
        }/>
    );
};