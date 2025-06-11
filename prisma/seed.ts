import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const adminPermissions = [
	// Dashboard
	"dashboard.create",
	"dashboard.read",
	"dashboard.update",
	"dashboard.delete",

	// User Management
	"users.create",
	"users.read",
	"users.update",
	"users.delete",
	"roles.create",
	"roles.read",
	"roles.update",
	"roles.delete",

	// Service Management
	"services.create",
	"services.read",
	"services.update",
	"services.delete",
	"categories.create",
	"categories.read",
	"categories.update",
	"categories.delete",

	// Booking Management
	// "bookings.create",
	"bookings.read",
	"bookings.update",
	"bookings.delete",

	// Provider Management
	"providers.create",
	"providers.read",
	"providers.update",
	"providers.delete",
	"provider.verification.read",
	"provider.verification.update",

	// Customer Management
	"customers.create",
	"customers.read",
	"customers.update",
	"customers.delete",

	// Payments
	"payments.read",
	"payments.update",
	"refunds.create",
	"refunds.read",

	// Reviews
	"reviews.read",
	"reviews.delete",

	// Reports
	"reports.read",
	"reports.export",

	// Settings
	"settings.read",
	"settings.update",
	"profile.read",
	"profile.update",
	"password.change",
];

const providerPermissions = [
	// Dashboard
	"dashboard.read",

	// Profile
	"profile.read",
	"profile.update",
	"password.change",

	// Service Management
	"services.create",
	"services.read",
	"services.update",

	// Booking Management
	"bookings.read",
	"bookings.update",

	// Reviews
	"reviews.read",

	// Payments
	"payments.read",

	// Customer Communication
	"messages.read",
	"messages.send",
];

const customerPermissions = [
	// Dashboard
	"dashboard.read",

	// Profile
	"profile.read",
	"profile.update",
	"password.change",

	// Service Browsing
	"services.read",
	"categories.read",

	// Booking Management
	"bookings.create",
	"bookings.read",
	"bookings.update",
	"bookings.cancel",

	// Reviews
	"reviews.create",
	"reviews.read",
	"reviews.update",

	// Payments
	"payments.create",
	"payments.read",

	// Support
	"messages.send",
	"messages.read",
];

const categoriesData = [
	{
		name: "Cleaning Services",
		slug: "cleaning-services",
		description: "Professional home and office cleaning services",
		image: "/images/categories/cleaning.jpg",
	},
	{
		name: "Plumbing",
		slug: "plumbing",
		description: "Expert plumbing repairs and installations",
		image: "/images/categories/plumbing.jpg",
	},
	{
		name: "Electrical",
		slug: "electrical",
		description: "Licensed electrical services and repairs",
		image: "/images/categories/electrical.jpg",
	},
	{
		name: "HVAC",
		slug: "hvac",
		description: "Heating, ventilation, and air conditioning services",
		image: "/images/categories/hvac.jpg",
	},
	{
		name: "Landscaping",
		slug: "landscaping",
		description: "Garden design, maintenance, and lawn care",
		image: "/images/categories/landscaping.jpg",
	},
	{
		name: "Painting",
		slug: "painting",
		description: "Interior and exterior painting services",
		image: "/images/categories/painting.jpg",
	},
	{
		name: "Carpentry",
		slug: "carpentry",
		description: "Custom woodwork and furniture repair",
		image: "/images/categories/carpentry.jpg",
	},
	{
		name: "Home Security",
		slug: "home-security",
		description: "Security system installation and monitoring",
		image: "/images/categories/security.jpg",
	},
];

