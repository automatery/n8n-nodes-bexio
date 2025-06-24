import {
	IExecuteFunctions,
	IHookFunctions,
	IDataObject,
	NodeApiError,
} from 'n8n-workflow';

export async function bexioApiRequest(
	this: IHookFunctions | IExecuteFunctions,
	method: string,
	resource: string,
	body: any = {},
	qs: IDataObject = {},
	uri?: string,
	headers: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('bexioApi');

	const options: any = {
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${credentials.apiToken}`,
		},
		method,
		qs,
		body,
		uri: uri || `https://api.bexio.com${resource}`,
		json: true,
	};

	if (Object.keys(headers).length !== 0) {
		options.headers = Object.assign({}, options.headers, headers);
	}

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	try {
		return await this.helpers.request!(options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

export async function bexioApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions,
	propertyName: string,
	method: string,
	endpoint: string,
	body: any = {},
	query: IDataObject = {},
): Promise<any> {
	const returnData: IDataObject[] = [];

	let responseData;
	query.limit = 100;
	query.offset = 0;

	do {
		responseData = await bexioApiRequest.call(this, method, endpoint, body, query);
		query.offset = query.offset! + query.limit!;
		returnData.push.apply(returnData, responseData[propertyName]);
	} while (responseData[propertyName].length !== 0);

	return returnData;
}