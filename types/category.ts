//payload for creating a service
export type CategoryPayLoad = {
	id: string;
	name: string;
	description?: string;
	image?: string;
	slug: string;
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
	status?: number;
	error?: string;
};

export type CategoryProps = {
	id: string;
	name: string;
	description?: string;
	image?: string;
	slug: string;
};
