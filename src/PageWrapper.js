import React, {Component, lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Divider, Layout} from 'antd';

import Header from './views/Header/Header'
import Footer from './views/Footer/Footer'

function PageWrapper(props){
    return(
        <Layout>
            <Header search={true}/>
            {props.content}
            <Footer />
        </Layout>
    )
}

export default PageWrapper
