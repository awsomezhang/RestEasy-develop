import React from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import PageWrapper from "../../PageWrapper"
import "../../styles/styles.css"
import "./Registry.css"

export default function LoginForm() {
    return (
        <PageWrapper content={
            <div>
                <Container fluid={true} className="header-banner">
                    <Row className="justify-content-center">
                        <Col className="d-flex justify-content-center" style={{ "paddingLeft": 0, "paddingRight": 0 }}>
                            <div className="sub-header-top">
                                Registry
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container fluid={true}>
                    <Row className="justify-content-md-center">
                        <Col md="2" />
                        <Col md="8" style={{textAlign: "justify"}}>
                            Commemoration is expensive.
                            We are often conflicted between wanting the best for our loved ones and the high cost of the best.
                            The RestEasy Registry feature is designed to eliminate that conflict.

                            <br />
                            <br />

                            Here’s how it works:

                            <br />
                            <br />

                            <span className="emphasis-text color1-text"> Discover </span>
                            a world of options by browsing the Registry for what would help commemorate them. Sort by our major categories:
                            <Row className="justify-content-md-center">
                                <Col md="1" style={{textAlign: "right"}}> - </Col>
                                <Col md="11">
                                    Sympathy: What might help get you through this difficult time? Find comfort in our range of sympathy gifts.
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="1" style={{textAlign: "right"}}> - </Col>
                                <Col md="11">
                                    Non-Profit: Was your loved one mission-driven? Find a charity that would honor them. 
                                </Col>
                            </Row>
                            <Row className="justify-content-md-center">
                                <Col md="1" style={{textAlign: "right"}}> - </Col>
                                <Col md="11">
                                    Commemorative: Did you know you can send ashes to the moon? Turn them into jewelry? Discover a range of creative ways to commemorate.
                                </Col>
                            </Row>

                            <br />
                            <br />

                            <span className="emphasis-text color1-text"> Select </span>
                            as many options as you think would help you. Keep in mind, the more options you select,
                            the more disparate your donations might be. The fewer you select, the more focused they will be,
                            and the greater your chance of fully funding an item.

                            <br />
                            <br />

                            <span className="emphasis-text color1-text"> Share </span>
                            the link to your Memory. When contributors add memories, they’ll also have the option of donating to one or more of your registry items.

                            <br />
                            <br />

                            <span className="emphasis-text color1-text"> Sympathy items </span>
                            items will be sent to you.
                            <br />
                            <span className="emphasis-text color1-text"> Non-Profit donations </span>
                            will automatically be transferred to the recipient.
                            <br />
                            <span className="emphasis-text color1-text"> For commemorative items </span>
                            , you must manually choose to submit the order once they are partially or fully funded.
                            You will pay any balance that is not fully funded. Once ordered, our partner vendor will follow up with details on fulfillment.
                            <br />
                            <br />

                            Other questions? Refer to our FAQ section. If you don’t find the answer you’re looking for there,
                            feel free to email us at <a className="color1-text underline-text" href="mailto:resteasytechnologies@gmail.com"> resteasytechnologies@gmail.com </a>

                            <br />
                            <br />
                        </Col>
                        <Col md="2" />
                    </Row>
                </Container>
            </div>
        }/>
    );
};
