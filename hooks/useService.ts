"use client";

import {
	createService,
	deleteService,
	getAllServices,
	getServiceById,
	updateService,
} from "@/actions/service";
import { ServicePayLoad } from "@/types/service";
import type { Category, Service } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   createCategory,
//   deleteCategory,
//   getActiveCategories,
//   getAllCategories,
//   getCategoryById,
//   getCategoryBySlug,
//   updateCategory,
//   getCategoriesByDepartment,
//   getCategoryBySlugAndSubCategory,
// } from "@/actions/categories"
// import type { Props, CategoryWithRelations } from "@/types/types"
import toast from "react-hot-toast";

// Fetch all services
export const useFetchServices = () => {
	const servicesQuery = useQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const data = await getAllServices();
			return data || [];
		},
	});

	return {
		services: servicesQuery.data?.data || [],
		isLoading: servicesQuery.isPending,
		error: servicesQuery.error,
		refetch: servicesQuery.refetch,
	};
};

// Fetch a single service
export const useFetchService = (serviceId: string) => {
	const serviceQuery = useQuery({
		queryKey: ["services", serviceId],
		queryFn: async () => {
			const data = await getServiceById(serviceId);
			return data;
		},
		enabled: !!serviceId,
	});

	return {
		service: serviceQuery.data,
		isLoading: serviceQuery.isPending,
		error: serviceQuery.error,
	};
};

// Delete a service
// export const useDeleteService = () => {
// 	const queryClient = useQueryClient();

// 	const deleteServiceMutation = useMutation({
// 		mutationFn: async (id: string) => {
// 			return await deleteService(id);
// 		},
// 		onSuccess: (deletedService) => {
// 			queryClient.setQueryData(["services"], (oldData: Service[] = []) =>
// 				oldData.filter((srv) => srv.id !== deletedService.id)
// 			);
// 			queryClient.invalidateQueries({ queryKey: ["services"] });

// 			toast.success("Service deleted successfully");
// 		},
// 		onError: (error) => {
// 			toast.error("An error occurred while deleting the service");
// 			console.error(error);
// 		},
// 	});

// 	return {
// 		deleteService: deleteServiceMutation.mutate,
// 		isDeleting: deleteServiceMutation.isPending,
// 		error: deleteServiceMutation.error,
// 	};
// };

// Create a category
export const useCreateCategory = () => {
	const queryClient = useQueryClient();

	const createServiceMutation = useMutation({
		mutationFn: async (service: ServicePayLoad) => {
			const result = await createService(service);
			return result;
		},
		onSuccess: (newService) => {
			queryClient.setQueryData(["services"], (oldData: Service[] = []) => [
				...oldData,
				newService,
			]);
			queryClient.invalidateQueries({ queryKey: ["services"] });
			toast.success("Service created successfully");
		},
		onError: (error: Error) => {
			toast.error(
				error.message || "An error occurred while creating the service"
			);
		},
	});

	return {
		createService: createServiceMutation.mutate,
		isCreating: createServiceMutation.isPending,
		error: createServiceMutation.error,
	};
};

// Update a service
// export const useUpdateService = () => {
// 	const queryClient = useQueryClient();

// 	const updateServiceMutation = useMutation({
// 		mutationFn: async ({
// 			id,
// 			service,
// 		}: {
// 			id: string;
// 			service: ServicePayLoad;
// 		}) => {
// 			return await updateService(id, service);
// 		},
// 		onSuccess: (updatedService) => {
// 			queryClient.setQueryData(
// 				["services"],
// 				(oldData: Service[] | undefined) => {
// 					if (!oldData) return [updatedService];
// 					return oldData.map((srv) =>
// 						srv.id === updatedService.id ? updatedService : srv
// 					);
// 				}
// 			);

// 			queryClient.invalidateQueries({ queryKey: ["categories"] });
// 			queryClient.invalidateQueries({
// 				queryKey: ["categories", updatedService.id],
// 			});
// 			toast.success("Category updated successfully");
// 		},
// 		onError: (error) => {
// 			toast.error("An error occurred while updating the category");
// 			console.error(error);
// 		},
// 	});

// 	return {
// 		updateCategory: updateCategoryMutation.mutate,
// 		isUpdating: updateCategoryMutation.isPending,
// 		error: updateCategoryMutation.error,
// 	};
// };

// Get category by slug
// export const useCategoryDetails = (slug: string) => {
// 	return useQuery({
// 		queryKey: ["category", slug],
// 		queryFn: () => getCategoryBySlug(slug),
// 		enabled: !!slug,
// 	});
// };

// Get active categories
// export const useActiveCategories = () => {
// 	return useQuery({
// 		queryKey: ["active-categories"],
// 		queryFn: () => getActiveCategories(),
// 	});
// };
