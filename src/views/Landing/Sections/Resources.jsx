import React from 'react';
//import {Card, Col, Row} from "antd";
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import "../../../styles/stylesWithButtons.css"
import "./Resources.css"

function ResourcesHeader(){
    const headerStyle = {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "45px",
        lineHeight: "67px",
        textAlign: "center",
        color:" #5E624E",
        marginBottom: "30px"
    }
    return (
        <div className="centered-text" style = {headerStyle}>
            Find Advice and Resources
        </div>
    )
}

function ResourcesText() {
    return (
        <div className="centered-text">
            <Container fluid={true}>
                <Row className="justify-content-md-center">
                    <Col md="8" className="resources-text">
                        We’ve done the research so you don’t have to.
                        Check out our vetted list of resources that can help guide you through this life altering time.
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

function ResourcesAction(){
    return (
        <div className="centered-text">
            <Container fluid={true}>
                <Row className="justify-content-md-center" >
                    <Col md="8">
                        <Row className="justify-content-md-center ">
                            <Col className="btn-col center" md="4">
                                <Button className="button-links center">
                                    I lost someone I love and I don’t know what to do next
                                </Button>
                            </Col>
                            <Col md="1"/>
                            <Col className="btn-col center" md="4">
                                <Button className="button-links center">
                                    Someone I know and care about has lost someone they love and I don’t know how to help
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                    <h5 className="centered-text" style={{marginTop: "50px"}}> Anything left unanswered? Check out our <a href="/">Frequently Asked Questions.</a> </h5>
                </Row>
            </Container>
        </div>
    )
}

class Resources extends React.Component {
    render() {
        return (
            <div >
                <div style={{backgroundColor: "#F2F2F2"}}>
                    <br />
                    <ResourcesHeader />
                    <br />
                    <ResourcesText />
                    <br />
                    <br />
                    <ResourcesAction/>
                    <br />
                    
                </div>
            </div>
        )
    }
}

export default Resources;
