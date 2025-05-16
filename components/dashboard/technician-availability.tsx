import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Phone } from "lucide-react";

export function TechnicianAvailability() {
	return (
		<div className="space-y-4">
			{technicians.map((technician) => (
				<div key={technician.id} className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Avatar className="h-9 w-9">
							<AvatarImage
								src={technician.avatar || "/placeholder.svg"}
								alt={technician.name}
							/>
							<AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{technician.name}</div>
							<div className="text-xs text-muted-foreground">
								{technician.specialty}
							</div>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<StatusBadge status={technician.status} />
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button variant="ghost" size="icon" className="h-8 w-8">
										<Phone className="h-4 w-4" />
										<span className="sr-only">Call technician</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Call {technician.name}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			))}
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "Available":
			return (
				<Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
			);
		case "On Job":
			return (
				<Badge variant="outline" className="text-yellow-500 border-yellow-500">
					On Job
				</Badge>
			);
		case "Break":
			return (
				<Badge variant="outline" className="text-blue-500 border-blue-500">
					Break
				</Badge>
			);
		case "Off Duty":
			return (
				<Badge variant="outline" className="text-gray-500 border-gray-500">
					Off Duty
				</Badge>
			);
		default:
			return <Badge variant="outline">{status}</Badge>;
	}
}

const technicians = [
	{
		id: "1",
		name: "John Doe",
		specialty: "Plumbing",
		status: "Available",
		avatar: "/placeholder.svg?height=36&width=36",
	},
	{
		id: "2",
		name: "Jane Smith",
		specialty: "Electrical",
		status: "On Job",
		avatar: "/placeholder.svg?height=36&width=36",
	},
	{
		id: "3",
		name: "Robert Johnson",
		specialty: "HVAC",
		status: "Available",
		avatar: "/placeholder.svg?height=36&width=36",
	},
	{
		id: "4",
		name: "Emily Davis",
		specialty: "Cleaning",
		status: "Break",
		avatar: "/placeholder.svg?height=36&width=36",
	},
	{
		id: "5",
		name: "Michael Wilson",
		specialty: "Gardening",
		status: "On Job",
		avatar: "/placeholder.svg?height=36&width=36",
	},
	{
		id: "6",
		name: "Sarah Thompson",
		specialty: "Painting",
		status: "Off Duty",
		avatar: "/placeholder.svg?height=36&width=36",
	},
];
