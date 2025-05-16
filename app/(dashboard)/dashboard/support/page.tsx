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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { UserHeader } from "@/components/user-header"
import { Separator } from "@/components/ui/separator";
import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	ChevronRight,
	Clock,
	FileQuestion,
	FileText,
	HelpCircle,
	Info,
	Lightbulb,
	MessageCircle,
	Phone,
	Search,
	Send,
	ThumbsUp,
	Video,
	Home,
	Calendar,
	User,
	X,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

export default function SupportPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [chatMessage, setChatMessage] = useState("");
	const [showLiveChat, setShowLiveChat] = useState(false);

	// Filter FAQs based on search query and category
	const filteredFaqs = faqs.filter((faq) => {
		const matchesSearch =
			faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
			faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === "all" || faq.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-background">
			{/* <UserHeader /> */}

			<main className="container mx-auto p-4 md:p-6 lg:p-8">
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
					<p className="text-muted-foreground">
						Get help with your service bookings and account
					</p>
				</div>

				<div className="mb-8">
					<Card className="overflow-hidden">
						<div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h2 className="text-xl font-semibold">
										How can we help you today?
									</h2>
									<p className="mt-1 text-sm text-white/80">
										Search our help center or contact our support team for
										assistance
									</p>
								</div>
								<div className="relative w-full sm:w-[300px]">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
									<Input
										type="search"
										placeholder="Search for help..."
										className="border-white/30 bg-white/20 pl-9 text-white placeholder:text-white/70 focus-visible:ring-white/50"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>
							</div>
						</div>
						<div className="grid gap-4 p-6 sm:grid-cols-2 md:grid-cols-4">
							<Card className="flex flex-col items-center p-4 text-center transition-all hover:border-primary/50 hover:shadow-md">
								<div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600">
									<MessageCircle className="h-6 w-6" />
								</div>
								<h3 className="mb-1 font-medium">Live Chat</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Chat with our support team in real-time
								</p>
								<Button
									variant="outline"
									className="w-full"
									onClick={() => setShowLiveChat(true)}
								>
									Start Chat
								</Button>
							</Card>

							<Card className="flex flex-col items-center p-4 text-center transition-all hover:border-primary/50 hover:shadow-md">
								<div className="mb-4 rounded-full bg-green-100 p-3 text-green-600">
									<Phone className="h-6 w-6" />
								</div>
								<h3 className="mb-1 font-medium">Phone Support</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Call us for immediate assistance
								</p>
								<Button variant="outline" className="w-full">
									1-800-555-1234
								</Button>
							</Card>

							<Card className="flex flex-col items-center p-4 text-center transition-all hover:border-primary/50 hover:shadow-md">
								<div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600">
									<FileText className="h-6 w-6" />
								</div>
								<h3 className="mb-1 font-medium">Submit Ticket</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Create a support ticket for complex issues
								</p>
								<Dialog>
									<DialogTrigger asChild>
										<Button variant="outline" className="w-full">
											New Ticket
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[500px]">
										<DialogHeader>
											<DialogTitle>Submit a Support Ticket</DialogTitle>
											<DialogDescription>
												Fill out this form to get in touch with our support
												team.
											</DialogDescription>
										</DialogHeader>
										<div className="grid gap-4 py-4">
											<div className="grid gap-2">
												<label htmlFor="support-subject">Subject</label>
												<Input
													id="support-subject"
													placeholder="What do you need help with?"
												/>
											</div>
											<div className="grid gap-2">
												<label htmlFor="ticket-category">Category</label>
												<Select>
													<SelectTrigger id="ticket-category">
														<SelectValue placeholder="Select a category" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="booking">
															Booking & Scheduling
														</SelectItem>
														<SelectItem value="payment">
															Payments & Billing
														</SelectItem>
														<SelectItem value="account">
															Account Issues
														</SelectItem>
														<SelectItem value="service">
															Service Quality
														</SelectItem>
														<SelectItem value="other">Other</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="grid gap-2">
												<label htmlFor="support-message">Message</label>
												<Textarea
													id="support-message"
													placeholder="Please describe your issue in detail"
													className="min-h-[100px]"
												/>
											</div>
											<div className="grid gap-2">
												<label htmlFor="ticket-attachment">
													Attachments (optional)
												</label>
												<Input id="ticket-attachment" type="file" />
												<p className="text-xs text-muted-foreground">
													You can upload screenshots or documents to help us
													understand your issue better.
												</p>
											</div>
										</div>
										<DialogFooter>
											<Button variant="outline">Cancel</Button>
											<Button>Submit Ticket</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</Card>

							<Card className="flex flex-col items-center p-4 text-center transition-all hover:border-primary/50 hover:shadow-md">
								<div className="mb-4 rounded-full bg-amber-100 p-3 text-amber-600">
									<FileQuestion className="h-6 w-6" />
								</div>
								<h3 className="mb-1 font-medium">Self Help</h3>
								<p className="mb-4 text-sm text-muted-foreground">
									Browse our knowledge base articles
								</p>
								<Button variant="outline" className="w-full">
									Knowledge Base
								</Button>
							</Card>
						</div>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-3">
					<div className="md:col-span-2">
						<Tabs defaultValue="faqs" className="space-y-4">
							<TabsList className="w-full justify-start">
								<TabsTrigger value="faqs" className="flex items-center gap-1">
									<HelpCircle className="h-4 w-4" />
									<span>FAQs</span>
								</TabsTrigger>
								<TabsTrigger
									value="tickets"
									className="flex items-center gap-1"
								>
									<FileText className="h-4 w-4" />
									<span>My Tickets</span>
								</TabsTrigger>
								<TabsTrigger
									value="knowledge"
									className="flex items-center gap-1"
								>
									<Lightbulb className="h-4 w-4" />
									<span>Knowledge Base</span>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="faqs" className="space-y-4">
								<Card>
									<CardHeader className="pb-3">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
											<div>
												<CardTitle>Frequently Asked Questions</CardTitle>
												<CardDescription>
													Find answers to common questions about our services
												</CardDescription>
											</div>
											<Select
												value={selectedCategory}
												onValueChange={setSelectedCategory}
											>
												<SelectTrigger>
													<SelectValue placeholder="Filter by category" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="all">All Categories</SelectItem>
													<SelectItem value="booking">
														Booking & Scheduling
													</SelectItem>
													<SelectItem value="payment">
														Payments & Billing
													</SelectItem>
													<SelectItem value="account">Account</SelectItem>
													<SelectItem value="service">Service</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</CardHeader>
									<CardContent>
										{searchQuery && filteredFaqs.length === 0 ? (
											<div className="flex flex-col items-center justify-center py-8 text-center">
												<HelpCircle className="mb-2 h-12 w-12 text-muted-foreground" />
												<h3 className="text-lg font-medium">
													No results found
												</h3>
												<p className="mb-4 text-sm text-muted-foreground">
													We couldn't find any FAQs matching "{searchQuery}"
												</p>
												<Button onClick={() => setSearchQuery("")}>
													Clear Search
												</Button>
											</div>
										) : (
											<Accordion type="single" collapsible className="w-full">
												{filteredFaqs.map((faq) => (
													<AccordionItem key={faq.id} value={faq.id}>
														<AccordionTrigger className="hover:bg-muted/50 px-4 py-2 rounded-md">
															<div className="flex items-start text-left">
																<span className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border">
																	<HelpCircle className="h-3 w-3" />
																</span>
																<span>{faq.question}</span>
															</div>
														</AccordionTrigger>
														<AccordionContent className="px-4 pt-2 pb-4">
															<div className="flex">
																<div className="mr-2 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-primary/10">
																	<Info className="h-3 w-3 text-primary" />
																</div>
																<div className="space-y-2">
																	<p>{faq.answer}</p>
																	<div className="flex items-center justify-between">
																		<Badge
																			variant="outline"
																			className="text-xs"
																		>
																			{faq.category}
																		</Badge>
																		<div className="flex items-center gap-2">
																			<span className="text-xs text-muted-foreground">
																				Was this helpful?
																			</span>
																			<Button
																				variant="ghost"
																				size="sm"
																				className="h-7 w-7 p-0"
																			>
																				<ThumbsUp className="h-3 w-3" />
																				<span className="sr-only">Yes</span>
																			</Button>
																		</div>
																	</div>
																</div>
															</div>
														</AccordionContent>
													</AccordionItem>
												))}
											</Accordion>
										)}
									</CardContent>
									<CardFooter className="flex justify-between border-t pt-4">
										<Button variant="outline" className="gap-1">
											<FileText className="h-4 w-4" />
											<span>View All FAQs</span>
										</Button>
										<Dialog>
											<DialogTrigger asChild>
												<Button className="gap-1">
													<MessageCircle className="h-4 w-4" />
													<span>Can't find an answer?</span>
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Contact Support</DialogTitle>
													<DialogDescription>
														Fill out this form to get in touch with our support
														team.
													</DialogDescription>
												</DialogHeader>
												<div className="grid gap-4 py-4">
													<div className="grid gap-2">
														<label htmlFor="support-subject">Subject</label>
														<Input
															id="support-subject"
															placeholder="What do you need help with?"
														/>
													</div>
													<div className="grid gap-2">
														<label htmlFor="support-message">Message</label>
														<Textarea
															id="support-message"
															placeholder="Please describe your issue in detail"
															className="min-h-[100px]"
														/>
													</div>
												</div>
												<DialogFooter>
													<Button variant="outline">Cancel</Button>
													<Button>Submit Ticket</Button>
												</DialogFooter>
											</DialogContent>
										</Dialog>
									</CardFooter>
								</Card>

								<div className="grid gap-4 sm:grid-cols-2">
									<Card className="overflow-hidden">
										<CardHeader className="bg-blue-50 dark:bg-blue-900/20">
											<CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
												<Video className="h-5 w-5" />
												<span>Video Tutorials</span>
											</CardTitle>
											<CardDescription>
												Learn how to use our platform with video guides
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-4">
											<ul className="space-y-3">
												{videoTutorials.map((tutorial, index) => (
													<li key={index} className="flex items-start gap-3">
														<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-700">
															<Video className="h-4 w-4" />
														</div>
														<div>
															<p className="font-medium">{tutorial.title}</p>
															<p className="text-xs text-muted-foreground">
																{tutorial.duration}
															</p>
														</div>
													</li>
												))}
											</ul>
										</CardContent>
										<CardFooter className="border-t bg-muted/30 px-4 py-3">
											<Button variant="ghost" className="w-full gap-1">
												<ChevronRight className="h-4 w-4" />
												<span>View All Tutorials</span>
											</Button>
										</CardFooter>
									</Card>

									<Card className="overflow-hidden">
										<CardHeader className="bg-green-50 dark:bg-green-900/20">
											<CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
												<CheckCircle2 className="h-5 w-5" />
												<span>Quick Solutions</span>
											</CardTitle>
											<CardDescription>
												Common issues and their quick fixes
											</CardDescription>
										</CardHeader>
										<CardContent className="pt-4">
											<ul className="space-y-3">
												{quickSolutions.map((solution, index) => (
													<li key={index} className="flex items-start gap-3">
														<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-green-100 text-green-700">
															<Lightbulb className="h-4 w-4" />
														</div>
														<div>
															<p className="font-medium">{solution.title}</p>
															<p className="text-xs text-muted-foreground">
																{solution.description}
															</p>
														</div>
													</li>
												))}
											</ul>
										</CardContent>
										<CardFooter className="border-t bg-muted/30 px-4 py-3">
											<Button variant="ghost" className="w-full gap-1">
												<ChevronRight className="h-4 w-4" />
												<span>View All Solutions</span>
											</Button>
										</CardFooter>
									</Card>
								</div>
							</TabsContent>

							<TabsContent value="tickets" className="space-y-4">
								<Card>
									<CardHeader className="pb-3">
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
											<div>
												<CardTitle>My Support Tickets</CardTitle>
												<CardDescription>
													View and manage your support tickets
												</CardDescription>
											</div>
											<Button className="mt-2 sm:mt-0">
												<FileText className="mr-2 h-4 w-4" />
												New Ticket
											</Button>
										</div>
									</CardHeader>
									<CardContent>
										{supportTickets.length === 0 ? (
											<div className="flex flex-col items-center justify-center py-8 text-center">
												<FileText className="mb-2 h-12 w-12 text-muted-foreground" />
												<h3 className="text-lg font-medium">
													No support tickets
												</h3>
												<p className="mb-4 text-sm text-muted-foreground">
													You haven't submitted any support tickets yet.
												</p>
												<Button>Create a Ticket</Button>
											</div>
										) : (
											<div className="space-y-4">
												{supportTickets.map((ticket) => (
													<Card key={ticket.id} className="overflow-hidden">
														<div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
															<div className="flex items-start gap-3">
																<StatusIcon status={ticket.status} />
																<div>
																	<h3 className="font-medium">
																		{ticket.subject}
																	</h3>
																	<div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
																		<span>Ticket #{ticket.id}</span>
																		<span>•</span>
																		<span>{ticket.date}</span>
																		<span>•</span>
																		<Badge
																			variant="outline"
																			className="text-xs"
																		>
																			{ticket.category}
																		</Badge>
																	</div>
																</div>
															</div>
															<StatusBadge status={ticket.status} />
														</div>
														<div className="border-t bg-muted/30 p-4">
															<p className="mb-3 text-sm">{ticket.message}</p>
															<div className="flex flex-wrap items-center justify-between gap-2">
																<div className="flex items-center gap-2">
																	<Avatar className="h-6 w-6">
																		<AvatarImage
																			src="/placeholder.svg?height=24&width=24"
																			alt="Support Agent"
																		/>
																		<AvatarFallback>SA</AvatarFallback>
																	</Avatar>
																	<span className="text-xs text-muted-foreground">
																		{ticket.status === "Open"
																			? "Awaiting agent response"
																			: "Last updated 2 hours ago"}
																	</span>
																</div>
																<div className="flex gap-2">
																	<Button variant="outline" size="sm">
																		View Details
																	</Button>
																	{ticket.status !== "Closed" && (
																		<Button
																			size="sm"
																			variant="ghost"
																			className="text-red-500 hover:text-red-600"
																		>
																			Close Ticket
																		</Button>
																	)}
																</div>
															</div>
														</div>
													</Card>
												))}
											</div>
										)}
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="knowledge" className="space-y-4">
								<Card>
									<CardHeader>
										<CardTitle>Knowledge Base</CardTitle>
										<CardDescription>
											Browse our collection of help articles and guides
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="grid gap-6 sm:grid-cols-2">
											{knowledgeCategories.map((category, index) => (
												<div key={index} className="space-y-3">
													<div className="flex items-center gap-2">
														<div
															className={`rounded-full p-1.5 ${category.iconBg}`}
														>
															<category.icon
																className={`h-4 w-4 ${category.iconColor}`}
															/>
														</div>
														<h3 className="font-medium">{category.title}</h3>
													</div>
													<ul className="space-y-2 pl-7">
														{category.articles.map((article, idx) => (
															<li key={idx}>
																<a
																	href="#"
																	className="flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
																>
																	<ArrowRight className="h-3 w-3" />
																	<span>{article}</span>
																</a>
															</li>
														))}
													</ul>
													<Button variant="ghost" size="sm" className="ml-7">
														View all {category.title} articles
													</Button>
												</div>
											))}
										</div>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle>Popular Articles</CardTitle>
										<CardDescription>
											Most frequently viewed help articles
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="space-y-4">
											{popularArticles.map((article, index) => (
												<div key={index} className="flex items-start gap-3">
													<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-primary/10">
														<FileText className="h-4 w-4 text-primary" />
													</div>
													<div>
														<a href="#" className="font-medium hover:underline">
															{article.title}
														</a>
														<p className="text-sm text-muted-foreground line-clamp-2">
															{article.excerpt}
														</p>
														<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
															<span>{article.category}</span>
															<span>•</span>
															<span>{article.readTime}</span>
															<span>•</span>
															<div className="flex items-center">
																<ThumbsUp className="mr-1 h-3 w-3" />
																<span>
																	{article.helpfulCount} found this helpful
																</span>
															</div>
														</div>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					<div className="space-y-6">
						{showLiveChat && (
							<Card className="overflow-hidden">
								<CardHeader className="bg-blue-50 dark:bg-blue-900/20 pb-3">
									<div className="flex items-center justify-between">
										<CardTitle className="flex items-center gap-2">
											<MessageCircle className="h-5 w-5" />
											<span>Live Chat</span>
										</CardTitle>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => setShowLiveChat(false)}
										>
											<X className="h-4 w-4" />
										</Button>
									</div>
									<CardDescription>Chat with our support team</CardDescription>
								</CardHeader>
								<CardContent className="p-0">
									<div className="h-[300px] overflow-y-auto p-4">
										<div className="mb-4 flex justify-center">
											<Badge variant="outline" className="bg-muted/50">
												Today, 2:30 PM
											</Badge>
										</div>

										<div className="mb-4 flex justify-start">
											<div className="max-w-[80%] rounded-lg bg-muted p-3">
												<div className="mb-1 flex items-center gap-2">
													<Avatar className="h-6 w-6">
														<AvatarImage
															src="/placeholder.svg?height=24&width=24"
															alt="Support Agent"
														/>
														<AvatarFallback>SA</AvatarFallback>
													</Avatar>
													<span className="text-xs font-medium">
														Sarah (Support)
													</span>
												</div>
												<p className="text-sm">
													Hello! Welcome to HomeService support. How can I help
													you today?
												</p>
												<span className="mt-1 block text-right text-xs text-muted-foreground">
													2:30 PM
												</span>
											</div>
										</div>

										<div className="mb-4 flex justify-end">
											<div className="max-w-[80%] rounded-lg bg-primary p-3 text-primary-foreground">
												<p className="text-sm">
													Hi, I'm having trouble rescheduling my plumbing
													appointment for tomorrow.
												</p>
												<span className="mt-1 block text-right text-xs text-primary-foreground/70">
													2:31 PM
												</span>
											</div>
										</div>

										<div className="mb-4 flex justify-start">
											<div className="max-w-[80%] rounded-lg bg-muted p-3">
												<div className="mb-1 flex items-center gap-2">
													<Avatar className="h-6 w-6">
														<AvatarImage
															src="/placeholder.svg?height=24&width=24"
															alt="Support Agent"
														/>
														<AvatarFallback>SA</AvatarFallback>
													</Avatar>
													<span className="text-xs font-medium">
														Sarah (Support)
													</span>
												</div>
												<p className="text-sm">
													I'd be happy to help you reschedule your appointment.
													Could you please provide me with your booking
													reference number?
												</p>
												<span className="mt-1 block text-right text-xs text-muted-foreground">
													2:32 PM
												</span>
											</div>
										</div>

										<div className="flex justify-center">
											<Badge
												variant="outline"
												className="animate-pulse bg-muted/50"
											>
												<Clock className="mr-1 h-3 w-3" />
												<span>Sarah is typing...</span>
											</Badge>
										</div>
									</div>
								</CardContent>
								<div className="border-t p-3">
									<div className="flex items-center gap-2">
										<Input
											placeholder="Type your message..."
											value={chatMessage}
											onChange={(e) => setChatMessage(e.target.value)}
											className="flex-1"
										/>
										<Button size="icon" disabled={!chatMessage.trim()}>
											<Send className="h-4 w-4" />
											<span className="sr-only">Send message</span>
										</Button>
									</div>
								</div>
							</Card>
						)}

						<Card>
							<CardHeader>
								<CardTitle>Support Status</CardTitle>
								<CardDescription>
									Current support availability and response times
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-4">
									<div>
										<div className="mb-1 flex items-center justify-between">
											<span className="text-sm font-medium">Live Chat</span>
											<Badge className="bg-green-500">Available</Badge>
										</div>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Clock className="h-3 w-3" />
											<span>Average response time: 2 minutes</span>
										</div>
									</div>

									<div>
										<div className="mb-1 flex items-center justify-between">
											<span className="text-sm font-medium">Phone Support</span>
											<Badge className="bg-green-500">Available</Badge>
										</div>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Clock className="h-3 w-3" />
											<span>Current wait time: ~5 minutes</span>
										</div>
									</div>

									<div>
										<div className="mb-1 flex items-center justify-between">
											<span className="text-sm font-medium">Email Support</span>
											<Badge className="bg-yellow-500">Busy</Badge>
										</div>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Clock className="h-3 w-3" />
											<span>Response within 24 hours</span>
										</div>
									</div>

									<div>
										<div className="mb-1 flex items-center justify-between">
											<span className="text-sm font-medium">
												Support Ticket
											</span>
											<Badge className="bg-green-500">Available</Badge>
										</div>
										<div className="flex items-center gap-2 text-xs text-muted-foreground">
											<Clock className="h-3 w-3" />
											<span>First response within 4 hours</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Support Hours</CardTitle>
								<CardDescription>
									When you can reach our support team
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="space-y-2">
									<div className="flex justify-between">
										<span>Monday - Friday</span>
										<span className="font-medium">8:00 AM - 8:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Saturday</span>
										<span className="font-medium">9:00 AM - 5:00 PM</span>
									</div>
									<div className="flex justify-between">
										<span>Sunday</span>
										<span className="font-medium">Closed</span>
									</div>
									<Separator className="my-2" />
									<div className="flex justify-between">
										<span>Emergency Support</span>
										<span className="font-medium text-green-600">24/7</span>
									</div>
									<p className="mt-2 text-sm text-muted-foreground">
										All times are in Eastern Time (ET)
									</p>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Emergency Support</CardTitle>
								<CardDescription>For urgent service issues</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-900/50 dark:bg-red-900/20">
									<div className="flex items-center gap-2">
										<AlertCircle className="h-5 w-5 text-red-600" />
										<h3 className="font-medium text-red-600">
											Emergency Services
										</h3>
									</div>
									<p className="mt-1 text-sm text-red-600">
										For urgent issues requiring immediate attention such as
										water damage, gas leaks, or electrical hazards.
									</p>
								</div>
								<div className="rounded-lg bg-primary/10 p-3 text-center">
									<p className="font-medium text-primary">
										Emergency Support Line
									</p>
									<p className="text-lg font-bold text-primary">
										1-800-555-1234
									</p>
								</div>
								<p className="text-xs text-muted-foreground">
									Note: Emergency support is available 24/7 for critical issues
									only. For non-emergency issues, please use our regular support
									channels during business hours.
								</p>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Satisfaction Rating</CardTitle>
								<CardDescription>
									How customers rate our support
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="text-center">
									<div className="text-3xl font-bold text-primary">94%</div>
									<p className="text-sm text-muted-foreground">
										Customer satisfaction
									</p>
								</div>
								<div className="space-y-2">
									<div className="flex items-center justify-between text-sm">
										<span>Response time</span>
										<span className="font-medium">Excellent</span>
									</div>
									<Progress value={92} className="h-2" />

									<div className="flex items-center justify-between text-sm">
										<span>Issue resolution</span>
										<span className="font-medium">Very Good</span>
									</div>
									<Progress value={88} className="h-2" />

									<div className="flex items-center justify-between text-sm">
										<span>Support knowledge</span>
										<span className="font-medium">Excellent</span>
									</div>
									<Progress value={95} className="h-2" />
								</div>
								<div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
									<Info className="h-3 w-3" />
									<span>Based on 1,248 customer reviews</span>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</main>
		</div>
	);
}

function StatusBadge({ status }: { status: string }) {
	switch (status) {
		case "Open":
			return <Badge className="bg-green-500 hover:bg-green-600">Open</Badge>;
		case "In Progress":
			return (
				<Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>
			);
		case "Pending":
			return (
				<Badge variant="outline" className="text-yellow-500 border-yellow-500">
					Pending
				</Badge>
			);
		case "Closed":
			return (
				<Badge variant="outline" className="text-gray-500 border-gray-500">
					Closed
				</Badge>
			);
		default:
			return <Badge variant="outline">{status}</Badge>;
	}
}

function StatusIcon({ status }: { status: string }) {
	switch (status) {
		case "Open":
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
					<MessageCircle className="h-4 w-4" />
				</div>
			);
		case "In Progress":
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
					<Clock className="h-4 w-4" />
				</div>
			);
		case "Pending":
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
					<AlertCircle className="h-4 w-4" />
				</div>
			);
		case "Closed":
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
					<CheckCircle2 className="h-4 w-4" />
				</div>
			);
		default:
			return (
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600">
					<HelpCircle className="h-4 w-4" />
				</div>
			);
	}
}

