import React from "react";

const CategoryCardSkeleton = ({ index }: { index: number }) => (
	<div
		className="group transition-all duration-300 opacity-100 translate-y-0"
		style={{ transitionDelay: `${index * 100}ms` }}
	>
		<div className="relative h-40 rounded-xl overflow-hidden shadow-lg">
			{/* Image placeholder */}
			<div className="absolute inset-0 bg-gray-300 animate-pulse"></div>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />

			{/* Content area */}
			<div className="absolute bottom-0 left-0 right-0 p-4 z-20">
				{/* Category name */}
				<div className="h-5 bg-white/30 rounded animate-pulse w-3/4 mb-2"></div>

				{/* Explore badge */}
				<div className="inline-block px-2 py-1 bg-white/20 rounded">
					<div className="h-3 w-12 bg-white/40 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	</div>
);

const CategorySectionSkeleton = ({
	itemsToShow = 5,
}: {
	itemsToShow?: number;
}) => {
	return (
		<section className="py-12 bg-gradient-to-b from-blue-50/50 to-white">
			<div className="container max-w-7xl px-4 mx-auto">
				{/* Header Section */}
				<div className="flex items-center justify-between mb-8 transition-opacity duration-700 opacity-100">
					<div>
						{/* Title skeleton */}
						<div className="h-8 bg-gray-300 rounded animate-pulse w-80 mb-2"></div>
						{/* Description skeleton */}
						<div className="h-4 bg-gray-300 rounded animate-pulse w-96"></div>
					</div>

					{/* Navigation Controls */}
					<div className="flex gap-2">
						{/* Desktop navigation buttons */}
						<div className="hidden md:flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md bg-white">
							<div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
						</div>
						<div className="hidden md:flex items-center justify-center w-10 h-10 border border-gray-200 rounded-md bg-white">
							<div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
						</div>

						{/* View All button */}
						<div className="hidden sm:flex px-6 py-2.5 bg-white border border-blue-200 rounded-lg shadow-sm">
							<div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
						</div>
					</div>
				</div>

				{/* Categories Grid */}
				<div className="relative">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
						{Array.from({ length: itemsToShow }).map((_, index) => (
							<CategoryCardSkeleton key={index} index={index} />
						))}
					</div>

					{/* Mobile navigation controls */}
					<div className="flex justify-center mt-6 md:hidden">
						<div className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg bg-white mr-2">
							<div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
						</div>
						<div className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded-lg bg-white">
							<div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
						</div>
					</div>

					{/* Mobile "View All" button */}
					<div className="flex justify-center mt-6 sm:hidden">
						<div className="flex items-center justify-center px-6 py-2.5 border border-gray-200 rounded-lg bg-white">
							<div className="h-4 w-28 bg-gray-300 rounded animate-pulse"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CategorySectionSkeleton;
