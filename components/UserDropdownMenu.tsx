"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { getInitials } from "@/lib/generateInitials";
import {
	LogOut,
	Target,
	Car,
	Users,
	ShoppingCart,
	ChevronsUpDown,
	Settings,
	KeyRound,
	UserCog,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getInitials } from "@/lib/generateInitials";

interface UserDropdownProps {
	username: string;
	email: string;
	avatarUrl?: string;
}

export function UserDropdownMenu({
	username,
	email,
	avatarUrl,
}: UserDropdownProps) {
	const router = useRouter();
	async function handleLogout() {
		try {
			await signOut();
			router.push("/login");
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="relative h-12 w-full justify-start gap-2 px-4"
				>
					<Avatar className="hidden md:flex h-10 w-10 border-2 border-indigo-200 dark:border-indigo-800 shadow">
						<AvatarImage src={avatarUrl} alt={username} />
						<AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-medium text-lg">
							{getInitials(username)}
						</AvatarFallback>
					</Avatar>
					<div className="flex flex-col items-start">
						<span className="text-sm font-medium">{username}</span>
						<span className="text-xs text-muted-foreground">{email}</span>
					</div>
					<ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuGroup>
					<Link href="/dashboard/sale-targets" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<Target className="mr-2 h-4 w-4" />
							<span>Service Booking</span>
						</DropdownMenuItem>
					</Link>
					<Link href="/dashboard/products" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<Car className="mr-2 h-4 w-4" />
							<span>Services</span>
						</DropdownMenuItem>
					</Link>
					<Link href="/dashboard/sales-persons" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<Users className="mr-2 h-4 w-4" />
							<span>Sales Providers</span>
						</DropdownMenuItem>
					</Link>
					<Link href="/dashboard/sales" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<ShoppingCart className="mr-2 h-4 w-4" />
							<span>Service History</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href="/dashboard/settings/profile" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<UserCog className="mr-2 h-4 w-4" />
							<span>Profile Settings</span>
						</DropdownMenuItem>
					</Link>
					<Link href="/dashboard/settings/change-password" passHref>
						<DropdownMenuItem className="cursor-pointer">
							<KeyRound className="mr-2 h-4 w-4" />
							<span>Change Password</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
					<LogOut className="mr-2 h-4 w-4" />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