// Sample data
const faqs = [
	{
		id: "faq-1",
		question: "How do I book a service?",
		answer:
			"To book a service, navigate to the Services page, select the service you need, choose a date and time that works for you, and complete the booking process by providing your address and payment information.",
		category: "booking",
	},
	{
		id: "faq-2",
		question: "Can I reschedule my appointment?",
		answer:
			"Yes, you can reschedule your appointment up to 24 hours before the scheduled time without any penalty. To reschedule, go to My Bookings, find the appointment you want to change, and click on the Reschedule button.",
		category: "booking",
	},
	{
		id: "faq-3",
		question: "What is your cancellation policy?",
		answer:
			"You can cancel your appointment up to 24 hours before the scheduled time for a full refund. Cancellations made less than 24 hours before the appointment may be subject to a cancellation fee of up to 50% of the service cost.",
		category: "booking",
	},
	{
		id: "faq-4",
		question: "How do I pay for services?",
		answer:
			"We accept all major credit cards, PayPal, and Apple Pay. You can add your preferred payment method in your account settings. Payment is processed securely after the service is completed.",
		category: "payment",
	},
	{
		id: "faq-5",
		question: "Are your service providers background checked?",
		answer:
			"Yes, all our service providers undergo thorough background checks and are fully vetted before joining our platform. We also continuously monitor their performance and customer feedback to ensure high-quality service.",
		category: "service",
	},
	{
		id: "faq-6",
		question: "What if I'm not satisfied with the service?",
		answer:
			"Your satisfaction is our priority. If you're not completely satisfied with the service, please contact our support team within 48 hours of service completion, and we'll work to resolve the issue, which may include sending a different provider or offering a partial or full refund.",
		category: "service",
	},
	{
		id: "faq-7",
		question: "How do I leave a review for my service provider?",
		answer:
			"After your service is completed, you'll receive a notification asking you to rate and review your experience. You can also go to your Service History, find the completed service, and click on the Rate button to leave your feedback.",
		category: "service",
	},
	{
		id: "faq-8",
		question: "How do I reset my password?",
		answer:
			"To reset your password, click on the 'Forgot Password' link on the login page. Enter the email address associated with your account, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
		category: "account",
	},
	{
		id: "faq-9",
		question: "Can I change my email address?",
		answer:
			"Yes, you can change your email address in your account settings. Go to your Profile page, click on the Edit button next to your email address, enter your new email address, and confirm the change by entering your password.",
		category: "account",
	},
	{
		id: "faq-10",
		question: "How do I update my payment information?",
		answer:
			"To update your payment information, go to your Profile page, select the Payment tab, and click on the Edit button next to your payment method. You can add a new payment method or update an existing one.",
		category: "payment",
	},
];

