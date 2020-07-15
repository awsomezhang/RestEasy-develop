import React from 'react';
import PageWrapper from "../../PageWrapper"
import axios from "axios";
import "./TemplateDigitalMemory.css"
import "../../styles/styles.css"
import ProcessedLayoutEditor from './TemplateComponents/ProcessedLayoutEditor.js'

export default class TemplateDigitalMemoryModularEditor extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            templateLayout: [],
        }

        this.componentDidMount = this.componentDidMount.bind(this)
    }

    componentDidMount(){
        axios.get("http://localhost:5000/gettemplate")
            .then((response) => {
                this.setState({
                    templateLayout: response["data"]
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render(){
        return (
            <PageWrapper content={
                <div>
                    <div style={{height: "100px", backgroundColor:"grey"}} />
                    <br />
                    <h1 className="centered-text emphasis-text"> In loving memory of [name] </h1>
                    <h3 className="centered-text"> date - date </h3>
                    <br />
                    <ProcessedLayoutEditor templateLayout={this.state.templateLayout} />
                    <br />
                </div>
            }/>
        )
    }
};
