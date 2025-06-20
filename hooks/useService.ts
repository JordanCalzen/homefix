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
import {
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

// Fetch all services
export const useFetchServices = () => {
	const servicesQuery = useSuspenseQuery({
		queryKey: ["services"],
		queryFn: async () => {
			const data = await getAllServices();
			return data.data || [];
		},
	});

	return {
		services: servicesQuery.data || [],
		isLoading: servicesQuery.isPending,
		error: servicesQuery.error,
		refetch: servicesQuery.refetch,
	};
};

// Fetch a single service
export const useFetchService = (serviceId: string) => {
	const serviceQuery = useSuspenseQuery({
		queryKey: ["services", serviceId],
		queryFn: async () => {
			const data = await getServiceById(serviceId);
			return data;
		},
	});

	return {
		service: serviceQuery.data,
		isLoading: serviceQuery.isPending,
		error: serviceQuery.error,
	};
};

// Delete a service
export const useDeleteService = () => {
	const queryClient = useQueryClient();

	const deleteServiceMutation = useMutation({
		mutationFn: async (id: string) => {
			return await deleteService(id);
		},
		onSuccess: (deletedService) => {
			queryClient.invalidateQueries({ queryKey: ["services"] });
			toast.success("Service deleted successfully");
		},
		onError: (error) => {
			toast.error("An error occurred while deleting the service");
			console.error(error);
		},
	});

	return {
		deleteService: deleteServiceMutation.mutate,
		isDeleting: deleteServiceMutation.isPending,
		error: deleteServiceMutation.error,
	};
};

// Create a service
export const useCreateService = () => {
	const queryClient = useQueryClient();

	const createServiceMutation = useMutation({
		mutationFn: async (service: ServicePayLoad) => {
			const result = await createService(service);
			console.log(result);
			return result;
		},
		onSuccess: (newService) => {
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
export const useUpdateService = () => {
	const queryClient = useQueryClient();

	const updateServiceMutation = useMutation({
		mutationFn: async ({
			id,
			service,
		}: {
			id: string;
			service: ServicePayLoad;
		}) => {
			const result = await updateService(id, service);
			return result;
		},
		onSuccess: (updatedService) => {
			// Update the specific service in the services list

			// Update individual service cache if it exists
			queryClient.setQueryData(["service", updatedService.id], updatedService);

			// Invalidate queries to ensure fresh data
			queryClient.invalidateQueries({ queryKey: ["services"] });
			queryClient.invalidateQueries({
				queryKey: ["service", updatedService.id],
			});

			toast.success("Service updated successfully");
		},
		onError: (error: Error) => {
			toast.error(
				error.message || "An error occurred while updating the service"
			);
		},
	});

	return {
		updateService: updateServiceMutation.mutate,
		isUpdating: updateServiceMutation.isPending,
		error: updateServiceMutation.error,
	};
};

// Get category by slug
// export const useCategoryDetails = (slug: string) => {
// 	return useQuery({
// 		queryKey: ["category", slug],
// 		queryFn: () => getCategoryBySlug(slug),
// 		enabled: !!slug,
// 	});
// };
