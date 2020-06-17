import React from 'react';
import {Col, Row, Button} from "antd";
import './Carousel.css';

class Carousel extends React.Component {
    switchView(){
        // dont worry. the url is auth protected
        window.location.href = '/my/create';
    }

    render() {
        return (
            <div style={{position: "relative", borderRadius: "0% 0% 45% 45%/0% 0% 20% 20%", overflow: "hidden"}}>
                <img alt="banner" src={"img/background.jpg"} style={{maxWidth: "100%"}} />
                <div style={{position: "absolute", left: "35%", top: "40%"}}>
                    <Col>
                        <Row style={{justifyContent: "center"}}>
                            <b style={{fontSize: "2em", color: "#fff"}}>Create your digital memorial</b>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <Button size={"large"} onClick={this.switchView}>Build Now</Button>
                        </Row>
                        <Row style={{justifyContent: "center"}}>
                            <em style={{fontSize: "1.5em", color: "#fff"}}>Just $20. One time. Forever.</em>
                        </Row>
                    </Col>
                </div>
            </div>
        )
    }
}

export default Carousel;
