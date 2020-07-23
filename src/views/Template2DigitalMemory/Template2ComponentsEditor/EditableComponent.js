import React from 'react';
import "../Template2DigitalMemory.css"
import "../../../styles/styles.css"
import { DragItemTypes } from "./dragitems.js"
import { useDrop, useDrag } from "react-dnd"

function Draggable(props){
    const[{isDragging}, drag] = useDrag({
        item: {
            type: DragItemTypes.IMAGE,
            rownum: props.rownum,
            index: props.index,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const[{isOver}, drop] = useDrop({
        accept: DragItemTypes.IMAGE,
        drop: (item, monitor) => props.swapTemplateItems(item.rownum, item.index, props.rownum, props.index),
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return(
        <div
            style={{height: (props.height ? props.height : "100%"), width: "100%", padding: "0px", borderStyle: "none"}}
            ref = {drag}
        >
            <div
                style={{height: "100%", filter: "blur(" + (isOver ? "5px" : "0px") + ") sepia(" + (isOver ? "100%" : "0%") + ")"}}
                ref = {drop}
            >
                {props.children}
            </div>
        </div>
    )
}

export default class EditableComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            height: props.height,
            rownum: props.rownum,
            index: props.index,
            img: props.img,
        }
        this.swapTemplateItems = props.swapTemplateItems.bind(this)
        this.togglePopupIsOpen = props.togglePopupIsOpen.bind(this)
        this.sendClickedInfo = props.sendClickedInfo.bind(this)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            height: nextProps.height,
            rownum: nextProps.rownum,
            index: nextProps.index,
            img: nextProps.img,
        })
    }

    render(){
        return(
            <div>
                <button
                    style={{height: (this.state.height ? this.state.height : "100%"), width: "100%", padding: "0px", borderStyle: "none"}}
                    onClick={() => {
                        this.togglePopupIsOpen()
                        this.sendClickedInfo(this.state.rownum, this.state.colnum, this.state.img)
                    }}
                >
                    <Draggable
                        height={this.state.height}
                        rownum={this.state.rownum}
                        index={this.state.index}
                        swapTemplateItems={this.swapTemplateItems}
                        style={{positiong: "relative", zIndex: "-1"}}
                    >
                        {this.props.children}
                    </Draggable>
                </button>
            </div>
        )
    }
}
