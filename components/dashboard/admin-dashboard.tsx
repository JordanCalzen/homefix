"use client";

import { useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip as RechartsTooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from "recharts";
import {
	DollarSign,
	Users,
	Calendar,
	Home,
	Menu,
	Bell,
	Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { BookingsTable } from "./booking-table";
import { RecentActivityFeed } from "./recent-activity-feeds";

// import { RecentActivityFeed } from "@/components/recent-activity-feed";
// import { BookingsTable } from "@/components/bookings-table";

export default function AdminDashboard({ userName }: { userName: string }) {
	return (
		<div className="flex min-h-screen bg-background">
			<div className="flex-1 flex flex-col">
				<main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
							<p className="text-muted-foreground">
								Welcome back! Here's an overview of your service platform.
							</p>
						</div>

						<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-sm font-medium">
										Total Users
									</CardTitle>
									<Users className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">2,853</div>
									<p className="text-xs text-muted-foreground">
										+12.5% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-sm font-medium">
										Service Providers
									</CardTitle>
									<Home className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">432</div>
									<p className="text-xs text-muted-foreground">
										+4.3% from last month
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-sm font-medium">
										Pending Bookings
									</CardTitle>
									<Calendar className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">48</div>
									<p className="text-xs text-muted-foreground">
										-8.2% from last week
									</p>
								</CardContent>
							</Card>

							<Card>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="text-sm font-medium">Revenue</CardTitle>
									<DollarSign className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">$24,389</div>
									<p className="text-xs text-muted-foreground">
										+18.7% from last month
									</p>
								</CardContent>
							</Card>
						</div>

						<Tabs defaultValue="overview" className="space-y-4">
							<TabsList>
								<TabsTrigger value="overview">Overview</TabsTrigger>
								<TabsTrigger value="analytics">Analytics</TabsTrigger>
								<TabsTrigger value="reports">Reports</TabsTrigger>
								<TabsTrigger value="notifications">Notifications</TabsTrigger>
							</TabsList>

							<TabsContent value="overview" className="space-y-4">
								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
									<Card className="lg:col-span-4">
										<CardHeader>
											<CardTitle>Bookings Overview</CardTitle>
											<CardDescription>
												Monthly booking trends across all services
											</CardDescription>
										</CardHeader>
										<CardContent className="pl-2">
											<ResponsiveContainer width="100%" height={350}>
												<BarChart data={bookingsData}>
													<CartesianGrid strokeDasharray="3 3" />
													<XAxis dataKey="name" />
													<YAxis />
													<RechartsTooltip />
													<Bar
														dataKey="completed"
														fill="#22c55e"
														name="Completed"
													/>
													<Bar
														dataKey="pending"
														fill="#f59e0b"
														name="Pending"
													/>
													<Bar
														dataKey="cancelled"
														fill="#ef4444"
														name="Cancelled"
													/>
												</BarChart>
											</ResponsiveContainer>
										</CardContent>
									</Card>

									<Card className="lg:col-span-3">
										<CardHeader>
											<CardTitle>Service Distribution</CardTitle>
											<CardDescription>
												Breakdown of services by category
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ResponsiveContainer width="100%" height={350}>
												<PieChart>
													<Pie
														data={serviceData}
														cx="50%"
														cy="50%"
														labelLine={false}
														outerRadius={80}
														fill="#8884d8"
														dataKey="value"
														label={({ name, percent }) =>
															`${name} ${(percent * 100).toFixed(0)}%`
														}
													>
														{serviceData.map((entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={COLORS[index % COLORS.length]}
															/>
														))}
													</Pie>
													<Legend />
												</PieChart>
											</ResponsiveContainer>
										</CardContent>
									</Card>
								</div>

								<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
									<Card className="lg:col-span-4">
										<CardHeader>
											<CardTitle>Recent Bookings</CardTitle>
											<CardDescription>
												Latest service bookings across the platform
											</CardDescription>
										</CardHeader>
										<CardContent>
											<BookingsTable />
										</CardContent>
									</Card>

									<Card className="lg:col-span-3">
										<CardHeader>
											<CardTitle>Recent Activity</CardTitle>
											<CardDescription>
												Latest actions and updates
											</CardDescription>
										</CardHeader>
										<CardContent>
											<RecentActivityFeed />
										</CardContent>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value="analytics" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Advanced Analytics</CardTitle>
										<CardDescription>
											Detailed metrics and performance indicators
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="h-[400px] flex items-center justify-center border rounded-md">
											<p className="text-muted-foreground">
												Advanced analytics content will appear here
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="reports" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Generated Reports</CardTitle>
										<CardDescription>
											Access and download system reports
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="h-[400px] flex items-center justify-center border rounded-md">
											<p className="text-muted-foreground">
												Reports content will appear here
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="notifications" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>System Notifications</CardTitle>
										<CardDescription>
											Important alerts and updates
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="h-[400px] flex items-center justify-center border rounded-md">
											<p className="text-muted-foreground">
												Notifications content will appear here
											</p>
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
	);
}

// Sample data for charts
const bookingsData = [
	{ name: "Jan", completed: 65, pending: 28, cancelled: 12 },
	{ name: "Feb", completed: 59, pending: 32, cancelled: 10 },
	{ name: "Mar", completed: 80, pending: 27, cancelled: 18 },
	{ name: "Apr", completed: 81, pending: 26, cancelled: 11 },
	{ name: "May", completed: 56, pending: 33, cancelled: 15 },
	{ name: "Jun", completed: 55, pending: 30, cancelled: 13 },
	{ name: "Jul", completed: 40, pending: 20, cancelled: 8 },
];

const serviceData = [
	{ name: "Cleaning", value: 35 },
	{ name: "Plumbing", value: 20 },
	{ name: "Electrical", value: 18 },
	{ name: "Gardening", value: 15 },
	{ name: "Painting", value: 12 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
