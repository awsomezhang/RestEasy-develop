import React from "react";
import {Button, Form} from "antd";

export default class Q11 extends React.Component {
    saveData = values => {
        // console.log('Received values of form: ', values);
        localStorage.setItem("relation", values.relation);
        this.props.next();
    };

    render() {
        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div style={{fontSize: "2em", marginBottom: "0.5em"}}>
                    {/*What is your relationship with {localStorage.getItem("first_name")}?*/}
                </div>
                <Form
                    onFinish={this.saveData}
                    scrollToFirstError>
                    {/*<div style={{display: "flex", justifyContent: "center"}}>*/}
                    {/*    <Form.Item name="relation">*/}
                    {/*        <Input placeholder="Relation" style={{width: "10em"}}/>*/}
                    {/*    </Form.Item>*/}
                    {/*</div>*/}

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
