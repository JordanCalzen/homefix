"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
	Calendar,
	ChevronLeft,
	ChevronRight,
	Filter,
	Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
// import { BookingCard } from "@/components/booking-card"
// import { UserHeader } from "@/components/user-header"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { BookingCard } from "@/components/dashboard/booking-card";

export default function BookingsPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [filterStatus, setFilterStatus] = useState("all");
	const [filterDate, setFilterDate] = useState("all");

	// Filter bookings based on search query and filters
	const filteredUpcoming = upcomingBookings.filter((booking) => {
		const matchesSearch = booking.serviceType
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || booking.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	const filteredPast = pastBookings.filter((booking) => {
		const matchesSearch = booking.serviceType
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatus =
			filterStatus === "all" || booking.status === filterStatus;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="min-h-screen bg-background">
			{/* <UserHeader /> */}

			<main className="container mx-auto p-4 md:p-6 lg:p-8">
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
					<p className="text-muted-foreground">
						Manage your service appointments and bookings
					</p>
				</div>

				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search bookings..."
							className="w-full pl-8 sm:w-[300px]"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<div className="flex gap-2">
						<Select value={filterStatus} onValueChange={setFilterStatus}>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Statuses</SelectItem>
								<SelectItem value="Confirmed">Confirmed</SelectItem>
								<SelectItem value="Pending">Pending</SelectItem>
								<SelectItem value="Completed">Completed</SelectItem>
								<SelectItem value="Cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>
						<Select value={filterDate} onValueChange={setFilterDate}>
							<SelectTrigger className="w-[150px]">
								<SelectValue placeholder="Filter by date" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Dates</SelectItem>
								<SelectItem value="today">Today</SelectItem>
								<SelectItem value="this-week">This Week</SelectItem>
								<SelectItem value="this-month">This Month</SelectItem>
								<SelectItem value="custom">Custom Range</SelectItem>
							</SelectContent>
						</Select>
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" size="icon">
									<Filter className="h-4 w-4" />
									<span className="sr-only">More filters</span>
								</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Advanced Filters</DialogTitle>
									<DialogDescription>
										Refine your booking search with advanced filters
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="grid gap-2">
										<label htmlFor="service-type">Service Type</label>
										<Select>
											<SelectTrigger id="service-type">
												<SelectValue placeholder="All service types" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All Types</SelectItem>
												<SelectItem value="plumbing">Plumbing</SelectItem>
												<SelectItem value="electrical">Electrical</SelectItem>
												<SelectItem value="cleaning">Cleaning</SelectItem>
												<SelectItem value="gardening">Gardening</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<label htmlFor="provider">Service Provider</label>
										<Select>
											<SelectTrigger id="provider">
												<SelectValue placeholder="All providers" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="all">All Providers</SelectItem>
												<SelectItem value="robert-johnson">
													Robert Johnson
												</SelectItem>
												<SelectItem value="sarah-williams">
													Sarah Williams
												</SelectItem>
												<SelectItem value="jane-smith">Jane Smith</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="grid gap-2">
										<label htmlFor="price-range">Price Range</label>
										<div className="flex items-center gap-2">
											<Input id="price-min" placeholder="Min" type="number" />
											<span>to</span>
											<Input id="price-max" placeholder="Max" type="number" />
										</div>
									</div>
								</div>
								<DialogFooter>
									<Button variant="outline">Reset</Button>
									<Button>Apply Filters</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<Tabs defaultValue="upcoming" className="space-y-4">
					<TabsList>
						<TabsTrigger value="upcoming">
							Upcoming ({filteredUpcoming.length})
						</TabsTrigger>
						<TabsTrigger value="past">Past ({filteredPast.length})</TabsTrigger>
					</TabsList>

					<TabsContent value="upcoming" className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Upcoming Bookings</h2>
							<Button>
								<Calendar className="mr-2 h-4 w-4" />
								Book New Service
							</Button>
						</div>

						{filteredUpcoming.length === 0 ? (
							<Card>
								<CardContent className="flex flex-col items-center justify-center p-6">
									<Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
									<h3 className="text-lg font-medium">
										No upcoming bookings found
									</h3>
									<p className="mb-4 text-center text-sm text-muted-foreground">
										{searchQuery
											? "No bookings match your search criteria."
											: "You don't have any upcoming service appointments."}
									</p>
									<Button>Book a Service</Button>
								</CardContent>
							</Card>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{filteredUpcoming.map((booking) => (
									<BookingCard key={booking.id} booking={booking} />
								))}
							</div>
						)}

						{filteredUpcoming.length > 0 && (
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">2</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						)}
					</TabsContent>

					<TabsContent value="past" className="space-y-4">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-semibold">Past Bookings</h2>
							<div className="flex items-center gap-1 text-sm text-muted-foreground">
								<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
									<ChevronLeft className="h-4 w-4" />
									<span className="sr-only">Previous month</span>
								</Button>
								<span>May 2023</span>
								<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
									<ChevronRight className="h-4 w-4" />
									<span className="sr-only">Next month</span>
								</Button>
							</div>
						</div>

						{filteredPast.length === 0 ? (
							<Card>
								<CardContent className="flex flex-col items-center justify-center p-6">
									<Calendar className="mb-2 h-12 w-12 text-muted-foreground" />
									<h3 className="text-lg font-medium">
										No past bookings found
									</h3>
									<p className="text-center text-sm text-muted-foreground">
										{searchQuery
											? "No bookings match your search criteria."
											: "You don't have any past service appointments."}
									</p>
								</CardContent>
							</Card>
						) : (
							<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
								{filteredPast.map((booking) => (
									<BookingCard key={booking.id} booking={booking} />
								))}
							</div>
						)}

						{filteredPast.length > 0 && (
							<Pagination>
								<PaginationContent>
									<PaginationItem>
										<PaginationPrevious href="#" />
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#" isActive>
											1
										</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">2</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationLink href="#">3</PaginationLink>
									</PaginationItem>
									<PaginationItem>
										<PaginationEllipsis />
									</PaginationItem>
									<PaginationItem>
										<PaginationNext href="#" />
									</PaginationItem>
								</PaginationContent>
							</Pagination>
						)}
					</TabsContent>
				</Tabs>
			</main>
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
	{
		id: "3",
		serviceType: "Gardening",
		date: "Monday, May 15",
		time: "9:00 AM - 11:00 AM",
		provider: {
			name: "Michael Brown",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.7,
		},
		address: "123 Main St, Apt 4B",
		status: "Confirmed",
	},
	{
		id: "4",
		serviceType: "Electrical Inspection",
		date: "Wednesday, May 17",
		time: "1:00 PM - 3:00 PM",
		provider: {
			name: "Jane Smith",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.9,
		},
		address: "123 Main St, Apt 4B",
		status: "Pending",
	},
];

const pastBookings = [
	{
		id: "5",
		serviceType: "Electrical Repair",
		date: "April 28, 2023",
		time: "1:00 PM - 3:00 PM",
		provider: {
			name: "Jane Smith",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.7,
		},
		address: "123 Main St, Apt 4B",
		status: "Completed",
	},
	{
		id: "6",
		serviceType: "Lawn Mowing",
		date: "April 20, 2023",
		time: "10:00 AM - 11:30 AM",
		provider: {
			name: "Michael Wilson",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.5,
		},
		address: "123 Main St, Apt 4B",
		status: "Completed",
	},
	{
		id: "7",
		serviceType: "HVAC Maintenance",
		date: "April 15, 2023",
		time: "9:00 AM - 11:00 AM",
		provider: {
			name: "David Thompson",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.8,
		},
		address: "123 Main St, Apt 4B",
		status: "Cancelled",
	},
	{
		id: "8",
		serviceType: "Furniture Assembly",
		date: "April 10, 2023",
		time: "3:00 PM - 5:00 PM",
		provider: {
			name: "Emily Davis",
			avatar: "/placeholder.svg?height=40&width=40",
			rating: 4.9,
		},
		address: "123 Main St, Apt 4B",
		status: "Completed",
	},
];
