import React from 'react';
import {Layout, Input, Button} from "antd";
import './Header.css';

class Header extends React.Component {

    login(){
        window.location.href = "/login";
    }

    logout(){
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        window.location.href = "/";
    }

    render() {
        return (
            <Layout.Header style={{background: "white"}}>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div style={{fontSize: "1.5em"}}>RestEasy</div>

                    {this.props.search &&
                    <div style={{display: "flex", alignItems: "center"}}>

                        <Input.Search
                            style={{width: "20em"}}
                            placeholder="Search for a memorial"
                            onSearch={value => console.log(value)}
                            enterButton
                        />

                        {
                            localStorage.getItem('user') == null ?
                                <Button style={{marginLeft: "1em"}} onClick={this.login}>
                                    Login
                                </Button> :
                                <div>
                                    <Button style={{marginLeft: "1em"}} >
                                        Hi {JSON.parse(localStorage.getItem('user')).email}!
                                    </Button>
                                    <Button style={{marginLeft: "1em"}} onClick={this.logout} >
                                        Logout
                                    </Button>
                                </div>
                        }


                    </div>
                    }
                </div>
            </Layout.Header>
        )
    }
}

export default Header;
