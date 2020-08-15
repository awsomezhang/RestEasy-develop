import React from 'react';
import Popup from "reactjs-popup"
import axios from "axios";
import { REMOTE_HOST } from "../../../constants.js"

//This is what we format inside the imported Popup class.
class CustomPopup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: this.props.lastClickedTxt
        }
    }

    //when user uploads new image
    handleUpload = ev => {
        var file = this.uploadInput.files[0];

        var fileToAddDB = ""

        console.log("new file")
        console.log(file)
        // Split the filename to get the name and type
        let fileParts = file.name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        
        console.log("Preparing the upload");

        const jwt = localStorage.getItem("token");
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }

        axios.post(REMOTE_HOST + "/aws/signS3_upload",{
            bucket : "resteasy-user-uploads",
            fileName : fileName,
            fileType : fileType
        }, config)
        .then(response => {
            console.log("---------")
            console.log(response)
            var returnData = response.data
            var signedRequest = returnData.signedRequest;
            var url = returnData.url;
            this.setState({url: url})
            fileToAddDB = returnData.fileName
            console.log("Recieved a signed request " + signedRequest);
            console.log(fileToAddDB)
        
            // Put the fileType in the headers for the upload
            var options = {
                    headers: {
                        'Content-Type': fileType
                    }
            };
            axios.put(signedRequest,file,options)
            .then(result => {
                this.setState({success: true});
                
                // upon successful upload, add the file data into the userImages index in mongoDB
                console.log("add to database: " + fileToAddDB)
                axios.post(REMOTE_HOST + "/aws/addImgDB", {
                    memoryName: "testMemory",
                    imgID: fileToAddDB
                }, config)
                .then( result => {
                    console.log(result)
                    this.props.changeLastType("img", fileToAddDB)
                }).catch(error => {
                    console.log("error " + JSON.stringify(error))
                })
            })
            .catch(error => {
                console.log("ERROR " + JSON.stringify(error));
            })
        })
        .catch(error => {
            console.log(JSON.stringify(error));
        })
    }

    render() {
        return(
            <div>
                <button
                    onClick={() => {this.props.clearLastClicked()}}
                >
                    Delete this.
                </button>
                <br />
                <input ref={(ref) => { this.uploadInput = ref; }} type="file"/>
                <button onClick={this.handleUpload}>Use this image</button>
                <br />
                <input
                    onChange={(event) => {this.setState({text: event.target.value})}}
                    type="text"
                    value={this.state.text} 
                    style={{width: "50%"}}
                />
                <button
                    onClick={() => {this.props.changeLastType("text", this.state.text)}}
                >
                    Use this memory
                </button>
            </div>
        )}
}

export default function EditorPopup (props){
    return(
        <Popup
            open={(props.popupIsOpen)}
            onClose={() => {props.togglePopupIsOpen()}}
            style={{zIndex: "999999"}}
        >
            <CustomPopup
                clearLastClicked={props.clearLastClicked}
                changeLastType={props.changeLastType}
                lastClickedTxt={props.lastClickedTxt}
            />
        </Popup>
    )
}
