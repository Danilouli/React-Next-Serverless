/*
 * NICE HEADER
 * File: home.jsx
 * Project: React-Next-Serverless Template
 * File Created: Thursday, 5th March 2020 9:24:15 am
 * Author: dyod (Daniel Saadia) (me@dyod.io)
 * -----
 * dyod
 */

import Head from 'next/head';
import {useEffect} from 'react';
import {useContextState, useOnce} from '/public/tools/hooks.js';
import {jsxizeHtmlObject} from '/public/scripts/dom.js';
import {setLoginCookies, getDataWithCookies} from '/public/tools/network.js';
import {loadingScript} from '/public/scripts/dom.js';
import MainContext from '/components/contexts/MainContext.js';
import {innerTexts, metas} from '/public/data/index_data.js';
import LoadingScreen from '/components/layouts/LoadingScreen/LoadingScreen.jsx';
import Layout from '/components/layouts/Layout/Layout.jsx';
import Index from '/components/mains/Index/Index.jsx';
import '/public/styles/index.scss';

const IndexPage = props => {
	useEffect(() => {
		setLoginCookies(props.auth);
		//-->Check if user is loggued for example here
		loadingScript();
	}, []);
	const innerTexts = useOnce(jsxizeHtmlObject(props.innerTexts));
	const ctxVal = useContextState({
		number : 1
	});
	try {
		return(
			<MainContext.Provider value={{...ctxVal, ...props, innerTexts}}>
				<Layout>
					<Head>
						<title>Sample Index - React-Next-Serverless template</title>
						<meta 
							name="description"
							content={props.metas.description}
						/>
					</Head>
					<LoadingScreen/>
					<Index/>
				</Layout>
			</MainContext.Provider>
		);	
	}
	catch (err) {
		console.error("Error", err);
		return (
			<div>Une erreur est survenue</div>
		);
	}
};
IndexPage.getInitialProps = async ctx => {
	let initialProps = await getDataWithCookies(ctx);
	initialProps.page = 'Index';
	initialProps.innerTexts = innerTexts;
	initialProps.metas = metas;
	return initialProps;
};
export default IndexPage;