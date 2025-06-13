// components/ui/groups/product-listing-suspense.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Car, DollarSign, WholeWord } from "lucide-react";
import { useSession } from "next-auth/react";
import {
	DataTable,
	Column,
	TableActions,
	EntityForm,
	ConfirmationDialog,
} from "@/components/ui/data-table";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	useCreateCategory,
	useDeleteCategory,
	useSuspenseCategories,
	useUpdateCategory,
} from "@/hooks/useCategory";
import { Category } from "@prisma/client";
import ImageUploadButton from "../FormInputs/ImageUploadButton";
import { CategoryProps } from "@/types/category";

interface CategoryDetailProps {
	title: string;
}

// Form schema for editing/adding categories
const categoryFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().min(1, "description is required"),
	slug: z.string().min(1, "slug is required"),
	image: z.string().min(1, "image plate is required"),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoryDetail({ title }: CategoryDetailProps) {
	// React Query hooks with Suspense - note that data is always defined
	const { categories, refetch } = useSuspenseCategories();
	const createCategoryMutation = useCreateCategory();
	const updateCategoryMutation = useUpdateCategory();
	const deleteCategoryMutation = useDeleteCategory();

	// Local state
	const [formDialogOpen, setFormDialogOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [isExporting, setIsExporting] = useState(false);
	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
	const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
		null
	);
	const [imageUrl, setImageUrl] = useState(
		"https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfAXaapcezIN7vwylkF1PXSCqAuseUG0gx8mhd"
	);
	// Form for editing/adding categories
	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(categoryFormSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	// Update form when current category changes
	useEffect(() => {
		if (!currentCategory) {
			// Adding new - reset form
			form.reset({
				name: "",
				description: "",
				image: "",
			});
		} else {
			// Editing existing - populate form
			form.reset({
				name: currentCategory.name,
			});
		}
	}, [currentCategory, form]);

	const { data: session } = useSession();

	// Format date function
	const formatDate = (date: Date | string) => {
		const dateObj = typeof date === "string" ? new Date(date) : date;
		return format(dateObj, "MMM dd, yyyy");
	};

	// Export to Excel
	const handleExport = async (filteredCategories: Category[]) => {
		setIsExporting(true);
		try {
			// Prepare data for export
			const exportData = filteredCategories.map((category) => ({
				Name: category.name,
				description: category.description,
				// image: category.image,
				"Date Added": formatDate(category.createdAt),
			}));

			// Create workbook and worksheet
			const worksheet = XLSX.utils.json_to_sheet(exportData);
			const workbook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workbook, worksheet, "Products");

			// Generate filename with current date
			const fileName = `Products_${format(new Date(), "yyyy-MM-dd")}.xlsx`;

			// Export to file
			XLSX.writeFile(workbook, fileName);

			toast.success("Export successful", {
				description: `Products exported to ${fileName}`,
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
		setCurrentCategory(null);
		setFormDialogOpen(true);
	};

	// Handle edit click
	const handleEditClick = (category: Category) => {
		setCurrentCategory(category);
		setFormDialogOpen(true);
	};

	// Handle delete click
	const handleDeleteClick = (category: Category) => {
		setCategoryToDelete(category);
		setDeleteDialogOpen(true);
	};

	// Handle form submission (edit or add)
	const onSubmit = async (data: CategoryProps) => {
		if (!currentCategory) {
			console.log(data);
			// Add new category
			data.image = imageUrl;
			console.log(data);
			createCategoryMutation.mutate(data);
		} else {
			// Edit existing Category
			//   updateCategoryMutation.mutate({
			//     id: currentCategory.id,
			//     data,
			//   });
		}
	};

	// Handle confirming delete
	const handleConfirmDelete = () => {
		if (categoryToDelete) {
			deleteCategoryMutation.mutate(categoryToDelete.id);
		}
	};

	// Define columns for the data table
	const columns: Column<Category>[] = [
		{
			header: "Name",
			accessorKey: "name",
			cell: (row) => <span className="font-medium">{row.name}</span>,
		},

		{
			header: "description",
			accessorKey: "description",
		},
		{
			header: "Image",
			accessorKey: "image",
		},

		{
			header: "Date Added",
			accessorKey: (row) => formatDate(row.createdAt),
		},
	];

	return (
		<>
			<DataTable<Category>
				title={title}
				// subtitle={
				//   categories.length > 0
				//     ? getSubtitle(categories.length, getTotalValue(categories))
				//     : undefined
				// }
				data={categories}
				columns={columns}
				keyField="id"
				isLoading={false} // With Suspense, we're guaranteed to have data
				onRefresh={refetch}
				actions={{
					onAdd: handleAddClick,
					onExport: handleExport,
				}}
				filters={{
					searchFields: ["name", "description"],
					enableDateFilter: true,
					getItemDate: (item) => item.createdAt,
				}}
				renderRowActions={(item) => (
					<TableActions.RowActions
						onEdit={() => handleEditClick(item)}
						onDelete={() => handleDeleteClick(item)}
						isDeleting={
							deleteCategoryMutation.isPending &&
							categoryToDelete?.id === item.id
						}
					/>
				)}
			/>

			{/* Category Form Dialog */}
			<EntityForm
				open={formDialogOpen}
				onOpenChange={setFormDialogOpen}
				title={currentCategory ? "Edit Category" : "Add New Category"}
				form={form}
				onSubmit={onSubmit}
				isSubmitting={
					createCategoryMutation.isPending || updateCategoryMutation.isPending
				}
				submitLabel={currentCategory ? "Save Changes" : "Add Category"}
			>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category Name</FormLabel>
							<FormControl>
								<Input placeholder="Enter Category name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<div className="relative">
									<WholeWord className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Enter the description"
										className="pl-8"
										{...field}
									/>
								</div>
							</FormControl>
							<FormDescription>Enter the product price in UGX</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="col-span-5">
					<ImageUploadButton
						title="Item image"
						imageUrl={imageUrl}
						setImageUrl={setImageUrl}
						endpoint="itemImage"
					/>
				</div>
			</EntityForm>

			{/* Delete Confirmation Dialog */}
			<ConfirmationDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				title="Delete Category"
				description={
					categoryToDelete ? (
						<>
							Are you sure you want to delete{" "}
							<strong>{categoryToDelete.name}</strong> (
							{categoryToDelete.description})? This action cannot be undone.
						</>
					) : (
						"Are you sure you want to delete this category?"
					)
				}
				onConfirm={handleConfirmDelete}
				isConfirming={deleteCategoryMutation.isPending}
				confirmLabel="Delete"
				variant="destructive"
			/>
		</>
	);
}
