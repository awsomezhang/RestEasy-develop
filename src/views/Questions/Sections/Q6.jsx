import React from "react";
import {Button, Upload, notification} from "antd";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import {uploadMedia} from "../QuestionsAPI";


export default class Q6 extends React.Component {
    uploadFile = file => {
        uploadMedia(file)
            .done(function(response) {
                if (response.success) {
                    console.log('file uploaded');
                } else {
                    notification.error({
                        message: 'Media upload failed',
                        description: response.message,
                        placement: 'bottomRight',
                    });
                }
            })
            .fail((error) => {
                notification.error({
                    message: 'Media upload failed',
                    description: (error.responseJSON && error.responseJSON.message) ? error.responseJSON.message : "Something went wrong, Please try again later.",
                    placement: 'bottomRight',
                });
            });
    };

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    Share some of your favourite memories
                </div>
                <Upload.Dragger action={this.uploadFile} style={{margin:"auto", padding: "0.5em", width: "40em"}} multiple>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Upload photos and videos</p>
                </Upload.Dragger>
                <div style={{display: "flex", justifyContent: "center", marginTop: "1em"}}>
                    <Button type="primary" onClick={this.props.prev} style={{marginRight: "10px", borderRadius: "10px"}}>Previous</Button>
                    <Button type="primary" onClick={this.props.next}  style={{marginLeft: "10px", borderRadius: "10px"}}>Skip/Next</Button>
                </div>
            </div>);
    }
}
