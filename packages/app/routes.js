const routes = require('next-routes');

module.exports = routes()
	.add('index', '/')
	.add('product', '/product/:id')
	.add('profile', '/profile/:username');