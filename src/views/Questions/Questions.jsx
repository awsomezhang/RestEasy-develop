import React, {lazy} from 'react';
import {Layout, Popover, Steps} from "antd";
import "./Questions.css"
import Header from "../Header/Header";

const Q0 = lazy(() => import('./Sections/Q0'));
const Q1 = lazy(() => import('./Sections/Q1'));
const Q2 = lazy(() => import('./Sections/Q2'));
const Q3 = lazy(() => import('./Sections/Q3'));
const Q4 = lazy(() => import('./Sections/Q4'));
const Q5 = lazy(() => import('./Sections/Q5'));
const Q6 = lazy(() => import('./Sections/Q6'));
const Q7 = lazy(() => import('./Sections/Q7'));
const Q8 = lazy(() => import('./Sections/Q8'));
const Q9 = lazy(() => import('./Sections/Q9'));
const Q10 = lazy(() => import('./Sections/Q10'));
const Q11 = lazy(() => import('./Sections/Q11'));
const Q12 = lazy(() => import('./Sections/Q12'));
const Q13 = lazy(() => import('./Sections/Q13'));


const description = [
    "Enter information about memorial",
    "Tell us how you'll design your page",
    "Make the cash registry",
    "Complete the payment",
    "Share the memorial with your loved ones",
];

const customDot = (dot, {status, index}) => (
    <Popover content={<span>{description[index]}</span>}>
        {dot}
    </Popover>
);

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {curr: 0};
    }

    getCurrProgress() {
        if (this.state.curr <= 6)
            return 0;
        else if (7 <= this.state.curr && this.state.curr <= 9)
            return 1;
        else if (10 <= this.state.curr && this.state.curr <= 11)
            return 2;
        else if (this.state.curr === 12)
            return 3;
        else
            return 4;
    }

    getComponent() {
        if (this.state.curr === 10)
            return <Q0 next={this.next.bind(this)}/>;
        else if (this.state.curr === 1)
            return <Q1 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 2)
            return <Q2 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 3)
            return <Q3 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 4)
            return <Q4 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 5)
            return <Q5 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 6)
            return <Q6 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 7)
            return <Q7 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 8)
            return <Q8 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 9)
            return <Q9 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 0)
            return <Q10 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 11)
            return <Q11 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 12)
            return <Q12 next={this.next.bind(this)} prev={this.prev.bind(this)}/>;
        else if (this.state.curr === 13)
            return <Q13 />;
    }

    next() {
        const current = this.state.curr + 1;
        this.setState({
            curr: current
        });
    }

    prev() {
        const current = this.state.curr - 1;
        this.setState({
            curr: current
        });
    }

    render() {
        return (
            <Layout>
                <Header search={true}/>
                <Layout.Content style={{background: "white"}}>
                    <Steps progressDot={customDot} current={this.getCurrProgress()} style={{padding: "2.5% 10%"}}>
                        <Steps.Step title="Info"/>
                        <Steps.Step title="Design"/>
                        <Steps.Step title="Register"/>
                        <Steps.Step title="Pay"/>
                        <Steps.Step title="Share"/>
                    </Steps>
                    <div style={{marginLeft: "10%", marginRight: "10%", padding:"2.5%"}}>
                        {this.getComponent()}
                    </div>
                </Layout.Content>
            </Layout>

        );
    }
}

export default Questions;
