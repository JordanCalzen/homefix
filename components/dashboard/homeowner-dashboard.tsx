"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
	Bell,
	Calendar,
	ChevronRight,
	Clock,
	Home,
	MessageCircle,
	Phone,
	Plus,
	Search,
	Settings,
	Star,
	User,
} from "lucide-react";
// import { BookingCard } from "@/components/booking-card"
// import { ServiceHistoryCard } from "@/components/service-history-card"
// import { PopularServiceCard } from "@/components/popular-service-card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { BookingCard } from "./booking-card";
import { ServiceHistoryCard } from "./service-history-card";
import { PopularServiceCard } from "./popular-service-card";

export default function UserDashboard({
	userName,
	userId,
}: {
	userName: string;
	userId: string;
}) {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<div className="min-h-screen bg-background">
			{/* <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2 font-semibold">
					<Home className="h-6 w-6" />
					<span className="hidden md:inline-block">HomeService</span>
				</div>

				<div className="ml-auto flex items-center gap-4">
					<div className="relative hidden md:block">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search services..."
							className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline" size="icon" className="relative">
								<Bell className="h-5 w-5" />
								<span className="sr-only">Notifications</span>
								<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
									3
								</Badge>
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Notifications</SheetTitle>
								<SheetDescription>
									Stay updated with your service bookings and promotions.
								</SheetDescription>
							</SheetHeader>
							<div className="mt-4 space-y-4">
								{notifications.map((notification) => (
									<div
										key={notification.id}
										className="flex items-start gap-4 rounded-lg border p-4"
									>
										<div
											className={`mt-0.5 rounded-full p-1.5 ${notification.iconBg}`}
										>
											<notification.icon
												className={`h-4 w-4 ${notification.iconColor}`}
											/>
										</div>
										<div className="flex-1">
											<h4 className="text-sm font-medium">
												{notification.title}
											</h4>
											<p className="text-sm text-muted-foreground">
												{notification.description}
											</p>
											<p className="mt-1 text-xs text-muted-foreground">
												{notification.time}
											</p>
										</div>
									</div>
								))}
							</div>
						</SheetContent>
					</Sheet>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage
										src="/placeholder.svg?height=32&width=32"
										alt="User"
									/>
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">John Doe</p>
									<p className="text-xs leading-none text-muted-foreground">
										john.doe@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<User className="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings className="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<MessageCircle className="mr-2 h-4 w-4" />
								<span>Support</span>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<span>Log out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header> */}

			<main className="container mx-auto p-4 md:p-6 lg:p-8">
				<div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4">
					<div className="md:col-span-2 lg:col-span-3">
						<div className="mb-6">
							<h1 className="text-2xl font-bold tracking-tight">
								Welcome back, John!
							</h1>
							<p className="text-muted-foreground">
								Manage your service bookings and find new services.
							</p>
						</div>

						<div className="mb-8">
							<Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
								<CardContent className="p-6">
									<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
										<div>
											<h2 className="text-xl font-semibold">Find a Service</h2>
											<p className="mt-1 text-sm text-white/80">
												Book a new service from our trusted professionals
											</p>
										</div>
										<Button
											size="lg"
											className="bg-white text-indigo-600 hover:bg-white/90"
										>
											Browse Services
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>

						<div className="mb-8">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-xl font-semibold">Upcoming Bookings</h2>
								<Button variant="ghost" size="sm" className="gap-1">
									View all <ChevronRight className="h-4 w-4" />
								</Button>
							</div>
							{upcomingBookings.length === 0 ? (
								<Card>
									<CardContent className="flex flex-col items-center justify-center p-6">
										<Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
										<h3 className="text-lg font-medium">
											No upcoming bookings
										</h3>
										<p className="mb-4 text-center text-sm text-muted-foreground">
											You don't have any upcoming service appointments.
										</p>
										<Button>Book a Service</Button>
									</CardContent>
								</Card>
							) : (
								<div className="grid gap-4 sm:grid-cols-2">
									{upcomingBookings.map((booking) => (
										<BookingCard key={booking.id} booking={booking} />
									))}
								</div>
							)}
						</div>

						<div className="mb-8">
							<div className="mb-4 flex items-center justify-between">
								<h2 className="text-xl font-semibold">Service History</h2>
								<Button variant="ghost" size="sm" className="gap-1">
									View all <ChevronRight className="h-4 w-4" />
								</Button>
							</div>
							<Tabs defaultValue="recent">
								<TabsList className="mb-4">
									<TabsTrigger value="recent">Recent</TabsTrigger>
									<TabsTrigger value="completed">Completed</TabsTrigger>
									<TabsTrigger value="cancelled">Cancelled</TabsTrigger>
								</TabsList>
								<TabsContent value="recent">
									<div className="grid gap-4">
										{serviceHistory.slice(0, 3).map((service) => (
											<ServiceHistoryCard key={service.id} service={service} />
										))}
									</div>
								</TabsContent>
								<TabsContent value="completed">
									<div className="grid gap-4">
										{serviceHistory
											.filter((service) => service.status === "Completed")
											.map((service) => (
												<ServiceHistoryCard
													key={service.id}
													service={service}
												/>
											))}
									</div>
								</TabsContent>
								<TabsContent value="cancelled">
									<div className="grid gap-4">
										{serviceHistory
											.filter((service) => service.status === "Cancelled")
											.map((service) => (
												<ServiceHistoryCard
													key={service.id}
													service={service}
												/>
											))}
									</div>
								</TabsContent>
							</Tabs>
						</div>
					</div>

					<div className="space-y-6">
						<Card>
							<CardHeader className="pb-3">
								<CardTitle>Profile</CardTitle>
							</CardHeader>
							<CardContent className="flex flex-col items-center text-center">
								<Avatar className="h-24 w-24">
									<AvatarImage
										src="/placeholder.svg?height=96&width=96"
										alt="John Doe"
									/>
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
								<h3 className="mt-4 text-lg font-medium">John Doe</h3>
								<p className="text-sm text-muted-foreground">
									john.doe@example.com
								</p>
								<div className="mt-4 flex items-center gap-2">
									<Badge variant="secondary">Premium Member</Badge>
									<Badge variant="outline">Since 2022</Badge>
								</div>
								<Separator className="my-4" />
								<div className="grid w-full grid-cols-2 gap-4 text-center">
									<div>
										<p className="text-2xl font-bold">12</p>
										<p className="text-xs text-muted-foreground">
											Total Bookings
										</p>
									</div>
									<div>
										<p className="text-2xl font-bold">4.8</p>
										<p className="text-xs text-muted-foreground">Avg. Rating</p>
									</div>
								</div>
								<Button variant="outline" className="mt-4 w-full">
									Edit Profile
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Popular Services</CardTitle>
								<CardDescription>
									Services you might be interested in
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								{popularServices.map((service) => (
									<PopularServiceCard key={service.id} service={service} />
								))}
							</CardContent>
							<CardFooter>
								<Button variant="ghost" className="w-full">
									View All Services
								</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Need Help?</CardTitle>
								<CardDescription>
									Our support team is here for you
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4">
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<MessageCircle className="h-4 w-4" />
									Chat with Support
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<Phone className="h-4 w-4" />
									Call Support
								</Button>
								<Button
									variant="outline"
									className="w-full justify-start gap-2"
								>
									<Search className="h-4 w-4" />
									Browse FAQs
								</Button>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>

			{/* Floating Action Button for Mobile */}
			<div className="fixed bottom-6 right-6 z-50 md:hidden">
				<Sheet>
					<SheetTrigger asChild>
						<Button size="icon" className="h-14 w-14 rounded-full shadow-lg">
							<Plus className="h-6 w-6" />
						</Button>
					</SheetTrigger>
					<SheetContent side="bottom" className="rounded-t-xl">
						<div className="grid grid-cols-3 gap-4 py-4">
							<Button
								variant="ghost"
								className="flex flex-col items-center gap-1 h-auto py-4"
							>
								<Home className="h-6 w-6" />
								<span className="text-xs">Book Service</span>
							</Button>
							<Button
								variant="ghost"
								className="flex flex-col items-center gap-1 h-auto py-4"
							>
								<MessageCircle className="h-6 w-6" />
								<span className="text-xs">Support</span>
							</Button>
							<Button
								variant="ghost"
								className="flex flex-col items-center gap-1 h-auto py-4"
							>
								<Calendar className="h-6 w-6" />
								<span className="text-xs">Bookings</span>
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
}

