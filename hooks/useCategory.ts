// hooks/useProductQueries.ts
import { categoryAPI } from "@/services/categories";
import { CategoryPayLoad, UpdateCategoryPayload } from "@/types/category";
import {
  useQuery,
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { toast } from "sonner";

// Query keys for caching
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: (filters: any) => [...categoryKeys.lists(), { filters }] as const,
  filteredList: (dateFilter: any, searchQuery: string) =>
    [...categoryKeys.lists(), { dateFilter, searchQuery }] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

/**
 * Hook for fetching categories with standard loading states
 */
export function useCategories() {
  // Get all categories with standard loading states
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryAPI.getAll,
  });

  return {
    categories,
    isLoading,
    isError,
    error,
    refetch,
  };
}

/**
 * Hook for fetching categories with React Suspense
 * Use this when the component is wrapped in a Suspense boundary
 */
export function useSuspenseCategories() {
  // Get all categories with Suspense (data is guaranteed to be defined)
  const { data: categories, refetch } = useSuspenseQuery({
    queryKey: categoryKeys.lists(),
    queryFn: categoryAPI.getAll,
  });

  return {
    categories,
    refetch,
  };
}

export function useCategory(id: string) {
  // Get a single category
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => categoryAPI.getById(id),
    enabled: Boolean(id), // Only run if ID is provided
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  // Create a new Category
  return useMutation({
    mutationFn: (data: CategoryPayLoad) => categoryAPI.create(data),
    onSuccess: () => {
      toast.success("category added successfully");
      // Invalidate categories list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error("Failed to add category", {
        description: error.message || "Unknown error occurred",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  // Update an existing category
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCategoryPayload }) =>
      categoryAPI.update(id, data),
    onSuccess: (data, variables) => {
      toast.success("category updated successfully");
      // Invalidate specific category detail and list queries
      queryClient.invalidateQueries({
        queryKey: categoryKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error("Failed to update category", {
        description: error.message || "Unknown error occurred",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  // Delete a category
  return useMutation({
    mutationFn: (id: string) => categoryAPI.delete(id),
    onSuccess: () => {
      toast.success("category deleted successfully");
      // Invalidate categories list to trigger a refetch
      queryClient.invalidateQueries({ queryKey: categoryKeys.lists() });
    },
    onError: (error: Error) => {
      toast.error("Failed to delete category", {
        description: error.message || "Unknown error occurred",
      });
    },
  });
}
