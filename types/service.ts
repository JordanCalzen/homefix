//payload for creating a service
export type ServicePayLoad = {
	name: string;
	price: string;
	description: string;
	categoryId: string;
};

//payload for updating a service
export type UpdateServicePayload = {
	name?: string;
	price?: string;
	description?: string;
	image?: string;
	isActive?: boolean;
	duration?: string;
	categoryId?: string;
};

// API response type
export type ServiceApiResponse = {
	success: boolean;
	data?: any;
	error?: string;
};
