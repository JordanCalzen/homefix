import { prisma } from "./db";

async function main() {
	const users = [
		{
			name: "John",
			email: "john.doe@example.com",
		},
		{
			name: "Jane",
			email: "jane.smith@example.com",
		},
		{
			name: "Admin",
			email: "admin@example.com",
		},
		{
			name: "jordan",
			email: "ads@example.com",
		},
	];

	console.log(users);

	const createdUsers = await Promise.all(
		users.map((user) => {
			return prisma.user.create({
				data: user,
			});
		})
	);
	console.log(createdUsers);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
