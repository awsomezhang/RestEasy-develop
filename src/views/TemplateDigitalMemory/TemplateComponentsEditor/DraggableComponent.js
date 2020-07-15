import React from 'react';
import "../TemplateDigitalMemory.css"
import "../../../styles/styles.css"
import { DragItemTypes } from "./dragitems.js"
import { useDrag , useDrop } from "react-dnd"

export default function DraggableComponent(props){
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
        drop: (item, monitor) => props.swapTemplateItems(item.rownum, item.colnum, props.rownum, props.colnum),
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
