"use client";
import Link from "next/link";
import React from "react";
import Logo from "../frontend/logo";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

export default function ManagerHeader() {
	const searchParams = useSearchParams();
	const role = searchParams.get("role") || "manager";
	console.log(role);
	return (
		<header className=" border-b  bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-lg sticky top-0 z-50">
			<div className=" flex h-16  px-2 items-center justify-between">
				<Logo href="/" />

				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="#benefits"
						className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
					>
						Benefits
					</Link>
					<Link
						href="#testimonials"
						className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
					>
						Success Stories
					</Link>
					<Link
						href="#resources"
						className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
					>
						Resources
					</Link>
					<Link
						href="#faq"
						className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
					>
						FAQ
					</Link>
				</nav>
				<Button
					variant="outline"
					asChild
					className="ml-4 hidden sm:inline-flex bg-gradient-to-r from-sky-400 to-blue-600 text-white hover:bg-sky-300 hover:to-blue-600/80 hover:text-white transition duration-300"
				>
					<Link href={"/onboarding?role=manager"}>Get Started</Link>
				</Button>
			</div>
		</header>
	);
}
