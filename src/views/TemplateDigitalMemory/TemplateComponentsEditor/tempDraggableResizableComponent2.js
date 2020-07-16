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
            style={{height: "100%"}}
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

export default class DraggableResizableComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            height: props.height,
            rownum: props.rownum,
            colnum: props.colnum,
            isHovering: false,
        }
        this.swapTemplateItems = props.swapTemplateItems.bind(this)
    }

    render(){
        return(
                <DraggableComponent
                    height={this.state.height}
                    rownum={this.state.rownum}
                    colnum={this.state.colnum}
                    swapTemplateItems={this.swapTemplateItems}
                    style={{positiong: "relative", zIndex: "-1"}}
                >
                    {this.props.children}
                </DraggableComponent>
        )
    }
}

/*
            <Rnd
                style={{borderStyle: "solid", borderColor: "red"}}
                disableDragging={true}
                size={{height: this.state.height}}
                onMouseEnter={() => {this.setState({isHovering : true})}}
                onMouseOut={() => {this.setState({isHovering : false})}}
            >
            </Rnd>
*/
