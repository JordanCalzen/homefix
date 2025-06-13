// dashboard/categories/page.tsx
import { Suspense } from "react";

import { TableLoading } from "@/components/ui/data-table";
import CategoryDetail from "@/components/groups/category-listing";

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<TableLoading title="Vehicle Inventory" />}>
        <CategoryDetail title="Vehicle Inventory" />
      </Suspense>
    </div>
  );
}
