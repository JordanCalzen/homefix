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
