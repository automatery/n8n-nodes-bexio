import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
} from 'n8n-workflow';

import { bexioApiRequest } from './GenericFunctions';

export class Bexio implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Bexio',
		name: 'bexio',
		icon: 'file:bexio.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Bexio API',
		defaults: {
			name: 'Bexio',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'bexioApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Kontakt',
						value: 'contact',
					},
					{
						name: 'Angebot',
						value: 'quote',
					},
					{
						name: 'Produkt',
						value: 'product',
					},
					{
						name: 'Auftrag',
						value: 'order',
					},
					{
						name: 'Rechnung',
						value: 'invoice',
					},
					{
						name: 'Projekt',
						value: 'project',
					},
					{
						name: 'Zeiterfassung',
						value: 'timetracking',
					},
				],
				default: 'contact',
			},

			// Contact Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a contact',
						action: 'Create a contact',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a contact',
						action: 'Delete a contact',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a contact',
						action: 'Get a contact',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all contacts',
						action: 'Get all contacts',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a contact',
						action: 'Update a contact',
					},
				],
				default: 'get',
			},

			// Quote Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['quote'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a quote',
						action: 'Create a quote',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a quote',
						action: 'Delete a quote',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a quote',
						action: 'Get a quote',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all quotes',
						action: 'Get all quotes',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a quote',
						action: 'Update a quote',
					},
				],
				default: 'get',
			},

			// Product Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['product'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a product',
						action: 'Create a product',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a product',
						action: 'Delete a product',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a product',
						action: 'Get a product',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all products',
						action: 'Get all products',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a product',
						action: 'Update a product',
					},
				],
				default: 'get',
			},

			// Order Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['order'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an order',
						action: 'Create an order',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an order',
						action: 'Delete an order',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an order',
						action: 'Get an order',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all orders',
						action: 'Get all orders',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an order',
						action: 'Update an order',
					},
				],
				default: 'get',
			},

			// Invoice Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['invoice'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create an invoice',
						action: 'Create an invoice',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete an invoice',
						action: 'Delete an invoice',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get an invoice',
						action: 'Get an invoice',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all invoices',
						action: 'Get all invoices',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update an invoice',
						action: 'Update an invoice',
					},
				],
				default: 'get',
			},

			// Project Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['project'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a project',
						action: 'Create a project',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a project',
						action: 'Delete a project',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a project',
						action: 'Get a project',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all projects',
						action: 'Get all projects',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a project',
						action: 'Update a project',
					},
				],
				default: 'get',
			},

			// Time Tracking Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['timetracking'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a time entry',
						action: 'Create a time entry',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete a time entry',
						action: 'Delete a time entry',
					},
					{
						name: 'Get',
						value: 'get',
						description: 'Get a time entry',
						action: 'Get a time entry',
					},
					{
						name: 'Get All',
						value: 'getAll',
						description: 'Get all time entries',
						action: 'Get all time entries',
					},
					{
						name: 'Update',
						value: 'update',
						description: 'Update a time entry',
						action: 'Update a time entry',
					},
				],
				default: 'get',
			},

			// ID Field for get/update/delete operations
			{
				displayName: 'ID',
				name: 'id',
				type: 'string',
				displayOptions: {
					show: {
						operation: ['get', 'update', 'delete'],
					},
				},
				default: '',
				placeholder: '123',
				description: 'ID of the resource',
			},

			// Limit field for getAll operations
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				displayOptions: {
					show: {
						operation: ['getAll'],
					},
				},
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},

			// Contact Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'Name 1',
						name: 'name_1',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Name 2',
						name: 'name_2',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Email',
						name: 'mail',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Phone Fixed',
						name: 'phone_fixed',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Phone Mobile',
						name: 'phone_mobile',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Address',
						name: 'address',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Postcode',
						name: 'postcode',
						type: 'string',
						default: '',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Country ID',
						name: 'country_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Contact Type ID',
						name: 'contact_type_id',
						type: 'number',
						default: 1,
					},
				],
			},

			// Quote Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['quote'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Language ID',
						name: 'language_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Currency ID',
						name: 'currency_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Payment Type ID',
						name: 'payment_type_id',
						type: 'number',
						default: 1,
					},
				],
			},

			// Product Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['product'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Article Type',
						name: 'article_type',
						type: 'options',
						options: [
							{
								name: 'Physical Product',
								value: 'physical_product',
							},
							{
								name: 'Service',
								value: 'service',
							},
						],
						default: 'physical_product',
					},
					{
						displayName: 'Intern Name',
						name: 'intern_name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Intern Code',
						name: 'intern_code',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Purchase Price',
						name: 'purchase_price',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
					},
					{
						displayName: 'Sale Price',
						name: 'sale_price',
						type: 'number',
						typeOptions: {
							numberPrecision: 2,
						},
						default: 0,
					},
				],
			},

			// Order Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['order'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Language ID',
						name: 'language_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Currency ID',
						name: 'currency_id',
						type: 'number',
						default: 1,
					},
				],
			},

			// Invoice Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['invoice'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Title',
						name: 'title',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Language ID',
						name: 'language_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Currency ID',
						name: 'currency_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Payment Type ID',
						name: 'payment_type_id',
						type: 'number',
						default: 1,
					},
				],
			},

			// Project Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'dateTime',
						default: '',
					},
				],
			},

			// Time Tracking Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['timetracking'],
						operation: ['create', 'update'],
					},
				},
				options: [
					{
						displayName: 'User ID',
						name: 'user_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Status ID',
						name: 'status_id',
						type: 'number',
						default: 1,
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{
								name: 'Time',
								value: 'time',
							},
							{
								name: 'Range',
								value: 'range',
							},
						],
						default: 'time',
					},
					{
						displayName: 'Date',
						name: 'date',
						type: 'dateTime',
						default: '',
					},
					{
						displayName: 'Duration (minutes)',
						name: 'duration',
						type: 'number',
						default: 0,
					},
					{
						displayName: 'Comment',
						name: 'comment',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Contact ID',
						name: 'contact_id',
						type: 'number',
						default: '',
					},
					{
						displayName: 'Project ID',
						name: 'project_id',
						type: 'number',
						default: '',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const length = items.length;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < length; i++) {
			try {
				let responseData;

				if (resource === 'contact') {
					responseData = await this.executeContactOperation(operation, i);
				} else if (resource === 'quote') {
					responseData = await this.executeQuoteOperation(operation, i);
				} else if (resource === 'product') {
					responseData = await this.executeProductOperation(operation, i);
				} else if (resource === 'order') {
					responseData = await this.executeOrderOperation(operation, i);
				} else if (resource === 'invoice') {
					responseData = await this.executeInvoiceOperation(operation, i);
				} else if (resource === 'project') {
					responseData = await this.executeProjectOperation(operation, i);
				} else if (resource === 'timetracking') {
					responseData = await this.executeTimeTrackingOperation(operation, i);
				}

				if (Array.isArray(responseData)) {
					returnData.push(...responseData.map(item => ({ json: item })));
				} else {
					returnData.push({ json: responseData });
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}

	private async executeContactOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const contactId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/contact/${contactId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/contact', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/contact', body);
		}

		if (operation === 'update') {
			const contactId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/contact/${contactId}`, body);
		}

		if (operation === 'delete') {
			const contactId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/contact/${contactId}`);
		}
	}

	private async executeQuoteOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const quoteId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/kb_offer/${quoteId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/kb_offer', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/kb_offer', body);
		}

		if (operation === 'update') {
			const quoteId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/kb_offer/${quoteId}`, body);
		}

		if (operation === 'delete') {
			const quoteId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/kb_offer/${quoteId}`);
		}
	}

	private async executeProductOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const productId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/article/${productId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/article', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/article', body);
		}

		if (operation === 'update') {
			const productId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/article/${productId}`, body);
		}

		if (operation === 'delete') {
			const productId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/article/${productId}`);
		}
	}

	private async executeOrderOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const orderId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/kb_order/${orderId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/kb_order', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/kb_order', body);
		}

		if (operation === 'update') {
			const orderId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/kb_order/${orderId}`, body);
		}

		if (operation === 'delete') {
			const orderId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/kb_order/${orderId}`);
		}
	}

	private async executeInvoiceOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const invoiceId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/kb_invoice/${invoiceId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/kb_invoice', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/kb_invoice', body);
		}

		if (operation === 'update') {
			const invoiceId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/kb_invoice/${invoiceId}`, body);
		}

		if (operation === 'delete') {
			const invoiceId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/kb_invoice/${invoiceId}`);
		}
	}

	private async executeProjectOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const projectId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/pr_project/${projectId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/pr_project', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/pr_project', body);
		}

		if (operation === 'update') {
			const projectId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/pr_project/${projectId}`, body);
		}

		if (operation === 'delete') {
			const projectId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/pr_project/${projectId}`);
		}
	}

	private async executeTimeTrackingOperation(operation: string, itemIndex: number) {
		if (operation === 'get') {
			const timeId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'GET', `/2.0/timesheet/${timeId}`);
		}

		if (operation === 'getAll') {
			const limit = this.getNodeParameter('limit', itemIndex) as number;
			return await bexioApiRequest.call(this, 'GET', '/2.0/timesheet', {}, { limit });
		}

		if (operation === 'create') {
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', '/2.0/timesheet', body);
		}

		if (operation === 'update') {
			const timeId = this.getNodeParameter('id', itemIndex) as string;
			const additionalFields = this.getNodeParameter('additionalFields', itemIndex) as any;
			const body = {
				...additionalFields,
			};
			return await bexioApiRequest.call(this, 'POST', `/2.0/timesheet/${timeId}`, body);
		}

		if (operation === 'delete') {
			const timeId = this.getNodeParameter('id', itemIndex) as string;
			return await bexioApiRequest.call(this, 'DELETE', `/2.0/timesheet/${timeId}`);
		}
	}
}