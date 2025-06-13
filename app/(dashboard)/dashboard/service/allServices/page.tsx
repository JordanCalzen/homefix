// dashboard/categories/page.tsx
import { Suspense } from "react";

import { TableLoading } from "@/components/ui/data-table";


export default function allServicesPage() {
  return (
    <div className="container py-8">
      <Suspense fallback={<TableLoading title="All Services" />}>
        {/* <CategoryDetail title="Vehicle Inventory" /> */}
        <h2>All Services</h2>
      </Suspense>
    </div>
  );
}
