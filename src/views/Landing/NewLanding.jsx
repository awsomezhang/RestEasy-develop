import React from 'react';
import {Divider, notification, Layout} from 'antd';
import { withRouter, Redirect } from "react-router-dom";

import "../../styles/styles.css"
import "./NewLanding.css"

import Banner from "./Sections/Banner";
import HowItWorks from "./Sections/HowItWorks";
import Create from "./Sections/Create"
import Register from "./Sections/Register"
import Resources from "./Sections/Resources"
import CreateMemorySection from "./Sections/CreateMemorySection"
import CreateRegistrySection from "./Sections/CreateRegistrySection"
import PageWrapper from "../../PageWrapper"
import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";

  


function LandingDivider(){
    return( <Divider style={{
        minWidth: "1em",
        marginLeft: "10%",
        width: "80%",
        height: "5px",
    }}/> )
}

class NewLanding extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            howItWorksRef: React.createRef(),
            registerRef: React.createRef(),
            resourcesRef: React.createRef(),
            anchor: ""
        }
    }

    componentDidMount() {
        notification.info({
            message: 'Welcome',
            description:
              "RestEasy is currently in Beta. While not all features are available at this time, feel free to look around and learn more about who we are!",
            placement: "topRight",
            duration: 8,
            top: 80
        });
     }
    

    render() {
        return (
            <PageWrapper content={
                <div style={{backgroundColor: "white"}}>
                    <Banner 
                        howItWorksRef={() => this.state.howItWorksRef.current.scrollIntoView({behavior: "smooth"})}
                        registerScroll={() => this.state.registerRef.current.scrollIntoView({behavior: "smooth"})}
                        resourcesScroll={() => this.state.resourcesRef.current.scrollIntoView({behavior: "smooth"})}
                    />
                    <div id="howItWorksRef" className="section"> <HowItWorks /> </div>
                    <div className="section"> <CreateMemorySection /> </div>
                    <div className="section"> <CreateRegistrySection /></div>
                    <div> <Resources /> </div>
                    <div id="create-memory">
                        <a href="/my/create">
                            <button className="button-both">Build a Digital Memory!</button>
                        </a>
                        
                    </div>
                    
                </div>
            }/>
        );
    }
}

export default NewLanding;
