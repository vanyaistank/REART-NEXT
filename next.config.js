const path = require('path');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
	webpack: (config) => {
		config.resolve = {
			alias: {
				'@Styled': path.resolve(__dirname, './lib/styled/'),
				'@Redux': path.resolve(__dirname, './lib/redux/'),
				"@GraphQL": path.resolve(__dirname, './lib/graphql/'),
				'@Components': path.resolve(__dirname, './components/index.ts'),
				'@Containers': path.resolve(__dirname, './containers/index.ts'),
				'@Helpers': path.resolve(__dirname, './helpers/'),
				'@API': path.resolve(__dirname, './api/'),
			},
			extensions: [...config.resolve.extensions, '.tsx'],
		};
		return config;
	},
});