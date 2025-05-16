// config/routes.ts

// import { Role } from "@prisma/client";
import {
	LayoutDashboard,
	Users,
	Target,
	Car,
	ShoppingCart,
	Settings,
	UserCog,
	KeyRound,
	MessageSquare,
	ChevronRight,
	Bike,
} from "lucide-react";

export type Role = "adminRole" | "managerRole" | "homeownerRole";

export type Route = {
	title: string;
	href: string;
	icon: any;
	roles?: Role[]; // Which roles can access this route
	group?: string; // Optional grouping for related routes
	isNew?: boolean; // Optional flag for new features
};

export const routes: Route[] = [
	// Dashboard (standalone)
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: LayoutDashboard,
		roles: ["adminRole"],
	},
	{
		title: "Users",
		href: "/dashboard/users",
		icon: Users,
		roles: ["adminRole"],
	},

	// Sales group
	{
		title: "Sales Targets",
		href: "/dashboard/sale-targets",
		icon: Target,
		roles: ["homeownerRole", "adminRole"],
		group: "Sales",
	},
	{
		title: "Sales Persons",
		href: "/dashboard/sales-persons",
		icon: Users,
		roles: ["homeownerRole", "adminRole"],
		group: "Sales",
	},
	{
		title: "Models",
		href: "/dashboard/models",
		icon: Bike,
		roles: ["homeownerRole", "adminRole"],
		group: "Sales",
	},
	{
		title: "Products",
		href: "/dashboard/products",
		icon: Car,
		roles: ["homeownerRole", "adminRole"],
		group: "Sales",
	},
	// {
	// 	title: "Sales",
	// 	href: "/dashboard/sales",
	// 	icon: ShoppingCart,
	// 	roles: ["USER", "ADMIN"],
	// 	group: "Sales",
	// 	isNew: true,
	// },

	// Settings group
	// {
	// 	title: "Change Password",
	// 	href: "/dashboard/settings/change-password",
	// 	icon: KeyRound,
	// 	roles: ["USER", "ADMIN"],
	// 	group: "Settings",
	// },
	// {
	// 	title: "Update Profile",
	// 	href: "/dashboard/settings/profile",
	// 	icon: UserCog,
	// 	roles: ["USER", "ADMIN"],
	// 	group: "Settings",
	// },
	// {
	// 	title: "Feedback",
	// 	href: "/dashboard/settings/feedback",
	// 	icon: MessageSquare,
	// 	roles: ["USER", "ADMIN"],
	// 	group: "Settings",
	// },
];

// Helper function to get routes for a specific role
export const getRoutesByRole = (role: Role) => {
	return routes.filter((route) => route.roles?.includes(role));
};

// Helper function to get routes by group for a specific role
export const getRoutesByGroup = (role: Role) => {
	const userRoutes = getRoutesByRole(role);
	const groups = new Map<string, Route[]>();

	// Add Dashboard as its own group first for proper ordering
	groups.set(
		"Dashboard",
		userRoutes.filter((route) => !route.group)
	);

	// Then add the rest of the groups
	userRoutes.forEach((route) => {
		if (route.group) {
			if (!groups.has(route.group)) {
				groups.set(route.group, []);
			}
			groups.get(route.group)?.push(route);
		}
	});

	return groups;
};

// Helper to check if a user has access to a specific route
export const hasRouteAccess = (route: Route, role: Role) => {
	return route.roles?.includes(role);
};
