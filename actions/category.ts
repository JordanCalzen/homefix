// actions/categories.ts
"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { generateSlug } from "@/lib/generateSlug";

import {
  CategoryApiResponse,
  CategoryPayLoad,
  UpdateCategoryPayload,
  CategoryDTO,
} from "@/types/category";

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
  slug: z.string().min(1, "Slug is required").optional(),
});

/**
 * Creates a new category
 */
export async function createCategory(
  data: CategoryPayLoad
): Promise<CategoryApiResponse<CategoryDTO>> {
  try {
    // Validate data
    const validated = categorySchema.parse(data);
    
    // Generate slug from name
    const slug = generateSlug(validated.name);
    
    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });
    
    if (existingCategory) {
      return {
        success: false,
        status: 409,
        error: "A category with this name already exists",
      };
    }

    // Create new category
    const category = await prisma.category.create({
      data: {
        name: validated.name,
        slug,
        description: validated.description || null,
        image: validated.image || null,
      },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("Error creating category:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation error",
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create category",
    };
  }
}

/**
 * Updates an existing category
 */
export async function editCategory(
  id: string,
  data: UpdateCategoryPayload
): Promise<CategoryApiResponse<CategoryDTO>> {
  try {
    // Validate data
    const validated = updateCategorySchema.parse(data);
    
    // If name is being updated, regenerate slug
    let updateData = { ...validated };
    if (validated.name) {
      const newSlug = generateSlug(validated.name);
      
      // Check if the new slug conflicts with existing categories (excluding current one)
      const existingCategory = await prisma.category.findFirst({
        where: {
          slug: newSlug,
          NOT: { id },
        },
      });
      
      if (existingCategory) {
        return {
          success: false,
          status: 409,
          error: "A category with this name already exists",
        };
      }
      
      updateData.slug = newSlug;
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: updateData,
    });
    
    revalidatePath("/dashboard/categories");
    
    return {
      success: true,
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Error updating category:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Validation error",
      };
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update category",
    };
  }
}

/**
 * Deletes a category
 */
export async function deleteCategory(
  id: string
): Promise<CategoryApiResponse<null>> {
  try {
    // Check if category exists and has services
    const category = await prisma.category.findUnique({
      where: { id },
      include: { 
        services: { 
          select: { id: true },
          take: 1 
        } 
      },
    });

    if (!category) {
      return {
        success: false,
        status: 404,
        error: "Category not found",
      };
    }

    // Check if category has any services
    if (category.services.length > 0) {
      return {
        success: false,
        status: 400,
        error: "Cannot delete category with existing services",
      };
    }

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/dashboard/categories");

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("Error deleting category:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete category",
    };
  }
}

/**
 * Gets all categories
 */
export async function getAllCategories(): Promise<CategoryApiResponse<CategoryDTO[]>> {
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
      error: error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
}

/**
 * Gets a single category by ID
 */
export async function getCategoryById(
  id: string
): Promise<CategoryApiResponse<CategoryDTO>> {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        status: 404,
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
      error: error instanceof Error ? error.message : "Failed to fetch category",
    };
  }
}

/**
 * Gets a single category by slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryApiResponse<CategoryDTO>> {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return {
        success: false,
        status: 404,
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
      error: error instanceof Error ? error.message : "Failed to fetch category",
    };
  }
}