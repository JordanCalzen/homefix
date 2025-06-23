// "use client";

// import { useState, useEffect } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// // import { getServices } from "@/actions/services"; // Make sure this returns a Promise<Service[]>
// // import { getAllCategories } from "@/actions/categories";

// import {
// 	Grid,
// 	List,
// 	Filter,
// 	Calendar,
// 	ChevronDown,
// 	Search,
// } from "lucide-react";
// import { isThisWeek, isThisMonth, isToday, parseISO, isFuture } from "date-fns";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import { motion, AnimatePresence } from "framer-motion";
// import ServiceCard from "./ServiceCard"; // Replace with your own service card component
// import ServiceListItem from "./ServiceListItem"; // Replace with your list-style component

// interface Category {
// 	id: string;
// 	title: string;
// 	slug: string;
// }

// export default function ServicesSection() {
// 	const searchParams = useSearchParams();
// 	const router = useRouter();

// 	const viewModeParam = (searchParams.get("view") as "grid" | "list") || "grid";
// 	const dateFilterParam = searchParams.get("date") || "upcoming";
// 	const searchQueryParam = searchParams.get("q") || "";
// 	const categoryParam = searchParams.get("category") || null;

// 	const [viewMode, setViewMode] = useState<"grid" | "list">(viewModeParam);
// 	const [dateFilter, setDateFilter] = useState<string>(dateFilterParam);
// 	const [searchQuery, setSearchQuery] = useState(searchQueryParam);
// 	const [selectedCategory, setSelectedCategory] = useState<string | null>(
// 		categoryParam
// 	);

// 	const [filteredServices, setFilteredServices] = useState(services);

// 	useEffect(() => {
// 		let filtered = [...services];

// 		// Date filtering (e.g. job posted date)
// 		if (dateFilter) {
// 			filtered = filtered.filter((service) => {
// 				try {
// 					const createdAt = parseISO(service.createdAt);
// 					switch (dateFilter) {
// 						case "today":
// 							return isToday(createdAt);
// 						case "this-week":
// 							return isThisWeek(createdAt);
// 						case "this-month":
// 							return isThisMonth(createdAt);
// 						default:
// 							return isFuture(createdAt);
// 					}
// 				} catch {
// 					return false;
// 				}
// 			});
// 		}

// 		if (selectedCategory) {
// 			filtered = filtered.filter(
// 				(service) => service.category?.slug === selectedCategory
// 			);
// 		}

// 		if (searchQuery) {
// 			const q = searchQuery.toLowerCase();
// 			filtered = filtered.filter((s) =>
// 				[s.title, s.description, s.location]
// 					.filter(Boolean)
// 					.some((field) => field.toLowerCase().includes(q))
// 			);
// 		}

// 		setFilteredServices(filtered);
// 	}, [services, dateFilter, selectedCategory, searchQuery]);

// 	const updateFilters = (
// 		type: "view" | "date" | "category" | "search",
// 		value: string | null
// 	) => {
// 		if (type === "view") setViewMode(value as "grid" | "list");
// 		if (type === "date") setDateFilter(value || "upcoming");
// 		if (type === "category") setSelectedCategory(value);
// 		if (type === "search") setSearchQuery(value || "");

// 		const params = new URLSearchParams(searchParams.toString());

// 		if (
// 			!value ||
// 			(type === "view" && value === "grid") ||
// 			(type === "date" && value === "upcoming")
// 		) {
// 			params.delete(type === "search" ? "q" : type);
// 		} else {
// 			params.set(type === "search" ? "q" : type, value);
// 		}

// 		router.push(`/services?${params.toString()}`, { scroll: false });
// 	};

// 	const handleSearch = (e: React.FormEvent) => {
// 		e.preventDefault();
// 		updateFilters("search", searchQuery);
// 	};

// 	const clearFilters = () => {
// 		updateFilters("date", "upcoming");
// 		updateFilters("category", null);
// 		updateFilters("search", "");
// 	};

// 	return (
// 		<div className="min-h-screen">
// 			{/* Hero */}
// 			<section className="relative py-16 bg-gradient-to-b from-black to-blue-900 text-white">
// 				<div className="container relative z-10">
// 					<div className="max-w-2xl">
// 						<h1 className="text-3xl md:text-4xl font-bold mb-4">
// 							Find Local Home Services
// 						</h1>
// 						<p className="text-lg text-blue-100 mb-6">
// 							Browse trusted service providers in your area.
// 						</p>
// 						<form onSubmit={handleSearch} className="relative max-w-md">
// 							<Input
// 								type="search"
// 								placeholder="Search services..."
// 								className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
// 								value={searchQuery}
// 								onChange={(e) => setSearchQuery(e.target.value)}
// 							/>
// 							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
// 						</form>
// 					</div>
// 				</div>
// 			</section>

