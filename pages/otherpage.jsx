/*
 * NICE HEADER
 * File: otherpage.jsx
 * Project: React-Next-Serverless Template
 * File Created: Tuesday, 7th April 2020 2:47:59 pm
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import {useContext} from 'react';
import MainContext from '/components/contexts/MainContext.js';
import Link from 'next/link';
import Head from 'next/head';

const OtherPage = () => {
	const mainContext = useContext(MainContext);
	return (
		<div>
			<div onClick={()=>mainContext.shared.number.set(Math.floor(Math.random()*100))}>
				BB : {mainContext.shared.number.value}
			</div>
			<Link href='/index'><a>Index</a></Link>
		</div>
	);
};
OtherPage.getInitialProps = async () => {
	return {};
};
export default OtherPage;