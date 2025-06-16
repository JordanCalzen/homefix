import Link from "next/link";
import Image from "next/image";
import {
	Search,
	Star,
	CheckCircle,
	ArrowRight,
	MapPin,
	Calendar,
	PenToolIcon as Tool,
	ThumbsUp,
	Menu,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import CtaV6 from "@/components/frontend/cta-sectionV6";
import CategoryListingSection from "@/components/frontend/categories";
import ServiceSection, {
	ServiceCardSkeleton,
} from "@/components/frontend/service-section";
import { Hero } from "@/components/frontend/hero";
import ServiceSectionContent from "@/components/frontend/service-section-content";
import { Suspense } from "react";

interface IServices {
	id: number;
	title: string;
	description: string;
	image: string;
	rating: number;
	providers: number;
}
const services = [
	{
		id: 1,
		title: "AC Installation & Repair",
		description:
			"Professional installation, maintenance, and repair services for all AC brands.",
		image:
			"https://img.freepik.com/free-photo/full-shot-mean-cleaning-air_23-2149482329.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.8,
		providers: 24,
	},
	{
		id: 2,
		title: "Plumbing Services",
		description:
			"From leaky faucets to complete pipe installations, our plumbers handle it all.",
		image:
			"https://img.freepik.com/premium-photo/young-afro-american-plumber-man-repairing-fixing-faucet-shower-stall-side-view-portrait-black-professional-skilled-handyman-blue-overalls-repairing-shower-service-assemble-concept_183219-8441.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.7,
		providers: 36,
	},
	{
		id: 3,
		title: "Electrical Work",
		description:
			"Licensed electricians for installations, repairs, and electrical emergencies.",
		image:
			"https://img.freepik.com/free-photo/low-angle-shot-electric-linemen-working-pole_181624-46993.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.9,
		providers: 18,
	},
	{
		id: 4,
		title: "House Cleaning",
		description:
			"Professional cleaning services for homes of all sizes, tailored to your needs.",
		image:
			"https://img.freepik.com/premium-photo/young-teen-girl-vacuuming-up-house_53876-52035.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.6,
		providers: 42,
	},
	{
		id: 5,
		title: "Painting Services",
		description:
			"Interior and exterior painting with premium materials and expert techniques.",
		image:
			"https://img.freepik.com/free-photo/gardener-with-weedwacker-cutting-grass-garden_329181-20539.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.7,
		providers: 29,
	},
	{
		id: 6,
		title: "Lawn & Garden Care",
		description:
			"Complete lawn maintenance, landscaping, and garden design services.",
		image:
			"https://img.freepik.com/premium-photo/team-dark-skinned-servicemen-orange-suits-putting-television-set-coffee-table-plugging-it_274689-24048.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.5,
		providers: 31,
	},
];

export default function ExplorePage() {
	return (
		<div className="">
			<main>
				{/* Hero Section */}
				<Hero />

				<CategoryListingSection />

				{/* Explore Services Section */}
				<section className="py-12 md:py-16">
					<div className="px-2 md:px-8 ">
						<div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
							<h2 className="text-2xl md:text-3xl font-bold font-[Sora] text-gray-900">
								Explore Our Services
							</h2>
							<div className="flex items-center gap-4 mt-4 md:mt-0">
								<Button variant="outline" size="sm" className="text-gray-600">
									Filter
								</Button>
								<select className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
									<option>All Categories</option>
									<option>Plumbing</option>
									<option>Electrical</option>
									<option>Cleaning</option>
									<option>HVAC</option>
								</select>
							</div>
						</div>

						<div className="grid grid-cols sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4">
							{services.map((service) => (
								<ServiceCard key={service.id} service={service} />
							))}
						</div>
					</div>
				</section>

				{/* Service Listing*/}
				<Suspense fallback={<ServiceCardSkeleton />}>
					<ServiceSectionContent />
				</Suspense>

				{/* Top-Rated Providers Section */}
				<section className="py-12 md:py-16 bg-blue-50">
					<div className="px-2 md:px-8">
						<h2 className="text-2xl md:text-3xl font-bold font-[Sora] text-gray-900 mb-8">
							Top Service Providers
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{providers.map((provider) => (
								<ProviderCard key={provider.id} provider={provider} />
							))}
						</div>
						<div className="mt-10 text-center">
							<Button variant="outline" className="bg-white">
								View All Providers
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</div>
					</div>
				</section>

				{/* Customer Reviews Section */}
				<section className="py-12 md:py-16">
					<div className="container">
						<h2 className="text-2xl md:text-3xl font-bold font-[Sora] text-gray-900 mb-8">
							What Customers Are Saying
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{reviews.map((review) => (
								<ReviewCard key={review.id} review={review} />
							))}
						</div>
					</div>
				</section>

				{/* CTA Banner */}
				<CtaV6 />
			</main>
			{/* Floating Quote Calculator Button */}
			<div className="fixed bottom-6 right-6">
				<Button className="rounded-full h-14 w-14 shadow-lg animate-pulse bg-blue-600 hover:bg-blue-700">
					<span className="sr-only">Get a Quote</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
}

// Service Card Component
function ServiceCard({ service }: { service: IServices }) {
	return (
		<Card className="group lg:max-w-[20rem] md:max-w-[25rem] sm:max-w-[27rem] overflow-hidden relative rounded-2xl transition-all duration-300 border-0 shadow-md h-[27rem]">
			<div className="relative h-full w-full">
				<Image
					src={service.image || "/placeholder.svg"}
					alt={service.title}
					fill
					className="object-cover"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="absolute bottom-0 text-white ">
				<div className="p-5 relative bg-black/50 rounded-2xl  group-hover:bg-blue-500/95 backdrop-blur-[2px]">
					<h3 className="text-lg font-bold font-[Sora] mb-2">
						{service.title}
					</h3>
					<p className=" text-sm mb-4">{service.description}</p>
					<div className="flex items-center text-sm  mb-4">
						<span className="flex items-center">
							<Star className="h-4 w-4 text-yellow-400 mr-1" />
							{service.rating}
						</span>
						<span className="mx-2">•</span>
						<span>{service.providers} providers</span>
					</div>
					<CardFooter className="">
						<Button
							className="w-full bg-blue-100 text-blue-800 hover:bg-blue-200"
							asChild
						>
							<Link
								href="#"
								// className="text-sm font-medium text-emerald-600 group-hover:text-yellow-400 hover:underline"
							>
								View Providers
							</Link>
						</Button>
					</CardFooter>
				</div>
			</div>
			{/* <CardFooter className="p-6 pt-0">
				<Button
					className="w-full bg-blue-100 text-blue-800 hover:bg-blue-200"
					asChild
				>
					<Link
						href="#"
						// className="text-sm font-medium text-emerald-600 group-hover:text-yellow-400 hover:underline"
					>
						View Providers
					</Link>
				</Button>
			</CardFooter> */}
		</Card>
	);
}

// Provider Card Component
function ProviderCard({ provider }: { provider: IProviders }) {
	return (
		<Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
			<CardContent className="p-2 md:p-6">
				<div className="flex items-start gap-4">
					<div className="relative  ">
						<Image
							src={provider.avatar || "/placeholder.svg?height=80&width=80"}
							alt={provider.name}
							width={80}
							height={80}
							className="rounded-full w-20 h-20  object-cover"
						/>
						{provider.verified && (
							<div className="absolute bottom-[3px] right-[5px] bg-blue-100 rounded-full p-0.5">
								<CheckCircle className="h-4 w-4 text-blue-600" />
							</div>
						)}
					</div>
					<div className="flex-1">
						<div className="flex items-center justify-between">
							<h3 className="text-lg font-bold font-[Sora]">{provider.name}</h3>
							{provider.verified}
						</div>
						<p className="text-gray-600 font-medium text-sm">
							{provider.profession}
						</p>
						<div className="flex items-center mt-1 mb-2">
							<div className="flex">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className={`h-4 w-4 ${
											i < provider.rating
												? "text-yellow-400 fill-yellow-400"
												: "text-gray-300"
										}`}
									/>
								))}
							</div>
							<span className="ml-2 text-sm text-gray-600">
								({provider.reviewCount})
							</span>
						</div>
						<div className="flex items-center text-sm text-gray-600 mb-3">
							<MapPin className="h-3 w-3 mr-1" />
							{provider.location}
						</div>
						<div className="flex flex-wrap gap-1 mb-4">
							{provider.services.map((service, index) => (
								<Badge
									key={index}
									variant="secondary"
									className="bg-gray-100  text-gray-700"
								>
									{service}
								</Badge>
							))}
						</div>
					</div>
				</div>
			</CardContent>
			<CardFooter className=" flex items-center justify-center gap-6 bottom-0 p-6 pt-0 ">
				<Button
					variant="outline"
					className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
				>
					View Profile
				</Button>
				<Button
					variant="outline"
					className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
				>
					Book now
				</Button>
			</CardFooter>
		</Card>
	);
}

