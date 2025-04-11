"use client";
import Link from "next/link";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
		<div className="min-h-screen bg-white font-[Montserrat] bg-gradient-to-b from-blue-300 to-blue-50">
			{/* Header */}
			<div className="px-2 pt-2 sticky top-0 z-50 w-full">
				<header className=" border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 rounded-lg">
					<div className=" flex h-16 items-center justify-between">
						<Link
							href="/"
							className=" w-[250px] lg:w-[200px] flex items-center gap-2 p-3"
						>
							<Image
								src="/homeFixIcon.png"
								alt=""
								width={300}
								height={300}
								className="w-full h-full object-cover object-center"
							/>
						</Link>

						<nav className="hidden md:flex items-center gap-6">
							<Link
								href="#"
								className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
							>
								Home
							</Link>
							<Link
								href="#"
								className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
							>
								Explore
							</Link>
							<Link
								href="#"
								className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
							>
								Providers
							</Link>
						</nav>

						<div className="flex items-center gap-4">
							<Button variant="outline" className="hidden sm:flex">
								Sign In
							</Button>
							<Button className="bg-blue-100 text-blue-800 hover:bg-blue-200">
								Sign Up
							</Button>
							<Sheet>
								<SheetTrigger asChild>
									<Button
										variant="ghost"
										className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
									>
										<Menu className="h-6 w-6" />
										<span className="sr-only">Toggle Menu</span>
									</Button>
								</SheetTrigger>
								<SheetContent side="left" className="pr-0">
									<nav className="grid gap-6 px-2 py-6">
										<Link href="/browse" className="hover:text-foreground/80">
											Providers
										</Link>
										<Link href="/sell" className="hover:text-foreground/80">
											Services
										</Link>
										<Link
											href="/governance"
											className="hover:text-foreground/80"
										>
											Reviews
										</Link>
										<Link href="/profile" className="hover:text-foreground/80">
											Profile
										</Link>
									</nav>
								</SheetContent>
							</Sheet>
						</div>
					</div>
				</header>
			</div>

			<main>
				{/* Hero Section */}
				<section className="py-12 md:py-16 relative">
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<motion.div
							className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/10 dark:bg-primary/20 rounded-full"
							animate={{
								scale: [1, 1.1, 1],
								rotate: [0, 90, 0],
							}}
							transition={{
								duration: 20,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
						/>
						<motion.div
							className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-secondary/10 dark:bg-secondary/20 rounded-full"
							animate={{
								scale: [1, 1.2, 1],
								rotate: [0, -90, 0],
							}}
							transition={{
								duration: 25,
								repeat: Number.POSITIVE_INFINITY,
								ease: "linear",
							}}
						/>
						<motion.div
							className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
							animate={{
								y: [0, -20, 0],
								x: [0, 20, 0],
							}}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute top-1/4 left-1/4 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
							animate={{
								y: [0, -20, 0],
								x: [0, 20, 0],
							}}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute top-1/2 left-1/2 w-12 h-12 bg-primary/20 dark:bg-primary/30 rounded-full"
							animate={{
								y: [0, -20, 0],
								x: [0, 20, 0],
							}}
							transition={{
								duration: 5,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
						<motion.div
							className="absolute bottom-[10%] right-1/4 w-8 h-8 bg-secondary/20 dark:bg-secondary/30 rounded-full"
							animate={{
								y: [0, 30, 0],
								x: [0, -30, 0],
							}}
							transition={{
								duration: 7,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						/>
					</div>
					<div className=" px-2">
						<div className="max-w-3xl mx-auto text-center">
							<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-[Sora] text-gray-900 mb-4">
								Find the Perfect Service Provider for Your Home
							</h1>
							<p className="text-lg text-gray-600 mb-8">
								Trusted professionals for all your home service needs, vetted
								and reviewed by your community.
							</p>
							<div className="relative max-w-xl mx-auto">
								<div className="flex items-center gap-2 p-2 bg-white rounded-lg shadow-sm border">
									<div className="flex-1">
										<Input
											type="text"
											placeholder="What service do you need?"
											className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
									</div>
									<div className="w-px h-8 bg-gray-200"></div>
									<div className="flex-1">
										<Input
											type="text"
											placeholder="Your location"
											className="border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
										/>
									</div>
									<Button className="bg-blue-600 hover:bg-blue-700">
										<Search className="h-4 w-4 mr-2" />
										Search
									</Button>
								</div>
							</div>
						</div>
					</div>
				</section>

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

				{/* How It Works Section */}
				<section className="py-12 md:py-16 bg-gray-50">
					<div className="container">
						<h2 className="text-2xl md:text-3xl font-bold font-[Sora] text-gray-900 mb-12 text-center">
							How It Works
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							<div className="flex flex-col items-center text-center">
								<div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
									<Search className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-bold font-[Sora] mb-2">
									Find a Service
								</h3>
								<p className="text-gray-600">
									Browse through our wide range of home services and find
									exactly what you need.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
									<Calendar className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-bold font-[Sora] mb-2">
									Book a Trusted Pro
								</h3>
								<p className="text-gray-600">
									Select from our verified professionals and book at your
									convenient time.
								</p>
							</div>
							<div className="flex flex-col items-center text-center">
								<div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 mb-4">
									<ThumbsUp className="h-8 w-8 text-blue-600" />
								</div>
								<h3 className="text-xl font-bold font-[Sora] mb-2">
									Get It Done Right
								</h3>
								<p className="text-gray-600">
									Enjoy quality service and leave a review to help others in the
									community.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* CTA Banner */}
				<section className="py-12 md:py-16 bg-yellow-100">
					<div className="container">
						<div className="max-w-4xl mx-auto text-center">
							<h2 className="text-2xl md:text-3xl font-bold font-[Sora] text-gray-900 mb-4">
								Ready to Book Your First Service?
							</h2>
							<p className="text-lg text-gray-700 mb-8">
								Join thousands of satisfied homeowners who trust our platform
								for their home service needs.
							</p>
							<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
								<Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
									Sign Up as a Homeowner
								</Button>
								<Button
									variant="outline"
									className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full sm:w-auto"
								>
									Join as a Provider
								</Button>
							</div>
							<p className="mt-6 text-sm text-gray-600">
								Trusted by 1,200+ users in your area
							</p>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-50 border-t">
				<div className="container py-12">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						<div>
							{/* <div className="flex items-center gap-2 mb-4">
								<Tool className="h-6 w-6 text-blue-500" />
								<span className="text-xl font-bold font-[Sora]">HomeServe</span>
							</div> */}
							<Link
								href="/"
								className=" w-[250px] lg:w-[200px] flex items-center gap-2 p-3"
							>
								<Image
									src="/homeFixIcon.png"
									alt=""
									width={300}
									height={300}
									className="w-full h-full object-cover object-center"
								/>
							</Link>
							<p className="text-gray-600 text-sm mb-4">
								Connecting homeowners with trusted service providers since 2023.
							</p>
							<div className="flex gap-4">
								<Link href="#" className="text-gray-500 hover:text-blue-600">
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
								<Link href="#" className="text-gray-500 hover:text-blue-600">
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</Link>
								<Link href="#" className="text-gray-500 hover:text-blue-600">
									<svg
										className="h-5 w-5"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
											clipRule="evenodd"
										/>
									</svg>
								</Link>
							</div>
						</div>
						<div>
							<h3 className="font-bold text-gray-900 mb-4">Company</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										About Us
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Careers
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Blog
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Press
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-gray-900 mb-4">Support</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Help Center
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Safety Center
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Community
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Provider Resources
									</Link>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-bold text-gray-900 mb-4">Legal</h3>
							<ul className="space-y-2">
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Terms of Service
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Cookie Policy
									</Link>
								</li>
								<li>
									<Link
										href="#"
										className="text-gray-600 hover:text-blue-600 text-sm"
									>
										Accessibility
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="mt-8 pt-8 border-t">
						<div className="flex flex-col md:flex-row justify-between items-center">
							<p className="text-sm text-gray-600">
								© {new Date().getFullYear()} HomeServe. All rights reserved.
							</p>
							<div className="mt-4 md:mt-0">
								<div className="flex items-center gap-2">
									<span className="text-sm text-gray-600">
										Subscribe to our newsletter
									</span>
									<div className="flex">
										<Input
											type="email"
											placeholder="Your email"
											className="rounded-r-none"
										/>
										<Button className="rounded-l-none bg-blue-600 hover:bg-blue-700">
											Subscribe
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

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
