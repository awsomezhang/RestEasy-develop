import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import PageWrapper from "../../PageWrapper"
import "./TemplateDigitalMemory.css"
import "../../styles/styles.css"
import templateLayout from './layout.js'

function LayoutRow(props){
    const LayoutCols = props.rowinfo.map((item) => {
        if(item.img == ''){
            return(
                <Col md={"" + (2 * item.width)} className="padded" key={item.col} />
            )
        }
        if(item.img == 'placeholder'){
            return(
                <Col md={"" + (2 * item.width)} className="padded" key={item.col}>
                    <div className = "center" style={{zIndex: "-100", height: "100%", textAlign: "center", backgroundColor: "lightgrey"}}>
                        memories (text) shared go here
                    </div>
                </Col>
            )
        }
        const h = (200 + (220 * (item.height - 1)))
        return(
            <Col md={2 * item.width} className="padded" key={item.col}>
                <img
                    src={item.img}
                    style={{height: h, width: "100%", objectFit: "cover"}}
                />
            </Col>
        )
    })

    return(
        <Row className="justify-content-md-center">
            <Col md="1" />
            <Col md="10">
                <Row className="justify-content-md-center">
                    {LayoutCols}
                </Row>
            </Col>
            <Col md="1" />
        </Row>
    )
}

function ProcessedLayout(props){
    const LayoutRows = props.templateLayout.map((rowinfo) => {
        return <LayoutRow rowinfo={rowinfo.items} key={rowinfo.row} />
    })

    return(
        <Container fluid={true}>
            {LayoutRows}
        </Container>
    )
}

export default function LoginForm() {
    return (
        <PageWrapper content={
            <div>
                <div style={{height: "100px", backgroundColor:"grey"}} />
                <br />
                <h1 className="centered-text emphasis-text"> In loving memory of [name] </h1>
                <h3 className="centered-text"> date - date </h3>
                <br />
                <ProcessedLayout templateLayout={templateLayout} />
                <br />
            </div>
        }/>
    );
};
