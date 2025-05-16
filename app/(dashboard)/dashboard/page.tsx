import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/auth";
import AdminDashboard from "@/components/dashboard/admin-dashboard";
import ManagerDashboard from "@/components/dashboard/manager-dashboard";
import UserDashboard from "@/components/dashboard/homeowner-dashboard";

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const userName = session?.user.name || "";

	// Determine user role
	const isAdmin = session.user.roles?.some(
		(role: { roleName: string }) => role.roleName === "admin"
	);
	const isManager = session.user.roles?.some(
		(role: { roleName: string }) => role.roleName === "manager"
	);

	if (isAdmin) {
		return <AdminDashboard userName={userName} />;
	} else if (isManager) {
		return <ManagerDashboard userName={userName} managerId={session.user.id} />;
	} else {
		// Default to user dashboard
		return <UserDashboard userName={userName} userId={session.user.id} />;
	}
}
