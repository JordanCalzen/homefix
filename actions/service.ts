"use server";
import { prisma } from "@/prisma/db";
import { ServicePayLoad, UpdateServicePayload } from "@/types/service";
import { revalidatePath } from "next/cache";
import { z } from "zod";

type ServiceApiResponse = {
	id?: string;
	success: boolean;
	data?: any;
	error?: string;
};

// Schema for service validation
const serviceSchema = z.object({
	name: z.string().min(1, "Name is required"),
	price: z.string().min(1, "Price is required"),
	categoryId: z.string().min(1, "Category is required"),
	description: z.string().optional(),
});

// Schema for service update validation
const updateServiceSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	price: z.string().min(1, "Price is required").optional(),
});

/**
 * Creates a new service
 */
export async function createService(
	data: ServicePayLoad
): Promise<ServiceApiResponse> {
	try {
		// Validate data
		const validated = serviceSchema.parse(data);

		// Check if service already exists
		const existingService = await prisma.service.findFirst({
			where: { id: validated.name },
		});

		if (existingService) {
			return {
				success: false,
				error: "A service with this name already exists",
			};
		}

		// Create new service
		const service = await prisma.service.create({
			data: {
				name: validated.name,
				price: validated.price,
				description: validated.description,
				categoryId: validated.categoryId,
			},
		});

		return {
			success: true,
			data: service,
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
export async function updateService(
	id: string,
	data: UpdateServicePayload
): Promise<ServiceApiResponse> {
	try {
		// Validate the data partially (allowing optional fields)
		const validated = updateServiceSchema.parse(data);

		// If name is provided, check if it already exists
		if (validated.name) {
			const existingService = await prisma.service.findFirst({
				where: {
					name: validated.name,
					NOT: { id },
				},
			});

			if (existingService) {
				return {
					success: false,
					error: "A service with this name already exists",
				};
			}
		}

		// Update the service
		const updatedService = await prisma.service.update({
			where: { id },
			data: validated,
		});

		revalidatePath("/dashboard/service");

		return {
			success: true,
			data: updatedService,
		};
	} catch (error) {
		console.error("Error updating service:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to update service",
		};
	}
}

/**
 * Deletes a service
 */
export async function deleteService(id: string): Promise<ServiceApiResponse> {
	try {
		// Check if service exists
		const service = await prisma.service.findUnique({
			where: { id },
		});

		if (!service) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		// Delete the product
		await prisma.service.delete({
			where: { id },
		});

		revalidatePath("/dashboard/service");

		return {
			success: true,
		};
	} catch (error) {
		console.error("Error deleting service:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to delete service",
		};
	}
}

/**
 * Gets all services
 */
export async function getAllServices() {
	try {
		const services = await prisma.service.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				category: {
					select: {
						id: true,
						name: true,
						slug: true,
					},
				},
			},
		});

		return {
			success: true,
			data: services,
		};
	} catch (error) {
		console.error("Error fetching services:", error);
		return {
			success: false,
			error:
				error instanceof Error ? error.message : "Failed to fetch products",
		};
	}
}

/**
 * Gets a single service by ID
 */
export async function getServiceById(id: string) {
	try {
		const service = await prisma.service.findUnique({
			where: { id },
		});

		if (!service) {
			return {
				success: false,
				error: "Service not found",
			};
		}

		return {
			success: true,
			data: service,
		};
	} catch (error) {
		console.error("Error fetching service:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Failed to fetch service",
		};
	}
}

// import { prisma } from "@/prisma/db";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";

// type ServiceApiResponse = {
// 	id?: string;
// 	success: boolean;
// 	data?: any;
// 	error?: string;
// };

// // Schema for service validation
// const serviceSchema = z.object({
// 	name: z.string().min(1, "Name is required"),
// 	price: z.string().min(1, "Price is required"),
// 	categoryId: z.string().min(1, "Category is required"),
// 	description: z.string().optional(),
// });

// // Schema for service update validation
// const updateServiceSchema = z.object({
// 	name: z.string().min(1, "Name is required").optional(),
// 	price: z.string().min(1, "Price is required").optional(),
// });

