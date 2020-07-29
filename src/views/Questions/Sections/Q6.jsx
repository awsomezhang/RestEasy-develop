import React from "react";
import {Button, Upload, notification} from "antd";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import {uploadMedia} from "../QuestionsAPI";
import axios from "axios";
import PictureWall from "../PictureWall"
import { json } from "body-parser";
import { REMOTE_HOST } from "../../../constants.js"

function renameFile(file) {
    var date = Date.now()
    console.log("date: " + date)

    var newName = date + "_" + file.name
    return new File([file], newName, {
        type: file.type,
        lastModified: file.lastModified,
    });
}

export default class Q6 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          success : false,
          url : "",
          fileName: "",
          fileArr: [],
          fileTest: [],
          uploadMessage: ""
            
        }
    }
    
    handleChange = (ev) => {
        this.setState({ fileArr: [...this.state.fileArr, URL.createObjectURL(event.target.files[0])], fileTest: [...this.state.fileTest, event.target.files[0]], uploadMessage: "" })
        console.log(this.state.fileArr);
        // this.setState({success: false, url : "", file: URL.createObjectURL(event.target.files[0])});
        
    }
    
    handleUpload = ev => {
        // const files = this.uploadInput.files;
        const files = this.state.fileTest;
        console.log(files);


        Array.prototype.forEach.call(files, file => {
            // console.log("goddamnit angela pay attention")
            // console.log(file)
            var file = renameFile(file)

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
                    axios.post("http://localhost:5000/aws/addImgDB", {
                        memoryName: "testMemory",
                        imgID: fileToAddDB
                    }, config)
                    .then( result => {
                        console.log(result)
                        
                    }).catch(error => {
                        console.log("error " + JSON.stringify(error))
                    })
                })
                .catch(error => {
                    console.log("ERROR " + JSON.stringify(error));
                })

                // this.setState({ fileArr: [], fileTest: [], uploadMessage: "Image(s) uploaded! You can add more or go to the next step." })
                // document.getElementById("choose-file").value = null;

            })
            .catch(error => {
                console.log(JSON.stringify(error));

            
            })

        });

        this.setState({ fileArr: [], fileTest: [], uploadMessage: "Image(s) uploaded! You can add more or go to the next step." })
        document.getElementById("choose-file").value = null;

    };

    render() {

        let imgArr = this.state.fileArr
        const images = imgArr.map(image => {
            return <img key={image} src={image} style={{height: "60px", width: "60px", objectFit: "cover", margin: "10px"}} />
         });

        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    Share some of your favourite memories
                </div>
                {/* <Upload.Dragger action={this.uploadFile} style={{margin:"auto", padding: "0.5em", width: "40em"}} multiple>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload photos and videos</p>
                </Upload.Dragger> */}

                {/* <PictureWall /> */}

                <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file" multiple={false} id="choose-file"/>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <br/>
                    { this.state.uploadMessage }
                    { images }
                </div>
                {/* <img src={this.state.file} style={{height: "100px", objectFit: "cover", border: "none"}}/> */}
                <br />
                <br />
                <button onClick={this.handleUpload}>UPLOAD PHOTO(S)</button>
                <br/>
                <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                    <Button type="primary" onClick={this.props.prev} style={{marginRight: "10px", borderRadius: "10px"}}>Previous</Button>
                    <Button type="primary" onClick={this.props.next} style={{marginLeft: "10px", borderRadius: "10px"}}>Skip/Next</Button>
                </div>
            </div>);
    }
}