const servicesData = [
	// Cleaning Services
	{
		name: "Deep House Cleaning",
		description: "Comprehensive deep cleaning service for your entire home",
		image: "/images/services/deep-cleaning.jpg",
		price: "$150-300",
		duration: "4-6 hours",
		rating: 4.8,
		reviewCount: 127,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[0].slug,
	},
	{
		name: "Regular House Cleaning",
		description: "Weekly or bi-weekly house cleaning service",
		image: "/images/services/regular-cleaning.jpg",
		price: "$80-150",
		duration: "2-3 hours",
		rating: 4.6,
		reviewCount: 203,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[0].slug,
	},
	{
		name: "Move-in/Out Cleaning",
		description: "Thorough cleaning for moving in or out of a property",
		image: "/images/services/move-cleaning.jpg",
		price: "$200-400",
		duration: "5-8 hours",
		rating: 4.9,
		reviewCount: 89,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[0].slug,
	},

	// Plumbing
	{
		name: "Emergency Plumbing Repair",
		description: "24/7 emergency plumbing services for urgent issues",
		image: "/images/services/emergency-plumbing.jpg",
		price: "$100-250",
		duration: "1-3 hours",
		rating: 4.7,
		reviewCount: 156,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[1].slug,
	},
	{
		name: "Drain Cleaning",
		description: "Professional drain cleaning and unclogging services",
		image: "/images/services/drain-cleaning.jpg",
		price: "$75-150",
		duration: "1-2 hours",
		rating: 4.5,
		reviewCount: 92,
		popular: true,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[1].slug,
	},
	{
		name: "Faucet Installation",
		description: "Installation and replacement of kitchen and bathroom faucets",
		image: "/images/services/faucet-install.jpg",
		price: "$80-200",
		duration: "1-2 hours",
		rating: 4.6,
		reviewCount: 74,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[1].slug,
	},

	// Electrical
	{
		name: "Electrical Panel Upgrade",
		description: "Upgrade your electrical panel for modern safety standards",
		image: "/images/services/panel-upgrade.jpg",
		price: "$800-2000",
		duration: "4-8 hours",
		rating: 4.9,
		reviewCount: 45,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[2].slug,
	},
	{
		name: "Light Fixture Installation",
		description:
			"Installation of ceiling fans, chandeliers, and light fixtures",
		image: "/images/services/light-install.jpg",
		price: "$100-300",
		duration: "1-3 hours",
		rating: 4.7,
		reviewCount: 118,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[2].slug,
	},
	{
		name: "Outlet Installation",
		description: "Installation of new electrical outlets and switches",
		image: "/images/services/outlet-install.jpg",
		price: "$75-150",
		duration: "1-2 hours",
		rating: 4.6,
		reviewCount: 86,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[2].slug,
	},

	// HVAC
	{
		name: "AC Installation",
		description: "Professional air conditioning system installation",
		image: "/images/services/ac-install.jpg",
		price: "$2000-5000",
		duration: "6-12 hours",
		rating: 4.8,
		reviewCount: 67,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[3].slug,
	},
	{
		name: "Furnace Repair",
		description: "Heating system diagnosis and repair services",
		image: "/images/services/furnace-repair.jpg",
		price: "$150-400",
		duration: "2-4 hours",
		rating: 4.6,
		reviewCount: 134,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[3].slug,
	},
	{
		name: "Duct Cleaning",
		description: "Professional air duct cleaning and sanitization",
		image: "/images/services/duct-cleaning.jpg",
		price: "$300-600",
		duration: "3-5 hours",
		rating: 4.5,
		reviewCount: 91,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[3].slug,
	},

	// Landscaping
	{
		name: "Lawn Maintenance",
		description: "Regular lawn mowing, trimming, and maintenance",
		image: "/images/services/lawn-maintenance.jpg",
		price: "$50-120",
		duration: "1-2 hours",
		rating: 4.6,
		reviewCount: 245,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[4].slug,
	},
	{
		name: "Garden Design",
		description: "Custom garden design and landscaping services",
		image: "/images/services/garden-design.jpg",
		price: "$500-2000",
		duration: "1-3 days",
		rating: 4.9,
		reviewCount: 38,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[4].slug,
	},
	{
		name: "Tree Trimming",
		description: "Professional tree pruning and trimming services",
		image: "/images/services/tree-trimming.jpg",
		price: "$200-800",
		duration: "2-6 hours",
		rating: 4.7,
		reviewCount: 72,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[4].slug,
	},

	// Painting
	{
		name: "Interior Painting",
		description: "Professional interior house painting services",
		image: "/images/services/interior-painting.jpg",
		price: "$300-1500",
		duration: "1-3 days",
		rating: 4.8,
		reviewCount: 156,
		featured: true,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[5].slug,
	},
	{
		name: "Exterior Painting",
		description: "Complete exterior house painting and touch-ups",
		image: "/images/services/exterior-painting.jpg",
		price: "$1000-5000",
		duration: "2-5 days",
		rating: 4.7,
		reviewCount: 89,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[5].slug,
	},

	// Carpentry
	{
		name: "Custom Furniture",
		description: "Handcrafted custom furniture and cabinetry",
		image: "/images/services/custom-furniture.jpg",
		price: "$500-3000",
		duration: "1-2 weeks",
		rating: 4.9,
		reviewCount: 34,
		featured: true,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[6].slug,
	},
	{
		name: "Furniture Repair",
		description: "Repair and restoration of existing furniture",
		image: "/images/services/furniture-repair.jpg",
		price: "$100-500",
		duration: "2-5 hours",
		rating: 4.6,
		reviewCount: 67,
		popular: false,
		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[6].slug,
	},

	// Home Security
	{
		name: "Security System Installation",
		description: "Complete home security system setup and configuration",
		image: "/images/services/security-install.jpg",
		price: "$300-1200",
		duration: "3-6 hours",
		rating: 4.8,
		reviewCount: 93,
		featured: true,
		new: true,
		popular: false,
		isActive: true,

		isFavorite: false,
		categorySlug: categoriesData[7].slug,
	},
	{
		name: "Camera Installation",
		description: "Security camera installation and monitoring setup",
		image: "/images/services/camera-install.jpg",
		price: "$200-800",
		duration: "2-4 hours",
		rating: 4.7,
		reviewCount: 76,
		popular: true,

		isActive: true,
		new: false,
		isFavorite: false,
		categorySlug: categoriesData[7].slug,
	},
];

