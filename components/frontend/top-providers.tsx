"use client";

import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Quote, Star, MapPin, CheckCircle, Calendar, Eye } from "lucide-react";

interface IProviders {
	id: string;
	name: string;
	profession: string;
	rating: number;
	reviewCount: number;
	location: string;
	services: string[];
	verified: boolean;
	imageSrc: string;
	testimonial: string;
	completedJobs: number;
	responseTime: string;
}

const defaultProviders: IProviders[] = [
	{
		id: "1",
		name: "Marcus Johnson",
		profession: "Master Electrician",
		rating: 4.9,
		reviewCount: 127,
		location: "Downtown, Seattle",
		services: ["Electrical Repair", "Wiring", "Panel Upgrades"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"Fixed our electrical issues quickly and professionally. Marcus explained everything clearly and left the workspace spotless.",
		completedJobs: 340,
		responseTime: "< 2 hours",
	},
	{
		id: "2",
		name: "Sarah Chen",
		profession: "Licensed Plumber",
		rating: 4.8,
		reviewCount: 89,
		location: "Bellevue, WA",
		services: ["Pipe Repair", "Drain Cleaning", "Water Heaters"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"Sarah saved our weekend! Emergency pipe burst and she was there within an hour. Professional, efficient, and reasonably priced.",
		completedJobs: 256,
		responseTime: "< 1 hour",
	},
	{
		id: "3",
		name: "David Rodriguez",
		profession: "HVAC Specialist",
		rating: 5.0,
		reviewCount: 156,
		location: "Redmond, WA",
		services: ["AC Repair", "Heating", "Duct Cleaning"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"David's expertise in HVAC is unmatched. Our system runs better than ever and he provided great maintenance tips.",
		completedJobs: 412,
		responseTime: "< 3 hours",
	},
	{
		id: "4",
		name: "Lisa Thompson",
		profession: "Interior Designer",
		rating: 4.9,
		reviewCount: 203,
		location: "Capitol Hill, Seattle",
		services: ["Home Staging", "Color Consultation", "Space Planning"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"Lisa transformed our living space completely. Her eye for design and attention to detail is incredible.",
		completedJobs: 189,
		responseTime: "< 4 hours",
	},
	{
		id: "5",
		name: "Mike Anderson",
		profession: "General Contractor",
		rating: 4.7,
		reviewCount: 94,
		location: "Kirkland, WA",
		services: ["Kitchen Remodel", "Bathroom Renovation", "Flooring"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"Mike handled our kitchen remodel from start to finish. Quality work, on time, and within budget.",
		completedJobs: 78,
		responseTime: "< 6 hours",
	},
	{
		id: "6",
		name: "Jennifer Park",
		profession: "Landscape Designer",
		rating: 4.8,
		reviewCount: 67,
		location: "Bothell, WA",
		services: ["Garden Design", "Lawn Care", "Irrigation"],
		verified: true,
		imageSrc: "/placeholder.svg?height=80&width=80",
		testimonial:
			"Jennifer created a beautiful garden that's both functional and stunning. Her plant knowledge is impressive.",
		completedJobs: 134,
		responseTime: "< 5 hours",
	},
];

function ProviderCard({ provider }: { provider: IProviders }) {
	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			viewport={{ once: true }}
			className="w-[97%] sm:w-[65%] md:w-[48%] lg:w-[38%] xl:w-[30%] flex-shrink-0"
		>
			<Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-white via-gray-50/50 to-white shadow-xl shadow-black/5 backdrop-blur-sm dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 mx-auto ">
				{/* Decorative gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

				<CardContent className="relative py-6 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col ">
					{/* Header with avatar and verification */}
					<div className="mb-4 flex items-start gap-4">
						<div className="relative">
							<Avatar className="h-16 w-16 border-2 border-white shadow-lg ring-2 ring-primary/20">
								<AvatarImage
									src={provider.imageSrc || "/placeholder.svg"}
									alt={provider.name}
								/>
								<AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
									{provider.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
							{provider.verified && (
								<div className="absolute -bottom-1 -right-1 rounded-full bg-white p-1 shadow-sm">
									<CheckCircle className="h-4 w-4 text-green-500" />
								</div>
							)}
						</div>

						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-1">
								<h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
									{provider.name}
								</h3>
								{provider.verified && (
									<Badge
										variant="secondary"
										className="bg-green-100 text-green-700 border-green-200 text-xs"
									>
										Verified
									</Badge>
								)}
							</div>
							<p className="text-primary font-medium text-sm mb-2">
								{provider.profession}
							</p>

							{/* Rating and location */}
							<div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
								<div className="flex items-center gap-1">
									<div className="flex">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												className={cn(
													"h-3 w-3",
													i < Math.floor(provider.rating)
														? "fill-yellow-400 text-yellow-400"
														: "fill-gray-200 text-gray-200"
												)}
											/>
										))}
									</div>
									<span className="font-medium text-gray-900 dark:text-white">
										{provider.rating}
									</span>
									<span>({provider.reviewCount})</span>
								</div>
							</div>

							<div className="flex items-center gap-1 mt-1 text-sm text-gray-600 dark:text-gray-400">
								<MapPin className="h-3 w-3" />
								<span className="truncate">{provider.location}</span>
							</div>
						</div>
					</div>

					{/* Testimonial */}
					<div className="mb-4 relative">
						<Quote className="absolute -top-1 -left-1 h-4 w-4 text-primary/30" />
						<p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed pl-4 italic">
							"{provider.testimonial}"
						</p>
					</div>

					{/* Stats */}
					<div className="mb-4 grid grid-cols-2 gap-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50 p-3">
						<div className="text-center">
							<div className="font-bold text-lg text-primary">
								{provider.completedJobs}
							</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">
								Jobs Completed
							</div>
						</div>
						<div className="text-center">
							<div className="font-bold text-lg text-primary">
								{provider.responseTime}
							</div>
							<div className="text-xs text-gray-600 dark:text-gray-400">
								Response Time
							</div>
						</div>
					</div>

					{/* Services */}
					<div className="mb-6">
						<div className="flex flex-wrap gap-1.5">
							{provider.services.slice(0, 3).map((service, index) => (
								<Badge
									key={index}
									variant="outline"
									className="text-xs bg-white/50 border-primary/20 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
								>
									{service}
								</Badge>
							))}
							{provider.services.length > 3 && (
								<Badge
									variant="outline"
									className="text-xs bg-white/50 border-primary/20 text-gray-500"
								>
									+{provider.services.length - 3} more
								</Badge>
							)}
						</div>
					</div>

					{/* Action buttons */}
					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							className="flex-1 bg-white/50 border-primary/20 hover:bg-primary/5"
						>
							<Eye className="h-4 w-4 mr-2" />
							View Profile
						</Button>
						<Button
							size="sm"
							className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
						>
							<Calendar className="h-4 w-4 mr-2" />
							Book Now
						</Button>
					</div>
				</CardContent>
			</Card>
		</motion.div>
	);
}

interface ProviderTestimonialsProps {
	providers?: IProviders[];
	title?: string;
	subtitle?: string;
	autoplaySpeed?: number;
	className?: string;
}

export default function ProviderTestimonials({
	providers = defaultProviders,
	title = "Top-Rated Service Providers",
	subtitle = "Trusted professionals delivering exceptional results for your home",
	autoplaySpeed = 4000,
	className,
}: ProviderTestimonialsProps) {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		align: "start",
		containScroll: "trimSnaps",
		dragFree: true,
	});

	useEffect(() => {
		if (!emblaApi) return;

		const autoplay = setInterval(() => {
			emblaApi.scrollNext();
		}, autoplaySpeed);

		return () => {
			clearInterval(autoplay);
		};
	}, [emblaApi, autoplaySpeed]);

	const allProviders = [...providers, ...providers];

	return (
		<section
			className={cn(
				"relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-gray-50/50 to-white dark:from-blue-900/50 dark:to-blue-600",
				className
			)}
		>
			{/* Background decorations */}
			<div className="absolute inset-0 -z-10 overflow-hidden">
				{/* Base gradient with more vibrant colors */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/80 to-purple-50/60" />

				{/* Multiple layered radial gradients for depth */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,hsl(var(--primary)/0.15),transparent_50%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.1),transparent_60%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

				{/* Animated floating orbs */}
				<div className="absolute left-1/4 top-1/4 h-32 w-32 rounded-full bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-gradient-to-r from-purple-400/15 to-pink-400/15 blur-3xl animate-pulse [animation-delay:1s]" />
				<div className="absolute top-1/2 left-1/2 h-24 w-24 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur-2xl animate-pulse [animation-delay:2s]" />
				<div className="absolute top-3/4 left-1/6 h-36 w-36 rounded-full bg-gradient-to-r from-indigo-400/10 to-violet-400/10 blur-3xl animate-pulse [animation-delay:0.5s]" />

				{/* Subtle geometric patterns */}
				<div className="absolute inset-0 bg-[length:40px_40px] bg-grid-slate-200/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />

				{/* Animated mesh gradient overlay */}
				<div className="absolute inset-0 opacity-30">
					<div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/20 to-transparent animate-[shimmer_3s_ease-in-out_infinite]" />
				</div>

				{/* Noise texture for depth */}
				<div className="absolute inset-0 bg-noise opacity-[0.015] mix-blend-soft-light" />

				{/* Additional floating elements for visual interest */}
				<div className="absolute top-1/6 right-1/3 h-20 w-20 rounded-full bg-gradient-to-br from-emerald-400/15 to-teal-400/15 blur-2xl animate-pulse [animation-delay:1.5s]" />
				<div className="absolute bottom-1/6 left-1/3 h-28 w-28 rounded-full bg-gradient-to-bl from-rose-400/10 to-orange-400/10 blur-3xl animate-pulse [animation-delay:2.5s]" />
			</div>

			<style jsx>{`
				@keyframes shimmer {
					0% {
						transform: translateX(-100%);
					}
					100% {
						transform: translateX(100%);
					}
				}

				.bg-noise {
					background-image: radial-gradient(
						circle at 1px 1px,
						rgba(0, 0, 0, 0.15) 1px,
						transparent 0
					);
					background-size: 20px 20px;
				}

				.animate-shimmer {
					animation: shimmer 3s ease-in-out infinite;
				}
			`}</style>

			<div className="container max-w-7xl mx-auto px-4 md:px-6">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					viewport={{ once: true }}
					className="relative mb-12 md:mb-16 text-center"
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, delay: 0.1 }}
						viewport={{ once: true }}
						className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-4"
					>
						<CheckCircle className="h-4 w-4" />
						HomeFix Verified Professionals
					</motion.div>

					<h1 className="mb-4 text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-100 dark:to-white">
						{title}
					</h1>

					<motion.p
						className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						viewport={{ once: true }}
					>
						{subtitle}
					</motion.p>
				</motion.div>

				{/* Providers carousel */}
				<div className="overflow-hidden" ref={emblaRef}>
					<div className="flex gap-6">
						{allProviders.map((provider, index) => (
							<ProviderCard
								key={`${provider.id}-${index}`}
								provider={provider}
							/>
						))}
					</div>
				</div>

				{/* Bottom CTA */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
					viewport={{ once: true }}
					className="mt-12 text-center"
				>
					<Button
						size="lg"
						className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
					>
						View All Providers
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
