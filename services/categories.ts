"use client";
// services/category-service.ts

import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} from "@/actions/category";
import { CategoryPayLoad, UpdateCategoryPayload } from "@/types/category";

// Centralized API object for all category-related server actions
export const categoryAPI = {
  // Fetch all categories
  getAll: async () => {
    const response = await getAllCategories();
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch categories");
    }
    return response.data;
  },

  // Get a single category by ID
  getById: async (id: string) => {
    const response = await getCategoryById(id);
    if (!response.success) {
      throw new Error(response.error || "Failed to fetch category");
    }
    return response.data;
  },

  // Get a category by service
  //   getByService: async (service: string) => {
  //     const response = await getCategoryByService(service);
  //     if (!response.success) {
  //       throw new Error(
  //         response.error || "Failed to fetch category by service"
  //       );
  //     }
  //     return response.data;
  //   },

  // Create a new category
  create: async (data: CategoryPayLoad) => {
    const response = await createCategory(data);
    if (!response.success) {
      throw new Error(response.error || "Failed to create category");
    }
    return response.data;
  },

  // Update an existing category
  update: async (id: string, data: UpdateCategoryPayload) => {
    const response = await editCategory(id, data);
    if (!response.success) {
      throw new Error(response.error || "Failed to update category");
    }
    return response.data;
  },

  // Delete a category
  delete: async (id: string) => {
    const response = await deleteCategory(id);
    if (!response.success) {
      throw new Error(response.error || "Failed to delete category");
    }
    return true;
  },
};
