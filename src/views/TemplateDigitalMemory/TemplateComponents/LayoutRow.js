import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import "../TemplateDigitalMemory.css"
import "../../../styles/styles.css"

export default function LayoutRow(props){
    const LayoutCols = props.rowinfo.map((item) => {
        if(!item.exists){
            return(null)   
        }
        if(item.img == ''){
            return(
                <Col md={"" + (2 * item.width)} key={item.col} />
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
                    style={{height: h, width: "100%", objectFit: "cover", position: "relative", zIndex: "100"}}
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
