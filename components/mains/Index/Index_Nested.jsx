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

const Index_Nested = () => {
	const CTX = useContext(MainContext);
	const {number, innerTexts} = CTX;
	return (
		<div className="Index_Nested ind-nested">
			<p className="ind-nested-text">{innerTexts.p_2}</p>
			<button onClick={()=>number.set(number.value - 1)}>DECREASE !</button>
		</div>		
	);
};
export default Index_Nested;