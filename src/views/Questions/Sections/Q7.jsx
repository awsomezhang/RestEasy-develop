import React from "react";
import {Button, Form, Input} from "antd";

export default class Q7 extends React.Component {
    saveData = values => {
        // console.log('Received values of form: ', values);
        localStorage.setItem("spotify", values.spotify);
        this.props.next();
    };

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    Add a soundtrack
                </div>
                <Form
                    onFinish={this.saveData}
                    scrollToFirstError>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Form.Item name="spotify" rules={[
                            {
                                type: "url",
                                message: "This field must be a valid url."
                            }
                        ]}>
                            <Input placeholder="Spotify Track Link" style={{width: "15em"}}/>
                        </Form.Item>
                    </div>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button type="primary" onClick={this.props.prev}>Previous</Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Skip/Next</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>);
    }
}