const faqCategories = {
	booking: [
		"How to book a service",
		"Rescheduling appointments",
		"Cancellation policy",
		"Booking for someone else",
		"Recurring service bookings",
	],
	payments: [
		"Payment methods accepted",
		"When am I charged for services",
		"Refund policy",
		"Pricing questions",
		"Tipping service providers",
	],
};

const supportTickets = [
	{
		id: "T-12345",
		subject: "Issue with recent plumbing service",
		message:
			"The plumber who came to fix my sink left a small leak under the cabinet. I need someone to come back and fix this issue as soon as possible.",
		status: "Open",
		date: "May 8, 2023",
		category: "Service Quality",
	},
	{
		id: "T-12346",
		subject: "Double charge on my credit card",
		message:
			"I was charged twice for my house cleaning service on April 28. Please refund the duplicate charge as soon as possible.",
		status: "In Progress",
		date: "May 5, 2023",
		category: "Payments & Billing",
	},
	{
		id: "T-12347",
		subject: "Cannot reschedule my appointment",
		message:
			"I'm trying to reschedule my electrical service appointment but keep getting an error message. Please help me reschedule for next week.",
		status: "Closed",
		date: "April 30, 2023",
		category: "Booking & Scheduling",
	},
];

const videoTutorials = [
	{
		title: "How to Book Your First Service",
		duration: "3:45",
	},
	{
		title: "Managing Your Appointments",
		duration: "4:20",
	},
	{
		title: "Rating and Reviewing Services",
		duration: "2:15",
	},
	{
		title: "Setting Up Payment Methods",
		duration: "3:10",
	},
];

