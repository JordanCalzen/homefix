import { Footer } from "@/components/frontend/Footer";
import { Header } from "@/components/frontend/Header";
// import { Header } from "@/components/frontend/Header";
import React, { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
	return (
		<div className="">
			<div className="px-2 sm:px-4">{children}</div>
		</div>
	);
}