// Sample data
const upcomingBookings = [
	{
		id: "1",
		serviceType: "Plumbing Repair",
		date: "Tomorrow, May 9",
		time: "10:00 AM - 12:00 PM",
		provider: {
			name: "Robert Johnson",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.9,
		},
		address: "123 Main St, Apt 4B",
		status: "Confirmed",
	},
	{
		id: "2",
		serviceType: "House Cleaning",
		date: "Friday, May 12",
		time: "2:00 PM - 4:00 PM",
		provider: {
			name: "Sarah Williams",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.8,
		},
		address: "123 Main St, Apt 4B",
		status: "Pending",
	},
];

const serviceHistory = [
	{
		id: "1",
		serviceType: "Electrical Repair",
		date: "April 28, 2023",
		time: "1:00 PM - 3:00 PM",
		provider: {
			name: "Jane Smith",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.7,
		},
		status: "Completed",
		cost: "$120.00",
		isRated: true,
		userRating: 5,
	},
	{
		id: "2",
		serviceType: "Lawn Mowing",
		date: "April 20, 2023",
		time: "10:00 AM - 11:30 AM",
		provider: {
			name: "Michael Wilson",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.5,
		},
		status: "Completed",
		cost: "$75.00",
		isRated: false,
	},
	{
		id: "3",
		serviceType: "HVAC Maintenance",
		date: "April 15, 2023",
		time: "9:00 AM - 11:00 AM",
		provider: {
			name: "David Thompson",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.8,
		},
		status: "Cancelled",
		cost: "$0.00",
		isRated: false,
	},
	{
		id: "4",
		serviceType: "Furniture Assembly",
		date: "April 10, 2023",
		time: "3:00 PM - 5:00 PM",
		provider: {
			name: "Emily Davis",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.9,
		},
		status: "Completed",
		cost: "$95.00",
		isRated: true,
		userRating: 4,
	},
];

const popularServices = [
	{
		id: "1",
		name: "House Cleaning",
		icon: Home,
		price: "From $80",
		rating: 4.8,
	},
	{
		id: "2",
		name: "Plumbing Services",
		icon: Home,
		price: "From $95",
		rating: 4.7,
	},
	{
		id: "3",
		name: "Electrical Repair",
		icon: Home,
		price: "From $110",
		rating: 4.9,
	},
];

const notifications = [
	{
		id: "1",
		title: "Booking Confirmed",
		description:
			"Your plumbing service has been confirmed for tomorrow at 10:00 AM.",
		time: "Just now",
		icon: Calendar,
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
	},
	{
		id: "2",
		title: "Technician on the way",
		description:
			"Robert Johnson is on the way to your location. Estimated arrival in 15 minutes.",
		time: "15 minutes ago",
		icon: Clock,
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
	},
	{
		id: "3",
		title: "Special Offer",
		description:
			"Get 20% off on your next cleaning service booking. Valid until May 15.",
		time: "2 hours ago",
		icon: Star,
		iconBg: "bg-yellow-100",
		iconColor: "text-yellow-600",
	},
];
