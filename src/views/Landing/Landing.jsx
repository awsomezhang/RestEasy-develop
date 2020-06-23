import React from 'react';
import {Divider, Layout} from 'antd';

import "../../styles.css"

import FAQ from "./Sections/FAQ";
import Welcome from "./Sections/Welcome";
import HowItWorks from "./Sections/HowItWorks";
import Create from "./Sections/Create"
import Register from "./Sections/Register"
import Resources from "./Sections/Resources"

import PageWrapper from "../../PageWrapper"
function LandingDivider(){
    return( <Divider style={{
        minWidth: "1em",
        marginLeft: "10%",
        width: "80%",
        height: "5px",
    }}/> )
}

class Landing extends React.Component {
    render() {
        return (
            <PageWrapper content={
                //<Layout.Content style={{background: "white"}}>
                <div style={{background: "white"}}>
                    <Welcome />
                    <LandingDivider />
                    <HowItWorks />
                    <LandingDivider />
                    <Create />
                    <LandingDivider />
                    <Register />
                    <LandingDivider />
                    <Resources />
                    <LandingDivider />
                    <FAQ />
                </div>
                //</Layout.Content>
            }/>
        );
    }
}

export default Landing;