// Review Card Component
function ReviewCard({ review }: { review: IReviews }) {
	return (
		<Card className="overflow-hidden transition-all duration-300 hover:shadow-md bg-white">
			<CardContent className="p-6">
				<div className="flex items-center gap-3 mb-4">
					<div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium">
						{review.initials}
					</div>
					<div>
						<p className="font-medium">{review.name}</p>
						<p className="text-sm text-gray-500">{review.date}</p>
					</div>
				</div>
				<div className="flex mb-3">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`h-4 w-4 ${
								i < review.rating
									? "text-yellow-400 fill-yellow-400"
									: "text-gray-300"
							}`}
						/>
					))}
				</div>
				<div className="mb-4">
					<p className="text-gray-700 font-[Satoshi] italic">"{review.text}"</p>
				</div>
				<div className="text-sm text-gray-600">
					<span>Service: </span>
					<span className="font-medium">{review.service}</span>
					<span className="mx-2">•</span>
					<span>Provider: </span>
					<span className="font-medium">{review.provider}</span>
				</div>
			</CardContent>
		</Card>
	);
}

interface IProviders {
	id: number;
	name: string;
	profession: string;
	avatar: string;
	rating: number;
	reviewCount: number;
	location: string;
	verified: boolean;
	services: string[];
}

