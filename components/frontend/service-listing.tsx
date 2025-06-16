"use client";
import type React from "react";
import { useState, useMemo } from "react";
import {
	Search,
	Grid,
	List,
	ChevronDown,
	Heart,
	Calendar,
	Clock,
	Star,
	Sliders,
	Shield,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

// Service type definition for home services
export type HomeService = {
	id: string;
	name: string;
	price: string;
	discountPrice?: string;
	description: string;
	images: string[];
	category: string;
	rating: number;
	reviewCount: number;
	duration: string;
	location: string;
	provider: {
		name: string;
		avatar: string;
		verified: boolean;
		completedJobs: number;
	};
	isAvailable: boolean;
	isFavorite?: boolean;
	isNew?: boolean;
	isFeatured?: boolean;
	isPopular?: boolean;
	tags?: string[];
	nextAvailableSlot?: string;
	responseTime: string;
};

// Service categories for home services
const serviceCategories = [
	"All Services",
	"Cleaning",
	"Plumbing",
	"Electrical",
	"HVAC",
	"Landscaping",
	"Handyman",
	"Painting",
	"Pest Control",
	"Security",
	"Moving",
	"Appliance Repair",
];

// Mock API function - replace with your actual API call
const fetchServices = async (): Promise<HomeService[]> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return [
		{
			id: "1",
			name: "Professional Deep House Cleaning",
			price: "120",
			discountPrice: "99",
			description:
				"Comprehensive deep cleaning service including all rooms, bathrooms, kitchen, and common areas. Eco-friendly products used.",
			images: [
				"https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "Cleaning",
			rating: 4.9,
			reviewCount: 127,
			duration: "3-4 hours",
			location: "Within 10 miles",
			provider: {
				name: "Sarah Johnson",
				avatar:
					"https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 245,
			},
			isAvailable: true,
			isFeatured: true,
			tags: ["Eco-friendly", "Insured", "Same-day"],
			nextAvailableSlot: "Today 2:00 PM",
			responseTime: "< 1 hour",
		},
		{
			id: "2",
			name: "Emergency Plumbing Repair",
			price: "85",
			description:
				"24/7 emergency plumbing services for leaks, clogs, and pipe repairs. Licensed and insured professionals.",
			images: [
				"https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "Plumbing",
			rating: 4.8,
			reviewCount: 89,
			duration: "1-2 hours",
			location: "Within 15 miles",
			provider: {
				name: "Mike Rodriguez",
				avatar:
					"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 156,
			},
			isAvailable: true,
			isPopular: true,
			tags: ["24/7 Available", "Licensed", "Emergency"],
			nextAvailableSlot: "Within 30 mins",
			responseTime: "< 15 mins",
		},
		{
			id: "3",
			name: "Electrical Installation & Repair",
			price: "95",
			discountPrice: "79",
			description:
				"Professional electrical services including outlet installation, lighting, and electrical troubleshooting.",
			images: [
				"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "Electrical",
			rating: 4.7,
			reviewCount: 203,
			duration: "2-3 hours",
			location: "Within 20 miles",
			provider: {
				name: "David Chen",
				avatar:
					"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 312,
			},
			isAvailable: true,
			isNew: true,
			tags: ["Licensed", "Insured", "Warranty"],
			nextAvailableSlot: "Tomorrow 9:00 AM",
			responseTime: "< 2 hours",
		},
		{
			id: "4",
			name: "HVAC Maintenance & Repair",
			price: "150",
			description:
				"Complete HVAC system maintenance, repair, and installation services. Energy-efficient solutions.",
			images: [
				"https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "HVAC",
			rating: 4.6,
			reviewCount: 67,
			duration: "2-4 hours",
			location: "Within 25 miles",
			provider: {
				name: "Jennifer Smith",
				avatar:
					"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 89,
			},
			isAvailable: false,
			tags: ["Energy Efficient", "Certified", "Warranty"],
			nextAvailableSlot: "Next week",
			responseTime: "< 4 hours",
		},
		{
			id: "5",
			name: "Professional Landscaping Design",
			price: "200",
			discountPrice: "175",
			description:
				"Complete landscaping services including design, installation, and maintenance for residential properties.",
			images: [
				"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "Landscaping",
			rating: 4.9,
			reviewCount: 145,
			duration: "4-6 hours",
			location: "Within 30 miles",
			provider: {
				name: "Robert Green",
				avatar:
					"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 178,
			},
			isAvailable: true,
			isFeatured: true,
			isPopular: true,
			tags: ["Design", "Installation", "Maintenance"],
			nextAvailableSlot: "This weekend",
			responseTime: "< 3 hours",
		},
		{
			id: "6",
			name: "Handyman Services",
			price: "65",
			description:
				"General handyman services for small repairs, installations, and home maintenance tasks.",
			images: [
				"https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
				"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
			],
			category: "Handyman",
			rating: 4.5,
			reviewCount: 234,
			duration: "1-3 hours",
			location: "Within 15 miles",
			provider: {
				name: "Tom Wilson",
				avatar:
					"https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
				verified: true,
				completedJobs: 456,
			},
			isAvailable: true,
			tags: ["Versatile", "Quick", "Affordable"],
			nextAvailableSlot: "Today 4:00 PM",
			responseTime: "< 30 mins",
		},
	];
};

// Star rating component
const StarRating: React.FC<{ rating: number; reviewCount: number }> = ({
	rating,
	reviewCount,
}) => {
	return (
		<div className="flex items-center gap-1">
			<div className="flex items-center">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						size={14}
						className={`${
							i < Math.floor(rating)
								? "text-yellow-400 fill-yellow-400"
								: i < rating
								? "text-yellow-400 fill-yellow-400"
								: "text-gray-300"
						}`}
					/>
				))}
			</div>
			<span className="text-sm text-gray-600 font-medium">
				{rating.toFixed(1)} ({reviewCount})
			</span>
		</div>
	);
};

// Grid View Service Card - Simplified and More Responsive
const GridServiceCard: React.FC<{
	service: HomeService;
	onFavoriteToggle: (id: string) => void;
	onBookService: (id: string) => void;
	onViewDetails: (id: string) => void;
}> = ({ service, onFavoriteToggle, onBookService, onViewDetails }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleImageChange = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200 hover:-translate-y-1">
			{/* Image container */}
			<div
				className="relative w-full pb-[65%] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer"
				onMouseEnter={() => service.images.length > 1 && handleImageChange()}
				onMouseLeave={() =>
					service.images.length > 1 && setCurrentImageIndex(0)
				}
			>
				{service.images.map((image, index) => (
					<img
						key={index}
						src={image || "/placeholder.svg"}
						alt={`${service.name} - view ${index + 1}`}
						className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${
							index === currentImageIndex ? "opacity-100" : "opacity-0"
						}`}
					/>
				))}

				{/* Gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

				{/* Service badges - Simplified */}
				<div className="absolute top-3 left-3 flex gap-1">
					{service.isFeatured && (
						<span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
							⭐ FEATURED
						</span>
					)}
					{service.isNew && (
						<span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
							✨ NEW
						</span>
					)}
				</div>

				{/* Favorite button */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						onFavoriteToggle(service.id);
					}}
					className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 hover:scale-110"
					aria-label="Add to favorites"
				>
					<Heart
						size={16}
						className={
							service.isFavorite
								? "fill-red-500 text-red-500"
								: "text-gray-600 hover:text-red-500"
						}
					/>
				</button>

				{/* Quick view overlay */}
				<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
					<button
						onClick={() => onViewDetails(service.id)}
						className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 px-6 py-2 bg-white/95 backdrop-blur-sm hover:bg-white text-gray-800 text-sm font-semibold rounded-full shadow-xl hover:shadow-2xl"
					>
						View Details
					</button>
				</div>
			</div>

			{/* Service details - Streamlined */}
			<div className="flex flex-col p-4 flex-grow">
				{/* Provider info - Compact */}
				<div className="flex items-center gap-2 mb-3">
					<img
						src={service.provider.avatar || "/placeholder.svg"}
						alt={service.provider.name}
						className="w-6 h-6 rounded-full object-cover"
					/>
					<span className="text-xs font-medium text-gray-600 truncate">
						{service.provider.name}
					</span>
					{service.provider.verified && (
						<Shield size={12} className="text-blue-500 flex-shrink-0" />
					)}
				</div>

				{/* Service name and category */}
				<div className="mb-3">
					<span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
						{service.category}
					</span>
					<h3 className="text-base font-semibold text-gray-900 line-clamp-2 mt-1 leading-tight">
						{service.name}
					</h3>
				</div>

				{/* Rating and essential info */}
				<div className="flex items-center justify-between mb-3 text-sm">
					<div className="flex items-center gap-1">
						<Star size={14} className="text-yellow-400 fill-yellow-400" />
						<span className="font-medium text-gray-700">{service.rating}</span>
						<span className="text-gray-500">({service.reviewCount})</span>
					</div>
					<div className="flex items-center gap-1 text-gray-600">
						<Clock size={12} />
						<span className="text-xs">{service.duration}</span>
					</div>
				</div>

				{/* Availability status - Simplified */}
				<div className="mb-4">
					<span
						className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
							service.isAvailable
								? "bg-green-100 text-green-700 border border-green-200"
								: "bg-red-100 text-red-700 border border-red-200"
						}`}
					>
						<div
							className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
								service.isAvailable
									? "bg-green-500 animate-pulse"
									: "bg-red-500"
							}`}
						/>
						{service.isAvailable ? "Available" : "Busy"}
					</span>
				</div>

				{/* Price and book button */}
				<div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
					<div className="flex flex-col">
						<span className="text-xs text-gray-500 font-medium">From</span>
						<div className="flex items-baseline gap-1">
							{service.discountPrice ? (
								<>
									<span className="font-bold text-lg text-gray-900">
										${service.discountPrice}
									</span>
									<span className="text-xs text-gray-500 line-through">
										${service.price}
									</span>
								</>
							) : (
								<span className="font-bold text-lg text-gray-900">
									${service.price}
								</span>
							)}
						</div>
					</div>

					<button
						onClick={() => onBookService(service.id)}
						disabled={!service.isAvailable}
						className={`flex items-center gap-1.5 py-2 px-4 rounded-xl transition-all duration-300 font-semibold text-sm ${
							service.isAvailable
								? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						<Calendar size={14} />
						<span>Book</span>
					</button>
				</div>
			</div>
		</div>
	);
};

// List View Service Card - Simplified and More Responsive
const ListServiceCard: React.FC<{
	service: HomeService;
	onFavoriteToggle: (id: string) => void;
	onBookService: (id: string) => void;
	onViewDetails: (id: string) => void;
}> = ({ service, onFavoriteToggle, onBookService, onViewDetails }) => {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const handleImageChange = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === service.images.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<div className="group relative flex flex-col sm:flex-row h-full rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-blue-200">
			{/* Image container - More responsive */}
			<div
				className="relative w-full sm:w-48 md:w-56 lg:w-64 h-40 sm:h-auto bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden cursor-pointer flex-shrink-0"
				onMouseEnter={() => service.images.length > 1 && handleImageChange()}
				onMouseLeave={() =>
					service.images.length > 1 && setCurrentImageIndex(0)
				}
			>
				{service.images.map((image, index) => (
					<img
						key={index}
						src={image || "/placeholder.svg"}
						alt={`${service.name} - view ${index + 1}`}
						className={`w-full h-full object-cover object-center transition-all duration-700 group-hover:scale-110 ${
							index === currentImageIndex ? "opacity-100" : "opacity-0"
						}`}
					/>
				))}

				{/* Service badges */}
				<div className="absolute top-3 left-3 flex gap-1">
					{service.isFeatured && (
						<span className="px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
							⭐
						</span>
					)}
					{service.isNew && (
						<span className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
							✨
						</span>
					)}
				</div>

				{/* Favorite button */}
				<button
					onClick={(e) => {
						e.stopPropagation();
						onFavoriteToggle(service.id);
					}}
					className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200"
					aria-label="Add to favorites"
				>
					<Heart
						size={16}
						className={
							service.isFavorite
								? "fill-red-500 text-red-500"
								: "text-gray-600 hover:text-red-500"
						}
					/>
				</button>
			</div>

			{/* Service details - Streamlined */}
			<div className="flex flex-col p-4 sm:p-5 flex-grow">
				{/* Header with provider and category */}
				<div className="flex justify-between items-start mb-3">
					<div className="flex-1 min-w-0">
						<div className="flex items-center gap-2 mb-1">
							<img
								src={service.provider.avatar || "/placeholder.svg"}
								alt={service.provider.name}
								className="w-7 h-7 rounded-full object-cover"
							/>
							<span className="text-sm font-semibold text-gray-900 truncate">
								{service.provider.name}
							</span>
							{service.provider.verified && (
								<Shield size={14} className="text-blue-500 flex-shrink-0" />
							)}
						</div>
						<span className="text-xs font-medium text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded-full">
							{service.category}
						</span>
					</div>

					<div className="text-right ml-4">
						{service.discountPrice ? (
							<>
								<span className="font-bold text-xl text-gray-900">
									${service.discountPrice}
								</span>
								<span className="block text-sm text-gray-500 line-through">
									${service.price}
								</span>
							</>
						) : (
							<span className="font-bold text-xl text-gray-900">
								${service.price}
							</span>
						)}
					</div>
				</div>

				{/* Service name */}
				<h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
					{service.name}
				</h3>

				{/* Rating and duration */}
				<div className="flex items-center gap-4 mb-3">
					<div className="flex items-center gap-1">
						<Star size={16} className="text-yellow-400 fill-yellow-400" />
						<span className="font-medium text-gray-700">{service.rating}</span>
						<span className="text-gray-500 text-sm">
							({service.reviewCount})
						</span>
					</div>
					<div className="flex items-center gap-1 text-gray-600">
						<Clock size={14} />
						<span className="text-sm">{service.duration}</span>
					</div>
				</div>

				{/* Availability */}
				<div className="flex items-center justify-between mb-4">
					<span
						className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
							service.isAvailable
								? "bg-green-100 text-green-800 border border-green-200"
								: "bg-red-100 text-red-800 border border-red-200"
						}`}
					>
						<div
							className={`w-2 h-2 rounded-full mr-2 ${
								service.isAvailable
									? "bg-green-500 animate-pulse"
									: "bg-red-500"
							}`}
						/>
						{service.isAvailable ? "Available Now" : "Currently Busy"}
					</span>
					{service.isAvailable && (
						<span className="text-sm text-gray-600">
							Next:{" "}
							<span className="font-medium">{service.nextAvailableSlot}</span>
						</span>
					)}
				</div>

				{/* Action buttons */}
				<div className="flex gap-3 mt-auto">
					<button
						onClick={() => onBookService(service.id)}
						disabled={!service.isAvailable}
						className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl transition-all duration-300 font-semibold ${
							service.isAvailable
								? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						<Calendar size={16} />
						<span>Book Service</span>
					</button>
					<button
						onClick={() => onViewDetails(service.id)}
						className="px-4 py-2.5 border-2 border-gray-300 hover:border-blue-400 hover:text-blue-600 text-gray-700 rounded-xl transition-all duration-200 font-semibold"
					>
						Details
					</button>
				</div>
			</div>
		</div>
	);
};

const GridServiceSkeleton = () => (
	<div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-md border border-gray-100">
		<div className="relative w-full pb-[65%] bg-gray-200 animate-pulse" />
		<div className="flex flex-col p-4 flex-grow">
			<div className="flex items-center gap-2 mb-3">
				<div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse" />
				<div className="h-3 bg-gray-200 rounded animate-pulse flex-1" />
			</div>
			<div className="h-3 bg-gray-200 rounded animate-pulse mb-1 w-16" />
			<div className="h-5 bg-gray-200 rounded animate-pulse mb-3" />
			<div className="flex justify-between items-center mb-3">
				<div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
				<div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
			</div>
			<div className="h-6 bg-gray-200 rounded-full animate-pulse mb-4 w-20" />
			<div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-auto">
				<div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
				<div className="h-8 bg-gray-200 rounded-xl animate-pulse w-20" />
			</div>
		</div>
	</div>
);

// Main Service Listing Component
const ServiceListing = () => {
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedCategory, setSelectedCategory] = useState("All Services");
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("featured");
	const [favorites, setFavorites] = useState<Set<string>>(new Set());

	// Use React Query to fetch services
	const {
		data: services = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["services"],
		queryFn: fetchServices,
	});

	// Toggle service as favorite
	const toggleFavorite = (id: string) => {
		setFavorites((prev) => {
			const newFavorites = new Set(prev);
			if (newFavorites.has(id)) {
				newFavorites.delete(id);
			} else {
				newFavorites.add(id);
			}
			return newFavorites;
		});
	};

	// Handle booking
	const handleBookService = (id: string) => {
		console.log("Booking service:", id);
		// Implement booking logic
	};

	// Handle view details
	const handleViewDetails = (id: string) => {
		console.log("Viewing service details:", id);
		// Implement view details logic
	};

	// Filter and sort services
	const filteredAndSortedServices = useMemo(() => {
		let filtered = services.map((service) => ({
			...service,
			isFavorite: favorites.has(service.id),
		}));

		// Apply category filter
		if (selectedCategory !== "All Services") {
			filtered = filtered.filter(
				(service) => service.category === selectedCategory
			);
		}

		// Apply search filter
		if (searchQuery) {
			const query = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(service) =>
					service.name.toLowerCase().includes(query) ||
					service.description.toLowerCase().includes(query) ||
					service.category.toLowerCase().includes(query) ||
					service.provider.name.toLowerCase().includes(query) ||
					service.tags?.some((tag) => tag.toLowerCase().includes(query))
			);
		}

		// Apply sorting
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "price-low":
					return (
						Number.parseFloat(a.discountPrice || a.price) -
						Number.parseFloat(b.discountPrice || b.price)
					);
				case "price-high":
					return (
						Number.parseFloat(b.discountPrice || b.price) -
						Number.parseFloat(a.discountPrice || a.price)
					);
				case "rating":
					return b.rating - a.rating;
				case "newest":
					return (a.isNew ? -1 : 0) - (b.isNew ? -1 : 0);
				case "popular":
					return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
				default: // 'featured'
					return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
			}
		});

		return filtered;
	}, [services, selectedCategory, searchQuery, sortBy, favorites]);

	if (error) {
		return (
			<div className="w-full max-w-7xl mx-auto px-4 py-8">
				<div className="text-center py-16">
					<div className="bg-red-100 p-4 rounded-full mb-4 inline-block">
						<Search size={32} className="text-red-500" />
					</div>
					<h3 className="text-lg font-medium text-gray-900 mb-2">
						Error loading services
					</h3>
					<p className="text-gray-500">
						We're having trouble loading the services. Please try again later.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-8">
			{/* Header */}
			<div className="mb-8">
				<div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-3xl p-8 overflow-hidden">
					<div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
						<svg
							viewBox="0 0 100 100"
							preserveAspectRatio="none"
							className="w-full h-full"
						>
							<path
								fill="white"
								d="M0,0 L100,0 L100,100 L80,100 C60,100 40,60 20,80 L0,100 Z"
							/>
						</svg>
					</div>
					<div className="relative z-10 max-w-3xl">
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
							Professional Home Services
						</h1>
						<p className="text-blue-100 mb-6 text-lg">
							Connect with verified professionals for all your home service
							needs. Quality work, fair prices, and reliable service guaranteed.
						</p>
						<div className="relative">
							<input
								type="text"
								placeholder="Search for services, providers, or categories..."
								className="w-full py-4 pl-6 pr-14 rounded-2xl bg-white/95 backdrop-blur text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg text-lg"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
							<Search
								className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
								size={24}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Filters and controls */}
			<div className="flex flex-col lg:flex-row gap-4 mb-8 items-start lg:items-center justify-between">
				<div className="flex flex-wrap gap-3">
					{/* Category filter */}
					<div className="relative min-w-[200px]">
						<select
							className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							{serviceCategories.map((category) => (
								<option key={category} value={category}>
									{category}
								</option>
							))}
						</select>
						<ChevronDown
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							size={20}
						/>
					</div>

					{/* Sort by */}
					<div className="relative min-w-[200px]">
						<select
							className="w-full appearance-none bg-white border-2 border-gray-200 rounded-xl py-3 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 font-medium"
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value)}
						>
							<option value="featured">Featured First</option>
							<option value="price-low">Price: Low to High</option>
							<option value="price-high">Price: High to Low</option>
							<option value="rating">Highest Rated</option>
							<option value="popular">Most Popular</option>
							<option value="newest">Newest Services</option>
						</select>
						<ChevronDown
							className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							size={20}
						/>
					</div>

					{/* Advanced filters button */}
					<button className="flex items-center gap-2 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200 font-medium">
						<Sliders size={18} />
						<span>More Filters</span>
					</button>
				</div>

				<div className="flex items-center gap-4">
					<div className="text-sm text-gray-600 font-medium">
						{isLoading ? (
							<span>Loading...</span>
						) : (
							<span>
								Showing{" "}
								<span className="font-bold text-gray-900">
									{filteredAndSortedServices.length}
								</span>{" "}
								services
							</span>
						)}
					</div>

					{/* View toggle */}
					<div className="flex border-2 border-gray-200 rounded-xl overflow-hidden">
						<button
							className={`p-3 transition-colors duration-200 ${
								viewMode === "grid"
									? "bg-blue-600 text-white"
									: "bg-white text-gray-700 hover:bg-gray-50"
							}`}
							onClick={() => setViewMode("grid")}
							aria-label="Grid view"
						>
							<Grid size={20} />
						</button>
						<button
							className={`p-3 transition-colors duration-200 ${
								viewMode === "list"
									? "bg-blue-600 text-white"
									: "bg-white text-gray-700 hover:bg-gray-50"
							}`}
							onClick={() => setViewMode("list")}
							aria-label="List view"
						>
							<List size={20} />
						</button>
					</div>
				</div>
			</div>

			{/* Services grid/list */}
			{isLoading ? (
				viewMode === "grid" ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
						{Array.from({ length: 8 }).map((_, i) => (
							<GridServiceSkeleton key={i} />
						))}
					</div>
				) : (
					<div className="flex flex-col gap-8">
						{Array.from({ length: 4 }).map((_, i) => (
							<div
								key={i}
								className="h-64 bg-gray-200 rounded-2xl animate-pulse"
							/>
						))}
					</div>
				)
			) : viewMode === "grid" ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{filteredAndSortedServices.map((service) => (
						<GridServiceCard
							key={service.id}
							service={service}
							onFavoriteToggle={toggleFavorite}
							onBookService={handleBookService}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>
			) : (
				<div className="flex flex-col gap-8">
					{filteredAndSortedServices.map((service) => (
						<ListServiceCard
							key={service.id}
							service={service}
							onFavoriteToggle={toggleFavorite}
							onBookService={handleBookService}
							onViewDetails={handleViewDetails}
						/>
					))}
				</div>
			)}

			{/* Empty state */}
			{!isLoading && filteredAndSortedServices.length === 0 && (
				<div className="flex flex-col items-center justify-center py-20 text-center">
					<div className="bg-gray-100 p-6 rounded-full mb-6">
						<Search size={48} className="text-gray-400" />
					</div>
					<h3 className="text-2xl font-semibold text-gray-900 mb-3">
						No services found
					</h3>
					<p className="text-gray-600 max-w-md mb-6">
						We couldn't find any services matching your criteria. Try adjusting
						your filters or search terms.
					</p>
					<button
						onClick={() => {
							setSearchQuery("");
							setSelectedCategory("All Services");
							setSortBy("featured");
						}}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
					>
						Clear All Filters
					</button>
				</div>
			)}

			{/* Pagination */}
			{!isLoading && filteredAndSortedServices.length > 0 && (
				<div className="mt-16 flex justify-center">
					<div className="flex items-center gap-2">
						<button className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
							Previous
						</button>
						<button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors duration-200">
							1
						</button>
						<button className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
							2
						</button>
						<button className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
							3
						</button>
						<span className="px-2 text-gray-500">...</span>
						<button className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
							8
						</button>
						<button className="px-4 py-2 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-colors duration-200">
							Next
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default ServiceListing;
