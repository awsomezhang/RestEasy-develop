import React from 'react';
import {Divider, Layout} from 'antd';
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
            createRef: React.createRef(),
            registerRef: React.createRef(),
            resourcesRef: React.createRef(),
            redirect: false,
            route: '#'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit = (route) => {
        this.setState(() => ({
            redirect: true,
            route: route
        }))
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={this.state.route} />
        }
        return (
            <PageWrapper content={
                <div style={{backgroundColor: "white"}}>
                    <Banner 
                        createScroll={() => this.state.createRef.current.scrollIntoView({behavior: "smooth"})}
                        registerScroll={() => this.state.registerRef.current.scrollIntoView({behavior: "smooth"})}
                        resourcesScroll={() => this.state.resourcesRef.current.scrollIntoView({behavior: "smooth"})}
                    />
                    <div className="section"> <HowItWorks /> </div>
                    <div className="section"> <CreateMemorySection /> </div>
                    <div className="section"> <CreateRegistrySection /></div>
                    <div ref={this.state.resourcesRef}> <Resources /> </div>
                    {/* <FAQ /> */}
                    
                    <div id="create-registry">
                        <button onClick={e => {this.handleSubmit("/registry")}} className="button-both">Create a Registry!</button>
                    </div>

                    <div id="create-memory">
                        <button onClick={e => {this.handleSubmit("/my/create")}} className="button-both">Build a Digital Memory!</button>
                    </div>
                    
                </div>
            }/>
        );
    }
}

export default NewLanding;
