import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import LayoutRowEditor from './LayoutRowEditor.js'
import Popup from "reactjs-popup"

function InsertPopup(props){
    return(
        <div>
            Insert
        </div>
    )
}

function ImagePopup(props){
    return(
        <div>
            <button onClick={() => {props.clearLastClicked()}}>
                Delete this.
            </button>
        </div>
    )
}

function PlaceholderPopup(props){
    return(
        <div>
            <button onClick={() => {props.clearLastClicked()}}>
                Delete this.
            </button>
        </div>
    )
}

function CustomPopup(props){
    const img = props.img
    if(img == "insert"){
        return(<InsertPopup />)
    }
    if(img == "placeholder"){
        return(<PlaceholderPopup clearLastClicked={props.clearLastClicked} />)
    }
    return(<ImagePopup clearLastClicked={props.clearLastClicked} />)
}

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
        console.log(tempimg)

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
                <Popup
                    open={(this.state.popupIsOpen)}
                    onClose={() => {this.togglePopupIsOpen()}}
                    style={{zIndex: "999999"}}
                >
                    <CustomPopup
                        img={this.state.lastClickedImg}
                        clearLastClicked={this.clearLastClicked}
                    />
                </Popup>
            </div>
        )
    }
}
