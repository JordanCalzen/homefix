import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PenToolIcon as Tool, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

export default function Header() {
	return (
		<div className="px-4 md:px-6 pt-2 sticky top-0 z-50 w-full">
			<header className=" border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-lg">
				<div className=" flex h-16 px-2 items-center justify-between">
					<Logo href="/" />

					<nav className="hidden md:flex items-center gap-6">
						<Link
							href="#"
							className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
						>
							Home
						</Link>
						<Link
							href="#"
							className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
						>
							Explore
						</Link>
						<Link
							href="#"
							className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
						>
							Providers
						</Link>
					</nav>

					<div className="flex items-center gap-4">
						<Button asChild variant="outline" className="hidden sm:flex">
							<Link href="/login"> Sign In</Link>
						</Button>
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
								>
									<Menu className="h-6 w-6" />
									<span className="sr-only">Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="pr-0">
								<nav className="grid gap-6 px-2 py-6">
									<Link href="/browse" className="hover:text-foreground/80">
										Providers
									</Link>
									<Link href="/sell" className="hover:text-foreground/80">
										Services
									</Link>
									<Link href="/governance" className="hover:text-foreground/80">
										Reviews
									</Link>
									<Link href="/profile" className="hover:text-foreground/80">
										Profile
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>
		</div>
	);
}
