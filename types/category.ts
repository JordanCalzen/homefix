//payload for creating a service
export type CategoryPayLoad = {
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
  name: string;
  slug: string;
  image: string;
  description: string;
};

export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

