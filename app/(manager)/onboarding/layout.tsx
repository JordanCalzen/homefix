import { authOptions } from "@/config/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function OnboardingLayout({
	children,
}: {
	children: ReactNode;
}) {
	// Get the user session from NextAuth
	const session = await getServerSession(authOptions);

	// Redirect to login if not authenticated
	if (!session) {
		redirect("/auth?returnUrl=%2Fonboarding%3Frole%3Dmanager");
	}

	return <div className="min-h-screen w-full">{children}</div>;
}
