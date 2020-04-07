/*
 * NICE HEADER
 * File: _app.jdx
 * Project: React-Next-Serverless Template
 * File Created: Tuesday, 7th April 2020 2:43:55 pm
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import React from 'react';
import App from 'next/app';
import MainContext from '/components/contexts/MainContext.js';

export default class CustomApp extends App {
    constructor(props) {
        super(props);
        this.state = {
            number: 10
        };    
    }

    componentDidMount() {
        //We can check if there is a user logged here
        this.setState({number : 1});
    }

    render() {
        const sharedContext = ['number'];
        const {Component, pageProps} = (this.props || {});
        try {
            const shared = Object.fromEntries(sharedContext.map(prop => ([prop, {
                value : this.state[prop],
                set : v => this.setState({[prop] : v})
            }])));
            return (
                <MainContext.Provider value={{shared}}>
                    <Component {...pageProps} />
                </MainContext.Provider>
            );    
        }
        catch (err) {
            console.error("Error", err, pageProps);
            return (
                <div>Une erreur est survenue</div>
            );
        }
    }
}