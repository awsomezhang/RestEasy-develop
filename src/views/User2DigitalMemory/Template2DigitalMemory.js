import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import PageWrapper from "../../PageWrapper"
import "../../styles/styles.css"
import axios from "axios";
import { REMOTE_HOST } from "./../../constants.js"
//import template2Layout from './layout2.js'
import ProcessedLayout2 from './Template2Components/ProcessedLayout2.js'

export default class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            template2Layout: []
        }
    }

    componentDidMount(){
        const tokenId = JSON.parse(localStorage.getItem("user")).id
        const body = {
            id: tokenId,
            memoryName : "layout2.js",
            userUploadBucket : "resteasy-user-uploads",
        }
        axios.post(REMOTE_HOST + "/aws/signS3_get", {body})
            .then(response => {
                fetch(response.data)
                    .then(response2 => response2.text())
                    .then(data => {
                        console.log(JSON.parse(data.substring(14)))
                        this.setState({template2Layout: JSON.parse(data.substring(14))})
                    })
            })
            .catch(error => {
                console.log("error")
            })
    }

    render(){
        return(
            <PageWrapper content={
                <div>
                    <div style={{height: "100px", backgroundColor:"grey"}} />
                    <br />
                    <h1 className="centered-text emphasis-text"> In loving memory of [name] </h1>
                    <h3 className="centered-text"> date - date </h3>
                    <br />
                    <ProcessedLayout2 templateLayout={this.state.template2Layout} />
                    <br />
                </div>
            }/>
        )
    }

};
