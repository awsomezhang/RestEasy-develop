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
        this.addRow = this.addRow.bind(this)
        this.resetTemplate = this.resetTemplate.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
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

    handleChangeTemplate = async() => {
        const layout = this.state.templateLayout
        await axios.post(
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

        this.handleChangeTemplate()
    }

    clearLastClicked = () => {
        var tempTemplateLayout = this.state.templateLayout
        tempTemplateLayout[this.state.lastClickedRow]["items"][this.state.lastClickedCol]["img"] = ""
        this.setState({
            templateLayout: tempTemplateLayout,
            lastClickedImg: "",
        })
        this.handleChangeTemplate()
    }

    addRow = () => {
        var tempTemplateLayout = this.state.templateLayout
        tempTemplateLayout.push({
            row: tempTemplateLayout.length,
            items: [
                {col: 0, width: 1, height: 1, img: "", exists: true},
                {col: 1, width: 1, height: 1, img: "", exists: true},
                {col: 2, width: 1, height: 1, img: "", exists: true},
                {col: 3, width: 1, height: 1, img: "", exists: true},
                {col: 4, width: 1, height: 1, img: "", exists: true},
                {col: 5, width: 1, height: 1, img: "", exists: true},
            ]
        })
        this.setState({
            templateLayout: tempTemplateLayout
        })
        this.handleChangeTemplate()
    }

    resetTemplate = () => {
        axios.get("http://localhost:5000/getresettemplate")
            .then((response) => {
                this.setState({
                    templateLayout: response["data"]
                })
                this.handleChangeTemplate()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    deleteRow = (rownum) => {
        var tempTemplateLayout = this.state.templateLayout
        var i
        for(i = 0; i < 6; i++){
            if(tempTemplateLayout[rownum]["items"][i]["under"] != null){
                var topRowStart = rownum - tempTemplateLayout[rownum]["items"][i]["under"][1]
                var topColStart = i - tempTemplateLayout[rownum]["items"][i]["under"][0]
                var topRowEnd = topRowStart + tempTemplateLayout[topRowStart]["items"][topColStart]["height"]
                var topColEnd = topColStart + tempTemplateLayout[topRowStart]["items"][topColStart]["width"]
                var j
                var k
                for(j = topRowStart; j < topRowEnd; j++){
                    for(k = topColStart; k < topColEnd; k++){
                        tempTemplateLayout[j]["items"][k]["img"] = ""
                        tempTemplateLayout[j]["items"][k]["exists"] = true
                        tempTemplateLayout[j]["items"][k]["height"] = 1
                        tempTemplateLayout[j]["items"][k]["width"] = 1
                        tempTemplateLayout[j]["items"][k]["under"] = null
                    }
                }
            }
            if(tempTemplateLayout[rownum]["items"][i]["height"] != 1 || tempTemplateLayout[rownum]["items"][i]["width"] != 1){
                var topRowStart = rownum
                var topColStart = i
                var topRowEnd = topRowStart + tempTemplateLayout[topRowStart]["items"][topColStart]["height"]
                var topColEnd = topColStart + tempTemplateLayout[topRowStart]["items"][topColStart]["width"]
                var j
                var k
                for(j = topRowStart; j < topRowEnd; j++){
                    for(k = topColStart; k < topColEnd; k++){
                        tempTemplateLayout[j]["items"][k]["img"] = ""
                        tempTemplateLayout[j]["items"][k]["exists"] = true
                        tempTemplateLayout[j]["items"][k]["height"] = 1
                        tempTemplateLayout[j]["items"][k]["width"] = 1
                        tempTemplateLayout[j]["items"][k]["under"] = null
                    }
                }
            }
        }

        tempTemplateLayout.splice(rownum, 1)
        for(i = 0; i < tempTemplateLayout.length; i++){
            tempTemplateLayout[i]["row"] = i
        }

        this.setState({
            templateLayout: tempTemplateLayout
        })
        this.handleChangeTemplate()
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
                    deleteRow={this.deleteRow}
                />
            )
        })

        return(
            <div>
                <button
                    style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    onClick={() => {this.resetTemplate()}}
                >
                    RESET
                </button>
                <br />
                <Container fluid={true}>
                    {LayoutRows}
                </Container>
                <br />
                <button
                    style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    onClick={() => {this.addRow()}}
                >
                    Add row
                </button>
                <br />
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
