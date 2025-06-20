// import { Header } from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";

export default async function FrontendLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await getServerSession(authOptions);

	return (
		<div className="min-h-screen bg-white font-[Montserrat] bg-gradient-to-b from-blue-300 to-blue-50">
			<Header session={session} />
			<div className="px-2 sm:px-4">{children}</div>
			<Footer />
		</div>
	);
}
