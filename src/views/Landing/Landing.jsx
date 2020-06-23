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
                    <Carousel />
            }/>
        );
    }
}

export default Landing;
