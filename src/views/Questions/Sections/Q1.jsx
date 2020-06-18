import React from "react";
import {Button, Form, Input} from "antd";

export default class Q1 extends React.Component {
    saveData = values => {
        // console.log('Received values of form: ', values);
        localStorage.setItem("first_name", values.first_name);
        localStorage.setItem("middle_name", values.middle_name);
        localStorage.setItem("last_name", values.last_name);
        this.props.next();
    };

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    What is your loved one's name?
                </div>
                <Form
                    onFinish={this.saveData}
                    scrollToFirstError>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Form.Item name="first_name"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Please input first name',
                                       },
                                   ]}>
                            <Input placeholder="First name" style={{width: "10em"}}/>
                        </Form.Item>
                        <Form.Item style={{margin:"0em 2em"}} name="middle_name">
                            <Input placeholder="Middle name" style={{width: "10em"}}/>
                        </Form.Item>
                        <Form.Item name="last_name">
                            <Input placeholder="Last name" style={{width: "10em"}}/>
                        </Form.Item>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button type="primary" onClick={this.props.prev}>Previous</Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Next</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>);
    }
}
