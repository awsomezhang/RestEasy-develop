import React from 'react';
import {Divider, Layout} from 'antd';

import FAQ from "./Sections/FAQ";
import Header from "./Sections/Header";
import Samples from "./Sections/Samples";
import Carousel from "./Sections/Carousel";
import HowItWorks from "./Sections/HowItWorks";

class Landing extends React.Component {
    render() {
        return (
            <Layout>
                <Header search={true}/>
                <Layout.Content style={{background: "white"}}>
                    <Carousel />
                    <HowItWorks />
                    <Divider style={{minWidth: "1em", marginLeft: "10%", width: "80%", height: "1.5px"}}/>
                    <Samples />
                    <Divider style={{minWidth: "1em", marginLeft: "10%", width: "80%", height: "1.5px"}}/>
                    <FAQ />
                </Layout.Content>
                <Layout.Footer style={{textAlign: 'center'}}>RestEasy©2020</Layout.Footer>
            </Layout>
        );
    }
}

export default Landing;
