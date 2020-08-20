import React from "react"
import {Button, Form, Input} from "antd"
import "../Questions.css"

function embedSpotify(link) {
    var linkArr = link.split('/')
    var embedStr = "embed/"
    linkArr[3] = embedStr.concat(linkArr[3])

    console.log(linkArr[3])

    return linkArr.join("/")
}

export default class Q7 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          spotifyLink: "default"
            
        }
    }

    saveData = values => {
        // console.log('Received values of form: ', values);
        localStorage.setItem("spotify", values.spotify);
        // this.setState({ spotifyLink: values.spotify })
        // this.props.next();
    };

    // handleUpload = (values) => {
    //     console.log(ev)
    //     console.log("ig this works")
    //     this.setState({ spotifyLink: ev. })

    // }

    onFinish = values => {
        console.log('Success:', values.spotify);
        this.setState({ spotifyLink: values.spotify })
    };

    render() {

        let songLink = this.state.spotifyLink
        console.log(songLink)
        let newLink = embedSpotify(this.state.spotifyLink)
        const linkFrame = (this.state.spotifyLink === "default" ? <br/> : <iframe src={newLink} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>)
        // const images = imgArr.map(image => {
        //     return <img key={image} src={image} style={{height: "60px", width: "60px", objectFit: "cover", margin: "10px"}} />
        //  });


        return (
            <div style={{width: "100%", textAlign: "center"}}>
                <div className="create-text" style={{fontSize: "1.5em", marginBottom: "0.5em"}}>
                    Add a soundtrack
                </div>
                <Form
                    onFinish={this.onFinish}
                    scrollToFirstError>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Form.Item 
                        label="Link"
                        name="spotify"
                        rules={[
                            {
                                type: "url",
                                message: "This field must be a valid url."
                            }
                        ]}>
                            <Input placeholder="Spotify Track Link" style={{width: "15em", borderRadius: "10px"}}/>
                           
                        </Form.Item>
                    </div>
                    <div className="create-text" style={{width: "60%", margin: "auto"}}>
                    To find the link of a Spotify Song or Playlist, open up Spotify on your computer and search up the song/playlist 
                    that you would like to upload. Click on the "...", then press "share" and "copy playlist/song link". You can now copy the link into
                    the input box above and hit "upload".
                    </div>
                    <br />
                    {/* <Form.Item> */}
                        <button type="primary" htmlType="submit" className= "upload">Upload</button>
                    {/* </Form.Item> */}
                    <br />
                    <div>
                    {linkFrame}
                    </div>

                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Button type="primary" onClick={this.props.prev} style={{marginRight: "10px", borderRadius: "10px"}}>Previous</Button>
                    
                        <Button type="primary" onClick={this.props.next} style={{marginRight: "10px", borderRadius: "10px"}}>Skip/Next</Button>
                    </div>
                </Form>
            </div>);
    }
}
