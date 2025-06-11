"use server";
import { prisma } from "@/prisma/db";
import {
	CategoryApiResponse,
	CategoryPayLoad,
	UpdateCategoryPayload,
} from "@/types/category";
import { Category } from "@prisma/client";

import { z } from "zod";

// Schema for category validation
const categorySchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	image: z.string().optional(),
});

// Schema for category update validation
const updateCategorySchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	description: z.string().optional(),
	image: z.string().optional(),
});

/**
 * Creates a new product
 */
export async function createCategory(
	data: CategoryPayLoad
): Promise<CategoryApiResponse> {
	try {
		// Validate data
		const validated = categorySchema.parse(data);

		// Check if category already exists
		const existingCategory = await prisma.category.findFirst({
			where: { id: validated.name },
		});

		if (existingCategory) {
			return {
				success: false,
				error: "A category with this name already exists",
			};
		}

		// Create new category
		const category = await prisma.category.create({
			data: {
				name: validated.name,
				slug: validated.name.toLowerCase().replace(/\s+/g, "-"),
				description: validated.description,
				image: validated.image,
			},
		});

		// await prisma.serviceModel.update({
		// 	where: {
		// 		id: validated.categoryId,
		// 	},
		// 	data: {
		// 		inventoryCount: {
		// 			increment: 1,
		// 		},
		// 	},
		// });
		return {
			success: true,
			data: category,
		};
	} catch (error) {
		console.error("Error creating service:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to create product",
		};
	}
}

/**
 * Updates an existing product
 */
export async function editCategory(
	id: string,
	data: UpdateCategoryPayload
): Promise<CategoryApiResponse> {
	try {
		// Validate the data partially (allowing optional fields)
		const validated = updateCategorySchema.parse(data);

		// If name is provided, check if it already exists
		if (validated.name) {
			const existingCategory = await prisma.category.findFirst({
				where: {
					name: validated.name,
					NOT: { id },
				},
			});

			if (existingCategory) {
				return {
					success: false,
					error: "A category with this name already exists",
				};
			}
		}

		// Update the category
		const updatedCategory = await prisma.category.update({
			where: { id },
			data: validated,
		});

		return {
			success: true,
			data: updatedCategory,
		};
	} catch (error) {
		console.error("Error updating category:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to update category",
		};
	}
}

/**
 * Deletes a category
 */
export async function deleteCategory(id: string): Promise<CategoryApiResponse> {
	try {
		// Check if category exists
		const category = await prisma.category.findUnique({
			where: { id },
		});

		if (!category) {
			return {
				success: false,
				error: "Category not found",
			};
		}

		// Delete the category
		const deletedCategory = await prisma.category.delete({
			where: { id },
		});

		return {
			success: true,
			data: deletedCategory,
		};
	} catch (error) {
		console.error("Error deleting category:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to delete category",
		};
	}
}

/**
 * Gets all categories
 */
export async function getAllCategories() {
	try {
		const categories = await prisma.category.findMany({
			orderBy: { createdAt: "desc" },
		});

		return {
			success: true,
			data: categories,
		};
	} catch (error) {
		console.error("Error fetching categories:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to fetch products",
		};
	}
}

/**
 * Gets a single category by ID
 */
export async function getCategoryById(id: string) {
	try {
		const category = await prisma.category.findUnique({
			where: { id },
		});

		if (!category) {
			return {
				success: false,
				error: "Category not found",
			};
		}

		return {
			success: true,
			data: category,
		};
	} catch (error) {
		console.error("Error fetching category:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to fetch category",
		};
	}
}

/**
 * Gets a single category by slug
 */
export async function getCategoryBySlug(slug: string) {
	try {
		const category = await prisma.category.findFirst({
			where: { slug },
		});

		if (!category) {
			return {
				success: false,
				error: "Category not found",
			};
		}

		return {
			success: true,
			data: category,
		};
	} catch (error) {
		console.error("Error fetching category:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to fetch category",
		};
	}
}
