// types/category.ts

// Base category data for creating a new category
export type CategoryPayLoad = {

  name: string;
  description?: string;
  image?: string;
  // slug is removed - it will be auto-generated

};

// Payload for updating a category
export type UpdateCategoryPayload = {

  name?: string;
  description?: string;
  image?: string;
  slug?: string; // Allow slug updates in case name changes
};

// API response type with proper generic typing
export type CategoryApiResponse<T = any> = {
  success: boolean;
  data?: T;
  status?: number;
  error?: string;
};

// Full category data structure (matches Prisma model)
export interface CategoryDTO {
  id: string;
  name: string;
  slug: string;
  image: string | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Props for category components (should match DTO structure)
export type CategoryProps = {
  name: string;
  slug: string;
  image?: string; // Optional to match DTO
  description?: string; // Optional to match DTO
};

