"use client";
import type React from "react";
import { useState, useEffect, useRef, useMemo } from "react";
import {
	ChevronRight,
	ChevronLeft,
	Heart,
	Calendar,
	Eye,
	Star,
	Clock,
	Award,
	TrendingUp,
	Sparkles,
} from "lucide-react";
import { useFetchServices } from "@/hooks/useService";

// Service type definition matching your ServicePayLoad
export type ServicePayLoad = {
	name: string;
	id: string;
	image: string;
	duration: string;
	new: boolean;
	isFavorite: boolean;
	popular: boolean;
	isActive: boolean;
	rating: number;
	featured: boolean;
	reviewCount: number;
	price: string;
	description: string;
	categoryId?: string;
};

// Props interface for the component
interface ServiceSectionProps {
	services: ServicePayLoad[];
	isLoading?: boolean;
	onFavoriteToggle: (id: string) => void;
	onBookService: (id: string) => void;
	onServiceView: (id: string) => void;
	title?: string;
	subtitle?: string;
	displayLimit?: number;
}

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
						className={`transition-colors duration-200 ${
							i < Math.floor(rating)
								? "text-yellow-400 fill-yellow-400"
								: i < rating
								? "text-yellow-400 fill-yellow-400"
								: "text-gray-300"
						}`}
					/>
				))}
			</div>
			<span className="ml-1 text-sm text-gray-600">
				{rating.toFixed(1)} ({reviewCount})
			</span>
		</div>
	);
};

// Service Card Component
const ServiceCard: React.FC<{
	service: ServicePayLoad;
	onFavoriteToggle: (id: string) => void;
	onBookService: (id: string) => void;
	onServiceView: (id: string) => void;
}> = ({ service, onFavoriteToggle, onBookService, onServiceView }) => {
	return (
		<div className="group relative flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300">
			{/* Image container with square aspect ratio */}
			<div className="relative w-full pb-[100%] bg-gray-100 overflow-hidden">
				<img
					src={service.image || "/placeholder.svg"}
					alt={service.name}
					className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
				/>

				{/* Service badges */}
				<div className="absolute top-3 left-3 flex flex-col gap-1">
					{service.featured && (
						<span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-sm">
							<Award size={10} />
							FEATURED
						</span>
					)}
					{service.new && (
						<span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-sm">
							<Sparkles size={10} />
							NEW
						</span>
					)}
					{service.popular && (
						<span className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full shadow-sm">
							<TrendingUp size={10} />
							POPULAR
						</span>
					)}
				</div>

				{/* Favorite button */}
				<button
					onClick={() => onFavoriteToggle(service.id)}
					className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200"
					aria-label="Add to favorites"
				>
					<Heart
						size={20}
						className={
							service.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
						}
					/>
				</button>

				{/* Hover overlay */}
				<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				<div className="absolute bottom-3 left-3 right-3 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
					<button
						onClick={() => onServiceView(service.id)}
						className="w-full py-2 px-4 bg-black bg-opacity-80 text-white text-sm font-medium rounded-md hover:bg-opacity-100 transition-all duration-200 flex items-center justify-center gap-2"
					>
						<Eye size={16} />
						Quick View
					</button>
				</div>
			</div>

			{/* Service details */}
			<div className="flex flex-col p-4 flex-grow">
				<div className="flex justify-between items-start mb-1">
					<h3 className="text-sm font-medium text-gray-900 line-clamp-1">
						{service.name}
					</h3>
				</div>

				<div className="flex items-center gap-2 mb-2">
					<Clock size={12} className="text-blue-500" />
					<span className="text-xs text-gray-500">{service.duration}</span>
				</div>

				<p className="text-xs text-gray-500 mb-2 line-clamp-2">
					{service.description}
				</p>

				<div className="mb-2">
					<StarRating
						rating={service.rating}
						reviewCount={service.reviewCount}
					/>
				</div>

				{/* Service status */}
				<div className="mb-3">
					<span
						className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
							service.isActive
								? "bg-green-100 text-green-800"
								: "bg-red-100 text-red-800"
						}`}
					>
						<div
							className={`w-1.5 h-1.5 rounded-full mr-1 ${
								service.isActive ? "bg-green-500" : "bg-red-500"
							}`}
						/>
						{service.isActive ? "Available" : "Unavailable"}
					</span>
				</div>

				<div className="mt-auto pt-3 flex justify-between items-center">
					<span className="font-semibold text-gray-900">${service.price}</span>
					<button
						onClick={() => onBookService(service.id)}
						disabled={!service.isActive}
						className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
							service.isActive
								? "bg-blue-600 hover:bg-blue-700 text-white"
								: "bg-gray-100 text-gray-400 cursor-not-allowed"
						}`}
					>
						<Calendar size={12} />
						Book
					</button>
				</div>
			</div>
		</div>
	);
};

