import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import "../TemplateDigitalMemory.css"
import "../../../styles/styles.css"
import DraggableComponent from "./DraggableComponent.js"

export default function LayoutRowEditor(props){
    const LayoutCols = props.rowinfo.map((item) => {
        if(!item.exists){
            return(null)   
        }
        if(item.img == ''){
            return(
                <Col md={"" + (2 * item.width)} key={item.col} style={{height: "0px"}}/>
            )
        }
        const h = (200 + (220 * (item.height - 1)))
        if(item.img == 'placeholder'){
            return(
                <Col md={"" + (2 * item.width)} className="padded" key={item.col}>
                    <DraggableComponent swapTemplateItems={props.swapTemplateItems} rownum={props.rownum} colnum={item.col}>
                        <div
                            className = "center"
                            style={{height: h, textAlign: "center", backgroundColor: "lightgrey"}}
                        >
                            memories (text) shared go here
                        </div>
                    </DraggableComponent>
                </Col>
            )
        }
        return(
            <Col md={2 * item.width} className="padded" key={item.col}>
                <DraggableComponent swapTemplateItems={props.swapTemplateItems} rownum={props.rownum} colnum={item.col} height={h} style={{zIndex: 99999}}>
                    <img
                        src={item.img}
                        style={{height: h, width: "100%", objectFit: "cover"}}
                    />
                </DraggableComponent>
            </Col>
        )
    })

    return(
        <Row className="justify-content-md-center" style={{zIndex: props.zIndex}}>
            <Col md="1" />
            <Col md="10" style={{zIndex: props.zIndex}}>
                <Row className="justify-content-md-center" style={{zIndex: props.zIndex}}>
                    {LayoutCols}
                </Row>
            </Col>
            <Col md="1" />
        </Row>
    )
}
