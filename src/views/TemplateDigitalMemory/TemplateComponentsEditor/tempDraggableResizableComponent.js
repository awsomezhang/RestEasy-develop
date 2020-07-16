import React from 'react';
import "../TemplateDigitalMemory.css"
import "../../../styles/styles.css"
import { DragItemTypes } from "./dragitems.js"
import { useDrag , useDrop } from "react-dnd"
import { Rnd } from "react-rnd"

function DraggableComponent(props){
    const[{isDragging}, drag] = useDrag({
        item: {
            type: DragItemTypes.IMAGE,
            rownum: props.rownum,
            colnum: props.colnum,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    })

    const[{isOver}, drop] = useDrop({
        accept: DragItemTypes.IMAGE,
        drop: (item, monitor) => {
            props.swapTemplateItems(item.rownum, item.colnum, props.rownum, props.colnum)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
        }),
    })

    return(
        <div
            style={{height: (props.height ? props.height : "100%")}}
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

class tempDraggableResizableComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            height: props.height,
            rownum: props.rownum,
            colnum: props.colnum,
            isHovering: false
        }
        this.swapTemplateItems = props.swapTemplateItems.bind(this)
    }

    render(){
        return(
            <div
                onMouseEnter={() => {this.setState({isHovering : true})}}
                onMouseOut={() => {this.setState({isHovering : false})}}
            >
                <div
                    style={{
                        display: "block",
                        height: "40px",
                        width: "calc(100% - 80px)",
                        backgroundColor: "red",
                        marginBottom: "-39px",
                        position: "relative",
                        zIndex: "3",
                        marginLeft: "auto",
                        marginRight: "auto",
                        opacity: (this.state.isHovering ? "1" : "0"),
                    }} 
                >
                    UP
                </div>
                    <DraggableComponent
                        height={this.state.height}
                        rownum={this.state.rownum}
                        colnum={this.state.colnum}
                        swapTemplateItems={this.swapTemplateItems}
                        style={{positiong: "relative", zIndex: "-1"}}
                    >
                        {this.props.children}
                    </DraggableComponent>
                <div
                    style={{
                        display: "block",
                        height: "40px",
                        width: "calc(100% - 80px)",
                        backgroundColor: "red",
                        marginTop: "-40px",
                        position: "relative",
                        zIndex: "3",
                        marginLeft: "auto",
                        marginRight: "auto",
                        opacity: (this.state.isHovering ? "1" : "0"),
                    }} 
                >
                    DOWN
                </div>
            </div>
        )
    }
}