const providers = [
	{
		id: 1,
		name: "Michael Johnson",
		profession: "Master Electrician",
		avatar:
			"https://img.freepik.com/free-photo/medium-shot-smiley-man-with-hat_23-2149439805.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.9,
		reviewCount: 127,
		location: "San Francisco, CA",
		verified: true,
		services: ["Electrical Repairs", "Installations", "Inspections"],
	},
	{
		id: 2,
		name: "Sarah Williams",
		profession: "Professional Cleaner",
		avatar:
			"https://img.freepik.com/premium-photo/smiling-looking-friendly-showing-number-two_1194-424792.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.8,
		reviewCount: 93,
		location: "Portland, OR",
		verified: true,
		services: ["Deep Cleaning", "Regular Maintenance", "Move-in/Move-out"],
	},
	{
		id: 3,
		name: "David Chen",
		profession: "HVAC Specialist",
		avatar:
			"https://img.freepik.com/premium-photo/young-female-worker-is-controlling-mechanical-robot_159755-4597.jpg?uid=R177297642&ga=GA1.1.1785053804.1733249933&semt=ais_hybrid&w=740",
		rating: 4.7,
		reviewCount: 78,
		location: "Austin, TX",
		verified: true,
		services: ["AC Installation", "Heating Systems", "Maintenance"],
	},
];
interface IReviews {
	id: number;
	name: string;
	initials: string;
	date: string;
	rating: number;
	text: string;
	service: string;
	provider: string;
}

const reviews = [
	{
		id: 1,
		name: "Jennifer L.",
		initials: "JL",
		date: "2 days ago",
		rating: 5,
		text: "Absolutely amazing service! The technician was professional, on time, and fixed my AC in no time. Highly recommend!",
		service: "AC Repair",
		provider: "David Chen",
	},
	{
		id: 2,
		name: "Robert K.",
		initials: "RK",
		date: "1 week ago",
		rating: 4,
		text: "Great service overall. The plumber was knowledgeable and fixed our leaky faucet quickly. Only giving 4 stars because they arrived a bit late.",
		service: "Plumbing",
		provider: "Thomas Wilson",
	},
	{
		id: 3,
		name: "Maria G.",
		initials: "MG",
		date: "2 weeks ago",
		rating: 5,
		text: "Sarah did an incredible job cleaning our home. Every corner was spotless, and she was so thorough. Will definitely book again!",
		service: "House Cleaning",
		provider: "Sarah Williams",
	},
];
