"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard } from "lucide-react";
// import { UserHeader } from "@/components/user-header"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function ProfilePage() {
	return (
		<div className="min-h-screen bg-background">
			{/* <UserHeader /> */}

			<main className="container mx-auto p-4 md:p-6 lg:p-8">
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
					<p className="text-muted-foreground">
						Manage your account settings and preferences
					</p>
				</div>

				<Tabs defaultValue="personal" className="space-y-4">
					<TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
						<TabsTrigger value="personal">Personal Info</TabsTrigger>
						<TabsTrigger value="payment">Payment</TabsTrigger>
						<TabsTrigger value="preferences">Preferences</TabsTrigger>
					</TabsList>

					<TabsContent value="personal" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Profile Information</CardTitle>
								<CardDescription>
									Update your personal details and contact information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="flex flex-col items-center space-y-3 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
									<Avatar className="h-24 w-24">
										<AvatarImage
											src="/placeholder.svg?height=96&width=96"
											alt="John Doe"
										/>
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div className="space-y-1 text-center sm:text-left">
										<h3 className="font-medium">Profile Photo</h3>
										<p className="text-sm text-muted-foreground">
											This will be displayed on your profile and in reviews
										</p>
										<div className="flex flex-wrap justify-center gap-2 sm:justify-start">
											<Button size="sm" variant="outline">
												Upload New
											</Button>
											<Button
												size="sm"
												variant="outline"
												className="text-red-500"
											>
												Remove
											</Button>
										</div>
									</div>
								</div>

								<Separator />

								<div className="grid gap-4 sm:grid-cols-2">
									<div className="grid gap-2">
										<Label htmlFor="first-name">First Name</Label>
										<Input id="first-name" defaultValue="John" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="last-name">Last Name</Label>
										<Input id="last-name" defaultValue="Doe" />
									</div>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="email">Email Address</Label>
									<Input
										id="email"
										type="email"
										defaultValue="john.doe@example.com"
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="phone">Phone Number</Label>
									<Input id="phone" type="tel" defaultValue="(555) 123-4567" />
								</div>

								<div className="grid gap-2">
									<Label htmlFor="address">Address</Label>
									<Textarea
										id="address"
										defaultValue="123 Main St, Apt 4B, New York, NY 10001"
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Changes</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Account Security</CardTitle>
								<CardDescription>
									Manage your password and account security settings
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="current-password">Current Password</Label>
									<Input id="current-password" type="password" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="new-password">New Password</Label>
									<Input id="new-password" type="password" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="confirm-password">Confirm New Password</Label>
									<Input id="confirm-password" type="password" />
								</div>
							</CardContent>
							<CardFooter>
								<Button>Update Password</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value="payment" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Payment Methods</CardTitle>
								<CardDescription>
									Manage your payment methods and billing information
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="rounded-lg border p-4">
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-4">
											<div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
												<CreditCard className="h-6 w-6" />
											</div>
											<div>
												<p className="font-medium">Visa ending in 4242</p>
												<p className="text-sm text-muted-foreground">
													Expires 04/2025
												</p>
											</div>
										</div>
										<Badge>Default</Badge>
									</div>
								</div>

								<div className="rounded-lg border p-4">
									<div className="flex items-start justify-between">
										<div className="flex items-center gap-4">
											<div className="flex h-10 w-16 items-center justify-center rounded bg-muted">
												<CreditCard className="h-6 w-6" />
											</div>
											<div>
												<p className="font-medium">Mastercard ending in 8888</p>
												<p className="text-sm text-muted-foreground">
													Expires 09/2024
												</p>
											</div>
										</div>
										<Button variant="ghost" size="sm">
											Make Default
										</Button>
									</div>
								</div>

								<Button variant="outline" className="mt-2 w-full">
									Add New Payment Method
								</Button>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Billing Address</CardTitle>
								<CardDescription>
									Manage your billing address for invoices and receipts
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-2">
									<Label htmlFor="billing-address">Billing Address</Label>
									<Textarea
										id="billing-address"
										defaultValue="123 Main St, Apt 4B, New York, NY 10001"
									/>
								</div>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="grid gap-2">
										<Label htmlFor="city">City</Label>
										<Input id="city" defaultValue="New York" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="state">State</Label>
										<Input id="state" defaultValue="NY" />
									</div>
								</div>
								<div className="grid gap-4 sm:grid-cols-2">
									<div className="grid gap-2">
										<Label htmlFor="zip">ZIP Code</Label>
										<Input id="zip" defaultValue="10001" />
									</div>
									<div className="grid gap-2">
										<Label htmlFor="country">Country</Label>
										<Select defaultValue="us">
											<SelectTrigger id="country">
												<SelectValue placeholder="Select country" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="us">United States</SelectItem>
												<SelectItem value="ca">Canada</SelectItem>
												<SelectItem value="uk">United Kingdom</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Billing Address</Button>
							</CardFooter>
						</Card>
					</TabsContent>

					<TabsContent value="preferences" className="space-y-4">
						<Card>
							<CardHeader>
								<CardTitle>Notification Preferences</CardTitle>
								<CardDescription>
									Manage how and when you receive notifications
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="booking-confirmation">
												Booking Confirmations
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications when a booking is confirmed
											</p>
										</div>
										<Switch id="booking-confirmation" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="booking-reminder">
												Booking Reminders
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive reminders 24 hours before your scheduled service
											</p>
										</div>
										<Switch id="booking-reminder" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="technician-arrival">
												Technician Arrival
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications when a technician is on the way
											</p>
										</div>
										<Switch id="technician-arrival" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="service-completion">
												Service Completion
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications when a service is completed
											</p>
										</div>
										<Switch id="service-completion" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="promotions">Promotions and Offers</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications about special offers
											</p>
										</div>
										<Switch id="promotions" />
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Communication Preferences</CardTitle>
								<CardDescription>
									Manage how we communicate with you
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="email-notifications">
												Email Notifications
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications via email
											</p>
										</div>
										<Switch id="email-notifications" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="sms-notifications">
												SMS Notifications
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications via text message
											</p>
										</div>
										<Switch id="sms-notifications" defaultChecked />
									</div>
									<Separator />
									<div className="flex items-center justify-between">
										<div className="space-y-0.5">
											<Label htmlFor="push-notifications">
												Push Notifications
											</Label>
											<p className="text-sm text-muted-foreground">
												Receive notifications on your device
											</p>
										</div>
										<Switch id="push-notifications" defaultChecked />
									</div>
								</div>
							</CardContent>
							<CardFooter>
								<Button>Save Preferences</Button>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
