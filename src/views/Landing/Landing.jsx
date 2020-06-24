import React from 'react';
import {Divider, Layout} from 'antd';

import "../../styles.css"

import FAQ from "./Sections/FAQ";
import Samples from "./Sections/Samples";
import Banner from "./Sections/Banner";
import HowItWorks from "./Sections/HowItWorks";
import PageWrapper from "../../PageWrapper"
import {
    Button,
    Form,
    Container,
    Row,
    Col,
  } from "react-bootstrap";


class Landing extends React.Component {
    render() {
        return (
            <PageWrapper content={
                    <div>
                        <Container fluid={true}>
                            <Banner />
                            <div className="section">
                                <HowItWorks />
                            </div>
                            
                        </Container>
                        
                    </div>
                    
            }/>
        );
    }
}

export default Landing;
