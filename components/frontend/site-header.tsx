"use client";
import {
	Navbar,
	NavBody,
	NavItems,
	MobileNav,
	NavbarLogo,
	NavbarButton,
	MobileNavHeader,
	MobileNavToggle,
	MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { redirect } from "next/navigation";
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/lib/generateInitials";
import { LayoutDashboardIcon, LifeBuoy, LogOut, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Session } from "next-auth";

export function NavbarDemo({ session }: { session: Session | null }) {
	const navItems = [
		{
			name: "Home",
			link: "/",
		},
		{
			name: "About",
			link: "/about",
		},
		{
			name: "Services",
			link: "/services",
		},
		{
			name: "Providers",
			link: "/providers",
		},
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<Navbar className="z-[150]">
			<NavBody>
				<NavbarLogo />
				<NavItems items={navItems} />
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
							<NavbarButton className="bg-primary text-white">
								<Link href="/login">Log in</Link>
							</NavbarButton>
							<NavbarButton>
								<Link href="/register">Signup</Link>
							</NavbarButton>
						</div>
					)}
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo />
					<div className="flex items-center gap-4">
						<MobileNavToggle
							isOpen={isMobileMenuOpen}
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						/>
					</div>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					{navItems.map((item, idx) => (
						<Link
							key={`mobile-link-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</Link>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton className="bg-primary text-white">
							<Link href="/login">Log in</Link>
						</NavbarButton>
						<NavbarButton>
							<Link href="/register">Signup</Link>
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}