async function cleanDatabase() {
	console.log("Cleaning up existing data...");
	try {
		// Use a transaction to ensure data consistency
		await prisma.$transaction(async (tx) => {
			// Get all users
			const users = await tx.user.findMany({
				include: {
					roles: true,
				},
			});

			// Disconnect all roles from users
			for (const user of users) {
				if (user.roles.length > 0) {
					await tx.user.update({
						where: { id: user.id },
						data: {
							roles: {
								disconnect: user.roles.map((role) => ({ id: role.id })),
							},
						},
					});
				}
			}

			// Delete all users
			const deleteUsers = await tx.user.deleteMany({});
			console.log("Deleted users:", deleteUsers.count);

			// Delete all roles
			const deleteRoles = await tx.role.deleteMany({});
			console.log("Deleted roles:", deleteRoles.count);

			//Delete all the services
			const deletedServices = await tx.service.deleteMany({});
			console.log("Deleted Services:", deletedServices.count);

			//Delete all the categories
			const deletedCategories = await tx.category.deleteMany({});
			console.log("Deleted categories:", deletedCategories.count);
		});

		console.log("Database cleanup completed.");
	} catch (error) {
		console.error("Error during cleanup:", error);
		throw error;
	}
}

async function seedDatabase() {
	try {
		console.log("Starting to seed new data...");

		// Create roles
		console.log("Creating roles...");

		const adminRole = await prisma.role.create({
			data: {
				displayName: "Administrator",
				roleName: "admin",
				description: "Full system access with all permissions",
				permissions: adminPermissions,
			},
		});

		const homeownerRole = await prisma.role.create({
			data: {
				displayName: "Homeowner",
				roleName: "homeowner",
				description: "Regular user with homeowner access",
				permissions: providerPermissions,
			},
		});

		const managerRole = await prisma.role.create({
			data: {
				displayName: "Manager",
				roleName: "manager",
				description: "System manager with elevated permissions",
				permissions: customerPermissions,
			},
		});

		console.log(
			`Created roles: ${adminRole.displayName}, ${homeownerRole.displayName}, ${managerRole.displayName}`
		);

		// Get current year for password generation
		const currentYear = new Date().getFullYear();

		// Create admin user
		console.log("Creating admin user...");
		const adminPassword = `Admin@${currentYear}`;
		const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

		const adminUser = await prisma.user.create({
			data: {
				email: "admin@example.com",
				phone: "1234567890",
				name: "System Admin",
				password: hashedAdminPassword,
				status: true,
				emailVerified: new Date(),
				roles: {
					connect: [{ id: adminRole.id }],
				},
			},
		});

		// Create a user with multiple roles
		console.log("Creating multi-role user...");
		const managerPassword = `Manager@${currentYear}`;
		const hashedManagerPassword = await bcrypt.hash(managerPassword, 10);

		const managerUser = await prisma.user.create({
			data: {
				email: "manager@example.com",
				phone: "2345678901",
				name: "System Manager",
				password: hashedManagerPassword,
				status: true,
				emailVerified: new Date(),
				roles: {
					connect: [{ id: managerRole.id }, { id: homeownerRole.id }],
				},
			},
		});

		// Create regular user
		console.log("Creating regular user...");
		const userPassword = `User@${currentYear}`;
		const hashedUserPassword = await bcrypt.hash(userPassword, 10);

		const regularUser = await prisma.user.create({
			data: {
				email: "user@example.com",
				phone: "3456789012",
				name: "Regular User",
				password: hashedUserPassword,
				status: true,
				roles: {
					connect: [{ id: homeownerRole.id }],
				},
			},
		});

		console.log("Seed completed successfully!");
		console.log("Admin credentials:", {
			email: "admin@example.com",
			password: adminPassword,
		});
		console.log("Manager credentials:", {
			email: "manager@example.com",
			password: managerPassword,
		});
		console.log("User credentials:", {
			email: "user@example.com",
			password: userPassword,
		});

		//creating categories
		console.log("Creating categories...");
		const createdCategories = [];
		for (const categoryData of categoriesData) {
			const createdCategory = await prisma.category.create({
				data: categoryData,
			});
			createdCategories.push(createdCategory);
		}
		console.log(
			"Created categories:",
			createdCategories.map((c) => c.name)
		);

		//creating services
		console.log("Creating services...");
		const createdServices = [];
		for (const serviceData of servicesData) {
			const { categorySlug, ...serviceDataWithoutSlug } = serviceData;
			const createdService = await prisma.service.create({
				data: {
					...serviceDataWithoutSlug,
					category: {
						connect: {
							name: categoriesData.find((c) => c.slug === categorySlug)!.name,
						},
					},
				},
			});
			createdServices.push(createdService);
		}
		console.log(
			"Created services:",
			createdServices.map((s) => s.name)
		);
	} catch (error) {
		console.error("Error during seeding:", error);
		throw error;
	}
}

