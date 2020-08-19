import React from "react";
import {Button, DatePicker, Form, Input} from "antd";
import "../Questions.css"

export default class Q2 extends React.Component {
    saveData = values => {
        // console.log('Received values of form: ', values);
        // let b_day = (values.start_date === "undefined" ? "N/A" : values.start_date)
        localStorage.setItem("start_date", values.start_date);
        localStorage.setItem("end_date", values.end_date);
        this.props.next();
    };

    render() {
        const inputStyle = {
            borderRadius: "12px",
            textAlign: "center",
            fontSize: "17px",
            border: "1px solid #578C3D",
            width: "235px",
            height:"40px",
            margin: "20px 10px"
            // backgroundColor: "#BEBEBE",
            // color: "black"
        }

        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div className="create-text" style={{fontSize: "1.5em", marginBottom: "0.5em"}}>
                    Share some important dates
                </div>
                <Form
                    onFinish={this.saveData}
                    scrollToFirstError>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        {/* <Form.Item name="start_date">
                            <DatePicker placeholder="Birthday" style={{borderRadius: "10px", width: "11em", height: "2.5em"}}/>
                        </Form.Item>
                        <Form.Item style={{marginLeft:"2em"}} name="end_date">
                            <DatePicker placeholder="Date of passing" style={{borderRadius: "10px", width: "11em", height: "2.5em"}}/>
                        </Form.Item> */}
                    </div>

                    {/* <div style={{display: "flex", justifyContent: "center", fontSize: "1.5em"}}>
                        OR
                    </div> */}
                    <div className="create-text" style ={{fontsize: "15px"}}>
                            Enter dates manually
                    </div>
                    <br/>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Form.Item name="start_date">
                            <Input placeholder="Birthday" style={inputStyle}/>
                        </Form.Item>
                        <Form.Item name="end_date">
                            <Input placeholder="Enter day of passing" style={inputStyle}/>
                        </Form.Item>
                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button type="primary" onClick={this.props.prev} style={{borderRadius: "10px", marginLeft: "14px"}}>Previous</Button>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{borderRadius: "10px", marginLeft: "20px"}}>Skip/Next</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>);
    }
}