// 			{/* Filters + Results */}
// 			<div className="container py-10">
// 				<div className="flex flex-col md:flex-row gap-6">
// 					{/* Sidebar Filters */}
// 					<aside className="w-full md:w-64 lg:w-72 space-y-6">
// 						<div className="bg-card rounded-lg p-5 shadow-sm">
// 							<h3 className="font-medium text-lg mb-4">Filters</h3>

// 							<div className="space-y-4">
// 								<div>
// 									<h4 className="text-sm font-semibold mb-2 text-muted-foreground">
// 										Date Posted
// 									</h4>
// 									{["upcoming", "today", "this-week", "this-month"].map(
// 										(filter) => (
// 											<Button
// 												key={filter}
// 												variant={dateFilter === filter ? "default" : "ghost"}
// 												className="w-full justify-start"
// 												onClick={() => updateFilters("date", filter)}
// 											>
// 												{filter
// 													.replace("-", " ")
// 													.replace(/^\w/, (c) => c.toUpperCase())}
// 											</Button>
// 										)
// 									)}
// 								</div>

// 								<Separator />

// 								<div>
// 									<h4 className="text-sm font-semibold mb-2 text-muted-foreground">
// 										Service Category
// 									</h4>
// 									<Button
// 										variant={selectedCategory === null ? "default" : "ghost"}
// 										className="w-full justify-start"
// 										onClick={() => updateFilters("category", null)}
// 									>
// 										All Categories
// 									</Button>
// 									{categories.map((cat) => (
// 										<Button
// 											key={cat.id}
// 											variant={
// 												selectedCategory === cat.slug ? "default" : "ghost"
// 											}
// 											className="w-full justify-start"
// 											onClick={() => updateFilters("category", cat.slug)}
// 										>
// 											{cat.title}
// 										</Button>
// 									))}
// 								</div>
// 							</div>
// 						</div>
// 					</aside>

// 					{/* Main Content */}
// 					<main className="flex-1">
// 						<div className="flex justify-between items-center mb-4">
// 							<h2 className="text-xl font-bold">
// 								{selectedCategory
// 									? `${
// 											categories.find((c) => c.slug === selectedCategory)?.title
// 									  } Services`
// 									: "All Services"}
// 							</h2>
// 							<div className="flex gap-2">
// 								<Button
// 									variant={viewMode === "grid" ? "default" : "outline"}
// 									size="icon"
// 									onClick={() => updateFilters("view", "grid")}
// 								>
// 									<Grid className="h-4 w-4" />
// 								</Button>
// 								<Button
// 									variant={viewMode === "list" ? "default" : "outline"}
// 									size="icon"
// 									onClick={() => updateFilters("view", "list")}
// 								>
// 									<List className="h-4 w-4" />
// 								</Button>
// 							</div>
// 						</div>

// 						<AnimatePresence mode="wait">
// 							{filteredServices.length === 0 ? (
// 								<motion.div
// 									initial={{ opacity: 0 }}
// 									animate={{ opacity: 1 }}
// 									exit={{ opacity: 0 }}
// 									className="text-center py-12 bg-muted/40 rounded-lg"
// 								>
// 									<Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
// 									<h2 className="text-xl font-semibold mb-2">
// 										No services found
// 									</h2>
// 									<p className="text-muted-foreground mb-6">
// 										Try adjusting your filters or search terms
// 									</p>
// 									<Button variant="outline" onClick={clearFilters}>
// 										Clear Filters
// 									</Button>
// 								</motion.div>
// 							) : viewMode === "grid" ? (
// 								<motion.div
// 									key="grid"
// 									initial={{ opacity: 0 }}
// 									animate={{ opacity: 1 }}
// 									exit={{ opacity: 0 }}
// 									className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
// 								>
// 									{filteredServices.map((service) => (
// 										<ServiceCard key={service.id} service={service} />
// 									))}
// 								</motion.div>
// 							) : (
// 								<motion.div
// 									key="list"
// 									initial={{ opacity: 0 }}
// 									animate={{ opacity: 1 }}
// 									exit={{ opacity: 0 }}
// 									className="space-y-4"
// 								>
// 									{filteredServices.map((service) => (
// 										<ServiceListItem key={service.id} service={service} />
// 									))}
// 								</motion.div>
// 							)}
// 						</AnimatePresence>
// 					</main>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
