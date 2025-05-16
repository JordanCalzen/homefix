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
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Home, Search, Star } from "lucide-react";
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
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

export default function ServicesPage() {
	const [searchQuery, setSearchQuery] = useState("");
	const [priceRange, setPriceRange] = useState([0, 300]);
	const [selectedCategory, setSelectedCategory] = useState("all");

	// Filter services based on search query, price range, and category
	const filteredServices = services.filter((service) => {
		const matchesSearch = service.name
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesPrice =
			service.price >= priceRange[0] && service.price <= priceRange[1];
		const matchesCategory =
			selectedCategory === "all" || service.category === selectedCategory;
		return matchesSearch && matchesPrice && matchesCategory;
	});

	return (
		<div className="min-h-screen bg-background">
			{/* <UserHeader /> */}

			<main className="container mx-auto p-4 md:p-6 lg:p-8">
				<div className="mb-6">
					<h1 className="text-2xl font-bold tracking-tight">Services</h1>
					<p className="text-muted-foreground">
						Browse and book home services from trusted professionals
					</p>
				</div>

				<div className="mb-8">
					<Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
						<CardContent className="p-6">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h2 className="text-xl font-semibold">
										Find the Perfect Service
									</h2>
									<p className="mt-1 text-sm text-white/80">
										Browse our wide range of home services and book with
										confidence
									</p>
								</div>
								<div className="relative w-full sm:w-[300px]">
									<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
									<Input
										type="search"
										placeholder="Search services..."
										className="border-white/30 bg-white/20 pl-9 text-white placeholder:text-white/70 focus-visible:ring-white/50"
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-4">
					<div className="space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Filters</CardTitle>
								<CardDescription>Refine your service search</CardDescription>
							</CardHeader>
							<CardContent className="space-y-6">
								<div className="space-y-2">
									<h3 className="text-sm font-medium">Categories</h3>
									<div className="space-y-1">
										{categories.map((category) => (
											<div
												key={category.value}
												className="flex items-center space-x-2"
											>
												<Checkbox
													id={`category-${category.value}`}
													checked={selectedCategory === category.value}
													onCheckedChange={() =>
														setSelectedCategory(
															selectedCategory === category.value
																? "all"
																: category.value
														)
													}
												/>
												<label
													htmlFor={`category-${category.value}`}
													className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{category.label}
												</label>
											</div>
										))}
									</div>
								</div>

								<div className="space-y-2">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-medium">Price Range</h3>
										<span className="text-xs text-muted-foreground">
											${priceRange[0]} - ${priceRange[1]}
										</span>
									</div>
									<Slider
										defaultValue={[0, 300]}
										max={500}
										step={10}
										value={priceRange}
										onValueChange={setPriceRange}
									/>
								</div>

								<div className="space-y-2">
									<h3 className="text-sm font-medium">Rating</h3>
									<Select defaultValue="any">
										<SelectTrigger>
											<SelectValue placeholder="Any rating" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="any">Any rating</SelectItem>
											<SelectItem value="4.5">4.5 & above</SelectItem>
											<SelectItem value="4">4.0 & above</SelectItem>
											<SelectItem value="3.5">3.5 & above</SelectItem>
											<SelectItem value="3">3.0 & above</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<h3 className="text-sm font-medium">Availability</h3>
									<Select defaultValue="any">
										<SelectTrigger>
											<SelectValue placeholder="Any time" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="any">Any time</SelectItem>
											<SelectItem value="today">Today</SelectItem>
											<SelectItem value="tomorrow">Tomorrow</SelectItem>
											<SelectItem value="this-week">This week</SelectItem>
											<SelectItem value="weekend">Weekend</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col gap-2">
								<Button variant="outline" className="w-full">
									Reset Filters
								</Button>
								<Button className="w-full">Apply Filters</Button>
							</CardFooter>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Popular Services</CardTitle>
								<CardDescription>
									Most booked services this month
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								{popularServices.map((service) => (
									<div key={service.id} className="flex items-center gap-3">
										<div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
											<service.icon className="h-5 w-5 text-primary" />
										</div>
										<div className="flex-1">
											<h3 className="font-medium">{service.name}</h3>
											<div className="flex items-center gap-2 text-sm text-muted-foreground">
												<span>${service.price}</span>
												<span>•</span>
												<div className="flex items-center">
													<Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
													<span>{service.rating}</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</CardContent>
						</Card>
					</div>

					<div className="md:col-span-3">
						<Tabs defaultValue="all" className="space-y-4">
							<div className="flex items-center justify-between">
								<TabsList>
									<TabsTrigger value="all">All Services</TabsTrigger>
									<TabsTrigger value="featured">Featured</TabsTrigger>
									<TabsTrigger value="popular">Popular</TabsTrigger>
									<TabsTrigger value="new">New</TabsTrigger>
								</TabsList>
								<Select defaultValue="recommended">
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="recommended">Recommended</SelectItem>
										<SelectItem value="price-low">
											Price: Low to High
										</SelectItem>
										<SelectItem value="price-high">
											Price: High to Low
										</SelectItem>
										<SelectItem value="rating">Highest Rated</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<TabsContent value="all" className="space-y-4">
								{filteredServices.length === 0 ? (
									<Card>
										<CardContent className="flex flex-col items-center justify-center p-6">
											<Search className="mb-2 h-12 w-12 text-muted-foreground" />
											<h3 className="text-lg font-medium">No services found</h3>
											<p className="mb-4 text-center text-sm text-muted-foreground">
												No services match your search criteria. Try adjusting
												your filters.
											</p>
											<Button
												onClick={() => {
													setSearchQuery("");
													setPriceRange([0, 300]);
													setSelectedCategory("all");
												}}
											>
												Reset Filters
											</Button>
										</CardContent>
									</Card>
								) : (
									<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
										{filteredServices.map((service) => (
											<ServiceCard key={service.id} service={service} />
										))}
									</div>
								)}

								{filteredServices.length > 0 && (
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

							<TabsContent value="featured">
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{services
										.filter((service) => service.featured)
										.map((service) => (
											<ServiceCard key={service.id} service={service} />
										))}
								</div>
							</TabsContent>

							<TabsContent value="popular">
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{services
										.filter((service) => service.popular)
										.map((service) => (
											<ServiceCard key={service.id} service={service} />
										))}
								</div>
							</TabsContent>

							<TabsContent value="new">
								<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
									{services
										.filter((service) => service.new)
										.map((service) => (
											<ServiceCard key={service.id} service={service} />
										))}
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>
			</main>
		</div>
	);
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
	const [isFavorite, setIsFavorite] = useState(service.isFavorite || false);

	return (
		<Card className="overflow-hidden">
			<div className="relative h-48 w-full overflow-hidden bg-muted">
				<img
					src={service.image || "/placeholder.svg?height=192&width=384"}
					alt={service.name}
					className="h-full w-full object-cover transition-transform hover:scale-105"
				/>
				<Button
					variant="ghost"
					size="icon"
					className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 text-red-500 hover:bg-white hover:text-red-600"
					onClick={() => setIsFavorite(!isFavorite)}
				>
					<Heart className={isFavorite ? "fill-current" : ""} />
					<span className="sr-only">
						{isFavorite ? "Remove from favorites" : "Add to favorites"}
					</span>
				</Button>
				{service.featured && (
					<Badge className="absolute left-2 top-2 bg-yellow-500 hover:bg-yellow-600">
						Featured
					</Badge>
				)}
				{service.new && (
					<Badge className="absolute left-2 top-2 bg-green-500 hover:bg-green-600">
						New
					</Badge>
				)}
			</div>
			<CardContent className="p-4">
				<div className="mb-2 flex items-center justify-between">
					<Badge variant="outline" className="px-2 py-0 text-xs font-normal">
						{service.category}
					</Badge>
					<div className="flex items-center text-sm">
						<Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
						<span>{service.rating}</span>
						<span className="text-muted-foreground">
							({service.reviewCount})
						</span>
					</div>
				</div>
				<h3 className="mb-1 font-semibold">{service.name}</h3>
				<p className="mb-2 text-sm text-muted-foreground line-clamp-2">
					{service.description}
				</p>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-sm text-muted-foreground">
						<Clock className="h-3 w-3" />
						<span>{service.duration}</span>
					</div>
					<div className="font-medium">${service.price}</div>
				</div>
			</CardContent>
			<CardFooter className="border-t bg-muted/30 px-4 py-3">
				<Button className="w-full">Book Now</Button>
			</CardFooter>
		</Card>
	);
}

// Sample data
const categories = [
	{ value: "all", label: "All Categories" },
	{ value: "cleaning", label: "Cleaning" },
	{ value: "plumbing", label: "Plumbing" },
	{ value: "electrical", label: "Electrical" },
	{ value: "gardening", label: "Gardening" },
	{ value: "painting", label: "Painting" },
	{ value: "appliance", label: "Appliance Repair" },
	{ value: "furniture", label: "Furniture Assembly" },
];

const popularServices = [
	{
		id: "p1",
		name: "House Cleaning",
		icon: Home,
		price: 80,
		rating: 4.8,
	},
	{
		id: "p2",
		name: "Plumbing Services",
		icon: Home,
		price: 95,
		rating: 4.7,
	},
	{
		id: "p3",
		name: "Electrical Repair",
		icon: Home,
		price: 110,
		rating: 4.9,
	},
];

const services = [
	{
		id: "1",
		name: "Standard House Cleaning",
		description:
			"Professional cleaning service for your home. Includes dusting, vacuuming, mopping, and bathroom cleaning.",
		category: "cleaning",
		price: 80,
		duration: "2-3 hours",
		rating: 4.8,
		reviewCount: 245,
		image: "/placeholder.svg?height=192&width=384",
		featured: true,
		popular: true,
		new: false,
		isFavorite: false,
	},
	{
		id: "2",
		name: "Deep House Cleaning",
		description:
			"Thorough cleaning of your entire home, including hard-to-reach areas, appliances, and detailed attention to bathrooms and kitchen.",
		category: "cleaning",
		price: 150,
		duration: "4-6 hours",
		rating: 4.9,
		reviewCount: 189,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: true,
		new: false,
		isFavorite: true,
	},
	{
		id: "3",
		name: "Plumbing Repair",
		description:
			"Professional plumbing repair service for leaks, clogs, and other common plumbing issues.",
		category: "plumbing",
		price: 95,
		duration: "1-2 hours",
		rating: 4.7,
		reviewCount: 178,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: true,
		new: false,
		isFavorite: false,
	},
	{
		id: "4",
		name: "Electrical Wiring",
		description:
			"Professional electrical wiring service for new installations or repairs to existing wiring.",
		category: "electrical",
		price: 110,
		duration: "2-4 hours",
		rating: 4.9,
		reviewCount: 156,
		image: "/placeholder.svg?height=192&width=384",
		featured: true,
		popular: false,
		new: false,
		isFavorite: false,
	},
	{
		id: "5",
		name: "Lawn Mowing",
		description:
			"Professional lawn mowing service to keep your yard looking neat and tidy.",
		category: "gardening",
		price: 45,
		duration: "1 hour",
		rating: 4.5,
		reviewCount: 210,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: false,
		new: false,
		isFavorite: false,
	},
	{
		id: "6",
		name: "Interior Painting",
		description:
			"Professional interior painting service for walls, ceilings, and trim.",
		category: "painting",
		price: 250,
		duration: "4-8 hours",
		rating: 4.8,
		reviewCount: 132,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: false,
		new: true,
		isFavorite: false,
	},
	{
		id: "7",
		name: "Refrigerator Repair",
		description:
			"Professional repair service for refrigerators and freezers of all major brands.",
		category: "appliance",
		price: 120,
		duration: "1-3 hours",
		rating: 4.6,
		reviewCount: 98,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: false,
		new: true,
		isFavorite: false,
	},
	{
		id: "8",
		name: "Furniture Assembly",
		description:
			"Professional assembly service for all types of furniture, including beds, tables, chairs, and more.",
		category: "furniture",
		price: 75,
		duration: "1-2 hours",
		rating: 4.7,
		reviewCount: 145,
		image: "/placeholder.svg?height=192&width=384",
		featured: false,
		popular: false,
		new: true,
		isFavorite: false,
	},
	{
		id: "9",
		name: "Window Cleaning",
		description:
			"Professional window cleaning service for interior and exterior windows.",
		category: "cleaning",
		price: 100,
		duration: "2-3 hours",
		rating: 4.8,
		reviewCount: 112,
		image: "/placeholder.svg?height=192&width=384",
		featured: true,
		popular: false,
		new: false,
		isFavorite: false,
	},
];
