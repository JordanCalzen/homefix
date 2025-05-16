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
import {
	Calendar,
	Clock,
	MapPin,
	Users,
	Bell,
	Search,
	Filter,
	Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
// import { TechnicianAvailability } from "@/components/technician-availability";
// import { ServiceMap } from "@/components/service-map";
// import { TaskAssignmentTable } from "@/components/task-assignment-table";
// import { FeedbackList } from "@/components/feedback-list";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ServiceMap } from "./servicemap";
import { TechnicianAvailability } from "./technician-availability";
import { TaskAssignmentTable } from "./task-assignment-table";
import { FeedbackList } from "./feedback-list";

export default function ManagerDashboard({
	userName,
	managerId,
}: {
	userName: string;
	managerId: string;
}) {
	const [selectedDate, setSelectedDate] = useState<string>("today");

	return (
		<div className="min-h-screen bg-background">
			<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2 font-semibold">
					<Calendar className="h-6 w-6" />
					<span className="hidden md:inline-block">HomeService Manager</span>
				</div>

				<div className="ml-auto flex items-center gap-4">
					<div className="relative hidden md:block">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search..."
							className="w-[200px] pl-8 md:w-[260px] lg:w-[320px]"
						/>
					</div>

					<Button variant="outline" size="icon" className="relative">
						<Bell className="h-5 w-5" />
						<span className="sr-only">Notifications</span>
						<Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
							5
						</Badge>
					</Button>

					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="relative h-8 w-8 rounded-full">
								<Avatar className="h-8 w-8">
									<AvatarImage
										src="/placeholder.svg?height=32&width=32"
										alt="Manager"
									/>
									<AvatarFallback>MG</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent className="w-56" align="end" forceMount>
							<DropdownMenuLabel className="font-normal">
								<div className="flex flex-col space-y-1">
									<p className="text-sm font-medium leading-none">
										Sarah Johnson
									</p>
									<p className="text-xs leading-none text-muted-foreground">
										sarah.johnson@example.com
									</p>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Profile</DropdownMenuItem>
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Log out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>

			<main className="p-4 sm:p-6 lg:p-8">
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-2xl font-bold tracking-tight">
								Operations Dashboard
							</h1>
							<p className="text-muted-foreground">
								Manage today's service operations and assignments
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Select value={selectedDate} onValueChange={setSelectedDate}>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder="Select date" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Time Period</SelectLabel>
										<SelectItem value="today">Today</SelectItem>
										<SelectItem value="tomorrow">Tomorrow</SelectItem>
										<SelectItem value="this-week">This Week</SelectItem>
										<SelectItem value="custom">Custom Range</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
							<Button variant="outline" size="icon">
								<Filter className="h-4 w-4" />
							</Button>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Today's Bookings
								</CardTitle>
								<Calendar className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">24</div>
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">
										8 completed, 16 pending
									</p>
									<Badge variant="outline" className="text-green-500">
										+4 from yesterday
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Active Technicians
								</CardTitle>
								<Users className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">18/22</div>
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">4 on leave</p>
									<Badge variant="outline" className="text-yellow-500">
										82% availability
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Response Time
								</CardTitle>
								<Clock className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">42 min</div>
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">
										Avg. response time
									</p>
									<Badge variant="outline" className="text-green-500">
										-8 min from avg
									</Badge>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle className="text-sm font-medium">
									Service Areas
								</CardTitle>
								<MapPin className="h-4 w-4 text-muted-foreground" />
							</CardHeader>
							<CardContent>
								<div className="text-2xl font-bold">5</div>
								<div className="flex items-center justify-between">
									<p className="text-xs text-muted-foreground">
										Active service zones
									</p>
									<Badge variant="outline" className="text-blue-500">
										Downtown busy
									</Badge>
								</div>
							</CardContent>
						</Card>
					</div>

					<div className="grid gap-4 md:grid-cols-7">
						<Card className="md:col-span-3">
							<CardHeader>
								<CardTitle>Service Requests by Area</CardTitle>
								<CardDescription>
									Geographic distribution of today's service requests
								</CardDescription>
							</CardHeader>
							<CardContent className="h-[350px] p-0">
								<ServiceMap />
							</CardContent>
							<CardFooter className="flex justify-between border-t p-4">
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-red-500" />
									<span className="text-xs">High demand</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-yellow-500" />
									<span className="text-xs">Medium demand</span>
								</div>
								<div className="flex items-center gap-2">
									<div className="h-3 w-3 rounded-full bg-green-500" />
									<span className="text-xs">Low demand</span>
								</div>
							</CardFooter>
						</Card>

						<Card className="md:col-span-4">
							<CardHeader>
								<CardTitle>Technician Availability</CardTitle>
								<CardDescription>
									Current status and upcoming shifts
								</CardDescription>
							</CardHeader>
							<CardContent>
								<TechnicianAvailability />
							</CardContent>
							<CardFooter className="border-t p-4">
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-full">
											Manage Technician Schedule
										</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Technician Schedule</DialogTitle>
											<DialogDescription>
												View and adjust technician schedules and availability.
											</DialogDescription>
										</DialogHeader>
										<div className="h-[400px] border rounded-md flex items-center justify-center">
											<p className="text-muted-foreground">
												Schedule management interface would appear here
											</p>
										</div>
										<DialogFooter>
											<Button variant="outline">Cancel</Button>
											<Button>Save Changes</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</CardFooter>
						</Card>
					</div>

					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Task Assignment Overview</CardTitle>
									<CardDescription>
										Manage and track service assignments
									</CardDescription>
								</div>
								<Dialog>
									<DialogTrigger asChild>
										<Button>Assign New Task</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Assign New Service Task</DialogTitle>
											<DialogDescription>
												Create a new service task and assign it to an available
												technician.
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid gap-2">
												<label htmlFor="service-type">Service Type</label>
												<Select>
													<SelectTrigger id="service-type">
														<SelectValue placeholder="Select service type" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="plumbing">Plumbing</SelectItem>
														<SelectItem value="electrical">
															Electrical
														</SelectItem>
														<SelectItem value="cleaning">Cleaning</SelectItem>
														<SelectItem value="gardening">Gardening</SelectItem>
														<SelectItem value="painting">Painting</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="grid gap-2">
												<label htmlFor="technician">Assign Technician</label>
												<Select>
													<SelectTrigger id="technician">
														<SelectValue placeholder="Select technician" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="john-doe">
															John Doe (Available)
														</SelectItem>
														<SelectItem value="jane-smith">
															Jane Smith (Available)
														</SelectItem>
														<SelectItem value="robert-johnson">
															Robert Johnson (Available)
														</SelectItem>
														<SelectItem value="emily-davis">
															Emily Davis (Busy)
														</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="grid gap-2">
												<label htmlFor="priority">Priority</label>
												<Select defaultValue="medium">
													<SelectTrigger id="priority">
														<SelectValue placeholder="Select priority" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="high">High</SelectItem>
														<SelectItem value="medium">Medium</SelectItem>
														<SelectItem value="low">Low</SelectItem>
													</SelectContent>
												</Select>
											</div>
										</div>
										<DialogFooter>
											<Button variant="outline">Cancel</Button>
											<Button>Create Assignment</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="active">
								<TabsList className="mb-4">
									<TabsTrigger value="active">Active Jobs (16)</TabsTrigger>
									<TabsTrigger value="completed">
										Completed Today (8)
									</TabsTrigger>
									<TabsTrigger value="upcoming">Upcoming (12)</TabsTrigger>
								</TabsList>
								<TabsContent value="active">
									<TaskAssignmentTable status="active" />
								</TabsContent>
								<TabsContent value="completed">
									<TaskAssignmentTable status="completed" />
								</TabsContent>
								<TabsContent value="upcoming">
									<TaskAssignmentTable status="upcoming" />
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div>
									<CardTitle>Customer Feedback & Ratings</CardTitle>
									<CardDescription>
										Recent customer reviews and satisfaction metrics
									</CardDescription>
								</div>
								<div className="flex items-center gap-1">
									<Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
									<span className="text-lg font-bold">4.8</span>
									<span className="text-sm text-muted-foreground">/5</span>
								</div>
							</div>
						</CardHeader>
						<CardContent>
							<div className="mb-6 space-y-4">
								<div className="flex items-center gap-4">
									<div className="w-12 text-sm">5 stars</div>
									<Progress value={78} className="h-2" />
									<div className="w-12 text-sm text-muted-foreground">78%</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="w-12 text-sm">4 stars</div>
									<Progress value={16} className="h-2" />
									<div className="w-12 text-sm text-muted-foreground">16%</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="w-12 text-sm">3 stars</div>
									<Progress value={4} className="h-2" />
									<div className="w-12 text-sm text-muted-foreground">4%</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="w-12 text-sm">2 stars</div>
									<Progress value={1} className="h-2" />
									<div className="w-12 text-sm text-muted-foreground">1%</div>
								</div>
								<div className="flex items-center gap-4">
									<div className="w-12 text-sm">1 star</div>
									<Progress value={1} className="h-2" />
									<div className="w-12 text-sm text-muted-foreground">1%</div>
								</div>
							</div>
							<Separator className="my-4" />
							<div>
								<h3 className="mb-4 text-sm font-medium">Recent Reviews</h3>
								<FeedbackList />
							</div>
						</CardContent>
						<CardFooter className="border-t p-4">
							<Button variant="outline" className="w-full">
								View All Feedback
							</Button>
						</CardFooter>
					</Card>
				</div>
			</main>
		</div>
	);
}
