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
import {useEffect, useContext} from 'react';
import Link from 'next/link';
import {useContextState, useOnce} from '/public/tools/hooks.js';
import {jsxizeHtmlObject} from '/public/scripts/dom.js';
import {setLoginCookies, getDataWithCookies} from '/public/tools/network.js';
import {loadingScript} from '/public/scripts/dom.js';
import MainContext from '/components/contexts/MainContext.js';
import IndexContext from '/components/contexts/IndexContext.js';
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
	//Main Context is hared between pages in the shared property (and we can change shared state with shared[key].set)
	const mainContext = useContext(MainContext);
	try {
		return(
			<IndexContext.Provider value={{...ctxVal, ...props, innerTexts}}>
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
					<div onClick={()=>mainContext.shared.number.set(Math.floor(Math.random()*100))}>
						AA : {mainContext.shared.number.value}
					</div>
					<Link href='/otherpage'><a>Other Page</a></Link>
				</Layout>
			</IndexContext.Provider>
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