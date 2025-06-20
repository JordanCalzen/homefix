"use client";
import React from "react";
import ServiceSection from "./service-section";

export default function ServiceSectionContent() {
	return (
		<div>
			<ServiceSection
				services={[]}
				onFavoriteToggle={function (id: string): void {
					throw new Error("Function not implemented.");
				}}
				onBookService={function (id: string): void {
					throw new Error("Function not implemented.");
				}}
				onServiceView={function (id: string): void {
					throw new Error("Function not implemented.");
				}}
			/>
		</div>
	);
}
