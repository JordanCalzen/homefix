//payload for creating a service
export type CategoryPayLoad = {
	name: string;
	description?: string;
	image?: string;
};

//payload for updating a service
export type UpdateCategoryPayload = {
	name?: string;
	description?: string;
	image?: string;
};

// API response type
export type CategoryApiResponse = {
	success: boolean;
	data?: any;
	error?: string;
};

export type CategoryProps = {
	id: string;
	slug: string;
	name: string;
	description?: string;
	image?: string;
};