const quickSolutions = [
	{
		title: "Service provider didn't arrive",
		description: "Steps to take if your service provider doesn't show up",
	},
	{
		title: "Payment failed or declined",
		description: "Troubleshooting payment issues and declined transactions",
	},
	{
		title: "App login problems",
		description: "Solutions for common login and account access issues",
	},
	{
		title: "Booking confirmation not received",
		description: "What to do if you don't receive a booking confirmation",
	},
];

const knowledgeCategories = [
	{
		title: "Getting Started",
		icon: Home,
		iconBg: "bg-blue-100",
		iconColor: "text-blue-600",
		articles: [
			"Creating your account",
			"Booking your first service",
			"Understanding service types",
			"Setting up your profile",
			"Adding payment methods",
		],
	},
	{
		title: "Bookings & Scheduling",
		icon: Calendar,
		iconBg: "bg-green-100",
		iconColor: "text-green-600",
		articles: [
			"How to reschedule a service",
			"Cancellation policy explained",
			"Recurring booking setup",
			"Managing multiple appointments",
			"Booking for someone else",
		],
	},
	{
		title: "Payments & Billing",
		icon: FileText,
		iconBg: "bg-amber-100",
		iconColor: "text-amber-600",
		articles: [
			"Understanding your invoice",
			"Payment methods accepted",
			"Refund process explained",
			"Handling payment disputes",
			"Service pricing guide",
		],
	},
	{
		title: "Account & Security",
		icon: User,
		iconBg: "bg-purple-100",
		iconColor: "text-purple-600",
		articles: [
			"Changing your password",
			"Two-factor authentication",
			"Privacy settings",
			"Managing notification preferences",
			"Deleting your account",
		],
	},
];

const popularArticles = [
	{
		title: "How to Get a Refund for Unsatisfactory Service",
		excerpt:
			"Learn about our refund policy and the steps to request a refund if you're not satisfied with a service.",
		category: "Payments & Billing",
		readTime: "3 min read",
		helpfulCount: 342,
	},
	{
		title: "Troubleshooting Booking Errors",
		excerpt:
			"Common booking errors and how to resolve them when scheduling a service on our platform.",
		category: "Bookings & Scheduling",
		readTime: "4 min read",
		helpfulCount: 287,
	},
	{
		title: "Service Provider Vetting Process",
		excerpt:
			"Learn how we screen and verify all service providers before they join our platform to ensure quality and safety.",
		category: "Service Quality",
		readTime: "5 min read",
		helpfulCount: 215,
	},
];