// Enhanced Loading skeleton component
export const ServiceCardSkeleton = () => (
	<div className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-md">
		<div className="relative w-full pb-[100%] bg-gray-200 animate-pulse" />
		<div className="flex flex-col p-4 flex-grow">
			<div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
			<div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
			<div className="h-12 bg-gray-200 rounded animate-pulse mb-3" />
			<div className="h-3 bg-gray-200 rounded animate-pulse mb-3 w-1/2" />
			<div className="flex justify-between items-center pt-3">
				<div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
				<div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
			</div>
		</div>
	</div>
);

// Main Service Section Component
const ServiceSection: React.FC<ServiceSectionProps> = ({
	onFavoriteToggle,
	onBookService,
	onServiceView,
	title = "Professional Home Services",
	subtitle = "Trusted experts for all your home maintenance needs",
	displayLimit = 12,
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [visibleServices, setVisibleServices] = useState(4);
	const carouselRef = useRef<HTMLDivElement>(null);

	const { services: allServices, isLoading } = useFetchServices();

	const services = useMemo(() => {
		return displayLimit ? allServices.slice(0, displayLimit) : allServices;
	}, [allServices, displayLimit]);

	// Handle screen resize to adjust number of visible services
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 1280) {
				setVisibleServices(4);
			} else if (window.innerWidth >= 1024) {
				setVisibleServices(3);
			} else if (window.innerWidth >= 768) {
				setVisibleServices(2);
			} else {
				setVisibleServices(1);
			}
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Navigation functions - now moves by full page of services
	const goToNext = () => {
		setCurrentIndex((prev) =>
			prev + visibleServices >= services.length ? 0 : prev + visibleServices
		);
	};

	const goToPrev = () => {
		setCurrentIndex((prev) =>
			prev - visibleServices < 0
				? Math.max(0, services.length - visibleServices)
				: prev - visibleServices
		);
	};

	// Calculate displayed services based on current index and visible count
	const displayedServices = useMemo(() => {
		const displayed = services.slice(
			currentIndex,
			currentIndex + visibleServices
		);

		// If we don't have enough services to fill the view, add from the beginning
		if (displayed.length < visibleServices && services.length > 0) {
			const remainingCount = visibleServices - displayed.length;
			const additionalServices = services.slice(0, remainingCount);
			displayed.push(...additionalServices);
		}

		return displayed;
	}, [services, currentIndex, visibleServices]);

	// Reset currentIndex when services change
	useEffect(() => {
		setCurrentIndex(0);
	}, [services.length]);

	if (isLoading) {
		return (
			<div className="w-full max-w-7xl mx-auto px-4 py-8">
				<div className="flex justify-between items-center mb-8">
					<div className="h-8 bg-gray-200 rounded animate-pulse w-64" />
					<div className="flex space-x-3">
						<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
						<div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
					</div>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<ServiceCardSkeleton key={i} />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-8">
			{/* Header with product-style design */}
			<div className="flex justify-between items-center mb-8">
				<h2 className="relative text-3xl font-bold text-gray-900 tracking-tight">
					<span className="relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-2/3 after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500">
						{title}
					</span>
					<span className="absolute -top-4 -left-3 text-5xl text-blue-100 font-extrabold opacity-50 select-none">
						Services
					</span>
				</h2>
				<div className="flex space-x-3">
					<button
						onClick={goToPrev}
						className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300 transition-all duration-200"
						aria-label="Previous services"
					>
						<ChevronLeft size={20} className="text-gray-700" />
					</button>
					<button
						onClick={goToNext}
						className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow border border-gray-200 hover:border-gray-300 transition-all duration-200"
						aria-label="Next services"
					>
						<ChevronRight size={20} className="text-gray-700" />
					</button>
				</div>
			</div>

			{/* Services grid */}
			<div className="relative overflow-hidden" ref={carouselRef}>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{displayedServices.map((service) => {
						const safeService: ServicePayLoad = {
							...service,
							image: service.image ?? "",
							duration: service.duration ?? "",
							description: service.description ?? "",
							rating: service.rating ?? 0,
							reviewCount: service.reviewCount ?? 0,
						};
						return (
							<div key={service.id} className="transition-all duration-500">
								<ServiceCard
									service={safeService}
									onFavoriteToggle={onFavoriteToggle}
									onBookService={onBookService}
									onServiceView={onServiceView}
								/>
							</div>
						);
					})}
				</div>
			</div>

			{/* Pagination dots */}
			{services.length > visibleServices && (
				<div className="flex justify-center mt-6 space-x-2">
					{Array.from({
						length: Math.ceil(services.length / visibleServices),
					}).map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentIndex(i * visibleServices)}
							className={`w-2 h-2 rounded-full transition-all duration-300 ${
								i === Math.floor(currentIndex / visibleServices)
									? "bg-gray-800 w-4"
									: "bg-gray-300"
							}`}
							aria-label={`Go to slide ${i + 1}`}
						/>
					))}
				</div>
			)}

			{/* View all button */}
			<div className="flex justify-center mt-8">
				<button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
					{displayLimit && allServices.length > displayLimit
						? `View All ${allServices.length} Services`
						: "View All Services"}
				</button>
			</div>
		</div>
	);
};

export default ServiceSection;
