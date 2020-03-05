const localEnv = require('dotenv').config();
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

let nextConfig = withSass({
	webpack : (config, options) => {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		config.resolve.alias[''] = __dirname;
		return config
	},
	includePaths: ['./public', './']
});
nextConfig.target = 'serverless';
nextConfig.env = {
	DEV_ENV : process.env.DEV_ENV,
	CUSTOM : process.env.CUSTOM,
	IN_PROD : process.env.DEV_ENV == 'production'
};

module.exports = nextConfig;