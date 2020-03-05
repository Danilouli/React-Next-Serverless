const localEnv = require('dotenv').config();
const webpack = require('webpack');
const withSass = require('@zeit/next-sass');

let modulus = withSass({
	webpack : (config, options) => {
		config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
		config.resolve.alias[''] = __dirname;
		return config
	},
	includePaths: ['./static', './']
});
module.exports = modulus;