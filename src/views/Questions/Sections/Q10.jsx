import React from "react";
import {Button, List, Card, Modal, Row, Col, notification, Upload, Divider, Input} from "antd";
import './Q10.css';
import PlusCircleOutlined from "@ant-design/icons/lib/icons/PlusCircleOutlined";
import {colors} from "../../../Colors";

const data = [
    {
        title: 'create',
    },
    {
        title: 'Cemetery Arrangements',
        img_url: '/img/cemetery.png',
        price: '$300'
    },
    {
        title: 'Casket',
        img_url: '/img/casket.jpg',
        price: '$100'
    },
    {
        title: 'Urn',
        img_url: '/img/urn.jpg',
        price: '$50'
    },
    {
        title: 'Funeral Arrangements',
        img_url: '/img/funeral.jpg',
        price: '$200'
    }
];

export default class Q10 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            price: '',
            visible: false
        };
    }

    // returns a modal
    handleClick = (item) => {
        this.setState({
            title: item.title,
            price: item.price,
            img_url: item.img_url,
            visible: !this.state.visible
        })
    };

    getCard = (item) => {
        if (item.title === 'create')
            return (
                <Card
                    onClick={this.handleClick.bind(this,item)}
                    style={{margin: "0.5em", width:"30%", textAlign: "center", background:"#f8f8f8"}}
                    hoverable
                    cover={<PlusCircleOutlined style={{paddingTop:"10vh", paddingBottom:"5vh", fontSize: "10em", color: "#4cc247"}} />}>
                    <Card.Meta
                        title="Create your own cash fund"
                        description={<a href="/tmp">How cash fund works?</a>} />
                </Card>);
        else
            return (
                <Card
                    onClick={this.handleClick.bind(this,item)}
                    style={{margin: "0.5em", width:"30%"}}
                    hoverable
                    cover={<img alt="img" style={{height: "100%"}} src={item.img_url} />}>
                    <Card.Meta
                        title={item.title}
                        description={item.price} />
                </Card>);
    };

    toggleVisibility = () => {
        this.setState({
            visible: !this.state.visible
        })
    };

    addToRegistry = () => {
        notification.success({
            message: 'Cash fund added',
            description: this.state.title + ' added successfully',
            placement: 'bottomRight',
        });
        this.toggleVisibility();
    };

    render() {
        return (
            <div style={{width: "100%"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em", textAlign: "center"}}>
                    What would help you get through this challenging time?
                </div>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <List
                        grid={{gutter: 0}}
                        dataSource={data}
                        renderItem={item => this.getCard(item)}
                    />
                </div>
                <Modal
                    width="60%"
                    centered
                    okText="Add to registry"
                    title={this.state.title}
                    visible={this.state.visible}
                    onOk={this.addToRegistry.bind(this)}
                    onCancel={this.toggleVisibility.bind(this)}
                >
                    <Row>
                        <Col
                            style={{overflow: "hidden"}}
                            span={8}>
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            >
                                <img src={this.state.img_url} alt="avatar" style={{ height: '25vh' }} />
                            </Upload>
                        </Col>
                        <Col span={16} style={{paddingLeft: "1em"}}>
                            <h3>Add Cash Fund</h3>
                            <Divider style={{height: "1.5px", color:"#777"}}/>
                            <h4>Item Name</h4>
                            <Input defaultValue={this.state.title} />
                        </Col>
                    </Row>
                </Modal>

                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <Button type="primary" onClick={this.props.prev}>Previous</Button>
                    <Button type="primary" onClick={this.props.next}>Next</Button>
                </div>
            </div>);
    }
}

