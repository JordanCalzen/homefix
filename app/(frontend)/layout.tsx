// import { Header } from "@/components/frontend/Header";
import Footer from "@/components/frontend/Footer";
import Header from "@/components/frontend/Header";
import SiteFooter from "@/components/frontend/site-footer";
import { NavbarDemo } from "@/components/frontend/site-header";
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
		<div className="min-h-screen bg-white font-[Montserrat] ">
			{/* <Header session={session} /> */}
			<NavbarDemo session={session} />
			<div className="px-2 sm:px-4">{children}</div>
			{/* <Footer/> */}
			<SiteFooter />
		</div>
	);
}
