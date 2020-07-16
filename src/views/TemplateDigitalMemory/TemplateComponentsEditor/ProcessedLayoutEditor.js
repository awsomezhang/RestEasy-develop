import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import LayoutRowEditor from './LayoutRowEditor.js'
import EditorPopup from './EditorPopup.js'

export default class ProcessedLayoutEditor extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            templateLayout: props.templateLayout,
            popupIsOpen: false,
            lastClickedRow: -1,
            lastClickedCol: -1,
            lastClickedImg: "",
        }

        this.handleChangeTemplate = this.handleChangeTemplate.bind(this)
        this.swapTemplateItems = this.swapTemplateItems.bind(this)
        this.togglePopupIsOpen = this.togglePopupIsOpen.bind(this)
        this.clearLastClicked = this.clearLastClicked.bind(this)
        this.sendClickedInfo = this.sendClickedInfo.bind(this)
    }

    togglePopupIsOpen(){
        this.setState({popupIsOpen: !this.state.popupIsOpen})
    }

    sendClickedInfo(row, col, img){
        this.setState({
            lastClickedRow: row,
            lastClickedCol: col,
            lastClickedImg: img,
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({templateLayout : nextProps.templateLayout})
    }

    handleChangeTemplate = async(layout) => {
        const response = await axios.post(
            "http://localhost:5000/changetemplate",
            {layout}
        );
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

    clearLastClicked = () => {
        var tempTemplateLayout = this.state.templateLayout
        tempTemplateLayout[this.state.lastClickedRow]["items"][this.state.lastClickedCol]["img"] = "insert"
        this.setState({
            templateLayout: tempTemplateLayout,
            lastClickedImg: "insert",
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
                    togglePopupIsOpen={this.togglePopupIsOpen}
                    sendClickedInfo={this.sendClickedInfo}
                    zIndex={"" + (this.state.templateLayout.length - rowinfo.row)}
                />
            )
        })

        return(
            <div>
                <Container fluid={true}>
                    {LayoutRows}
                </Container>
                <EditorPopup
                    popupIsOpen={this.state.popupIsOpen}
                    togglePopupIsOpen={this.togglePopupIsOpen}
                    lastClickedImg={this.state.lastClickedImg}
                    clearLastClicked={this.clearLastClicked}
                />
            </div>
        )
    }
}
