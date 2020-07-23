import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";
import LayoutRowEditor from './Layout2RowEditor.js'
import EditorPopup from './EditorPopup.js'
import { REMOTE_HOST } from "../../../constants.js"

export default class ProcessedLayoutEditor extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            templateLayout: props.templateLayout,
            popupIsOpen: false,
            lastClickedRow: -1,
            lastClickedInd: -1,
            lastClickedImg: "",
            lastClickedLarge: false,
            lastDraggedRow: -1,
            lastDraggedInd: -1,
            lastDroppedRow: -1,
            lastDroppedInd: -1,
        }

        this.handleChangeTemplate = this.handleChangeTemplate.bind(this)
        this.swapTemplateItems = this.swapTemplateItems.bind(this)
        this.togglePopupIsOpen = this.togglePopupIsOpen.bind(this)
        this.clearLastClicked = this.clearLastClicked.bind(this)
        this.sendClickedInfo = this.sendClickedInfo.bind(this)
        this.addRow = this.addRow.bind(this)
        this.resetTemplate = this.resetTemplate.bind(this)
        this.revertLastSavedTemplate = this.revertLastSavedTemplate.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
        this.breakAndDeleteLarge = this.breakAndDeleteLarge.bind(this)
        this.breakInsert = this.breakInsert.bind(this)
        this.changeLastImg = this.changeLastImg.bind(this)
    }

    togglePopupIsOpen(){
        this.setState({popupIsOpen: !this.state.popupIsOpen})
    }

    sendClickedInfo(row, col, img){
        var large = (this.state.templateLayout[row]["items"][col]["height"] > 1 || this.state.templateLayout[row]["items"][col]["width"] > 1)
        this.setState({
            lastClickedRow: row,
            lastClickedInd: col,
            lastClickedImg: img,
            lastClickedLarge: large,
            popupCanMergeSwap: false,
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({templateLayout : nextProps.templateLayout})
    }

    handleChangeTemplate = async() => {
        const layout = this.state.templateLayout
        axios.post(
            REMOTE_HOST + "/templates/savetemplate",
            {layout}
        );
    }

    swapTemplateItems = (rowi = this.state.lastDraggedRow, indi = this.state.lastDraggedInd, rowj = this.state.lastDroppedRow, indj = this.state.lastDroppedInd) => {
        console.log(this.state.templateLayout[rowi]["items"][indi])
        console.log(this.state.templateLayout[rowj]["items"][indj])
        const tempItem = this.state.templateLayout[rowi]["items"][indi]
        const tempSize = this.state.templateLayout[rowj]["items"][indj]["size"]
        var tempTemplateLayout = this.state.templateLayout

        tempTemplateLayout[rowi]["items"][indi] = this.state.templateLayout[rowj]["items"][indj]
        tempTemplateLayout[rowi]["items"][indi]["index"] = indi
        tempTemplateLayout[rowi]["items"][indi]["size"] = tempItem["size"]
        tempTemplateLayout[rowj]["items"][indj] = tempItem
        tempTemplateLayout[rowj]["items"][indj]["index"] = indj
        tempTemplateLayout[rowj]["items"][indj]["size"] = tempSize

        this.setState({
            templateLayout: tempTemplateLayout
        })
        console.log(this.state.templateLayout[rowi]["items"][indi])
        console.log(this.state.templateLayout[rowj]["items"][indj])
    }

    clearLastClicked = () => {
        this.changeLastImg("")
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
    }

    revertLastSavedTemplate = () => {
        axios.get(REMOTE_HOST + "/templates/gettemplate")
            .then((response) => {
                console.log(response)
                this.setState({
                    templateLayout: response["data"]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    resetTemplate = () => {
        axios.get(REMOTE_HOST + "/templates/getresettemplate")
            .then((response) => {
                console.log(response)
                this.setState({
                    templateLayout: response["data"]
                })
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
                var rowStart = rownum - tempTemplateLayout[rownum]["items"][i]["under"][0]
                var colStart = i - tempTemplateLayout[rownum]["items"][i]["under"][1]
                this.breakAndDeleteLarge(tempTemplateLayout, rowStart, colStart)
            }
            if(tempTemplateLayout[rownum]["items"][i]["height"] != 1 || tempTemplateLayout[rownum]["items"][i]["width"] != 1){
                this.breakAndDeleteLarge(tempTemplateLayout, rownum, i)
            }
        }

        tempTemplateLayout.splice(rownum, 1)
        for(i = 0; i < tempTemplateLayout.length; i++){
            tempTemplateLayout[i]["row"] = i
        }

        this.setState({
            templateLayout: tempTemplateLayout
        })
    }

    breakAndDeleteLarge = (tempTemplateLayout, rowStart, colStart) => {
        var rowEnd = rowStart + tempTemplateLayout[rowStart]["items"][colStart]["height"]
        var colEnd = colStart + tempTemplateLayout[rowStart]["items"][colStart]["width"]
        var j
        var k
        for(j = rowStart; j < rowEnd; j++){
            for(k = colStart; k < colEnd; k++){
                tempTemplateLayout[j]["items"][k]["img"] = ""
                tempTemplateLayout[j]["items"][k]["exists"] = true
                tempTemplateLayout[j]["items"][k]["height"] = 1
                tempTemplateLayout[j]["items"][k]["width"] = 1
                tempTemplateLayout[j]["items"][k]["under"] = null
            }
        }
    }

    breakInsert = () => {
        var tempTemplateLayout = this.state.templateLayout
        this.breakAndDeleteLarge(tempTemplateLayout, this.state.lastClickedRow, this.state.lastClickedInd)
        this.setState({
            templateLayout: tempTemplateLayout,
            lastClickedLarge: false,
        })
    }

    changeLastImg(img){
        var tempTemplateLayout = this.state.templateLayout
        tempTemplateLayout[this.state.lastClickedRow]["items"][this.state.lastClickedInd]["img"] = img
        this.setState({
            lastClickedImg: img,
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
                    deleteRow={this.deleteRow}
                    isMergeable={this.isMergeable}
                    promptMerge={this.promptMerge}
                />
            )
        })

        return(
            <div>
                <a href="/template2digitalmemory">
                    <button
                        style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    >
                        View page
                    </button>
                </a>
                <br />
                <br />
                <button
                    style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    onClick={() => {this.handleChangeTemplate()}}
                >
                    Save current template
                </button>
                <br />
                <button
                    style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    onClick={() => {this.revertLastSavedTemplate()}}
                >
                    Revert last saved template
                </button>
                <br />
                <button
                    style={{width: "20%", marginLeft: "40%", marginRight: "40%"}}
                    onClick={() => {this.resetTemplate()}}
                >
                    RESET ORIGINAL TEMPLATE
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
                    popupCanMergeSwap={this.state.popupCanMergeSwap}
                    togglePopupIsOpen={this.togglePopupIsOpen}
                    lastClickedImg={this.state.lastClickedImg}
                    lastClickedLarge={this.state.lastClickedLarge}
                    clearLastClicked={this.clearLastClicked}
                    changeLastImg={this.changeLastImg}
                    breakInsert={this.breakInsert}
                    swapTemplateItems={this.swapTemplateItems}
                />
            </div>
        )
    }
}
