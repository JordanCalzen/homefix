"use client";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Car, DollarSign } from "lucide-react";
import { useSession } from "next-auth/react";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import FormSelectInput from "@/components/FormInputs/FormSelectInput";
import { formPayLoad, ServicePayLoad } from "@/types/service";
import { Service } from "@prisma/client";
import {
	Column,
	ConfirmationDialog,
	DataTable,
	EntityForm,
	TableActions,
} from "../data-table";
import {
	useCreateService,
	useDeleteService,
	useFetchServices,
	useUpdateService,
} from "@/hooks/useService";
import { useCategories } from "@/hooks/useCategory";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { CategoryOption } from "@/types/types";
import TextArea from "../FormInputs/TextAreaInput";

// import { useSuspenseModel, useSuspenseModels } from "@/hooks/useModelQueries";

interface ServiceDetailProps {
	title: string;
}
// Form schema for editing/adding service
const serviceFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	price: z.string().min(1, "Price is required"),
	description: z.string().min(1, "Description is required"),
});

type ServiceFormValues = z.infer<typeof serviceFormSchema>;

export default function ServiceDetail({ title }: ServiceDetailProps) {
	// React Query hooks with Suspense - note that data is always defined
	const { services, refetch } = useFetchServices();

	const createServiceMutation = useCreateService();
	const updateServiceMutation = useUpdateService();
	const deleteServiceMutation = useDeleteService();
	const { categories, isLoading: isLoadingCategories } = useCategories();
	console.log(categories);

	// Local state
	const [formDialogOpen, setFormDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isExporting, setIsExporting] = useState(false);
	const [currentService, setCurrentService] = useState<Service | null>(null);
	const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

	const categoryOptions: CategoryOption[] = categories.map((cat: any) => ({
		value: cat.id,
		label: cat.name,
	}));

	const initialCategory = categoryOptions.find(
		(item) => item.value === currentService?.categoryId
	);
	const [selectedCategory, setSelectedCategory] = useState<CategoryOption>(
		initialCategory || categoryOptions[0]
	);
	// Form for editing/adding service
	const form = useForm<ServicePayLoad>({
		resolver: zodResolver(serviceFormSchema),
		defaultValues: {
			name: "",
			price: "",
			description: "",
		},
	});

	// Update form when current service changes
	useEffect(() => {
		if (!currentService) {
			// Adding new - reset form
			form.reset({
				name: "",
				price: "",
				description: "",
			});
		} else {
			// Editing existing - populate form
			form.reset({
				name: currentService.name,
				price: currentService.price,
				description: currentService.description ?? "",
			});
		}
	}, [currentService, form]);

	// Format date function
	const formatDate = (date: Date | string) => {
		const dateObj = typeof date === "string" ? new Date(date) : date;
		return format(dateObj, "MMM dd, yyyy");
	};

	// Format currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-UG", {
			style: "currency",
			currency: "UGX",
			minimumFractionDigits: 0,
		}).format(amount);
	};

	// Export to Excel
	const handleExport = async (filteredServices: Service[]) => {
		setIsExporting(true);
		try {
			// Prepare data for export
			const exportData = filteredServices.map((service) => ({
				Name: service.name,
				Description: service.description,
				Price: service.price,
				"Date Added": formatDate(service.createdAt),
			}));

			// Create workbook and worksheet
			const worksheet = XLSX.utils.json_to_sheet(exportData);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

			// Generate filename with current date
			const fileName = `Services_${format(new Date(), "yyyy-MM-dd")}.xlsx`;

			// Export to file
			XLSX.writeFile(workbook, fileName);

			toast.success("Export successful", {
				description: `Services exported to ${fileName}`,
			});
		} catch (error) {
			toast.error("Export failed", {
				description:
					error instanceof Error ? error.message : "Unknown error occurred",
			});
		} finally {
			setIsExporting(false);
		}
	};

	// Handle add new click
	const handleAddClick = () => {
		setCurrentService(null);
		setFormDialogOpen(true);
	};

	// Handle edit click
	const handleEditClick = (product: Service) => {
		setCurrentService(product);
		setFormDialogOpen(true);
	};

	// Handle delete click
	const handleDeleteClick = (product: Service) => {
		setServiceToDelete(product);
		setDeleteDialogOpen(true);
	};

	// Handle form submission (edit or add)
	const onSubmit = async (data: ServicePayLoad) => {
		// Validate category selection
		console.log(data, "submitted data");
		if (!currentService) {
			// Add new product
			data.categoryId = selectedCategory.value;
			data.name = data.name;

			if (!data.categoryId) {
				toast.error("Please select the Category for the service");
				return;
			}
			console.log(data);
			createServiceMutation.createService(data);
		} else {
			// Edit existing service
			updateServiceMutation.updateService({
				id: currentService.id,
				service: data,
			});
		}
	};

	// Handle confirming delete
	const handleConfirmDelete = () => {
		if (serviceToDelete) {
			deleteServiceMutation.deleteService(serviceToDelete.id);
		}
	};

	// Define columns for the data table
	const columns: Column<Service>[] = [
		{
			header: "Name",
			accessorKey: "name",
			cell: (row) => <span className="font-medium">{row.name}</span>,
		},
		{
			header: "Description",
			accessorKey: "description",
		},
		{
			header: "Price",
			accessorKey: "price",
		},
		{
			header: "Duration",
			accessorKey: "duration",
		},
		{
			header: "Date Added",
			accessorKey: (row) => formatDate(row.createdAt),
		},
	];

	return (
		<>
			<DataTable<Service>
				title={title}
				data={Array.isArray(services) ? services : []}
				columns={columns}
				keyField="id"
				isLoading={false} // With Suspense, we're guaranteed to have data
				onRefresh={refetch}
				actions={{
					onAdd: handleAddClick,
					onExport: handleExport,
				}}
				filters={{
					searchFields: ["name"],
					enableDateFilter: true,
					getItemDate: (item) => item.createdAt,
				}}
				renderRowActions={(item) => (
					<TableActions.RowActions
						onEdit={() => handleEditClick(item)}
						onDelete={() => handleDeleteClick(item)}
						isDeleting={
							deleteServiceMutation.isDeleting &&
							serviceToDelete?.id === item.id
						}
					/>
				)}
			/>

			{/* Service Form Dialog */}
			<EntityForm
				open={formDialogOpen}
				onOpenChange={setFormDialogOpen}
				title={currentService ? "Edit Service" : "Add New Service"}
				form={form}
				onSubmit={onSubmit}
				isSubmitting={
					createServiceMutation.isCreating || updateServiceMutation.isUpdating
				}
				submitLabel={currentService ? "Save Changes" : "Add Service"}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Service Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter service name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Price Range</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select a price range" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="$80-200">$80–200</SelectItem>
										<SelectItem value="$800-2000">$800–2000</SelectItem>
										<SelectItem value="$100-300">$100–300</SelectItem>
										<SelectItem value="$75-150">$75–150</SelectItem>
									</SelectContent>
								</Select>
								<FormDescription>
									Estimated service price in USD
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormSelectInput
					label="Category"
					options={categoryOptions}
					option={selectedCategory}
					setOption={setSelectedCategory}
					toolTipText="Add New Category"
					href="/dashboard/category"
				/>
				<div className="space-y-3">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<TextArea
										name="description"
										register={form.register}
										errors={form.formState.errors}
										label="Service Description"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</EntityForm>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				title="Delete Service"
				description={
					serviceToDelete ? (
						<>
							Are you sure you want to delete{" "}
							<strong>{serviceToDelete.name}</strong> (
							{serviceToDelete.description})? This action cannot be undone.
						</>
					) : (
						"Are you sure you want to delete this service?"
					)
				}
				onConfirm={handleConfirmDelete}
				isConfirming={deleteServiceMutation.isDeleting}
				confirmLabel="Delete"
				variant="destructive"
			/>
		</>
	);
}
