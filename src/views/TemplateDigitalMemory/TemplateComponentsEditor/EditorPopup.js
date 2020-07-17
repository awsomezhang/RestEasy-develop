import React from 'react';
import Popup from "reactjs-popup"

function InsertPopup(props){
    return(
        <div>
            <button
                onClick={() => {props.changeLastImg("/static/media/image3.bc0d3b4d.jpg")}}
            >
                Add image
            </button>
            <button
                onClick={() => {props.changeLastImg("nonimage")}}
            >
                Add Memory
            </button>
            <button
                onClick={() => {props.changeLastImg("/static/media/image8.b4f3dc7f.png")}}
            >
                Add Spotify playlist
            </button>
            <button
                onClick={() => {props.breakInsert()}}
            >
                Break this section up.
            </button>
        </div>
    )
}

function ImagePopup(props){
    return(
        <div>
            <button
                onClick={() => {props.clearLastClicked()}}
            >
                Delete this.
            </button>
            <button
                onClick={() => {props.changeLastImg("/static/media/image3.bc0d3b4d.jpg")}}
            >
                Show a different image
            </button>
            <button
                onClick={() => {props.changeLastImg("nonimage")}}
            >
                Change to Memory
            </button>
            <button
                onClick={() => {props.changeLastImg("/static/media/image8.b4f3dc7f.png")}}
            >
                Change to Spotify playlist
            </button>
        </div>
    )
}

function NonimagePopup(props){
    return(
        <div>
            <button
                onClick={() => {props.clearLastClicked()}}
            >
                Delete this.
            </button>
            <button
                onClick={() => {props.changeLastImg("/static/media/image3.bc0d3b4d.jpg")}}
            >
                Change to image
            </button>
            <button
                onClick={() => {props.changeLastImg("nonimage")}}
            >
                Show a different Memory
            </button>
            <button
                onClick={() => {props.changeLastImg("/static/media/image8.b4f3dc7f.png")}}
            >
                Change to Spotify playlist
            </button>
        </div>
    )
}

function CustomPopup(props){
    const img = props.img
    if(img == ""){
        return(
            <InsertPopup
                changeLastImg={props.changeLastImg}
                breakInsert={props.breakInsert}
            />
        )
    }
    if(img == "nonimage"){
        return(
            <NonimagePopup
                clearLastClicked={props.clearLastClicked}
                changeLastImg={props.changeLastImg}
            />
        )
    }
    else{
        return(
            <ImagePopup
                clearLastClicked={props.clearLastClicked}
                changeLastImg={props.changeLastImg}
            />
        )
    }
}

export default function EditorPopup (props){
    return(
        <Popup
            open={(props.popupIsOpen)}
            onClose={() => {props.togglePopupIsOpen()}}
            style={{zIndex: "999999"}}
        >
            <CustomPopup
                img={props.lastClickedImg}
                clearLastClicked={props.clearLastClicked}
                changeLastImg={props.changeLastImg}
                breakInsert={props.breakInsert}
            />
        </Popup>
    )
}
