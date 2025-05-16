"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
	Calendar,
	Clock,
	MapPin,
	MessageCircle,
	Phone,
	Star,
} from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface BookingCardProps {
	booking: {
		id: string;
		serviceType: string;
		date: string;
		time: string;
		provider: {
			name: string;
			avatar: string;
			rating: number;
		};
		address: string;
		status: string;
	};
}

export function BookingCard({ booking }: BookingCardProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Card className="overflow-hidden">
			<CardContent className="p-0">
				<div className="bg-primary/10 p-4">
					<div className="flex items-center justify-between">
						<h3 className="font-medium">{booking.serviceType}</h3>
						<StatusBadge status={booking.status} />
					</div>
					<div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
						<Calendar className="h-4 w-4" />
						<span>{booking.date}</span>
					</div>
					<div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
						<Clock className="h-4 w-4" />
						<span>{booking.time}</span>
					</div>
				</div>

				<div className="p-4">
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage
								src={booking.provider.avatar || "/placeholder.svg"}
								alt={booking.provider.name}
							/>
							<AvatarFallback>{booking.provider.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-medium">{booking.provider.name}</div>
							<div className="flex items-center text-sm text-muted-foreground">
								<Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
								<span>{booking.provider.rating}</span>
							</div>
						</div>
					</div>

					<Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
						<CollapsibleTrigger asChild>
							<Button
								variant="ghost"
								size="sm"
								className="flex w-full justify-center gap-1 p-0"
							>
								{isOpen ? "Show less" : "Show details"}
							</Button>
						</CollapsibleTrigger>
						<CollapsibleContent>
							<div className="mt-3 space-y-2">
								<div className="flex items-start gap-2 text-sm">
									<MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
									<span>{booking.address}</span>
								</div>
								<div className="flex items-center gap-2 text-sm">
									<div className="font-medium">Service Details:</div>
									<span className="text-muted-foreground">
										Standard service package
									</span>
								</div>
							</div>
						</CollapsibleContent>
					</Collapsible>
				</div>
			</CardContent>

			<CardFooter className="flex border-t bg-muted/30 px-4 py-3">
				<div className="flex w-full gap-2">
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm" className="flex-1 gap-1">
								<Phone className="h-4 w-4" />
								<span className="hidden sm:inline">Contact</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Contact Service Provider</DialogTitle>
								<DialogDescription>
									Get in touch with your service provider for your{" "}
									{booking.serviceType} appointment.
								</DialogDescription>
							</DialogHeader>
							<div className="flex flex-col gap-4 py-4">
								<div className="flex items-center gap-4">
									<Avatar className="h-12 w-12">
										<AvatarImage
											src={booking.provider.avatar || "/placeholder.svg"}
											alt={booking.provider.name}
										/>
										<AvatarFallback>
											{booking.provider.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<h4 className="font-medium">{booking.provider.name}</h4>
										<p className="text-sm text-muted-foreground">
											{booking.serviceType} Provider
										</p>
									</div>
								</div>
								<div className="grid gap-2">
									<Button className="w-full gap-2">
										<Phone className="h-4 w-4" />
										Call Provider
									</Button>
									<Button variant="outline" className="w-full gap-2">
										<MessageCircle className="h-4 w-4" />
										Send Message
									</Button>
								</div>
							</div>
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline" size="sm" className="flex-1 gap-1">
								<Calendar className="h-4 w-4" />
								<span className="hidden sm:inline">Reschedule</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Reschedule Appointment</DialogTitle>
								<DialogDescription>
									Change the date and time for your {booking.serviceType}{" "}
									appointment.
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<div className="mb-4 rounded-md bg-yellow-50 p-3 text-sm text-yellow-800">
									<p>
										Rescheduling is free if done at least 24 hours before your
										appointment. Late changes may incur a fee.
									</p>
								</div>
								<div className="h-[300px] rounded-md border p-4 flex items-center justify-center">
									<p className="text-center text-muted-foreground">
										Calendar selection would appear here
									</p>
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline">Cancel</Button>
								<Button>Confirm New Time</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button variant="destructive" size="sm" className="flex-1 gap-1">
								<span className="hidden sm:inline">Cancel</span>
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Cancel Appointment</DialogTitle>
								<DialogDescription>
									Are you sure you want to cancel your {booking.serviceType}{" "}
									appointment?
								</DialogDescription>
							</DialogHeader>
							<div className="py-4">
								<div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
									<p>
										Cancellations made less than 24 hours before the appointment
										may be subject to a cancellation fee.
									</p>
								</div>
								<div className="space-y-2">
									<h4 className="font-medium">Appointment Details:</h4>
									<p className="text-sm">
										{booking.serviceType} on {booking.date} at {booking.time}
									</p>
									<p className="text-sm">Provider: {booking.provider.name}</p>
								</div>
							</div>
							<DialogFooter>
								<Button variant="outline">Keep Appointment</Button>
								<Button variant="destructive">Confirm Cancellation</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>
			</CardFooter>
		</Card>
	);
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "Confirmed":
			return (
				<Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
			);
		case "Pending":
			return (
				<Badge variant="outline" className="text-yellow-500 border-yellow-500">
					Pending
				</Badge>
			);
		case "Cancelled":
			return <Badge variant="destructive">Cancelled</Badge>;
		default:
			return <Badge variant="outline">{status}</Badge>;
	}
}
