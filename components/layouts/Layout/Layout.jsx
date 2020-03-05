import Head from 'next/head';
import {config} from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

const layoutStyle = props => ({
	margin: 0,
	padding: 0,
	position : 'relative',
	width: '100vw',
	overflowX: 'hidden',
	overflowY: !!props.hiddenOverflow ? 'hidden' : 'auto'
});

const Layout = props => (
	<div style={layoutStyle(props)} className='flex fdc Layout' id='__app'>
		{
			!process.env.IN_PROD &&
			<Head>
				<meta name="robots" content="noindex, nofollow"/>
			</Head>
		}
		<div className="layout-main relw100">
			<div>NAVBAR For Layout Purposes (Consider adding a true one)</div>
			<div>
				{props.children}
				<div>FOOTER For Layout Purposes (Consider adding a true one)</div>
			</div>
		</div>
	</div>
);
export default Layout;