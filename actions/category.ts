// actions/categories.ts
"use server";

import { prisma } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
  CategoryApiResponse,
  CategoryPayLoad,
  UpdateCategoryPayload,
} from "@/types/category";

// Schema for category validation
const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "description is required").optional(),
  slug: z.string().min(1, "slug is required"),
  image: z.string().min(1, "image plate is required").optional(),
});

// Schema for category update validation
const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "description is required").optional(),
  slug: z.string().min(1, "slug  is required").optional(),
  image: z.string().min(1, "image plate is required").optional(),
});

/**
 * Creates a new category
 */
export async function createCategory(
  data: CategoryPayLoad
): Promise<CategoryApiResponse> {
  try {
    const slug = data.slug;
    const existingCategory = await prisma.category.findUnique({
      where: {
        slug,
      },
    });
    if (existingCategory) {
      return {
        status: 409,
        data: null,
        success: false,
        error: "Category Already exists",
      };
    }
    // Validate data
    const validated = categorySchema.parse(data);

    // Create new category
    const Category = await prisma.category.create({
      data: {
        name: validated.name,
        slug: validated.slug,
        description: validated.description,
      },
    });

    revalidatePath("/products");

    return {
      success: true,
      data: Category,
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to create product",
    };
  }
}

/**
 * Updates an existing category
 */
export async function editCategory(
  id: string,
  data: UpdateCategoryPayload
): Promise<CategoryApiResponse> {
  try {
    const updatedCategory = await prisma.category.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/categories");
    return {
      success: true,
      data: updatedCategory,
    };
  } catch (error) {
    console.error("Error updating Category:", error);
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
    // Check if product exists and has sales
    const category = await prisma.category.findUnique({
      where: { id },
      include: { services: { take: 1 } },
    });

    if (!category) {
      return {
        success: false,
        error: "category not found",
      };
    }

    // Check if category has any services
    if (category.services.length > 0) {
      return {
        success: false,
        error: "Cannot delete category with existing services",
      };
    }

    // Delete the category
    await prisma.category.delete({
      where: { id },
    });

    revalidatePath("/service/categories");

    return {
      success: true,
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
 * Gets all Categories
 */
export async function getAllCategories(): Promise<CategoryApiResponse> {
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
        error instanceof Error ? error.message : "Failed to fetch categories",
    };
  }
}

/**
 * Gets a single category by ID
 */
export async function getCategoryById(
  id: string
): Promise<CategoryApiResponse> {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      return {
        success: false,
        error: "category not found",
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

// "use server";

// import { prisma } from "@/prisma/db";
// import { CategoryProps } from "@/types/category";
// import { revalidatePath } from "next/cache";

// export async function createCategory(data: CategoryProps) {
//   const slug = data.slug;
//   try {
//     const existingCategory = await prisma.category.findUnique({
//       where: {
//         slug,
//       },
//     });
//     if (existingCategory) {
//       return {
//         status: 409,
//         data: null,
//         error: "Category Already exists",
//       };
//     }
//     const newCategory = await prisma.category.create({
//       data,
//     });
//     // console.log(newCategory);
//     revalidatePath("/dashboard/services/categories");
//     return {
//       status: 200,
//       data: newCategory,
//       error: null,
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       status: 200,
//       error: "Something went wrong",
//       data: null,
//     };
//   }
// }
// export async function getAllCategories() {
//   try {
//     const categories = await prisma.category.findMany({
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return categories;
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// }
// export async function updateCategoryById(id: string, data: CategoryProps) {
//   try {
//     const updatedCategory = await prisma.category.update({
//       where: {
//         id,
//       },
//       data,
//     });
//     revalidatePath("/dashboard/categories");
//     return updatedCategory;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function getCategoryById(id: string) {
//   try {
//     const category = await prisma.category.findUnique({
//       where: {
//         id,
//       },
//     });
//     return category;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function deleteCategory(id: string) {
//   try {
//     const deletedCategory = await prisma.category.delete({
//       where: {
//         id,
//       },
//     });

//     return {
//       ok: true,
//       data: deletedCategory,
//     };
//   } catch (error) {
//     console.log(error);
//   }
// }
// // export async function createBulkCategories(categories: CategoryProps[]) {
// //   try {
// //     for (const category of categories) {
// //       await createCategory(category);
// //     }
// //   } catch (error) {
// //     console.log(error);
// //   }
// // }
