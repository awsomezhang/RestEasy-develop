import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import LayoutRow from './LayoutRow.js'

export default class ProcessedLayout extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            templateLayout: props.templateLayout,
        }
        this.handleChangeTemplate = this.handleChangeTemplate.bind(this)
    }

    handleChangeTemplate = async(layout) => {
        const response = await axios.post(
            "http://localhost:5000/changetemplate",
            {layout}
        );
        const { status } = response.data
        if (status === "success") {
            toast("Success! Check email for details", { type: "success" })
        }
        else {
            toast("Something went wrong", { type: "error" })
        }
    }

    render(){
        const LayoutRows = this.state.templateLayout.map((rowinfo) => {
            return <LayoutRow rowinfo={rowinfo.items} key={rowinfo.row} />
        })
        
        this.handleChangeTemplate(this.state.templateLayout)

        return(
            <Container fluid={true}>
                {LayoutRows}
            </Container>
        )
    }
}