async function main() {
	console.log("Starting database seed process...");

	try {
		// First clean up existing data
		await cleanDatabase();

		// Then seed new data
		await seedDatabase();

		console.log("Database seeding completed successfully!");
	} catch (error) {
		console.error("Error in main seed process:", error);
		throw error;
	}
}

main()
	.catch((e) => {
		console.error("Failed to seed database:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

// const adminPermissions = [
// 	// Dashboard
// 	"dashboard.create",
// 	"dashboard.read",
// 	"dashboard.update",
// 	"dashboard.delete",

// 	// User Management
// 	"users.create",
// 	"users.read",
// 	"users.update",
// 	"users.delete",
// 	"roles.create",
// 	"roles.read",
// 	"roles.update",
// 	"roles.delete",

// 	// Service Management
// 	"services.create",
// 	"services.read",
// 	"services.update",
// 	"services.delete",
// 	"categories.create",
// 	"categories.read",
// 	"categories.update",
// 	"categories.delete",

// 	// Booking Management
// 	// "bookings.create",
// 	"bookings.read",
// 	"bookings.update",
// 	"bookings.delete",

// 	// Provider Management
// 	"providers.create",
// 	"providers.read",
// 	"providers.update",
// 	"providers.delete",
// 	"provider.verification.read",
// 	"provider.verification.update",

// 	// Customer Management
// 	"customers.create",
// 	"customers.read",
// 	"customers.update",
// 	"customers.delete",

// 	// Payments
// 	"payments.read",
// 	"payments.update",
// 	"refunds.create",
// 	"refunds.read",

// 	// Reviews
// 	"reviews.read",
// 	"reviews.delete",

// 	// Reports
// 	"reports.read",
// 	"reports.export",

// 	// Settings
// 	"settings.read",
// 	"settings.update",
// 	"profile.read",
// 	"profile.update",
// 	"password.change",
// ];

// const providerPermissions = [
// 	// Dashboard
// 	"dashboard.read",

// 	// Profile
// 	"profile.read",
// 	"profile.update",
// 	"password.change",

// 	// Service Management
// 	"services.create",
// 	"services.read",
// 	"services.update",

// 	// Booking Management
// 	"bookings.read",
// 	"bookings.update",

// 	// Reviews
// 	"reviews.read",

// 	// Payments
// 	"payments.read",

// 	// Customer Communication
// 	"messages.read",
// 	"messages.send",
// ];

// const customerPermissions = [
// 	// Dashboard
// 	"dashboard.read",

// 	// Profile
// 	"profile.read",
// 	"profile.update",
// 	"password.change",

// 	// Service Browsing
// 	"services.read",
// 	"categories.read",

// 	// Booking Management
// 	"bookings.create",
// 	"bookings.read",
// 	"bookings.update",
// 	"bookings.cancel",

// 	// Reviews
// 	"reviews.create",
// 	"reviews.read",
// 	"reviews.update",

// 	// Payments
// 	"payments.create",
// 	"payments.read",

// 	// Support
// 	"messages.send",
// 	"messages.read",
// ];

// const categoriesData = [
// 	{
// 		name: "Cleaning Services",
// 		slug: "cleaning-services",
// 		description: "Professional home and office cleaning services",
// 		image: "/images/categories/cleaning.jpg",
// 	},
// 	{
// 		name: "Plumbing",
// 		slug: "plumbing",
// 		description: "Expert plumbing repairs and installations",
// 		image: "/images/categories/plumbing.jpg",
// 	},
// 	{
// 		name: "Electrical",
// 		slug: "electrical",
// 		description: "Licensed electrical services and repairs",
// 		image: "/images/categories/electrical.jpg",
// 	},
// 	{
// 		name: "HVAC",
// 		slug: "hvac",
// 		description: "Heating, ventilation, and air conditioning services",
// 		image: "/images/categories/hvac.jpg",
// 	},
// 	{
// 		name: "Landscaping",
// 		slug: "landscaping",
// 		description: "Garden design, maintenance, and lawn care",
// 		image: "/images/categories/landscaping.jpg",
// 	},
// 	{
// 		name: "Painting",
// 		slug: "painting",
// 		description: "Interior and exterior painting services",
// 		image: "/images/categories/painting.jpg",
// 	},
// 	{
// 		name: "Carpentry",
// 		slug: "carpentry",
// 		description: "Custom woodwork and furniture repair",
// 		image: "/images/categories/carpentry.jpg",
// 	},
// 	{
// 		name: "Home Security",
// 		slug: "home-security",
// 		description: "Security system installation and monitoring",
// 		image: "/images/categories/security.jpg",
// 	},
// ];

// const servicesData = [
// 	// Cleaning Services
// 	{
// 		name: "Deep House Cleaning",
// 		description: "Comprehensive deep cleaning service for your entire home",
// 		image: "/images/services/deep-cleaning.jpg",
// 		price: "$150-300",
// 		duration: "4-6 hours",
// 		rating: 4.8,
// 		reviewCount: 127,
// 		featured: true,
// 		popular: true,
// 		categorySlug: "cleaning-services",
// 	},
// 	{
// 		name: "Regular House Cleaning",
// 		description: "Weekly or bi-weekly house cleaning service",
// 		image: "/images/services/regular-cleaning.jpg",
// 		price: "$80-150",
// 		duration: "2-3 hours",
// 		rating: 4.6,
// 		reviewCount: 203,
// 		popular: true,
// 		categorySlug: "cleaning-services",
// 	},
// 	{
// 		name: "Move-in/Out Cleaning",
// 		description: "Thorough cleaning for moving in or out of a property",
// 		image: "/images/services/move-cleaning.jpg",
// 		price: "$200-400",
// 		duration: "5-8 hours",
// 		rating: 4.9,
// 		reviewCount: 89,
// 		categorySlug: "cleaning-services",
// 	},

// 	// Plumbing
// 	{
// 		name: "Emergency Plumbing Repair",
// 		description: "24/7 emergency plumbing services for urgent issues",
// 		image: "/images/services/emergency-plumbing.jpg",
// 		price: "$100-250",
// 		duration: "1-3 hours",
// 		rating: 4.7,
// 		reviewCount: 156,
// 		featured: true,
// 		categorySlug: "plumbing",
// 	},
// 	{
// 		name: "Drain Cleaning",
// 		description: "Professional drain cleaning and unclogging services",
// 		image: "/images/services/drain-cleaning.jpg",
// 		price: "$75-150",
// 		duration: "1-2 hours",
// 		rating: 4.5,
// 		reviewCount: 92,
// 		popular: true,
// 		categorySlug: "plumbing",
// 	},
// 	{
// 		name: "Faucet Installation",
// 		description: "Installation and replacement of kitchen and bathroom faucets",
// 		image: "/images/services/faucet-install.jpg",
// 		price: "$80-200",
// 		duration: "1-2 hours",
// 		rating: 4.6,
// 		reviewCount: 74,
// 		categorySlug: "plumbing",
// 	},

// 	// Electrical
// 	{
// 		name: "Electrical Panel Upgrade",
// 		description: "Upgrade your electrical panel for modern safety standards",
// 		image: "/images/services/panel-upgrade.jpg",
// 		price: "$800-2000",
// 		duration: "4-8 hours",
// 		rating: 4.9,
// 		reviewCount: 45,
// 		featured: true,
// 		categorySlug: "electrical",
// 	},
// 	{
// 		name: "Light Fixture Installation",
// 		description:
// 			"Installation of ceiling fans, chandeliers, and light fixtures",
// 		image: "/images/services/light-install.jpg",
// 		price: "$100-300",
// 		duration: "1-3 hours",
// 		rating: 4.7,
// 		reviewCount: 118,
// 		popular: true,
// 		categorySlug: "electrical",
// 	},
// 	{
// 		name: "Outlet Installation",
// 		description: "Installation of new electrical outlets and switches",
// 		image: "/images/services/outlet-install.jpg",
// 		price: "$75-150",
// 		duration: "1-2 hours",
// 		rating: 4.6,
// 		reviewCount: 86,
// 		categorySlug: "electrical",
// 	},

// 	// HVAC
// 	{
// 		name: "AC Installation",
// 		description: "Professional air conditioning system installation",
// 		image: "/images/services/ac-install.jpg",
// 		price: "$2000-5000",
// 		duration: "6-12 hours",
// 		rating: 4.8,
// 		reviewCount: 67,
// 		featured: true,
// 		categorySlug: "hvac",
// 	},
// 	{
// 		name: "Furnace Repair",
// 		description: "Heating system diagnosis and repair services",
// 		image: "/images/services/furnace-repair.jpg",
// 		price: "$150-400",
// 		duration: "2-4 hours",
// 		rating: 4.6,
// 		reviewCount: 134,
// 		popular: true,
// 		categorySlug: "hvac",
// 	},
// 	{
// 		name: "Duct Cleaning",
// 		description: "Professional air duct cleaning and sanitization",
// 		image: "/images/services/duct-cleaning.jpg",
// 		price: "$300-600",
// 		duration: "3-5 hours",
// 		rating: 4.5,
// 		reviewCount: 91,
// 		categorySlug: "hvac",
// 	},

// 	// Landscaping
// 	{
// 		name: "Lawn Maintenance",
// 		description: "Regular lawn mowing, trimming, and maintenance",
// 		image: "/images/services/lawn-maintenance.jpg",
// 		price: "$50-120",
// 		duration: "1-2 hours",
// 		rating: 4.6,
// 		reviewCount: 245,
// 		popular: true,
// 		categorySlug: "landscaping",
// 	},
// 	{
// 		name: "Garden Design",
// 		description: "Custom garden design and landscaping services",
// 		image: "/images/services/garden-design.jpg",
// 		price: "$500-2000",
// 		duration: "1-3 days",
// 		rating: 4.9,
// 		reviewCount: 38,
// 		featured: true,
// 		categorySlug: "landscaping",
// 	},
// 	{
// 		name: "Tree Trimming",
// 		description: "Professional tree pruning and trimming services",
// 		image: "/images/services/tree-trimming.jpg",
// 		price: "$200-800",
// 		duration: "2-6 hours",
// 		rating: 4.7,
// 		reviewCount: 72,
// 		categorySlug: "landscaping",
// 	},

// 	// Painting
// 	{
// 		name: "Interior Painting",
// 		description: "Professional interior house painting services",
// 		image: "/images/services/interior-painting.jpg",
// 		price: "$300-1500",
// 		duration: "1-3 days",
// 		rating: 4.8,
// 		reviewCount: 156,
// 		featured: true,
// 		popular: true,
// 		categorySlug: "painting",
// 	},
// 	{
// 		name: "Exterior Painting",
// 		description: "Complete exterior house painting and touch-ups",
// 		image: "/images/services/exterior-painting.jpg",
// 		price: "$1000-5000",
// 		duration: "2-5 days",
// 		rating: 4.7,
// 		reviewCount: 89,
// 		categorySlug: "painting",
// 	},

// 	// Carpentry
// 	{
// 		name: "Custom Furniture",
// 		description: "Handcrafted custom furniture and cabinetry",
// 		image: "/images/services/custom-furniture.jpg",
// 		price: "$500-3000",
// 		duration: "1-2 weeks",
// 		rating: 4.9,
// 		reviewCount: 34,
// 		featured: true,
// 		categorySlug: "carpentry",
// 	},
// 	{
// 		name: "Furniture Repair",
// 		description: "Repair and restoration of existing furniture",
// 		image: "/images/services/furniture-repair.jpg",
// 		price: "$100-500",
// 		duration: "2-5 hours",
// 		rating: 4.6,
// 		reviewCount: 67,
// 		categorySlug: "carpentry",
// 	},

// 	// Home Security
// 	{
// 		name: "Security System Installation",
// 		description: "Complete home security system setup and configuration",
// 		image: "/images/services/security-install.jpg",
// 		price: "$300-1200",
// 		duration: "3-6 hours",
// 		rating: 4.8,
// 		reviewCount: 93,
// 		featured: true,
// 		new: true,
// 		categorySlug: "home-security",
// 	},
// 	{
// 		name: "Camera Installation",
// 		description: "Security camera installation and monitoring setup",
// 		image: "/images/services/camera-install.jpg",
// 		price: "$200-800",
// 		duration: "2-4 hours",
// 		rating: 4.7,
// 		reviewCount: 76,
// 		popular: true,
// 		categorySlug: "home-security",
// 	},
// ];

// async function cleanDatabase() {
// 	console.log("Cleaning up existing data...");
// 	try {
// 		// Use a transaction to ensure data consistency
// 		await prisma.$transaction(async (tx) => {
// 			// Get all users
// 			const users = await tx.user.findMany({
// 				include: {
// 					roles: true,
// 				},
// 			});

// 			// Disconnect all roles from users
// 			for (const user of users) {
// 				if (user.roles.length > 0) {
// 					await tx.user.update({
// 						where: { id: user.id },
// 						data: {
// 							roles: {
// 								disconnect: user.roles.map((role) => ({ id: role.id })),
// 							},
// 						},
// 					});
// 				}
// 			}

// 			// Delete all users
// 			const deleteUsers = await tx.user.deleteMany({});
// 			console.log("Deleted users:", deleteUsers.count);

// 			// Delete all roles
// 			const deleteRoles = await tx.role.deleteMany({});
// 			console.log("Deleted roles:", deleteRoles.count);

// 			// Delete all services
// 			const deleteServices = await tx.service.deleteMany({});
// 			console.log("Deleted services:", deleteServices.count);

// 			// Delete all categories
// 			const deleteCategories = await tx.category.deleteMany({});
// 			console.log("Deleted categories:", deleteCategories.count);
// 		});

// 		console.log("Database cleanup completed.");
// 	} catch (error) {
// 		console.error("Error during cleanup:", error);
// 		throw error;
// 	}
// }

// async function seedCategories() {
// 	console.log("Creating categories...");
// 	const categories = [];

// 	for (const categoryData of categoriesData) {
// 		const category = await prisma.category.create({
// 			data: categoryData,
// 		});
// 		categories.push(category);
// 		console.log(`Created category: ${category.name}`);
// 	}

// 	return categories;
// }

// async function seedServices(categories) {
// 	console.log("Creating services...");
// 	const services = [];

// 	for (const serviceData of servicesData) {
// 		// Find the category by slug
// 		const category = categories.find(
// 			(cat) => cat.slug === serviceData.categorySlug
// 		);

// 		if (!category) {
// 			console.warn(`Category not found for slug: ${serviceData.categorySlug}`);
// 			continue;
// 		}

// 		// Remove categorySlug from serviceData as it's not in the model
// 		const { categorySlug, ...serviceDataWithoutSlug } = serviceData;

// 		const service = await prisma.service.create({
// 			data: {
// 				...serviceDataWithoutSlug,
// 				categoryId: category.id,
// 			},
// 		});
// 		services.push(service);
// 		console.log(`Created service: ${service.name} in ${category.name}`);
// 	}

// 	return services;
// }

// async function seedDatabase() {
// 	try {
// 		console.log("Starting to seed new data...");

// 		// Create roles
// 		console.log("Creating roles...");

// 		const adminRole = await prisma.role.create({
// 			data: {
// 				displayName: "Administrator",
// 				roleName: "admin",
// 				description: "Full system access with all permissions",
// 				permissions: adminPermissions,
// 			},
// 		});

// 		const homeownerRole = await prisma.role.create({
// 			data: {
// 				displayName: "Homeowner",
// 				roleName: "homeowner",
// 				description: "Regular user with homeowner access",
// 				permissions: providerPermissions,
// 			},
// 		});

// 		const managerRole = await prisma.role.create({
// 			data: {
// 				displayName: "Manager",
// 				roleName: "manager",
// 				description: "System manager with elevated permissions",
// 				permissions: customerPermissions,
// 			},
// 		});

// 		console.log(
// 			`Created roles: ${adminRole.displayName}, ${homeownerRole.displayName}, ${managerRole.displayName}`
// 		);

// 		// Seed categories and services
// 		const categories = await seedCategories();
// 		const services = await seedServices(categories);

// 		// Get current year for password generation
// 		const currentYear = new Date().getFullYear();

// 		// Create admin user
// 		console.log("Creating admin user...");
// 		const adminPassword = `Admin@${currentYear}`;
// 		const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

// 		const adminUser = await prisma.user.create({
// 			data: {
// 				email: "admin@example.com",
// 				phone: "1234567890",
// 				name: "System Admin",
// 				password: hashedAdminPassword,
// 				status: true,
// 				emailVerified: new Date(),
// 				roles: {
// 					connect: [{ id: adminRole.id }],
// 				},
// 			},
// 		});

// 		// Create a user with multiple roles
// 		console.log("Creating multi-role user...");
// 		const managerPassword = `Manager@${currentYear}`;
// 		const hashedManagerPassword = await bcrypt.hash(managerPassword, 10);

// 		const managerUser = await prisma.user.create({
// 			data: {
// 				email: "manager@example.com",
// 				phone: "2345678901",
// 				name: "System Manager",
// 				password: hashedManagerPassword,
// 				status: true,
// 				emailVerified: new Date(),
// 				roles: {
// 					connect: [{ id: managerRole.id }, { id: homeownerRole.id }],
// 				},
// 			},
// 		});

// 		// Create regular user
// 		console.log("Creating regular user...");
// 		const userPassword = `User@${currentYear}`;
// 		const hashedUserPassword = await bcrypt.hash(userPassword, 10);

// 		const regularUser = await prisma.user.create({
// 			data: {
// 				email: "user@example.com",
// 				phone: "3456789012",
// 				name: "Regular User",
// 				password: hashedUserPassword,
// 				status: true,
// 				roles: {
// 					connect: [{ id: homeownerRole.id }],
// 				},
// 			},
// 		});

// 		console.log("Seed completed successfully!");
// 		console.log(
// 			`Created ${categories.length} categories and ${services.length} services`
// 		);
// 		console.log("Admin credentials:", {
// 			email: "admin@example.com",
// 			password: adminPassword,
// 		});
// 		console.log("Manager credentials:", {
// 			email: "manager@example.com",
// 			password: managerPassword,
// 		});
// 		console.log("User credentials:", {
// 			email: "user@example.com",
// 			password: userPassword,
// 		});
// 	} catch (error) {
// 		console.error("Error during seeding:", error);
// 		throw error;
// 	}
// }

// async function main() {
// 	console.log("Starting database seed process...");

// 	try {
// 		// First clean up existing data
// 		await cleanDatabase();

// 		// Then seed new data
// 		await seedDatabase();

// 		console.log("Database seeding completed successfully!");
// 	} catch (error) {
// 		console.error("Error in main seed process:", error);
// 		throw error;
// 	}
// }

// main()
// 	.catch((e) => {
// 		console.error("Failed to seed database:", e);
// 		process.exit(1);
// 	})
// 	.finally(async () => {
// 		await prisma.$disconnect();
// 	});
