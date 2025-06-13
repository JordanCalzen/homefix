// config/sidebar.ts
import {
	BaggageClaim,
	BarChart2,
	BarChart4,
	Bell,
	Book,
	Cable,
	CircleDollarSign,
	FolderTree,
	Home,
	KeyRound,
	List,
	LucideIcon,
	Presentation,
	RollerCoaster,
	Settings,
	ShoppingBasket,
	ShoppingCartIcon,
	Store,
	User,
	UserPlus,
	Users,
} from "lucide-react";

export interface ISidebarLink {
	title: string;
	href?: string;
	icon: LucideIcon;
	dropdown: boolean;
	permission: string; // Required permission to view this item
	dropdownMenu?: MenuItem[];
}

type MenuItem = {
	title: string;
	href: string;
	permission: string; // Required permission to view this menu item
};

export const sidebarLinks: ISidebarLink[] = [
	{
		title: "Dashboard",
		href: "/dashboard",
		icon: Home,
		dropdown: false,
		permission: "dashboard.read",
	},
	{
		title: "Users",
		icon: Users,
		href: "/dashboard/users",
		dropdown: true,
		permission: "users.read",
		dropdownMenu: [
			{
				title: "All Users",
				href: "/dashboard/users",
				permission: "users.read",
			},
			{
				title: "Service Providers List",
				href: "/dashboard/users",
				permission: "users.read",
			},
			{
				title: "Service Providers Request List",
				href: "/dashboard/users",
				permission: "users.create",
			},
			{
				title: "HomeOwners List",
				href: "/dashboard/users",
				permission: "users.update",
			},
		],
	},
	{
		title: "Service",
		icon: BaggageClaim,
		href: "/dashboard/services",
		dropdown: true,
		permission: "services.read",
		dropdownMenu: [
			{
				title: "Category",
				href: "/dashboard/services",
				permission: "services.read",
			},
			{
				title: "All Services",
				href: "/dashboard/service",
				permission: "services.create",
			},
			{
				title: "Service Request List",
				href: "/dashboard/categories",
				permission: "categories.read",
			},
			{
				title: "Job Service List",
				href: "/dashboard/categories",
				permission: "categories.read",
			},
		],
	},
	// {
	// 	title: "Providers Management",
	// 	icon: User,
	// 	href: "/dashboard/providers-applications",
	// 	dropdown: true,
	// 	permission: "users.read",
	// 	dropdownMenu: [
	// 		{
	// 			title: "Service Providers",
	// 			href: "/dashboard/providers",
	// 			permission: "providers.create",
	// 		},
	// 		{
	// 			title: "Providers Applications",
	// 			href: "/dashboard/provider-applications",
	// 			permission: "provider.verification.read",
	// 		},
	// 	],
	// },
	{
		title: "Booking",
		icon: BaggageClaim,
		dropdown: true,
		href: "/dashboard/bookings",
		permission: "bookings.read",
		dropdownMenu: [
			{
				title: "All Bookings",
				href: "/dashboard/bookings",
				permission: "bookings.read",
			},
			{
				title: " Book a service",
				href: "/dashboard/bookings/book",
				permission: "bookings.create",
			},
		],
	},
	{
		title: "Reviews",
		icon: CircleDollarSign,
		dropdown: true,
		href: "/dashboard/reviews",
		permission: "reviews.read",
		dropdownMenu: [
			{
				title: " All Reviews",
				href: "/dashboard/reviews",
				permission: "reviews.read",
			},
			{
				title: "Approve Reviews",
				href: "/dashboard/sales/customers",
				permission: "customers.read",
			},
		],
	},
	{
		title: "Reports",
		icon: Book,
		dropdown: false,
		href: "/dashboard/reports",
		permission: "reports.read",
	},
	{
		title: "Campaigns",
		icon: Store,
		dropdown: false,
		href: "/dashboard/marketing",
		permission: "marketing.read",
	},
	{
		title: "Product Approvals",
		icon: ShoppingBasket,
		dropdown: false,
		href: "/dashboard/product-approvals",
		permission: "product-approvals.read",
	},
	{
		title: "Change password",
		href: "/dashboard/change-password",
		icon: KeyRound,
		dropdown: false,
		permission: "change-password.read",
	},
	{
		title: "Orders",
		href: "/dashboard/orders",
		icon: ShoppingCartIcon,
		dropdown: false,
		permission: "orders.read",
	},
	{
		title: "Reports",
		icon: BarChart4,
		dropdown: true,
		href: "/dashboard/reports/products",
		permission: "reports.read",
		dropdownMenu: [
			{
				title: "Product Report",
				href: "/dashboard/reports/product",
				permission: "reports.read",
			},
			{
				title: "Inventory Report",
				href: "/dashboard/reports/inventory",
				permission: "reports.read",
			},
			// {
			//   title: "Customers Report",
			//   href: "/dashboard/reports/customers",
			//   permission: "reports.read",
			// },
		],
	},
	{
		title: "Roles",
		href: "/dashboard/users/roles",
		icon: RollerCoaster,
		dropdown: false,
		permission: "roles.read",
	},

	{
		title: "WishList",
		href: "/wishlist",
		permission: "wishlist.read",
		icon: List,
		dropdown: false,
	},
	{
		title: "Notifications",
		href: "/dashboard/notifications",
		icon: Bell,
		dropdown: false,
		permission: "notifications.read",
	},
	{
		title: "Profile",
		href: "/dashboard/profile",
		permission: "roles.read",
		icon: KeyRound,
		dropdown: false,
	},
	{
		title: "Settings",
		href: "/dashboard/settings",
		icon: Settings,
		dropdown: false,
		permission: "settings.read",
	},
];
