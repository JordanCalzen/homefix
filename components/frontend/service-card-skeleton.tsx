import React from "react";

const ProductCardSkeleton = () => (
	<div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
		{/* Product Image Skeleton */}
		<div className="relative aspect-square bg-gray-200 animate-pulse">
			{/* Heart icon placeholder */}
			<div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
			{/* Quick View placeholder (for watches/featured items) */}
			<div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gray-300 rounded animate-pulse opacity-60"></div>
		</div>

		{/* Product Info Skeleton */}
		<div className="p-4 space-y-3">
			{/* Product Title */}
			<div className="h-5 bg-gray-200 rounded animate-pulse w-3/4"></div>

			{/* Product Description */}
			<div className="space-y-2">
				<div className="h-3 bg-gray-200 rounded animate-pulse w-full"></div>
				<div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
			</div>

			{/* Rating Stars */}
			<div className="flex items-center space-x-1">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className="w-3 h-3 bg-gray-200 rounded-sm animate-pulse"
					></div>
				))}
				<div className="h-3 bg-gray-200 rounded animate-pulse w-8 ml-2"></div>
			</div>

			{/* Price and Category */}
			<div className="flex items-center justify-between pt-2">
				<div className="h-6 bg-gray-200 rounded animate-pulse w-16"></div>
				<div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
			</div>
		</div>
	</div>
);

const FeaturedCollectionSkeleton = () => {
	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-8">
			{/* Header with product-style design */}
			<div className="flex justify-between items-center mb-8">
				<div>
					<div className="h-8 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
					<div className="h-4 bg-gray-200 rounded animate-pulse w-80"></div>
				</div>
				<div className="flex space-x-3">
					<div className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm border border-gray-200">
						<div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
					</div>
					<div className="p-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm border border-gray-200">
						<div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
					</div>
				</div>
			</div>

			{/* Services grid */}
			<div className="relative overflow-hidden">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="transition-all duration-500">
							<ProductCardSkeleton />
						</div>
					))}
				</div>
			</div>

			{/* Pagination dots */}
			<div className="flex justify-center mt-6 space-x-2">
				<div className="w-4 h-2 bg-gray-800 rounded-full animate-pulse"></div>
				<div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
				<div className="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
			</div>

			{/* View all button */}
			<div className="flex justify-center mt-8">
				<div className="px-6 py-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-lg animate-pulse">
					<div className="h-6 w-36 bg-gray-400 rounded animate-pulse"></div>
				</div>
			</div>
		</div>
	);
};

export default FeaturedCollectionSkeleton;
