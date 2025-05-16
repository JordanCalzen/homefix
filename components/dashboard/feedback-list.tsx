import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeedbackList() {
	return (
		<div className="space-y-4">
			{feedback.map((item) => (
				<div key={item.id} className="space-y-2">
					<div className="flex items-start justify-between">
						<div className="flex items-start gap-2">
							<Avatar className="h-8 w-8">
								<AvatarImage
									src={item.customerAvatar || "/placeholder.svg"}
									alt={item.customerName}
								/>
								<AvatarFallback>{item.customerName.charAt(0)}</AvatarFallback>
							</Avatar>
							<div>
								<div className="flex items-center gap-2">
									<span className="font-medium">{item.customerName}</span>
									<span className="text-xs text-muted-foreground">
										{item.date}
									</span>
								</div>
								<div className="flex items-center">
									{Array.from({ length: 5 }).map((_, i) => (
										<Star
											key={i}
											className={cn(
												"h-4 w-4",
												i < item.rating
													? "fill-yellow-400 text-yellow-400"
													: "fill-muted text-muted"
											)}
										/>
									))}
								</div>
							</div>
						</div>
						<Button variant="ghost" size="sm" className="h-8 gap-1">
							<ThumbsUp className="h-4 w-4" />
							<span className="text-xs">Helpful</span>
						</Button>
					</div>
					<p className="text-sm">{item.comment}</p>
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>Service: {item.service}</span>
						<span>•</span>
						<span>Technician: {item.technician}</span>
					</div>
				</div>
			))}
		</div>
	);
}

const feedback = [
	{
		id: "1",
		customerName: "John Smith",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		rating: 5,
		date: "Today, 10:45 AM",
		comment:
			"Excellent service! The technician was prompt, professional, and fixed our plumbing issue quickly. Highly recommend!",
		service: "Plumbing Repair",
		technician: "Robert Johnson",
	},
	{
		id: "2",
		customerName: "Sarah Johnson",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		rating: 4,
		date: "Today, 9:30 AM",
		comment:
			"Good service overall. The electrician was knowledgeable and fixed our issue, though arrived a bit later than scheduled.",
		service: "Electrical Installation",
		technician: "Jane Smith",
	},
	{
		id: "3",
		customerName: "Michael Brown",
		customerAvatar: "/placeholder.svg?height=32&width=32",
		rating: 5,
		date: "Yesterday, 3:15 PM",
		comment:
			"The HVAC technician was amazing! Very thorough and explained everything clearly. Our system is working perfectly now.",
		service: "HVAC Maintenance",
		technician: "Emily Davis",
	},
];
