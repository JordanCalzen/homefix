// components/ui/groups/product-listing-suspense.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import * as XLSX from "xlsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { WholeWord } from "lucide-react";

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
import ImageUploadButton from "../FormInputs/ImageUploadButton";
import {
  CategoryDTO,
  CategoryPayLoad,
  CategoryProps,
  UpdateCategoryPayload,
} from "@/types/category";

interface CategoryDetailProps {
  title: string;
}

// Form schema for editing/adding categories - matches CategoryPayLoad
const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  image: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export default function CategoryDetail({ title }: CategoryDetailProps) {
  // React Query hooks with Suspense
  const { categories, refetch } = useSuspenseCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Local state
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryDTO | null>(
    null
  );
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryDTO | null>(
    null
  );
  const [imageUrl, setImageUrl] = useState<string>(
    "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfAXaapcezIN7vwylkF1PXSCqAuseUG0gx8mhd"
  );

  // Form for editing/adding categories
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
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
      // Reset image URL to default when adding new
      setImageUrl(
        "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfAXaapcezIN7vwylkF1PXSCqAuseUG0gx8mhd"
      );
    } else {
      // Editing existing - populate form
      form.reset({
        name: currentCategory.name,
        description: currentCategory.description || "",
        image: currentCategory.image || "",
      });
      // Set the image URL for editing
      setImageUrl(
        currentCategory.image ||
          "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfAXaapcezIN7vwylkF1PXSCqAuseUG0gx8mhd"
      );
    }
  }, [currentCategory, form]);

  // Format date function
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return format(dateObj, "MMM dd, yyyy");
  };

  // Export to Excel
  const handleExport = async (filteredCategories: CategoryDTO[]) => {
    setIsExporting(true);
    try {
      // Prepare data for export
      const exportData = filteredCategories.map((category) => ({
        Name: category.name,
        Description: category.description || "",
        Slug: category.slug,
        Image: category.image || "",
        "Date Added": formatDate(category.createdAt),
      }));

      // Create workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Categories");

      // Generate filename with current date
      const fileName = `Categories_${format(new Date(), "yyyy-MM-dd")}.xlsx`;

      // Export to file
      XLSX.writeFile(workbook, fileName);

      toast.success("Export successful", {
        description: `Categories exported to ${fileName}`,
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
  const handleEditClick = (category: CategoryDTO) => {
    setCurrentCategory(category);
    setFormDialogOpen(true);
  };

  // Handle delete click
  const handleDeleteClick = (category: CategoryDTO) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  // Handle form submission (edit or add)
  const onSubmit = async (data: CategoryFormValues) => {
    try {
      if (!currentCategory) {
        // Add new category - use CategoryPayLoad type
        const payload: CategoryPayLoad = {
          name: data.name,
          description: data.description,
          image: imageUrl, // Use the imageUrl from state
        };

        console.log("Creating category with data:", payload);
        await createCategoryMutation.mutateAsync(payload);
        toast.success("Category created successfully");
      } else {
        // Edit existing category - use UpdateCategoryPayload type
        const payload: UpdateCategoryPayload = {
          name: data.name,
          description: data.description,
          image: imageUrl, // Use the imageUrl from state
        };

        console.log("Updating category with data:", payload);
        await updateCategoryMutation.mutateAsync({
          id: currentCategory.id,
          data: payload,
        });
        toast.success("Category updated successfully");
      }

      // Close the form dialog on success
      setFormDialogOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save category");
    }
  };

  // Handle confirming delete
  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategoryMutation.mutateAsync(categoryToDelete.id);
        toast.success("Category deleted successfully");
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
      }
    }
  };

  // Define columns for the data table
  const columns: Column<CategoryDTO>[] = [
    {
      header: "Name",
      accessorKey: "name",
      cell: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row) => <span>{row.description || "No description"}</span>,
    },
    {
      header: "Slug",
      accessorKey: "slug",
      cell: (row) => (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
          {row.slug}
        </code>
      ),
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (row) => (
        <div className="flex items-center">
          {row.image ? (
            <img
              src={row.image}
              alt={row.name}
              className="h-10 w-10 rounded-md object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                e.currentTarget.src =
                  "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfAXaapcezIN7vwylkF1PXSCqAuseUG0gx8mhd";
              }}
            />
          ) : (
            <div className="h-10 w-10 rounded-md bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-500">No Image</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Date Added",
      accessorKey: (row) => formatDate(row.createdAt),
    },
  ];

  return (
    <>
      <DataTable<CategoryDTO>
        title={title}
        data={categories as any}
        columns={columns}
        keyField="id"
        isLoading={false}
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
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>
                The slug will be automatically generated from the name
              </FormDescription>
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
              <FormDescription>Enter the category description</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-5">
          <ImageUploadButton
            title="Category Image"
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            endpoint="categoryImage"
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
              <strong>{categoryToDelete.name}</strong>
              {categoryToDelete.description && (
                <> ({categoryToDelete.description})</>
              )}
              ? This action cannot be undone.
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
