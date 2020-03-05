/*
 * NICE HEADER
 * File: LoadingScreen.jsx
 * Project: React-Next-Serverless Template
 * File Created: Thursday, 5th March 2020 1:55:16 pm
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import './LoadingScreen.scss';

const LoadingScreen = props => (
	<div className={`LoadingScreen ${props.className || ''}`} id='__loading_screen'></div>
);
export default LoadingScreen;