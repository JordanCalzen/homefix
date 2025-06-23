"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useCategories } from "@/hooks/useCategory";
import { CategoryDTO } from "@/types/category";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import CategorySectionSkeleton from "./category-skeleton";

export default function CategoryListingSection() {
	const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const [startIndex, setStartIndex] = useState(0);
	const itemsToShow = 5; // Number of categories to show at once

	// Animation on mount
	useEffect(() => {
		setIsVisible(true);
	}, []);

	const { categories, isLoading } = useCategories();

	const nextSlide = () => {
		setStartIndex((prevIndex) =>
			prevIndex + itemsToShow >= categories.length ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setStartIndex((prevIndex) =>
			prevIndex === 0
				? Math.max(0, categories.length - itemsToShow)
				: prevIndex - 1
		);
	};

	const visibleCategories = categories.slice(
		startIndex,
		startIndex + itemsToShow
	);

	// Fill with empty slots if not enough categories
	while (visibleCategories.length < itemsToShow && categories.length > 0) {
		visibleCategories.push(
			categories[visibleCategories.length % categories.length]
		);
	}

	if (isLoading) {
		return <CategorySectionSkeleton />;
	}

	return (
		<section className="py-12 bg-gradient-to-b from-blue-50/50 to-white">
			<div className="container  max-w-7xl px-4 mx-auto">
				<div
					className={`flex items-center justify-between mb-8 transition-opacity duration-700 ${
						isVisible ? "opacity-100" : "opacity-0"
					}`}
				>
					<div>
						<h2 className="text-2xl md:text-3xl font-bold mb-2">
							Explore Popular Categories
						</h2>
						<p className="text-gray-600">
							Find services tailored to your needs and interests - select
							Service Category
						</p>
					</div>
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={prevSlide}
							className="hidden md:flex"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							onClick={nextSlide}
							className="hidden md:flex"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<Button
							asChild
							variant="outline"
							className="hidden sm:flex  px-6 py-2.5 bg-white border border-blue-200 rounded-lg text-sm font-medium text-blue-700 shadow-sm hover:bg-blue-50 transition-colors"
						>
							<Link href="/events">View All Categories</Link>
						</Button>
					</div>
				</div>

				<div className="relative">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{visibleCategories.map((category: CategoryDTO, index: number) => (
							<div
								key={`${category.id}-${index}`}
								className={`group transition-all duration-300 ${
									isVisible
										? "opacity-100 translate-y-0"
										: "opacity-0 translate-y-5"
								}`}
								style={{
									transitionDelay: `${index * 100}ms`,
								}}
							>
								<Link href={`/category/${category.slug}`}>
									<div
										className="relative h-40 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500"
										onMouseEnter={() => setHoveredCategory(Number(category.id))}
										onMouseLeave={() => setHoveredCategory(null)}
									>
										<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
										<Image
											src={category.image as string}
											alt={category.name}
											fill
											className="object-cover transition-transform duration-300 group-hover:scale-110"
										/>
										<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
											<h3 className="text-white font-semibold text-lg">
												{category.name}
											</h3>
											<div className="inline-block mt-1 px-2 py-1 bg-white/20 hover:bg-white/30 rounded text-xs text-white font-medium transition-colors">
												Explore
											</div>
										</div>
									</div>
								</Link>
							</div>
						))}
					</div>

					{/* Mobile navigation controls */}
					<div className="flex justify-center mt-6 md:hidden">
						<button
							onClick={prevSlide}
							className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors mr-2"
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							onClick={nextSlide}
							className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>

					{/* Mobile "View All" button */}
					<div className="flex justify-center mt-6 sm:hidden">
						<Link
							href="/categories"
							className="flex items-center justify-center px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
						>
							View All Categories
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
}
