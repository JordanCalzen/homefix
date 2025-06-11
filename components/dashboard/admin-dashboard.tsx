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
	AreaChart,
	Area,
} from "recharts";
import {
	DollarSign,
	Users,
	Calendar,
	Home,
	Menu,
	Bell,
	Search,
	Sparkles,
	TrendingUp,
	Activity,
	Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock components - replace with your actual components
const BookingsTable = () => (
	<div className="space-y-3">
		{[...Array(5)].map((_, i) => (
			<div
				key={i}
				className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-muted/50 hover:bg-muted/50 transition-colors"
			>
				<div className="flex items-center gap-3">
					<Avatar className="h-8 w-8">
						<AvatarFallback className="text-xs">U{i + 1}</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-sm font-medium">Booking #{1000 + i}</p>
						<p className="text-xs text-muted-foreground">Cleaning Service</p>
					</div>
				</div>
				<Badge
					variant={
						i % 3 === 0 ? "default" : i % 3 === 1 ? "secondary" : "destructive"
					}
				>
					{i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Cancelled"}
				</Badge>
			</div>
		))}
	</div>
);

const RecentActivityFeed = () => (
	<div className="space-y-3">
		{[
			{ action: "New user registered", time: "2 min ago", icon: Users },
			{ action: "Booking completed", time: "5 min ago", icon: Calendar },
			{ action: "Payment received", time: "8 min ago", icon: DollarSign },
			{ action: "Service provider verified", time: "12 min ago", icon: Star },
			{ action: "New review posted", time: "15 min ago", icon: Activity },
		].map((item, i) => (
			<div
				key={i}
				className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-muted/30 hover:bg-muted/40 transition-all duration-200"
			>
				<div className="p-2 rounded-full bg-primary/10">
					<item.icon className="h-4 w-4 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm font-medium">{item.action}</p>
					<p className="text-xs text-muted-foreground">{item.time}</p>
				</div>
			</div>
		))}
	</div>
);

export default function AdminDashboard({
	userName = "Admin",
}: {
	userName?: string;
}) {
	const [activeTab, setActiveTab] = useState("overview");

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
			<div className="flex-1 flex flex-col">
				<main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
					<div className="flex flex-col gap-8">
						{/* Header Section */}
						<div className="flex flex-col gap-3">
							<div className="flex items-center gap-3">
								<div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
									<Sparkles className="h-6 w-6" />
								</div>
								<div>
									<h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
										Dashboard
									</h1>
									<p className="text-muted-foreground text-lg">
										Welcome back, {userName}! Here's your platform overview.
									</p>
								</div>
							</div>
						</div>

						{/* Stats Cards */}
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
								<CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
									<CardTitle className="text-sm font-medium text-blue-100">
										Total Users
									</CardTitle>
									<Users className="h-5 w-5 text-blue-200" />
								</CardHeader>
								<CardContent className="relative z-10">
									<div className="text-3xl font-bold">2,853</div>
									<div className="flex items-center gap-1 mt-1">
										<TrendingUp className="h-3 w-3 text-green-300" />
										<p className="text-xs text-blue-100">
											+12.5% from last month
										</p>
									</div>
								</CardContent>
							</Card>

							<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
								<CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
									<CardTitle className="text-sm font-medium text-emerald-100">
										Service Providers
									</CardTitle>
									<Home className="h-5 w-5 text-emerald-200" />
								</CardHeader>
								<CardContent className="relative z-10">
									<div className="text-3xl font-bold">432</div>
									<div className="flex items-center gap-1 mt-1">
										<TrendingUp className="h-3 w-3 text-green-300" />
										<p className="text-xs text-emerald-100">
											+4.3% from last month
										</p>
									</div>
								</CardContent>
							</Card>

							<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
								<CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
									<CardTitle className="text-sm font-medium text-amber-100">
										Pending Bookings
									</CardTitle>
									<Calendar className="h-5 w-5 text-amber-200" />
								</CardHeader>
								<CardContent className="relative z-10">
									<div className="text-3xl font-bold">48</div>
									<div className="flex items-center gap-1 mt-1">
										<Activity className="h-3 w-3 text-red-300" />
										<p className="text-xs text-amber-100">
											-8.2% from last week
										</p>
									</div>
								</CardContent>
							</Card>

							<Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
								<div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
								<CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
									<CardTitle className="text-sm font-medium text-purple-100">
										Revenue
									</CardTitle>
									<DollarSign className="h-5 w-5 text-purple-200" />
								</CardHeader>
								<CardContent className="relative z-10">
									<div className="text-3xl font-bold">$24,389</div>
									<div className="flex items-center gap-1 mt-1">
										<TrendingUp className="h-3 w-3 text-green-300" />
										<p className="text-xs text-purple-100">
											+18.7% from last month
										</p>
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Tabs Section */}
						<div className="space-y-6">
							<Tabs
								value={activeTab}
								onValueChange={setActiveTab}
								className="space-y-6"
							>
								<TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border border-white/20 shadow-lg">
									<TabsTrigger
										value="overview"
										className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
									>
										Overview
									</TabsTrigger>
									<TabsTrigger
										value="analytics"
										className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
									>
										Analytics
									</TabsTrigger>
									<TabsTrigger
										value="reports"
										className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
									>
										Reports
									</TabsTrigger>
									<TabsTrigger
										value="notifications"
										className="data-[state=active]:bg-white data-[state=active]:shadow-sm"
									>
										Notifications
									</TabsTrigger>
								</TabsList>

								<TabsContent value="overview" className="space-y-6">
									<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
										<Card className="lg:col-span-4 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
											<CardHeader className="pb-3">
												<CardTitle className="flex items-center gap-2">
													<BarChart className="h-5 w-5 text-blue-600" />
													Bookings Overview
												</CardTitle>
												<CardDescription>
													Monthly booking trends across all services
												</CardDescription>
											</CardHeader>
											<CardContent className="pl-2">
												<ResponsiveContainer width="100%" height={350}>
													<AreaChart data={bookingsData}>
														<defs>
															<linearGradient
																id="colorCompleted"
																x1="0"
																y1="0"
																x2="0"
																y2="1"
															>
																<stop
																	offset="5%"
																	stopColor="#22c55e"
																	stopOpacity={0.3}
																/>
																<stop
																	offset="95%"
																	stopColor="#22c55e"
																	stopOpacity={0}
																/>
															</linearGradient>
															<linearGradient
																id="colorPending"
																x1="0"
																y1="0"
																x2="0"
																y2="1"
															>
																<stop
																	offset="5%"
																	stopColor="#f59e0b"
																	stopOpacity={0.3}
																/>
																<stop
																	offset="95%"
																	stopColor="#f59e0b"
																	stopOpacity={0}
																/>
															</linearGradient>
														</defs>
														<CartesianGrid
															strokeDasharray="3 3"
															stroke="#e2e8f0"
														/>
														<XAxis dataKey="name" stroke="#64748b" />
														<YAxis stroke="#64748b" />
														<RechartsTooltip
															contentStyle={{
																backgroundColor: "white",
																border: "none",
																borderRadius: "8px",
																boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
															}}
														/>
														<Area
															type="monotone"
															dataKey="completed"
															stroke="#22c55e"
															strokeWidth={3}
															fillOpacity={1}
															fill="url(#colorCompleted)"
														/>
														<Area
															type="monotone"
															dataKey="pending"
															stroke="#f59e0b"
															strokeWidth={3}
															fillOpacity={1}
															fill="url(#colorPending)"
														/>
													</AreaChart>
												</ResponsiveContainer>
											</CardContent>
										</Card>

										<Card className="lg:col-span-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
											<CardHeader className="pb-3">
												<CardTitle className="flex items-center gap-2">
													<PieChart className="h-5 w-5 text-purple-600" />
													Service Distribution
												</CardTitle>
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
															outerRadius={100}
															fill="#8884d8"
															dataKey="value"
															label={({ name, percent }) =>
																`${name} ${(percent * 100).toFixed(0)}%`
															}
														>
															{serviceData.map((entry, index) => (
																<Cell
																	key={`cell-${index}`}
																	fill={
																		ENHANCED_COLORS[
																			index % ENHANCED_COLORS.length
																		]
																	}
																/>
															))}
														</Pie>
														<RechartsTooltip
															contentStyle={{
																backgroundColor: "white",
																border: "none",
																borderRadius: "8px",
																boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
															}}
														/>
													</PieChart>
												</ResponsiveContainer>
											</CardContent>
										</Card>
									</div>

									<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
										<Card className="lg:col-span-4 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
											<CardHeader className="pb-3">
												<CardTitle className="flex items-center gap-2">
													<Calendar className="h-5 w-5 text-green-600" />
													Recent Bookings
												</CardTitle>
												<CardDescription>
													Latest service bookings across the platform
												</CardDescription>
											</CardHeader>
											<CardContent>
												<BookingsTable />
											</CardContent>
										</Card>

										<Card className="lg:col-span-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
											<CardHeader className="pb-3">
												<CardTitle className="flex items-center gap-2">
													<Activity className="h-5 w-5 text-orange-600" />
													Recent Activity
												</CardTitle>
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

								<TabsContent value="analytics" className="space-y-6">
									<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<TrendingUp className="h-5 w-5 text-blue-600" />
												Advanced Analytics
											</CardTitle>
											<CardDescription>
												Detailed metrics and performance indicators
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
												<div className="text-center">
													<TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
													<p className="text-lg font-medium text-muted-foreground">
														Advanced analytics content will appear here
													</p>
													<p className="text-sm text-muted-foreground/70 mt-2">
														Connect your data sources to view detailed insights
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="reports" className="space-y-6">
									<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<Users className="h-5 w-5 text-purple-600" />
												Generated Reports
											</CardTitle>
											<CardDescription>
												Access and download system reports
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
												<div className="text-center">
													<Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
													<p className="text-lg font-medium text-muted-foreground">
														Reports content will appear here
													</p>
													<p className="text-sm text-muted-foreground/70 mt-2">
														Generate and download comprehensive reports
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</TabsContent>

								<TabsContent value="notifications" className="space-y-6">
									<Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
										<CardHeader>
											<CardTitle className="flex items-center gap-2">
												<Bell className="h-5 w-5 text-amber-600" />
												System Notifications
											</CardTitle>
											<CardDescription>
												Important alerts and updates
											</CardDescription>
										</CardHeader>
										<CardContent>
											<div className="h-[400px] flex items-center justify-center border-2 border-dashed border-muted rounded-xl bg-gradient-to-br from-amber-50 to-orange-50">
												<div className="text-center">
													<Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
													<p className="text-lg font-medium text-muted-foreground">
														Notifications content will appear here
													</p>
													<p className="text-sm text-muted-foreground/70 mt-2">
														Stay updated with important system alerts
													</p>
												</div>
											</div>
										</CardContent>
									</Card>
								</TabsContent>
							</Tabs>
						</div>
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

const ENHANCED_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];
