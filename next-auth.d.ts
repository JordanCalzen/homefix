import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import type { User } from "next-auth";
import "next-auth/jwt";

// Role type definition
interface Role {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	description: string | null;
	displayName: string;
	roleName: string;
	permissions: string[];
}

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			name: string;
			phone: string;
			roles: Role[];
			permissions: string[];
		} & DefaultSession["user"];
	}

	interface User {
		id: string;
		phone: string;
		roles: Role[];
		permissions: string[];
		name?: string | null;
		email?: string | null;
		image?: string | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: UserId;
	}
}
