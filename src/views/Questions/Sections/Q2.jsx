import React from "react";
import {Button, DatePicker, Form} from "antd";

export default class Q2 extends React.Component {
    saveData = values => {
        // console.log('Received values of form: ', values);
        localStorage.setItem("start_date", values.start_date);
        localStorage.setItem("end_date", values.end_date);
        this.props.next();
    };

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    Dates of their life
                </div>
                <Form
                    onFinish={this.saveData}
                    scrollToFirstError>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Form.Item name="start_date">
                            <DatePicker placeholder="Start Date" style={{width: "10em"}}/>
                        </Form.Item>
                        <Form.Item style={{marginLeft:"2em"}} name="end_date">
                            <DatePicker placeholder="End Date" style={{width: "10em"}}/>
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
