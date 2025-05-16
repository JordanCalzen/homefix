import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function RecentActivityFeed() {
	return (
		<div className="space-y-8">
			{activities.map((activity, index) => (
				<div key={index} className="flex items-start gap-4">
					<Avatar className="h-9 w-9">
						<AvatarImage
							src={activity.userAvatar || "/placeholder.svg"}
							alt={activity.userName}
						/>
						<AvatarFallback>{activity.userName.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							{activity.userName}
						</p>
						<p className="text-sm text-muted-foreground">{activity.action}</p>
						<p className="text-xs text-muted-foreground">{activity.time}</p>
					</div>
					<div
						className={cn(
							"ml-auto flex h-2 w-2 rounded-full",
							activity.isNew ? "bg-green-500" : "bg-transparent"
						)}
					/>
				</div>
			))}
		</div>
	);
}

const activities = [
	{
		userName: "John Smith",
		userAvatar: "/placeholder.svg?height=32&width=32",
		action: "Booked a plumbing service",
		time: "2 minutes ago",
		isNew: true,
	},
	{
		userName: "Sarah Johnson",
		userAvatar: "/placeholder.svg?height=32&width=32",
		action: "Left a 5-star review for house cleaning",
		time: "15 minutes ago",
		isNew: true,
	},
	{
		userName: "Michael Brown",
		userAvatar: "/placeholder.svg?height=32&width=32",
		action: "Cancelled electrical service appointment",
		time: "1 hour ago",
		isNew: false,
	},
	{
		userName: "Emily Davis",
		userAvatar: "/placeholder.svg?height=32&width=32",
		action: "Registered as a new user",
		time: "2 hours ago",
		isNew: false,
	},
	{
		userName: "Robert Wilson",
		userAvatar: "/placeholder.svg?height=32&width=32",
		action: "Rescheduled painting service",
		time: "3 hours ago",
		isNew: false,
	},
];
