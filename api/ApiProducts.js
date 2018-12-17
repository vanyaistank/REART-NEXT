import Api from './Api';

const ApiProducts = new Api(process.env.API_URL);

// eslint-disable-next-line
export async function GetProductsRequest({ id = null } = {}) {
	const { data } = await ApiProducts.request({
		uri: `/products/${id != null ? id : ''}`,
		method: 'get',
	});

	return data;
}
