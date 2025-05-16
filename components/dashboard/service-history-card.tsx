"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Calendar, Clock, Star } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface ServiceHistoryCardProps {
	service: {
		id: string;
		serviceType: string;
		date: string;
		time: string;
		provider: {
			name: string;
			avatar: string;
			rating: number;
		};
		status: string;
		cost: string;
		isRated: boolean;
		userRating?: number;
	};
}

export function ServiceHistoryCard({ service }: ServiceHistoryCardProps) {
	const [rating, setRating] = useState(service.userRating || 0);
	const [isHovering, setIsHovering] = useState(false);
	const [hoverRating, setHoverRating] = useState(0);

	const handleRatingHover = (hoveredRating: number) => {
		setIsHovering(true);
		setHoverRating(hoveredRating);
	};

	const handleRatingLeave = () => {
		setIsHovering(false);
		setHoverRating(0);
	};

	const handleRatingClick = (selectedRating: number) => {
		setRating(selectedRating);
	};

	const displayRating = isHovering ? hoverRating : rating;

	return (
		<Card>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<h3 className="font-medium">{service.serviceType}</h3>
					<StatusBadge status={service.status} />
				</div>
				<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
					<Calendar className="h-4 w-4" />
					<span>{service.date}</span>
				</div>
				<div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
					<Clock className="h-4 w-4" />
					<span>{service.time}</span>
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage
								src={service.provider.avatar || "/placeholder.svg"}
								alt={service.provider.name}
							/>
							<AvatarFallback>{service.provider.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{service.provider.name}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								<Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
								<span>{service.provider.rating}</span>
							</div>
						</div>
					</div>
					<div className="text-right">
						<div className="font-medium">{service.cost}</div>
						<div className="text-sm text-muted-foreground">Total cost</div>
					</div>
				</div>
			</CardContent>

			<CardFooter className="flex border-t bg-muted/30 px-4 py-3">
				<div className="flex w-full gap-2">
					<Button variant="outline" size="sm" className="flex-1">
						Book Again
					</Button>

					{service.status === "Completed" && !service.isRated && (
						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="flex-1 gap-1">
									<Star className="h-4 w-4" />
									<span>Rate</span>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Rate Your Experience</DialogTitle>
									<DialogDescription>
										How was your {service.serviceType} experience with{" "}
										{service.provider.name}?
									</DialogDescription>
								</DialogHeader>
								<div className="py-4">
									<div className="mb-4 flex items-center justify-center">
										<div
											className="flex gap-1"
											onMouseLeave={handleRatingLeave}
										>
											{[1, 2, 3, 4, 5].map((star) => (
												<Star
													key={star}
													className={`h-8 w-8 cursor-pointer ${
														star <= displayRating
															? "fill-yellow-400 text-yellow-400"
															: "fill-muted text-muted-foreground"
													}`}
													onMouseEnter={() => handleRatingHover(star)}
													onClick={() => handleRatingClick(star)}
												/>
											))}
										</div>
									</div>
									<Textarea
										placeholder="Share your experience with this service (optional)"
										className="min-h-[100px]"
									/>
								</div>
								<DialogFooter>
									<Button variant="outline">Cancel</Button>
									<Button>Submit Rating</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					)}

					{service.status === "Completed" && service.isRated && (
						<div className="flex items-center gap-1 text-sm">
							<span>Your rating:</span>
							<div className="flex">
								{[1, 2, 3, 4, 5].map((star) => (
									<Star
										key={star}
										className={`h-4 w-4 ${
											star <= (service.userRating || 0)
												? "fill-yellow-400 text-yellow-400"
												: "fill-muted text-muted-foreground"
										}`}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			</CardFooter>
		</Card>
	);
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "Completed":
			return (
				<Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>
			);
		case "Cancelled":
			return <Badge variant="destructive">Cancelled</Badge>;
		default:
			return <Badge variant="outline">{status}</Badge>;
	}
}
