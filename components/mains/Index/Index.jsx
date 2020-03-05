/*
 * NICE HEADER
 * File: Index.jsx
 * Project: React-Next-Serverless Template
 * File Created: Thursday, 5th March 2020 9:24:17 am
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import {useContext} from 'react';
import MainContext from '/components/contexts/MainContext.js';
import Index_Nested from './Index_Nested.jsx';
import './Index.scss';

const Index = () => {
	const CTX = useContext(MainContext);
	const {number, innerTexts} = CTX;
	return (
		<div className="Index ind-">
			<h1 className="ind-title">{innerTexts.h1}</h1>
			<p>On page {CTX.page}</p>
			<p className="ind-text">{innerTexts.p_1}</p>
			<p>Count : {number.value}</p>
			<button onClick={()=>number.set(number.value + 1)}>INCREASE !</button>
			<Index_Nested/>
			<p>DEV_ENV : {process.env.DEV_ENV}</p>
			<p>CUSTOM : {process.env.CUSTOM}</p>
			<p>IN_PROD : {process.env.IN_PROD.toString()}</p>
		</div>		
	);
};
export default Index;