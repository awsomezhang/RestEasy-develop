import React from 'react';
import {Divider, Layout} from 'antd';

import "../../styles.css"

import FAQ from "./Sections/FAQ";
import Samples from "./Sections/Samples";
import Carousel from "./Sections/Carousel";
import HowItWorks from "./Sections/HowItWorks";
import PageWrapper from "../../PageWrapper"

class Landing extends React.Component {
    render() {
        return (
            <PageWrapper content={
                <Layout.Content style={{background: "white"}}>
                    <Carousel />
                    <HowItWorks />
                    <Divider style={{minWidth: "1em", marginLeft: "10%", width: "80%", height: "1.5px"}}/>
                    <Samples />
                    <Divider style={{minWidth: "1em", marginLeft: "10%", width: "80%", height: "1.5px"}}/>
                    <FAQ />
                </Layout.Content>
            }/>
        );
    }
}

export default Landing;
