"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	PenToolIcon as Tool,
	Menu,
	User,
	Settings,
	LayoutDashboardIcon,
	LifeBuoy,
	LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./logo";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";

export default function Header({ session }: { session: Session | null }) {
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
						{session ? (
							<div className="cursor-pointer">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Avatar>
											<AvatarImage
												src={session?.user?.image ?? ""}
												alt={session?.user?.name ?? ""}
											/>
											<AvatarFallback>
												{getInitials(session?.user?.name)}
											</AvatarFallback>
										</Avatar>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-50 ">
										<DropdownMenuGroup>
											<DropdownMenuItem>
												<Settings />
												<Link href={`/`}>
													<span>Settings</span>
												</Link>
											</DropdownMenuItem>
										</DropdownMenuGroup>

										<DropdownMenuItem>
											<LayoutDashboardIcon />
											<Link href={`/dashboard`}>
												<span>Dashboard</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<LifeBuoy />
											<Link href={`/`}>
												<span>Support</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem onClick={() => signOut()}>
											<LogOut />
											LogOut
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						) : (
							<div className="hidden md:flex items-center space-x-4">
								<Button asChild variant="ghost">
									<Link href={"/login"}>Log in</Link>
								</Button>
								<Button>
									<Link href="/register">Signup</Link>
								</Button>
							</div>
						)}
						<Sheet>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="relative mr-2 h-10 w-10 rounded-lg border border-border/40 bg-background/80 backdrop-blur-sm transition-all duration-200 hover:bg-accent hover:border-accent-foreground/20 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:hidden"
								>
									<Menu className="h-5 w-5 text-foreground/80 transition-colors" />
									<span className="sr-only">Open navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent
								side="left"
								className="w-80 border-r border-border/40 bg-white backdrop-blur-xl p-0"
							>
								{/* Header Section */}
								<div className="flex items-center justify-between border-b border-border/40 bg-gradient-to-r from-primary/5 to-accent/5 px-6 ">
									<Logo href={"/"} />
								</div>

								{/* Navigation Links */}
								<nav className="flex flex-col gap-2 p-6">
									<div className="mb-2">
										<p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
											Explore
										</p>
									</div>

									<Link
										href="/browse"
										className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
									>
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-100">
											<svg
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<div className="font-medium">Service Providers</div>
											<div className="text-xs text-muted-foreground">
												Find trusted professionals
											</div>
										</div>
										<svg
											className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>

									<Link
										href="/sell"
										className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
									>
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">
											<svg
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<div className="font-medium">Our Services</div>
											<div className="text-xs text-muted-foreground">
												Browse all categories
											</div>
										</div>
										<svg
											className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>

									<Link
										href="/governance"
										className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
									>
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
											<svg
												className="h-4 w-4"
												fill="currentColor"
												viewBox="0 0 24 24"
											>
												<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
											</svg>
										</div>
										<div className="flex-1">
											<div className="font-medium">Reviews & Ratings</div>
											<div className="text-xs text-muted-foreground">
												Customer feedback
											</div>
										</div>
										<svg
											className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>

									{/* Divider */}
									<div className="my-4 border-t border-border/40"></div>

									<div className="mb-2">
										<p className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
											Account
										</p>
									</div>

									<Link
										href="/profile"
										className="group flex items-center gap-4 rounded-xl px-3 py-3.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:translate-x-1"
									>
										<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-50 text-purple-600 transition-colors group-hover:bg-purple-100">
											<svg
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
												/>
											</svg>
										</div>
										<div className="flex-1">
											<div className="font-medium">My Profile</div>
											<div className="text-xs text-muted-foreground">
												Settings & preferences
											</div>
										</div>
										<svg
											className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M9 5l7 7-7 7"
											/>
										</svg>
									</Link>
								</nav>

								{/* Footer Section */}
								<div className="absolute bottom-0 left-0 right-0 border-t border-border/40 bg-gradient-to-r from-muted/50 to-accent/10 p-6">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-sm font-medium text-foreground">
												Need Help?
											</p>
											<p className="text-xs text-muted-foreground">
												Contact support
											</p>
										</div>
										<Button size="sm" variant="outline" className="h-8 text-xs">
											Support
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>
		</div>
	);
}
