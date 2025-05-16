// import { Header } from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import React, { ReactNode } from "react";

export default function FrontendLayout({ children }: { children: ReactNode }) {
	return (
		<div className="min-h-screen bg-white font-[Montserrat] bg-gradient-to-b from-blue-300 to-blue-50">
			<Header />
			<div className="px-2 sm:px-4">{children}</div>
			<Footer />
		</div>
	);
}
