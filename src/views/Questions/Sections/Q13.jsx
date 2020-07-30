import React from "react";
import {Typography, Button} from "antd";
import uuid from 'react-uuid'


export default class Q13 extends React.Component {
    
    state = {
        name: localStorage.getItem('first_name'),
        // url: localStorage.getItem('first_name')+ (Math.floor(Math.random() * 10000)).toString(),
        url: localStorage.getItem('first_name')+ (uuid()).toString(),
    };

    saveData = () => {
        // console.log('Received values of form: ', values);
        // let b_day = (values.start_date === "undefined" ? "N/A" : values.start_date)
        localStorage.setItem("unique_url", this.state.url);
    };


    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "1.5em", marginBottom: "0.5em"}}>
                    Send the below URL to {this.state.name}’s friends and family so they can see the beautiful tribute you created. 

                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Typography.Title>
                    <a href="/templatedigitalmemory" onClick={this.saveData}>{"https://resteasy.live/registry/"+ this.state.url}</a>
                    </Typography.Title>
                </div>
                <div style={{textAlign: "center", fontSize: "1.5em", marginTop: "0.5em"}}>
                    Share this link with family and friends so that they
                    can add their own memories and contribute
                </div>
                <br />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <Button type="primary" style={{borderRadius: "10px"}} onClick={this.saveData}><a href="/digitalmemory">Finish!</a></Button>
                </div>
            </div>);
    }

    
}
