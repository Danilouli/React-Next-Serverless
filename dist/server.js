require('dotenv').config();
const Express = require('express');
const Cookies = require('cookie-parser');
const Server = Express();
const Sls = require('serverless-http');
const IN_PROD = process.env.DEV_ENV === 'production';

let pageNames = [
	'_app.js',
	'_document.js',
	'index.js'
];

const getPage = page => require(`./.next/serverless/pages/${page}.js`);

const userIsLogged = req => !!req.cookies && !!req.cookies.loginCookie && !!req.cookies.cookey;

const sitemapOptions = {
	root: __dirname,
	headers: {
		'Content-Type': 'text/xml;charset=UTF-8'
	}
};

const robotsOptions = {
	root: __dirname,
	headers: {
		'Content-Type': 'text/plain;charset=UTF-8'
	}
};

// eslint-disable-next-line max-lines-per-function
const setServer = function(server) {
	server.use(Cookies());
	if (IN_PROD) {
		server.get('/sitemap.xml', (req, res) => res.status(200).sendFile('sitemap.xml', sitemapOptions));
		server.get('/robots.txt', (req, res) => res.status(200).sendFile('robots.txt', robotsOptions));
	}
	server.get('/', (req, res) => {
		if (userIsLogged(req))
			return getPage('home').render(req,res);
		else
			return getPage('landing').render(req,res);
	});
	server.get('/landing', (req, res) => {
		return res.redirect(301, '/');
	});
	server.get('/index', getPage('index').render);
	server.use('/_next/static', Express.static(__dirname + '/.next/static'));
	server.get('/_next/static/*', (req, res) => {
		let pagesSplit = req.originalUrl.split('/pages/');
		let pageName = pagesSplit[1];
		if (pageName && pageNames.indexOf(pageName) < 0)
			return res.send(404);
	});
	server.use((req, res) => res.send(404));
};

setServer(Server);

module.exports.handler = Sls(Server, {
	request : ctx => console.log("LAMBDA CONTEXT", {
		headers : ctx.headers,
		client : ctx.client,
		url : ctx.url,
		ip : ctx.ip
	})
});
