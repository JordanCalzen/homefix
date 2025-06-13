// dashboard/categories/page.tsx
import { Suspense } from "react";

import { TableLoading } from "@/components/ui/data-table";
import ServiceDetail from "@/components/groups/service-listing";

export default function allServicesPage() {
	return (
		<div className="container py-8">
			<Suspense fallback={<TableLoading title="All Services" />}>
				<ServiceDetail title="Services" />
			</Suspense>
		</div>
	);
}
