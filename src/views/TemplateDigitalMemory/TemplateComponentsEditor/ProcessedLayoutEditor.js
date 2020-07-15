import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import LayoutRowEditor from './LayoutRowEditor.js'

export default class ProcessedLayoutEditor extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            templateLayout: props.templateLayout,
        }

        this.handleChangeTemplate = this.handleChangeTemplate.bind(this)
        this.swapTemplateItems = this.swapTemplateItems.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({templateLayout : nextProps.templateLayout})
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

    swapTemplateItems = (rowi, coli, rowj, colj) => {
        const tempimg = this.state.templateLayout[rowi]["items"][coli]["img"]
        var tempTemplateLayout = this.state.templateLayout

        tempTemplateLayout[rowi]["items"][coli]["img"] = this.state.templateLayout[rowj]["items"][colj]["img"]
        tempTemplateLayout[rowj]["items"][colj]["img"] = tempimg

        this.setState({
            templateLayout: tempTemplateLayout
        })

        this.handleChangeTemplate(this.state.templateLayout)
    }

    render(){
        const LayoutRows = this.state.templateLayout.map((rowinfo) => {
            return(
                <LayoutRowEditor
                    rownum={rowinfo.row}
                    rowinfo={rowinfo.items}
                    key={rowinfo.row}
                    swapTemplateItems={this.swapTemplateItems}
                    zIndex={"" + (this.state.templateLayout.length - rowinfo.row)}
                />
            )
        })

        return(
            <Container fluid={true}>
                {LayoutRows}
            </Container>
        )
    }
}