// /**
//  * Creates a new service
//  */
// export async function createService(
// 	data: ServicePayLoad
// ): Promise<ServiceApiResponse> {
// 	try {
// 		// Validate data
// 		const validated = serviceSchema.parse(data);

// 		// Check if service already exists
// 		const existingService = await prisma.service.findFirst({
// 			where: { id: validated.name },
// 		});

// 		if (existingService) {
// 			return {
// 				success: false,
// 				error: "A service with this name already exists",
// 			};
// 		}

// 		// Create new service
// 		const service = await prisma.service.create({
// 			data: {
// 				name: validated.name,
// 				price: validated.price,
// 				description: validated.description,
// 				categoryId: validated.categoryId,
// 			},
// 		});

// 		return {
// 			success: true,
// 			data: service,
// 		};
// 	} catch (error) {
// 		console.error("Error creating service:", error);
// 		return {
// 			success: false,
// 			error:
// 				error instanceof Error ? error.message : "Failed to create product",
// 		};
// 	}
// }

// /**
//  * Updates an existing product
//  */
// export async function updateService(
// 	id: string,
// 	data: UpdateServicePayload
// ): Promise<ServiceApiResponse> {
// 	try {
// 		// Validate the data partially (allowing optional fields)
// 		const validated = updateServiceSchema.parse(data);

// 		// If name is provided, check if it already exists
// 		if (validated.name) {
// 			const existingService = await prisma.service.findFirst({
// 				where: {
// 					name: validated.name,
// 					NOT: { id },
// 				},
// 			});

// 			if (existingService) {
// 				return {
// 					success: false,
// 					error: "A service with this name already exists",
// 				};
// 			}
// 		}

// 		// Update the service
// 		const updatedService = await prisma.service.update({
// 			where: { id },
// 			data: validated,
// 		});

// 		revalidatePath("/dashboard/service");

// 		return {
// 			success: true,
// 			data: updatedService,
// 		};
// 	} catch (error) {
// 		console.error("Error updating service:", error);
// 		return {
// 			success: false,
// 			error:
// 				error instanceof Error ? error.message : "Failed to update service",
// 		};
// 	}
// }

// /**
//  * Deletes a service
//  */
// export async function deleteService(id: string): Promise<ServiceApiResponse> {
// 	try {
// 		// Check if service exists
// 		const service = await prisma.service.findUnique({
// 			where: { id },
// 		});

// 		if (!service) {
// 			return {
// 				success: false,
// 				error: "Service not found",
// 			};
// 		}

// 		// Delete the product
// 		await prisma.service.delete({
// 			where: { id },
// 		});

// 		revalidatePath("/dashboard/service");

// 		return {
// 			success: true,
// 		};
// 	} catch (error) {
// 		console.error("Error deleting service:", error);
// 		return {
// 			success: false,
// 			error:
// 				error instanceof Error ? error.message : "Failed to delete service",
// 		};
// 	}
// }

// /**
//  * Gets all services
//  */
// export async function getAllServices() {
// 	try {
// 		const services = await prisma.service.findMany({
// 			orderBy: { createdAt: "desc" },
// 		});

// 		return {
// 			success: true,
// 			data: services,
// 		};
// 	} catch (error) {
// 		console.error("Error fetching services:", error);
// 		return {
// 			success: false,
// 			error:
// 				error instanceof Error ? error.message : "Failed to fetch products",
// 		};
// 	}
// }

// /**
//  * Gets a single service by ID
//  */
// export async function getServiceById(id: string) {
// 	try {
// 		const service = await prisma.service.findUnique({
// 			where: { id },
// 		});

// 		if (!service) {
// 			return {
// 				success: false,
// 				error: "Service not found",
// 			};
// 		}

// 		return {
// 			success: true,
// 			data: service,
// 		};
// 	} catch (error) {
// 		console.error("Error fetching service:", error);
// 		return {
// 			success: false,
// 			error: error instanceof Error ? error.message : "Failed to fetch service",
// 		};
// 	}
// }
