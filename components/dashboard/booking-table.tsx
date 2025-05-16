import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function BookingsTable() {
	return (
		<div className="rounded-md border">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Customer</TableHead>
						<TableHead>Service</TableHead>
						<TableHead>Date</TableHead>
						<TableHead>Status</TableHead>
						<TableHead className="text-right">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings.map((booking) => (
						<TableRow key={booking.id}>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar className="h-8 w-8">
										<AvatarImage
											src={booking.customerAvatar || "/placeholder.svg"}
											alt={booking.customerName}
										/>
										<AvatarFallback>
											{booking.customerName.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div className="font-medium">{booking.customerName}</div>
								</div>
							</TableCell>
							<TableCell>{booking.service}</TableCell>
							<TableCell>{booking.date}</TableCell>
							<TableCell>
								<Badge
									variant={
										booking.status === "Completed"
											? "default"
											: booking.status === "Pending"
											? "outline"
											: "destructive"
									}
								>
									{booking.status}
								</Badge>
							</TableCell>
							<TableCell className="text-right">
								<Button variant="ghost" size="sm">
									View
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

const bookings = [
	{
		id: "1",
		customerName: "John Smith",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		service: "Plumbing Repair",
		date: "Today, 2:00 PM",
		status: "Pending",
	},
	{
		id: "2",
		customerName: "Sarah Johnson",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		service: "House Cleaning",
		date: "Today, 10:30 AM",
		status: "Completed",
	},
	{
		id: "3",
		customerName: "Michael Brown",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		service: "Electrical Work",
		date: "Yesterday, 4:15 PM",
		status: "Completed",
	},
	{
		id: "4",
		customerName: "Emily Davis",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		service: "Gardening",
		date: "Yesterday, 1:00 PM",
		status: "Cancelled",
	},
	{
		id: "5",
		customerName: "Robert Wilson",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		service: "Painting",
		date: "May 10, 11:30 AM",
		status: "Pending",
	},
];
