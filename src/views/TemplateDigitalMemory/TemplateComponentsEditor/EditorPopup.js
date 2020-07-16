import React from 'react';
import Popup from "reactjs-popup"

function InsertPopup(props){
    return(
        <div>
            <button> Add image </button>
            <button> Add Memory </button>
            <button> Add Spotify playlist </button>
        </div>
    )
}

function ImagePopup(props){
    return(
        <div>
            <button onClick={() => {props.clearLastClicked()}}>
                Delete this.
            </button>
            <button> Show a different image </button>
            <button> Change to Memory </button>
            <button> Change to Spotify playlist </button>
        </div>
    )
}

function NonimagePopup(props){
    return(
        <div>
            <button onClick={() => {props.clearLastClicked()}}>
                Delete this.
            </button>
            <button> Change to image </button>
            <button> Show a different Memory </button>
            <button> Change to Spotify playlist </button>
        </div>
    )
}

function CustomPopup(props){
    const img = props.img
    if(img == ""){
        return(<InsertPopup />)
    }
    if(img == "nonimage"){
        return(<NonimagePopup clearLastClicked={props.clearLastClicked} />)
    }
    return(<ImagePopup clearLastClicked={props.clearLastClicked} />)
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
            />
        </Popup>
    )
}
