"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, TrendingUp, Star } from "lucide-react";
import { useCategories } from "@/hooks/useCategory";
import { CategoryProps } from "@/types/category";
import Link from "next/link";

interface CategoryItem {
	id: number;
	name: string;
	slug: string;
	image: string;
	featured?: boolean;
	isNew?: boolean;
	discount?: string;
	overlayColor?: string;
}

export default function CategoryListingSection() {
	const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
	const [isVisible, setIsVisible] = useState(false);

	// Animation on mount
	useEffect(() => {
		setIsVisible(true);
	}, []);

	const { categories, isLoading } = useCategories();

	return (
		<div className="w-full py-10 px-4 md:px-8 bg-gray-200 ">
			<div className="max-w-7xl mx-auto">
				{/* Section Header */}
				<div
					className={`mb-8 transition-opacity duration-700 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full"></div>
							<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
								Explore Popular Categories
							</h2>
						</div>
						<a
							href="/categories"
							className="hidden md:flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
						>
							View All Categories
							<ChevronRight className="h-4 w-4 ml-1" />
						</a>
					</div>
					<p className="text-gray-500 mt-2 ml-4">
						Your Home, Our Pros - Select a Service Category
					</p>
				</div>

				{/* Premium Grid Component */}

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-5">
					{categories.map((category: CategoryProps) => (
						<Link
							key={category.id}
							href={`/category/${category.slug}`}
							className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group"
							onMouseEnter={() => setHoveredCategory(Number(category.id))}
							onMouseLeave={() => setHoveredCategory(null)}
						>
							{/* Card with consistent aspect ratio */}
							<div className="aspect-square relative overflow-hidden">
								{/* Background Image */}
								<img
									src={category.image}
									alt={category.name}
									className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>

								{/* Smooth Gradient Overlay */}
								<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-75 transition-opacity duration-300"></div>

								{/* Alternative overlay options - uncomment one of these instead of the above if you prefer */}

								{/* Option 1: Subtle dark overlay */}
								{/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div> */}

								{/* Option 2: Colored gradient overlay */}
								{/* <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-amber-600/30 to-black/60 group-hover:from-amber-500/30 group-hover:via-amber-600/40 group-hover:to-black/70 transition-all duration-300"></div> */}

								{/* Option 3: Bottom-heavy gradient */}
								{/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/90 group-hover:via-black/50 group-hover:to-black/20 transition-all duration-300"></div> */}

								{/* Beautifully overlaid category title */}
								<div className="absolute inset-x-0 bottom-0 p-4 flex items-end z-10">
									<div className="transform group-hover:translate-y-[-4px] transition-transform duration-300 w-full">
										<h3 className="text-white text-sm md:text-base font-medium leading-tight drop-shadow-lg">
											{category.name}
										</h3>

										{/* Subtle line animation */}
										<div className="h-0.5 w-0 bg-white mt-2 group-hover:w-1/2 transition-all duration-500 ease-out"></div>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>

				{/* Mobile "View All" button */}
				<div className="mt-8 flex justify-center md:hidden">
					<a
						href="/categories"
						className="flex items-center justify-center px-6 py-2.5 bg-white border border-amber-200 rounded-lg text-sm font-medium text-amber-700 shadow-sm hover:bg-amber-50 transition-colors"
					>
						View All Categories
						<ChevronRight className="h-4 w-4 ml-1" />
					</a>
				</div>
			</div>
		</div>
	);
}
